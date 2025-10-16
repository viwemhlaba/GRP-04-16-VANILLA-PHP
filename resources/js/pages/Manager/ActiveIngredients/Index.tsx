import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Assuming you have shadcn/ui table
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react'; // Icons for edit/delete
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Update the interface to match Laravel's paginator
interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface ActiveIngredient {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface ActiveIngredientIndexProps {
    activeIngredients: Paginated<ActiveIngredient>;
}

export default function ActiveIngredientIndex({ activeIngredients }: ActiveIngredientIndexProps) {
    // Safely access flash and its success property
    const pageProps = usePage().props as { flash?: { success?: string } }; // Ensure 'flash' itself is optional
    const flashSuccessMessage = pageProps.flash?.success; // Use optional chaining

    useEffect(() => {
        if (flashSuccessMessage) {
            toast.success(flashSuccessMessage);
        }
    }, [flashSuccessMessage]);

    // Styled delete confirm
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<{ id: number; name?: string } | null>(null);
    const handleConfirmDelete = () => {
        if (!pendingDelete) return;
        router.delete(route('manager.activeIngredients.destroy', pendingDelete.id), {
            onSuccess: () => {
                toast.success('Deleted successfully.');
                setConfirmOpen(false);
                setPendingDelete(null);
            },
            onError: () => toast.error('Failed to delete.'),
            onFinish: () => setConfirmOpen(false),
        });
    };

    // Pagination navigation handler
    const goToPage = (url: string | null) => {
        if (url) {
            window.location.href = url;
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Active Ingredients', href: '/manager/active-ingredients' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Active Ingredients" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Link href={route('manager.activeIngredients.create')}>
                        <Button>Add New Active Ingredient</Button>
                    </Link>
                </div>

                {activeIngredients.data.length > 0 ? (
                    <Card className="w-full rounded-none md:w-3/4">
                        <CardHeader>
                            <CardTitle>Active Ingredient List</CardTitle>
                            <CardDescription>A list of all recorded active ingredients.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activeIngredients.data.map((ingredient) => (
                                        <TableRow key={ingredient.id}>
                                            <TableCell>{ingredient.name}</TableCell>
                                            <TableCell>{new Date(ingredient.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="flex justify-end space-x-2 text-right">
                                                <Link href={route('manager.activeIngredients.edit', ingredient.id)}>
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
                                                        setPendingDelete({ id: ingredient.id, name: ingredient.name });
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
                            {/* Pagination Controls */}
                            <div className="mt-4 flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!activeIngredients.prev_page_url}
                                    onClick={() => goToPage(activeIngredients.prev_page_url)}
                                >
                                    Previous
                                </Button>
                                <span>
                                    Page {activeIngredients.current_page} of {activeIngredients.last_page}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!activeIngredients.next_page_url}
                                    onClick={() => goToPage(activeIngredients.next_page_url)}
                                >
                                    Next
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="w-full rounded-none py-8 text-center md:w-3/4">
                        <CardHeader>
                            <CardTitle>No Active Ingredients Found</CardTitle>
                            <CardDescription>No active ingredients have been added yet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-gray-700">Click the button above to add your first active ingredient.</p>
                        </CardContent>
                    </Card>
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
                            <Button variant="destructive" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
