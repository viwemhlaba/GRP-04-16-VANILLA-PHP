import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

// Define interface for ActiveIngredient data (same as Index)
interface ActiveIngredient {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface ActiveIngredientEditProps {
    activeIngredient: ActiveIngredient; // Expects an existing active ingredient
    errors: Record<string, string>;
}

export default function ActiveIngredientEdit({ activeIngredient, errors }: ActiveIngredientEditProps) {
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        name: activeIngredient.name, // Pre-fill with existing name
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Active ingredient updated successfully!');
            // No need to reset form explicitly as controller redirects on success
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use PUT request for updating, pass the ID of the ingredient
        put(route('manager.activeIngredients.update', activeIngredient.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Active Ingredients', href: '/manager/active-ingredients' },
                { title: 'Edit', href: `/manager/active-ingredients/${activeIngredient.id}/edit` },
            ]}
        >
            <Head title={`Edit ${activeIngredient.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="w-full md:w-3/4">
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Edit Active Ingredient</CardTitle>
                            <CardDescription>Update the name of this active ingredient.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Active Ingredient Name</Label>
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
                                        {processing ? 'Updating...' : 'Update Active Ingredient'}
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
