import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Medication {
    id: number;
    name: string;
    schedule: number;
    supplier?: { name: string };
    reorder_level: number;
    quantity_on_hand: number;
    created_at: string;
}

interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface MedicationIndexProps {
    medications: Paginated<Medication>;
}

export default function MedicationIndex({ medications }: MedicationIndexProps) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{ id: number; name?: string } | null>(null);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Medications',
            href: '/manager/medications',
        },
    ];

    const handleDeleteConfirmed = () => {
        if (!pendingDelete) return;
        router.delete(route('manager.medications.destroy', pendingDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Medication deleted.');
                setConfirmOpen(false);
                setPendingDelete(null);
                router.visit(route('manager.medications.index'), { preserveScroll: true });
            },
            onError: () => toast.error('Failed to delete medication.'),
            onFinish: () => setConfirmOpen(false),
        });
    };
    // Pagination navigation handler
    const goToPage = (url: string | null) => {
        if (url) window.location.href = url;
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Medications" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Link href={route('manager.medications.create')}>
                        <Button>Add New Medication</Button>
                    </Link>
                </div>
                {medications.data.length > 0 ? (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Medication List</CardTitle>
                            <CardDescription>A list of all recorded medications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead>Reorder Level</TableHead>
                                        <TableHead>Quantity On Hand</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {medications.data.map((med) => (
                                        <TableRow key={med.id}>
                                            <TableCell>{med.name}</TableCell>
                                            <TableCell>{med.schedule}</TableCell>
                                            <TableCell>{med.supplier?.name}</TableCell>
                                            <TableCell>{med.reorder_level}</TableCell>
                                            <TableCell>{med.quantity_on_hand}</TableCell>
                                            <TableCell className="flex justify-end space-x-2 text-right">
                                                <Link href={route('manager.medications.edit', med.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        setPendingDelete({ id: med.id, name: med.name });
                                                        setConfirmOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* Pagination Controls */}
                            <div className="mt-4 flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!medications.prev_page_url}
                                    onClick={() => goToPage(medications.prev_page_url)}
                                >
                                    Previous
                                </Button>
                                <span>
                                    Page {medications.current_page} of {medications.last_page}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!medications.next_page_url}
                                    onClick={() => goToPage(medications.next_page_url)}
                                >
                                    Next
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-muted-foreground py-8 text-center">No medications found.</div>
                )}
                {/* Delete confirmation dialog */}
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                            <DialogDescription>
                                {pendingDelete?.name ? `"${pendingDelete.name}" will be permanently removed.` : 'This action cannot be undone.'}
                            </DialogDescription>
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
