import AddStockModal from '@/components/Manager/Medications/AddStockModal';
import SetStockModal from '@/components/Manager/Medications/SetStockModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

// Update the interface to match Laravel's paginator
interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Medication {
    id: number;
    name: string;
    schedule: string;
    quantity_on_hand: number;
    reorder_level: number;
}

interface StockManagementPageProps extends PageProps {
    medications: Paginated<Medication>;
}

const StockManagement: React.FC<StockManagementPageProps> = ({ medications }) => {
    const [showLowStock, setShowLowStock] = useState(false);

    const filteredMedications = showLowStock
        ? medications.data.filter((medication: Medication) => medication.quantity_on_hand <= medication.reorder_level)
        : medications.data;

    // Pagination navigation handler
    const goToPage = (url: string | null) => {
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Medications', href: '/manager/medications' },
                { title: 'Stock', href: '/manager/medications/stock' },
            ]}
        >
            <Head title="Stock Management" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle>Medication Stock</CardTitle>
                        <CardDescription>Manage medication stock levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex items-center">
                            <Checkbox
                                id="low-stock-filter"
                                checked={showLowStock}
                                onCheckedChange={(checked) => setShowLowStock(Boolean(checked))}
                                className="mr-2"
                            />
                            <label
                                htmlFor="low-stock-filter"
                                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Show only low stock items
                            </label>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Quantity on Hand</TableHead>
                                    <TableHead>Reorder Level</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMedications.map((medication) => {
                                    const isLowStock = medication.quantity_on_hand <= medication.reorder_level;
                                    return (
                                        <TableRow key={medication.id} className={isLowStock ? 'bg-red-100 dark:bg-red-900/50' : ''}>
                                            <TableCell>{medication.name}</TableCell>
                                            <TableCell>{medication.schedule}</TableCell>
                                            <TableCell>{medication.quantity_on_hand}</TableCell>
                                            <TableCell>{medication.reorder_level}</TableCell>
                                            <TableCell className="flex justify-end space-x-2 text-right">
                                                <SetStockModal medicationId={medication.id} currentQuantity={medication.quantity_on_hand} />
                                                <AddStockModal medicationId={medication.id} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-muted-foreground text-sm">
                                Showing {medications.from} to {medications.to} of {medications.total} medications
                            </div>
                            <div className="flex items-center gap-2">
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
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default StockManagement;
