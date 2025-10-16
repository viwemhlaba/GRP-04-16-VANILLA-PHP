import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

export default function DosageFormCreate() {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        name: '',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Dosage form added successfully!');
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('manager.dosageForms.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dosage Forms', href: '/manager/dosage-forms' },
                { title: 'Create', href: '/manager/dosage-forms/create' },
            ]}
        >
            <Head title="Add Dosage Form" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="w-full md:w-3/4">
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Add New Dosage Form</CardTitle>
                            <CardDescription>Enter the name for a new dosage form.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Dosage Form Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                        autoFocus
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Adding...' : 'Add Dosage Form'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
