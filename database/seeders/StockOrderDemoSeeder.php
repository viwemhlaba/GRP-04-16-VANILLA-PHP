<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MedicationSupplier;
use App\Support\SupplierList;
use App\Models\Medication\Medication;
use App\Models\Medication\DosageForm;
use App\Support\DosageFormList;
use App\Models\Medication\ActiveIngredient;
use App\Support\ActiveIngredientList;
use App\Models\User;

class StockOrderDemoSeeder extends Seeder
{
    public function run()
    {
        // Create suppliers
        $supplierList = SupplierList::all();
        $supplier1Data = $supplierList[0];
        $supplier2Data = $supplierList[1];
        $supplier1 = MedicationSupplier::updateOrCreate(
            ['name' => $supplier1Data['name']],
            [
                'contact_name' => $supplier1Data['contact_name'],
                'contact_surname' => $supplier1Data['contact_surname'],
                'email' => $supplier1Data['email'],
            ]
        );
        $supplier2 = MedicationSupplier::updateOrCreate(
            ['name' => $supplier2Data['name']],
            [
                'contact_name' => $supplier2Data['contact_name'],
                'contact_surname' => $supplier2Data['contact_surname'],
                'email' => $supplier2Data['email'],
            ]
        );

        // Create dosage forms
    $forms = DosageFormList::all();
    $tablet = DosageForm::firstOrCreate(['name' => $forms[0]]); // Tablet
    $capsule = DosageForm::firstOrCreate(['name' => $forms[1]]); // Capsule
    $syrup = DosageForm::firstOrCreate(['name' => $forms[3]]); // Syrup

    // Use first three canonical ingredients for demo purposes
    $canonical = ActiveIngredientList::all();
    [$p1, $p2, $p3] = array_slice($canonical, 0, 3);
    $paracetamol = ActiveIngredient::firstOrCreate(['name' => $p1]);
    $ibuprofen   = ActiveIngredient::firstOrCreate(['name' => $p2]);
    $amoxicillin = ActiveIngredient::firstOrCreate(['name' => $p3]);

        // Create medications with different stock levels
        $medications = [
            [
                'name' => $p1 . ' 500mg',
                'schedule' => '2',
                'quantity_on_hand' => 5, // Critical stock
                'reorder_level' => 20,
                'current_sale_price' => 15.50,
                'supplier_id' => $supplier1->id,
                'dosage_form_id' => $tablet->id,
                'active_ingredient' => $paracetamol
            ],
            [
                'name' => $p2 . ' 400mg',
                'schedule' => '2',
                'quantity_on_hand' => 0, // Out of stock
                'reorder_level' => 15,
                'current_sale_price' => 22.00,
                'supplier_id' => $supplier1->id,
                'dosage_form_id' => $tablet->id,
                'active_ingredient' => $ibuprofen
            ],
            [
                'name' => $p3 . ' 250mg',
                'schedule' => '4',
                'quantity_on_hand' => 25, // Low stock (reorder_level + 5)
                'reorder_level' => 20,
                'current_sale_price' => 45.75,
                'supplier_id' => $supplier2->id,
                'dosage_form_id' => $capsule->id,
                'active_ingredient' => $amoxicillin
            ],
            [
                'name' => $p1 . ' Syrup 120mg/5ml',
                'schedule' => '2',
                'quantity_on_hand' => 100, // Good stock
                'reorder_level' => 30,
                'current_sale_price' => 28.90,
                'supplier_id' => $supplier1->id,
                'dosage_form_id' => $syrup->id,
                'active_ingredient' => $paracetamol
            ]
        ];

        foreach ($medications as $medData) {
            $activeIngredient = $medData['active_ingredient'];
            unset($medData['active_ingredient']);

            $medication = Medication::firstOrCreate(
                ['name' => $medData['name']],
                $medData
            );

            // Attach active ingredient
            $medication->activeIngredients()->syncWithoutDetaching([$activeIngredient->id => ['strength' => '1x']]);
        }

        $this->command->info('Demo stock data created successfully!');
        $this->command->info('You can now test the stock ordering system.');
        $this->command->info('Use the canonical manager account seeded separately for access.');
    }
}
