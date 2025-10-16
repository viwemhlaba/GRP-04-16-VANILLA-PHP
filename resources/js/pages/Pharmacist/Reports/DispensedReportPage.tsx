import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ReportFormData {
    start_date: string;
    end_date: string;
    group_by: string;
    [key: string]: string;
}

export default function DispensedReportPage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const { data, setData, errors, processing } = useForm<ReportFormData>({
        start_date: '',
        end_date: '',
        group_by: 'patient',
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!data.start_date || !data.end_date) {
            toast.error('Please select both start and end dates');
            return;
        }

        if (new Date(data.start_date) > new Date(data.end_date)) {
            toast.error('Start date cannot be after end date');
            return;
        }

        setIsGenerating(true);

        try {
            // Build the URL with query parameters
            const queryParams = new URLSearchParams({
                start_date: data.start_date,
                end_date: data.end_date,
                group_by: data.group_by,
            });

            const url = route('pharmacist.reports.dispensed-pdf') + '?' + queryParams.toString();

            // First, make a request to check if data exists
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                // Handle error responses
                const errorData = await response.json();

                if (response.status === 404) {
                    // No data found
                    toast.error(errorData.message, {
                        description: errorData.details,
                        duration: 5000,
                    });
                } else if (response.status === 422) {
                    // Validation errors
                    toast.error(errorData.message, {
                        description: 'Please check your input parameters and try again.',
                        duration: 5000,
                    });
                } else {
                    // Other errors
                    toast.error('Failed to generate report', {
                        description: 'An unexpected error occurred. Please try again.',
                        duration: 5000,
                    });
                }
                return;
            }

            // If we get here, the response was successful and contains PDF data
            const blob = await response.blob();

            // Create download link
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `dispensed-medications-report-${data.start_date}-to-${data.end_date}.pdf`;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the blob URL
            window.URL.revokeObjectURL(downloadUrl);

            toast.success('PDF report generated successfully', {
                description: 'Your report has been downloaded.',
                duration: 3000,
            });
        } catch (error) {
            console.error('PDF generation error:', error);
            toast.error('Failed to generate PDF report', {
                description: 'Please check your connection and try again.',
                duration: 5000,
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const todayISO = new Date().toISOString().split('T')[0];
    const addDays = (d: Date, diff: number) => {
        const nd = new Date(d);
        nd.setDate(nd.getDate() + diff);
        return nd;
    };
    const toISO = (d: Date) => d.toISOString().split('T')[0];

    const presets: { label: string; start: string; end: string }[] = (() => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        return [
            { label: 'Today', start: toISO(today), end: toISO(today) },
            { label: 'Last 7 Days', start: toISO(addDays(today, -6)), end: toISO(today) },
            { label: 'This Month', start: toISO(startOfMonth), end: toISO(today) },
            { label: 'Last Month', start: toISO(startOfPrevMonth), end: toISO(endOfPrevMonth) },
            { label: 'Year to Date', start: toISO(startOfYear), end: toISO(today) },
        ];
    })();

    const breadcrumbs = [
        { title: 'Reports', href: route('pharmacist.reports') },
        { title: 'Dispensed Report', href: route('pharmacist.reports.dispensed') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dispensed Report" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Dispensed Medication Report</h1>
                    <p className="text-muted-foreground text-sm">
                        Generate a PDF report for a specific date range of all medication dispensed by you. Group by patient, medication, or schedule.
                    </p>
                </div>
                <Card className="max-w-4xl rounded-none">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Report Parameters</CardTitle>
                        <CardDescription>Select a date range and grouping option, then generate the PDF.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Preset Ranges + Custom Dates */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {presets.map((p) => (
                                        <Button
                                            type="button"
                                            key={p.label}
                                            variant={data.start_date === p.start && data.end_date === p.end ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() =>
                                                setData({
                                                    ...data,
                                                    start_date: p.start,
                                                    end_date: p.end,
                                                })
                                            }
                                        >
                                            {p.label}
                                        </Button>
                                    ))}
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                start_date: '',
                                                end_date: '',
                                            })
                                        }
                                    >
                                        Custom
                                    </Button>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            max={todayISO}
                                            required
                                        />
                                        {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            max={todayISO}
                                            required
                                        />
                                        {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Grouping */}
                            <div className="space-y-2">
                                <Label htmlFor="group_by">Group Report By</Label>
                                <Select value={data.group_by} onValueChange={(value) => setData('group_by', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select grouping method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="patient">Patient</SelectItem>
                                        <SelectItem value="medication">Medication</SelectItem>
                                        <SelectItem value="schedule">Schedule</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-muted-foreground text-xs">
                                    {data.group_by === 'patient' && 'Each patient with their dispensed medications'}
                                    {data.group_by === 'medication' && 'Each medication with total quantities and patients'}
                                    {data.group_by === 'schedule' && 'Grouped under medication schedule classifications'}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                <Button type="submit" disabled={isGenerating || processing} className="w-full sm:w-auto">
                                    {isGenerating ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
                                            Generating PDF...
                                        </>
                                    ) : (
                                        'Generate PDF Report'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        setData({
                                            start_date: '',
                                            end_date: '',
                                            group_by: 'patient',
                                        })
                                    }
                                    className="w-full sm:w-auto"
                                >
                                    Reset
                                </Button>
                            </div>

                            {/* Info Box */}
                            <div className="bg-muted/30 rounded-md border p-4">
                                <h3 className="text-sm font-medium">About this report</h3>
                                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-xs">
                                    <li>Includes only medications you personally dispensed.</li>
                                    <li>Shows: date, medication, quantity, patient, doctor, schedule.</li>
                                    <li>PDF downloads automatically if data exists for the range.</li>
                                    <li>Receive a clear message if no records match the filters.</li>
                                </ul>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
