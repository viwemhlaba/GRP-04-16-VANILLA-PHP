<?php

namespace Database\Seeders;

use App\Models\Medication\Medication;
use App\Models\Medication\DosageForm;
use App\Models\MedicationSupplier;
use App\Models\Medication\ActiveIngredient;
use App\Support\MedicationList; 
use App\Support\DosageFormList;
use App\Support\SupplierList;
use Illuminate\Database\Seeder;

class MedicationSeeder extends Seeder
{

    public function run(): void
    {
        $canonical = MedicationList::all();
        $names = array_column($canonical, 'name');

        // Remove medications not in canonical list
        Medication::whereNotIn('name', $names)->delete();

        // Build lookup caches
        $dosageForms = DosageForm::all()->keyBy('name');
        $suppliers = MedicationSupplier::all()->keyBy('name');
        $ingredients = ActiveIngredient::all()->keyBy('name');

        $dosageAlias = [
            'Tablets' => 'Tablet',
            'Powder' => 'Suspension', // Assumption; change if you add Powder to canonical list
        ];

        foreach ($canonical as $entry) {
            $medName = $entry['name'];
            $schedule = (int) $entry['schedule'];
            $dosageFormName = $dosageAlias[$entry['dosage_form']] ?? $entry['dosage_form'];
            $supplierName = $entry['supplier'];
            $reorder = $entry['re_order_level'] ?? 0;
            $stock = $entry['stock_on_hand'] ?? 0;
            $price = isset($entry['current_sale_price']) ? (float)$entry['current_sale_price'] : 0.0;

            $dosageForm = $dosageForms[$dosageFormName] ?? DosageForm::firstWhere('name', $dosageFormName);
            if (!$dosageForm) {
                // Skip if dosage form truly unavailable
                $this->command?->warn("Skipping {$medName}: dosage form '{$dosageFormName}' not found.");
                continue;
            }

            $supplier = $suppliers[$supplierName] ?? MedicationSupplier::firstWhere('name', $supplierName);
            if (!$supplier) {
                $this->command?->warn("Skipping {$medName}: supplier '{$supplierName}' not found.");
                continue;
            }

            // Upsert medication (set first active_ingredient_id to first pivot ingredient for compatibility if present)
            $firstIngredientName = $entry['active_ingredients'][0]['name'] ?? null;
            $firstIngredientId = $firstIngredientName && isset($ingredients[$firstIngredientName]) ? $ingredients[$firstIngredientName]->id : null;

            $medication = Medication::updateOrCreate(
                ['name' => $medName],
                [
                    'dosage_form_id' => $dosageForm->id,
                    'active_ingredient_id' => $firstIngredientId,
                    'schedule' => $schedule,
                    'current_sale_price' => $price,
                    'supplier_id' => $supplier->id,
                    'reorder_level' => $reorder,
                    'quantity_on_hand' => $stock,
                ]
            );

            // Sync pivot active ingredients with strength
            $attach = [];
            foreach ($entry['active_ingredients'] as $ai) {
                $iname = $ai['name'];
                if (!isset($ingredients[$iname])) {
                    $this->command?->warn("Missing active ingredient '{$iname}' for medication '{$medName}'");
                    continue;
                }
                $attach[$ingredients[$iname]->id] = ['strength' => $ai['strength']];
            }
            if ($attach) {
                $medication->activeIngredients()->sync($attach);
            }
        }

        $this->command?->info('Canonical medications synced successfully.');
    }
}
