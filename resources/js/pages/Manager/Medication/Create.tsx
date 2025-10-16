import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

export default function MedicationCreate({ dosageForms = [], suppliers = [], activeIngredients = [] }) {
    type Ingredient = { id: string; strength: string };
    type MedicationForm = {
        name: string;
        dosage_form_id: string;
        schedule: string;
        current_sale_price: string;
        supplier_id: string;
        reorder_level: string;
        quantity_on_hand: string;
        active_ingredients: Ingredient[];
    };
    const { data, setData, post, processing, errors } = useForm<MedicationForm>({
        name: '',
        dosage_form_id: '',
        schedule: '',
        current_sale_price: '',
        supplier_id: '',
        reorder_level: '',
        quantity_on_hand: '',
        active_ingredients: [{ id: '', strength: '' }],
    });

    // Success toast handled globally via flash in App layout after redirect

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(e.target.name as keyof MedicationForm, e.target.value);
    };

    const handleIngredientChange = (idx: number, field: string, value: string) => {
        const updated = [...data.active_ingredients];
        if (field === 'id' || field === 'strength') {
            updated[idx][field] = value;
        }
        setData('active_ingredients', updated);
    };

    const addIngredient = () => {
        setData('active_ingredients', [...data.active_ingredients, { id: '', strength: '' }]);
    };

    const removeIngredient = (idx: number) => {
        setData(
            'active_ingredients',
            data.active_ingredients.filter((_, i) => i !== idx),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('manager.medications.store'));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Medications', href: '/manager/medications' },
                { title: 'Create', href: '/manager/medications/create' },
            ]}
        >
            <Head title="Add Medication" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle>Add New Medication</CardTitle>
                        <CardDescription>Enter details for a new medication.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent dark:bg-transparent"
                                />
                                {errors.name && <div className="mt-1 text-xs text-red-500">{errors.name}</div>}
                            </div>
                            <div>
                                <Label htmlFor="dosage_form_id">Dosage Form</Label>
                                <Select value={data.dosage_form_id || undefined} onValueChange={(val) => setData('dosage_form_id', val)} required>
                                    <SelectTrigger className="mt-1 w-full bg-transparent dark:bg-transparent">
                                        <SelectValue placeholder="Select Dosage Form" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dosageForms.map((df: { id: string | number; name: string }) => (
                                            <SelectItem key={df.id} value={df.id.toString()}>
                                                {df.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.dosage_form_id && <div className="mt-1 text-xs text-red-500">{errors.dosage_form_id}</div>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="schedule">Schedule</Label>
                                    <Input
                                        id="schedule"
                                        name="schedule"
                                        type="number"
                                        min="0"
                                        max="6"
                                        value={data.schedule}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent dark:bg-transparent"
                                    />
                                    {errors.schedule && <div className="mt-1 text-xs text-red-500">{errors.schedule}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="current_sale_price">Sale Price</Label>
                                    <Input
                                        id="current_sale_price"
                                        name="current_sale_price"
                                        type="number"
                                        step="0.01"
                                        value={data.current_sale_price}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent dark:bg-transparent"
                                    />
                                    {errors.current_sale_price && <div className="mt-1 text-xs text-red-500">{errors.current_sale_price}</div>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="supplier_id">Supplier</Label>
                                <Select value={data.supplier_id || undefined} onValueChange={(val) => setData('supplier_id', val)} required>
                                    <SelectTrigger className="mt-1 w-full bg-transparent dark:bg-transparent">
                                        <SelectValue placeholder="Select Supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {suppliers.map((s: { id: string | number; name: string }) => (
                                            <SelectItem key={s.id} value={s.id.toString()}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.supplier_id && <div className="mt-1 text-xs text-red-500">{errors.supplier_id}</div>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="reorder_level">Reorder Level</Label>
                                    <Input
                                        id="reorder_level"
                                        name="reorder_level"
                                        type="number"
                                        value={data.reorder_level}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent dark:bg-transparent"
                                    />
                                    {errors.reorder_level && <div className="mt-1 text-xs text-red-500">{errors.reorder_level}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="quantity_on_hand">Quantity On Hand</Label>
                                    <Input
                                        id="quantity_on_hand"
                                        name="quantity_on_hand"
                                        type="number"
                                        value={data.quantity_on_hand}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent dark:bg-transparent"
                                    />
                                    {errors.quantity_on_hand && <div className="mt-1 text-xs text-red-500">{errors.quantity_on_hand}</div>}
                                </div>
                            </div>
                            <div>
                                <Label>Ingredients</Label>
                                {(data.active_ingredients as Array<{ id?: string; strength: string }>).map((ingredient, idx: number) => (
                                    <div key={idx} className="mb-2 flex items-center space-x-2">
                                        <Select
                                            value={ingredient.id || undefined}
                                            onValueChange={(val) => handleIngredientChange(idx, 'id', val)}
                                            required
                                        >
                                            <SelectTrigger className="w-64 rounded border bg-transparent px-2 py-1 dark:bg-transparent">
                                                <SelectValue placeholder="Select Ingredient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {activeIngredients.map((ai: { id: string | number; name: string }) => (
                                                    <SelectItem key={ai.id} value={ai.id.toString()}>
                                                        {ai.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            value={ingredient.strength}
                                            onChange={(e) => handleIngredientChange(idx, 'strength', e.target.value)}
                                            placeholder="Strength (e.g. 500mg)"
                                            required
                                            className="bg-transparent dark:bg-transparent"
                                        />
                                        {data.active_ingredients.length > 1 && (
                                            <Button type="button" variant="destructive" onClick={() => removeIngredient(idx)} size="icon">
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" onClick={addIngredient} variant="secondary">
                                    Add Ingredient
                                </Button>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
