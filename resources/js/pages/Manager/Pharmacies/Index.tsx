import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

interface ResponsiblePharmacist {
    id: number;
    name: string;
    email: string;
}

interface Pharmacy {
    id: number;
    name: string;
    health_council_registration_number: string;
    physical_address: string;
    contact_number: string;
    email: string;
    website_url: string;
    responsible_pharmacist_id: number | null;
    responsible_pharmacist?: ResponsiblePharmacist;
}

interface PharmacyIndexProps {
    pharmacies: Pharmacy[];
}

export default function PharmacyIndex({ pharmacies }: PharmacyIndexProps) {
    const pageProps = usePage().props as { flash?: { success?: string; error?: string } };
    const flashSuccessMessage = pageProps.flash?.success;
    const flashErrorMessage = pageProps.flash?.error;

    React.useEffect(() => {
        if (flashSuccessMessage) {
            toast.success(flashSuccessMessage);
        }
        if (flashErrorMessage) {
            toast.error(flashErrorMessage);
        }
    }, [flashSuccessMessage, flashErrorMessage]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Pharmacies',
            href: '/manager/pharmacies',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Pharmacy" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    {pharmacies.length === 0 && (
                        <Link href={route('manager.pharmacies.create')}>
                            <Button>Add Pharmacy</Button>
                        </Link>
                    )}
                </div>

                {pharmacies.length > 0 ? (
                    <div className="space-y-6">
                        {pharmacies.map((pharmacy) => (
                            <Card key={pharmacy.id} className="w-full rounded-none">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl">{pharmacy.name}</CardTitle>
                                            <CardDescription>Registration: {pharmacy.health_council_registration_number}</CardDescription>
                                        </div>
                                        <Link href={route('manager.pharmacies.edit', pharmacy.id)}>
                                            <Button variant="outline">Edit Details</Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <h4 className="font-medium">Contact Information</h4>
                                            <div className="mt-2 space-y-1 text-sm">
                                                <p>
                                                    <strong>Address:</strong> {pharmacy.physical_address || 'Not provided'}
                                                </p>
                                                <p>
                                                    <strong>Phone:</strong> {pharmacy.contact_number || 'Not provided'}
                                                </p>
                                                <p>
                                                    <strong>Email:</strong> {pharmacy.email || 'Not provided'}
                                                </p>
                                                <p>
                                                    <strong>Website:</strong> {pharmacy.website_url || 'Not provided'}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Responsible Pharmacist</h4>
                                            <div className="mt-2">
                                                {pharmacy.responsible_pharmacist ? (
                                                    <div>
                                                        <Badge variant="secondary" className="mb-1">
                                                            {pharmacy.responsible_pharmacist.name}
                                                        </Badge>
                                                        <p className="text-sm">{pharmacy.responsible_pharmacist.email}</p>
                                                    </div>
                                                ) : (
                                                    <Badge variant="outline">Not Assigned</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>No Pharmacy Added Yet</CardTitle>
                            <CardDescription>Add your pharmacy details to get started with managing prescriptions and staff.</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-6">
                            <p className="mb-4">Click the "Add Pharmacy" button above to register your pharmacy.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
