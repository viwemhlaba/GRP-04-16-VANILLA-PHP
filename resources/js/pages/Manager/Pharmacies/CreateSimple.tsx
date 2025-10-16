import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface Pharmacist {
    id: number;
    name: string;
    email: string;
}

interface PharmacyCreateProps {
    pharmacists: Pharmacist[];
    errors: Record<string, string>;
}

export default function PharmacyCreate({ pharmacists, errors }: PharmacyCreateProps) {
    const { data, setData, post, processing } = useForm({
        name: '',
        health_council_registration_number: '',
        physical_address: '',
        contact_number: '',
        email: '',
        website_url: '',
        responsible_pharmacist_id: null as number | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('manager.pharmacies.store'));
    };

    return (
        <AppLayout>
            <Head title="Add Pharmacy" />
            <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <div className="mb-4">
                        <Link href={route('manager.pharmacies.index')}>
                            <Button variant="outline" size="sm">
                                ← Back to Pharmacies
                            </Button>
                        </Link>
                    </div>
                    <Heading title="Add New Pharmacy" description="Set up your pharmacy details and assign a responsible pharmacist." />
                </div>

                <Card>
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
                                        className={errors.name ? 'border-red-500' : ''}
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
                                        className={errors.health_council_registration_number ? 'border-red-500' : ''}
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
                                        className={errors.physical_address ? 'border-red-500' : ''}
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
                                        className={errors.contact_number ? 'border-red-500' : ''}
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
                                        className={errors.email ? 'border-red-500' : ''}
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
                                        className={errors.website_url ? 'border-red-500' : ''}
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
                                        value={data.responsible_pharmacist_id?.toString() || ''}
                                        onValueChange={(value) => setData('responsible_pharmacist_id', value ? parseInt(value) : null)}
                                    >
                                        <SelectTrigger className={errors.responsible_pharmacist_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a pharmacist" />
                                        </SelectTrigger>
                                        <SelectContent>
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
                                    <p className="mt-1 text-sm text-gray-500">Optional: You can assign a responsible pharmacist now or later.</p>
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
                                    {processing ? 'Adding...' : 'Add Pharmacy'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
