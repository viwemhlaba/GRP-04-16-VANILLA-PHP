import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';

interface StockData {
    total_medications: number;
    low_stock_count: number;
    out_of_stock_count: number;
    total_stock_value: number;
    dispensed_today: number;
    pending_prescriptions: number;
    dispensed_value_month: number;
    critical_stock_count: number;
    expired_medications_count: number;
    top_dispensed_medications: Array<{
        medication: {
            id: number;
            name: string;
        };
        total_dispensed: number;
    }>;
}

interface StockProps {
    stockData: StockData;
}

const Stock = ({ stockData }: StockProps) => {
    const breadcrumbs = [{ title: 'Stock', href: route('pharmacist.stock') }];
    const metricBase = 'rounded-none border bg-background';
    const iconBase = 'mx-auto mb-2 h-7 w-7 text-muted-foreground';
    const numberBase = 'text-center text-2xl font-semibold';
    const labelBase = 'mt-1 text-center text-xs text-muted-foreground';

    const metrics = [
        {
            icon: <Package className={iconBase} />,
            title: 'Total Medications',
            value: stockData.total_medications.toLocaleString(),
            note: 'Different medications in stock',
        },
        {
            icon: <AlertTriangle className={iconBase} />,
            title: 'Low Stock Items',
            value: stockData.low_stock_count,
            note: 'Below reorder level',
        },
        {
            icon: <TrendingDown className={iconBase} />,
            title: 'Out of Stock',
            value: stockData.out_of_stock_count,
            note: 'Need restocking',
        },
        {
            icon: <TrendingUp className={iconBase} />,
            title: 'Total Stock Value',
            value: `R ${stockData.total_stock_value.toLocaleString()}`,
            note: 'Inventory value',
        },
        {
            icon: <Package className={iconBase} />,
            title: 'Dispensed Today',
            value: stockData.dispensed_today,
            note: 'Items dispensed',
        },
        {
            icon: <AlertTriangle className={iconBase} />,
            title: 'Pending Prescriptions',
            value: stockData.pending_prescriptions,
            note: 'Awaiting approval',
        },
        {
            icon: <TrendingUp className={iconBase} />,
            title: 'Month Revenue',
            value: `R ${stockData.dispensed_value_month.toLocaleString()}`,
            note: "This month's sales",
        },
        {
            icon: <AlertTriangle className={iconBase} />,
            title: 'Critical Stock',
            value: stockData.critical_stock_count,
            note: '< 5 units',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stock" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Stock</h1>
                    <p className="text-muted-foreground text-sm">Monitor and manage pharmacy inventory levels and value.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                    {metrics.map((m) => (
                        <Card key={m.title} className={metricBase}>
                            <CardHeader className="pb-2 text-center">
                                {m.icon}
                                <CardTitle className="text-sm font-medium">{m.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={numberBase}>{m.value}</div>
                                <p className={labelBase}>{m.note}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Stock;
