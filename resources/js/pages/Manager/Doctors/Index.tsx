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

interface Doctor {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    practice_number: string;
    created_at: string;
}

interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export default function DoctorsIndex({ doctors }: { doctors: Paginated<Doctor> }) {
    const filteredDoctors = doctors.data;

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<number | null>(null);
    const handleDeleteConfirmed = () => {
        if (pendingDelete === null) return;
        router.delete(route('manager.doctors.destroy', pendingDelete), {
            onSuccess: () => {
                toast.success('Doctor deleted');
                setConfirmOpen(false);
                setPendingDelete(null);
                router.visit(route('manager.doctors.index'));
            },
            onError: () => {
                toast.error('Failed to delete doctor');
            },
            onFinish: () => setConfirmOpen(false),
        });
    };

    const goToPage = (url: string | null) => {
        if (url) window.location.href = url;
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Doctors', href: '/manager/doctors' }]}>
            <Head title="Doctors" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Link href={route('manager.doctors.create')}>
                        <Button>Add New Doctor</Button>
                    </Link>
                </div>

                {filteredDoctors.length > 0 ? (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Doctor List</CardTitle>
                            <CardDescription>A list of all recorded doctors.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Surname</TableHead>
                                        <TableHead>Practice Number</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredDoctors.map((doctor) => (
                                        <TableRow key={doctor.id}>
                                            <TableCell>{doctor.name}</TableCell>
                                            <TableCell>{doctor.surname}</TableCell>
                                            <TableCell>{doctor.practice_number}</TableCell>
                                            <TableCell>{doctor.email}</TableCell>
                                            <TableCell>{doctor.phone}</TableCell>
                                            <TableCell className="flex justify-end space-x-2 text-right">
                                                <Link href={route('manager.doctors.edit', doctor.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        setPendingDelete(doctor.id);
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
                            <div className="mt-4 flex items-center justify-between">
                                <Button variant="outline" size="sm" disabled={!doctors.prev_page_url} onClick={() => goToPage(doctors.prev_page_url)}>
                                    Previous
                                </Button>
                                <span>
                                    Page {doctors.current_page} of {doctors.last_page}
                                </span>
                                <Button variant="outline" size="sm" disabled={!doctors.next_page_url} onClick={() => goToPage(doctors.next_page_url)}>
                                    Next
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-muted-foreground py-8 text-center">No doctors found.</div>
                )}

                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                            <DialogDescription>
                                {(() => {
                                    const doc = doctors.data.find((d) => d.id === pendingDelete);
                                    return doc ? `${doc.name} ${doc.surname} will be permanently removed.` : 'This action cannot be undone.';
                                })()}
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
