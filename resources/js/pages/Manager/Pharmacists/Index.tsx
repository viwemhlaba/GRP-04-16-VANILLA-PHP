import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define interface for the nested Pharmacist details (from the new pharmacists table)
interface PharmacistDetails {
    id: number; // ID of the pharmacist record
    user_id: number;
    id_number: string;
    cellphone_number: string;
    health_council_registration_number: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

// Define interface for the User record (which represents the Pharmacist in the list)
interface PharmacistUser {
    id: number; // ID of the user record
    name: string;
    surname: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    role: string;
    // The related pharmacist details will be nested here
    pharmacist: PharmacistDetails; // This assumes it's always present for a 'pharmacist' user
}

interface PharmacistIndexProps {
    pharmacists: PharmacistUser[]; // Array of User records, each with nested PharmacistDetails
}

export default function PharmacistIndex({ pharmacists }: PharmacistIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Pharmacists', href: '/manager/pharmacists' }];
    // Safely access flash and its success property
    const pageProps = usePage().props as { flash?: { success?: string } }; // Ensure 'flash' itself is optional
    const flashSuccessMessage = pageProps.flash?.success; // Use optional chaining

    useEffect(() => {
        if (flashSuccessMessage) {
            toast.success(flashSuccessMessage);
        }
    }, [flashSuccessMessage]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<number | null>(null);
    const handleDeleteConfirmed = () => {
        if (pendingDelete === null) return;
        router.delete(route('manager.pharmacists.destroy', pendingDelete), {
            onSuccess: () => toast.success('Pharmacist deleted.'),
            onError: () => toast.error('Failed to delete pharmacist.'),
            onFinish: () => setConfirmOpen(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Pharmacists" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Link href={route('manager.pharmacists.create')}>
                        <Button>Add New Pharmacist</Button>
                    </Link>
                </div>

                {pharmacists.length > 0 ? (
                    <Card className="w-full rounded-none md:w-3/4">
                        <CardHeader>
                            <CardTitle>Pharmacist List</CardTitle>
                            <CardDescription>All registered pharmacist users.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Surname</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>ID Number</TableHead>
                                        <TableHead>Cellphone</TableHead>
                                        <TableHead>Reg. No.</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pharmacists.map((pharmacist) => (
                                        <TableRow key={pharmacist.id}>
                                            <TableCell className="font-medium">{pharmacist.id}</TableCell>
                                            <TableCell>{pharmacist.name}</TableCell>
                                            <TableCell>{pharmacist.surname}</TableCell>
                                            <TableCell>{pharmacist.email}</TableCell>
                                            <TableCell>{pharmacist.pharmacist?.id_number || 'N/A'}</TableCell>
                                            <TableCell>{pharmacist.pharmacist?.cellphone_number || 'N/A'}</TableCell>
                                            <TableCell>{pharmacist.pharmacist?.health_council_registration_number || 'N/A'}</TableCell>
                                            <TableCell className="flex justify-end space-x-2 text-right">
                                                <Link href={route('manager.pharmacists.edit', pharmacist.id)}>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => {
                                                        setPendingDelete(pharmacist.id);
                                                        setConfirmOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="w-full rounded-none py-8 text-center md:w-3/4">
                        <CardHeader>
                            <CardTitle>No Pharmacists Found</CardTitle>
                            <CardDescription>No pharmacist users have been added yet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-gray-700">Click the button above to add your first pharmacist.</p>
                        </CardContent>
                    </Card>
                )}
                {/* Delete confirmation dialog */}
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                            <DialogDescription>This action cannot be undone.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteConfirmed}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
