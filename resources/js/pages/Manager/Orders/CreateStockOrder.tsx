import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface Medication {
    id: number;
    name: string;
    schedule: string;
    quantity_on_hand: number;
    reorder_level: number;
}

interface MedicationToReorder extends Medication {
    supplier: {
        name: string;
    };
}

export default function CreateStockOrder({ medicationsToReorder }: PageProps<{ medicationsToReorder: { [key: string]: MedicationToReorder[] } }>) {
    const [selectedMedications, setSelectedMedications] = useState<{ [key: number]: number }>({});
    const [checkedMedications, setCheckedMedications] = useState<Set<number>>(new Set());
    const { setData, post, processing } = useForm({
        medications: [] as { id: number; quantity: number }[],
    });

    const handleCheckboxChange = (medicationId: number) => {
        setCheckedMedications((prev) => {
            const newChecked = new Set(prev);
            if (newChecked.has(medicationId)) {
                newChecked.delete(medicationId);
                // Remove from selected medications when unchecked
                setSelectedMedications((prevSelected) => {
                    const newSelected = { ...prevSelected };
                    delete newSelected[medicationId];
                    return newSelected;
                });
            } else {
                newChecked.add(medicationId);
                // Set default quantity when checked
                setSelectedMedications((prevSelected) => ({
                    ...prevSelected,
                    [medicationId]: 1,
                }));
            }
            return newChecked;
        });
    };

    const handleQuantityChange = (medicationId: number, quantity: number) => {
        setSelectedMedications((prev) => ({
            ...prev,
            [medicationId]: quantity,
        }));
    };

    const getSupplierTotal = (supplierName: string) => {
        return medicationsToReorder[supplierName].reduce((total, medication) => {
            return total + (selectedMedications[medication.id] || 0);
        }, 0);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const medicationsToSubmit = Object.entries(selectedMedications)
            .filter(([, quantity]) => quantity > 0)
            .map(([id, quantity]) => ({ id: parseInt(id, 10), quantity }));

        if (medicationsToSubmit.length === 0) {
            toast.error('Please select at least one medication and set a quantity greater than 0.');
            return;
        }

        setData('medications', medicationsToSubmit);
        post(route('manager.orders.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Orders', href: '/manager/orders' },
                { title: 'Create', href: '/manager/orders/create' },
            ]}
        >
            <Head title="Create Stock Order" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle>Create Stock Order</CardTitle>
                        <CardDescription>Select medications to order from suppliers.</CardDescription>
                    </CardHeader>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.entries(medicationsToReorder).map(([supplierName, medications]) => (
                        <Card key={supplierName} className="rounded-none">
                            <CardHeader>
                                <CardTitle>{supplierName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader className="[&_tr]:border-0">
                                        <TableRow>
                                            <TableHead className="w-12">Select</TableHead>
                                            <TableHead>Medication</TableHead>
                                            <TableHead>Schedule</TableHead>
                                            <TableHead>Current Stock</TableHead>
                                            <TableHead>Reorder Level</TableHead>
                                            <TableHead className="w-32">Order Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {medications.map((medication) => (
                                            <TableRow key={medication.id} className="border-0">
                                                <TableCell>
                                                    <Checkbox
                                                        checked={checkedMedications.has(medication.id)}
                                                        onCheckedChange={() => handleCheckboxChange(medication.id)}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div>{medication.name}</div>
                                                    <div className="text-muted-foreground text-xs">{medication.supplier?.name ?? supplierName}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{medication.schedule}</Badge>
                                                </TableCell>
                                                <TableCell>{medication.quantity_on_hand}</TableCell>
                                                <TableCell>{medication.reorder_level}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        disabled={!checkedMedications.has(medication.id)}
                                                        onChange={(e) => handleQuantityChange(medication.id, parseInt(e.target.value, 10) || 0)}
                                                        value={selectedMedications[medication.id] || ''}
                                                        className="w-20"
                                                        placeholder="1"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="border-0">
                                            <TableCell colSpan={5} className="text-right font-semibold">
                                                Total Items:
                                            </TableCell>
                                            <TableCell className="font-semibold">{getSupplierTotal(supplierName)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="flex items-center justify-end gap-3">
                        <Link href={route('manager.orders.index')}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing || checkedMedications.size === 0}>
                            {processing ? 'Creating Order...' : 'Create Stock Order'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
