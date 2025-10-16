import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Supplier {
    id: number;
    name: string;
    contact_name: string;
    contact_surname: string;
    email: string;
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

interface SuppliersIndexProps {
    suppliers: Paginated<Supplier> | Supplier[];
}

export default function SuppliersIndex({ suppliers }: SuppliersIndexProps) {
    // Pagination navigation handler
    const goToPage = (url: string | null) => {
        if (url) window.location.href = url;
    };
    // Accept both array and paginated shapes
    const isPaginated = (v: unknown): v is Paginated<Supplier> =>
        !!v && typeof v === 'object' && Array.isArray((v as Record<string, unknown>).data as unknown[]);
    const items: Supplier[] = isPaginated(suppliers) ? suppliers.data : ((suppliers as Supplier[]) ?? []);
    const currentPage = isPaginated(suppliers) ? suppliers.current_page : 1;
    const lastPage = isPaginated(suppliers) ? suppliers.last_page : 1;
    const nextUrl = isPaginated(suppliers) ? suppliers.next_page_url : null;
    const prevUrl = isPaginated(suppliers) ? suppliers.prev_page_url : null;
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<number | null>(null);

    const handleDelete = () => {
        if (pendingDelete === null) return;
        router.delete(route('manager.suppliers.destroy', pendingDelete), {
            onSuccess: () => {
                toast.success('Supplier deleted');
                setConfirmOpen(false);
                setPendingDelete(null);
                router.visit(route('manager.suppliers.index'));
            },
            onError: () => toast.error('Failed to delete supplier'),
            onFinish: () => setConfirmOpen(false),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Suppliers', href: '/manager/suppliers' }]}>
            <Head title="Suppliers" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Link href={route('manager.suppliers.create')}>
                        <Button>Add New Supplier</Button>
                    </Link>
                </div>

                {items.length > 0 ? (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Supplier List</CardTitle>
                            <CardDescription>A list of all recorded suppliers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Contact Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((supplier) => (
                                        <TableRow key={supplier.id}>
                                            <TableCell>{supplier.name}</TableCell>
                                            <TableCell>
                                                {supplier.contact_name} {supplier.contact_surname}
                                            </TableCell>
                                            <TableCell>{supplier.email}</TableCell>
                                            <TableCell className="flex justify-end space-x-2 text-right">
                                                <Link href={route('manager.suppliers.edit', supplier.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        setPendingDelete(supplier.id);
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
                                <Button variant="outline" size="sm" disabled={!prevUrl} onClick={() => goToPage(prevUrl)}>
                                    Previous
                                </Button>
                                <span>
                                    Page {currentPage} of {lastPage}
                                </span>
                                <Button variant="outline" size="sm" disabled={!nextUrl} onClick={() => goToPage(nextUrl)}>
                                    Next
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-muted-foreground py-8 text-center">No suppliers found.</div>
                )}

                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                            <DialogDescription>
                                {(() => {
                                    const s = items.find((d: Supplier) => d.id === pendingDelete);
                                    return s ? `${s.name} will be permanently removed.` : 'This action cannot be undone.';
                                })()}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
