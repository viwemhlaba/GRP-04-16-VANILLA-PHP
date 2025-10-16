import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface Pharmacist {
    id: number;
    name: string;
    email: string;
}

interface PharmacyDetails {
    id: number;
    name: string;
    health_council_registration_number: string;
    physical_address: string;
    contact_number: string;
    email: string;
    website_url: string;
    responsible_pharmacist_id: number | null;
}

interface PharmacyEditProps {
    pharmacy: PharmacyDetails;
    pharmacists: Pharmacist[];
    errors: Record<string, string>;
}

export default function PharmacyEdit({ pharmacy, pharmacists, errors }: PharmacyEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pharmacies', href: '/manager/pharmacies' },
        { title: `Edit: ${pharmacy.name}`, href: `/manager/pharmacies/${pharmacy.id}/edit` },
    ];
    const { data, setData, put, processing } = useForm({
        name: pharmacy.name,
        health_council_registration_number: pharmacy.health_council_registration_number,
        physical_address: pharmacy.physical_address,
        contact_number: pharmacy.contact_number,
        email: pharmacy.email,
        website_url: pharmacy.website_url,
        responsible_pharmacist_id: pharmacy.responsible_pharmacist_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('manager.pharmacies.update', pharmacy.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${pharmacy.name}`} />
            <div className="max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <div className="mb-4">
                        <Link href={route('manager.pharmacies.index')}>
                            <Button variant="outline" size="sm">
                                ← Back to Pharmacies
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle>Pharmacy Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>

                                <div>
                                    <Label htmlFor="name">Pharmacy Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`${errors.name ? 'border-red-500' : ''} bg-white/10 text-white placeholder:text-white/70 focus:bg-white/15 focus-visible:bg-white/15`}
                                        placeholder="Enter pharmacy name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="health_council_registration_number">Health Council Registration Number *</Label>
                                    <Input
                                        id="health_council_registration_number"
                                        type="text"
                                        value={data.health_council_registration_number}
                                        onChange={(e) => setData('health_council_registration_number', e.target.value)}
                                        className={`${errors.health_council_registration_number ? 'border-red-500' : ''} bg-white/10 text-white placeholder:text-white/70 focus:bg-white/15 focus-visible:bg-white/15`}
                                        placeholder="Enter registration number"
                                    />
                                    {errors.health_council_registration_number && (
                                        <p className="mt-1 text-sm text-red-500">{errors.health_council_registration_number}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Contact Information</h3>

                                <div>
                                    <Label htmlFor="physical_address">Physical Address</Label>
                                    <Input
                                        id="physical_address"
                                        type="text"
                                        value={data.physical_address}
                                        onChange={(e) => setData('physical_address', e.target.value)}
                                        className={`${errors.physical_address ? 'border-red-500' : ''} bg-white/10 text-white placeholder:text-white/70 focus:bg-white/15 focus-visible:bg-white/15`}
                                        placeholder="Enter street address"
                                    />
                                    {errors.physical_address && <p className="mt-1 text-sm text-red-500">{errors.physical_address}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="contact_number">Contact Number</Label>
                                    <Input
                                        id="contact_number"
                                        type="text"
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        className={`${errors.contact_number ? 'border-red-500' : ''} bg-white/10 text-white placeholder:text-white/70 focus:bg-white/15 focus-visible:bg-white/15`}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.contact_number && <p className="mt-1 text-sm text-red-500">{errors.contact_number}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`${errors.email ? 'border-red-500' : ''} bg-white/10 text-white placeholder:text-white/70 focus:bg-white/15 focus-visible:bg-white/15`}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="website_url">Website URL</Label>
                                    <Input
                                        id="website_url"
                                        type="url"
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        className={`${errors.website_url ? 'border-red-500' : ''} bg-white/10 text-white placeholder:text-white/70 focus:bg-white/15 focus-visible:bg-white/15`}
                                        placeholder="https://example.com"
                                    />
                                    {errors.website_url && <p className="mt-1 text-sm text-red-500">{errors.website_url}</p>}
                                </div>
                            </div>

                            {/* Staff Assignment */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Staff Assignment</h3>

                                <div>
                                    <Label htmlFor="responsible_pharmacist_id">Responsible Pharmacist</Label>
                                    <Select
                                        value={data.responsible_pharmacist_id != null ? data.responsible_pharmacist_id.toString() : 'none'}
                                        onValueChange={(value) => setData('responsible_pharmacist_id', value === 'none' ? null : parseInt(value))}
                                    >
                                        <SelectTrigger
                                            className={`${errors.responsible_pharmacist_id ? 'border-red-500' : ''} bg-white/10 text-white focus:bg-white/15 focus-visible:bg-white/15`}
                                        >
                                            <SelectValue placeholder="Select a pharmacist" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No pharmacist assigned</SelectItem>
                                            {pharmacists.map((pharmacist) => (
                                                <SelectItem key={pharmacist.id} value={pharmacist.id.toString()}>
                                                    {pharmacist.name} ({pharmacist.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.responsible_pharmacist_id && (
                                        <p className="mt-1 text-sm text-red-500">{errors.responsible_pharmacist_id}</p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">You can change or assign a responsible pharmacist for this pharmacy.</p>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-3 pt-6">
                                <Link href={route('manager.pharmacies.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Pharmacy'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
