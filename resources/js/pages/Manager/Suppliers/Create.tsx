import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

export default function SupplierCreate() {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        name: '',
        contact_name: '',
        contact_surname: '',
        email: '',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Supplier added successfully!');
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('manager.suppliers.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Suppliers', href: '/manager/suppliers' },
                { title: 'Create', href: '/manager/suppliers/create' },
            ]}
        >
            <Head title="Add Supplier" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="w-full md:w-3/4">
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Add New Supplier</CardTitle>
                            <CardDescription>Enter the details for a new medication supplier.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Supplier Name</Label>
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
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="contact_name">Contact Name</Label>
                                        <Input
                                            id="contact_name"
                                            value={data.contact_name}
                                            onChange={(e) => setData('contact_name', e.target.value)}
                                            required
                                        />
                                        {errors.contact_name && <p className="text-sm text-red-500">{errors.contact_name}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="contact_surname">Contact Surname</Label>
                                        <Input
                                            id="contact_surname"
                                            value={data.contact_surname}
                                            onChange={(e) => setData('contact_surname', e.target.value)}
                                            required
                                        />
                                        {errors.contact_surname && <p className="text-sm text-red-500">{errors.contact_surname}</p>}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Supplier'}
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
