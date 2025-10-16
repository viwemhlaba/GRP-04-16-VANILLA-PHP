import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { route } from 'ziggy-js';

interface StockOrder {
    id: number;
    order_number: string;
    supplier_name: string;
    status: 'pending' | 'completed' | 'Pending' | 'Received';
    total_items: number;
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

export default function Index({ orders }: { orders: Paginated<StockOrder> }) {
    const goToPage = (url: string | null) => {
        if (url) window.location.href = url;
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Orders', href: '/manager/orders' }]}>
            <Head title="Stock Orders" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Link href={route('manager.orders.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Order
                        </Button>
                    </Link>
                </div>

                {orders.data.length > 0 ? (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle>Order List</CardTitle>
                            <CardDescription>A list of stock orders placed with suppliers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order Number</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead>Total Items</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Order Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.data.map((o) => {
                                        const normalizedStatus = o.status.toLowerCase();
                                        const statusLabel = o.status.charAt(0).toUpperCase() + o.status.slice(1);
                                        return (
                                            <TableRow key={o.id}>
                                                <TableCell>{o.order_number}</TableCell>
                                                <TableCell>{o.supplier_name}</TableCell>
                                                <TableCell className="font-medium">{o.total_items}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            normalizedStatus === 'received' || normalizedStatus === 'completed'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {statusLabel}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{new Date(o.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <Link href={route('manager.orders.show', o.id)}>
                                                        <Button variant="outline" size="sm">
                                                            View Order
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex items-center justify-between">
                                <Button variant="outline" size="sm" disabled={!orders.prev_page_url} onClick={() => goToPage(orders.prev_page_url)}>
                                    Previous
                                </Button>
                                <span>
                                    Page {orders.current_page} of {orders.last_page}
                                </span>
                                <Button variant="outline" size="sm" disabled={!orders.next_page_url} onClick={() => goToPage(orders.next_page_url)}>
                                    Next
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-muted-foreground py-8 text-center">No orders found.</div>
                )}
            </div>
        </AppLayout>
    );
}
