import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Download, FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ReportData {
    id: number;
    title: string;
    generated_at: string;
    file_size: string;
    download_count: number;
    parameters: {
        start_date: string;
        end_date: string;
        group_by: string;
    };
    file_exists: boolean;
    is_expired: boolean;
}

interface Props {
    recentReports: ReportData[];
}

export default function PharmacistReports({ recentReports }: Props) {
    const { delete: deleteReport, processing } = useForm();

    const handleDeleteReport = (reportId: number) => {
        if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
            deleteReport(route('pharmacist.reports.delete', reportId), {
                onSuccess: () => {
                    toast.success('Report deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete report');
                },
            });
        }
    };
    const breadcrumbs = [{ title: 'Reports', href: route('pharmacist.reports') }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Heading */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
                    <p className="text-muted-foreground text-sm">Generate and manage pharmacy activity reports.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Left: Narrow Generate Card */}
                    <Card className="self-start rounded-none lg:col-span-4 xl:col-span-3">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-medium">Generate Reports</CardTitle>
                            <CardDescription>Select a report type.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Dispensed Medications</p>
                                    <p className="text-muted-foreground text-xs">PDF for a chosen date range.</p>
                                    <Button asChild size="sm" className="w-full">
                                        <Link href={route('pharmacist.reports.dispensed')}>Generate</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Recent Reports / Empty State */}
                    <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                        {recentReports.length > 0 ? (
                            <Card className="rounded-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg font-medium">
                                        <FileText className="h-5 w-5" /> Recent Reports
                                    </CardTitle>
                                    <CardDescription>Previously generated (auto-deleted after 30 days).</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto border-y">
                                        <Table>
                                            <TableHeader className="bg-gray-50 dark:bg-gray-900">
                                                <TableRow>
                                                    <TableHead>Report</TableHead>
                                                    <TableHead>Date Range</TableHead>
                                                    <TableHead>Generated</TableHead>
                                                    <TableHead>Size</TableHead>
                                                    <TableHead>Downloads</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recentReports.map((report) => (
                                                    <TableRow key={report.id}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold">{report.title}</span>
                                                                <span className="text-muted-foreground text-xs">
                                                                    Grouped by {report.parameters.group_by}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-sm">
                                                            {report.parameters.start_date} – {report.parameters.end_date}
                                                        </TableCell>
                                                        <TableCell className="text-sm">{report.generated_at}</TableCell>
                                                        <TableCell className="text-sm">{report.file_size}</TableCell>
                                                        <TableCell className="text-sm">{report.download_count}</TableCell>
                                                        <TableCell>
                                                            {!report.file_exists ? (
                                                                <Badge variant="destructive">Missing</Badge>
                                                            ) : report.is_expired ? (
                                                                <Badge variant="secondary">Expired</Badge>
                                                            ) : (
                                                                <Badge variant="default">Available</Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                {report.file_exists && !report.is_expired && (
                                                                    <Button size="sm" variant="outline" asChild>
                                                                        <Link href={route('pharmacist.reports.download', report.id)}>
                                                                            <Download className="h-4 w-4" />
                                                                        </Link>
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() => handleDeleteReport(report.id)}
                                                                    disabled={processing}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="rounded-none">
                                <CardContent className="py-12 text-center">
                                    <FileText className="text-muted-foreground mx-auto h-12 w-12" />
                                    <h3 className="mt-4 text-lg font-semibold">No Reports Yet</h3>
                                    <p className="text-muted-foreground mt-2 text-sm">Generate your first dispensed report to see it here.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
