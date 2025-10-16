import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

export default function DoctorCreate() {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        name: '',
        surname: '',
        email: '',
        phone: '',
        practice_number: '',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Doctor added successfully!');
        }
    }, [recentlySuccessful]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('manager.doctors.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Doctors', href: '/manager/doctors' },
                { title: 'Create', href: '/manager/doctors/create' },
            ]}
        >
            <Head title="Add Doctor" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="w-full md:w-3/4">
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Add New Doctor</CardTitle>
                            <CardDescription>Enter details for a new doctor.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">First Name</Label>
                                        <Input id="name" name="name" value={data.name} onChange={handleChange} required />
                                        {errors.name && <div className="mt-1 text-xs text-red-500">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <Label htmlFor="surname">Surname</Label>
                                        <Input id="surname" name="surname" value={data.surname} onChange={handleChange} required />
                                        {errors.surname && <div className="mt-1 text-xs text-red-500">{errors.surname}</div>}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="practice_number">Practice Number</Label>
                                    <Input
                                        id="practice_number"
                                        name="practice_number"
                                        value={data.practice_number}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.practice_number && <div className="mt-1 text-xs text-red-500">{errors.practice_number}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} required />
                                    {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="phone">Contact Number</Label>
                                    <Input id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} required />
                                    {errors.phone && <div className="mt-1 text-xs text-red-500">{errors.phone}</div>}
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        Save Doctor
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
