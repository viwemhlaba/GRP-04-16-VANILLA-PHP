<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Support\MedicationList;
use App\Support\SupplierList;
use App\Support\ActiveIngredientList;
use App\Support\DosageFormList;
use App\Models\Medication\Medication;
use App\Models\MedicationSupplier;
use App\Models\Medication\ActiveIngredient;
use App\Models\Medication\DosageForm;

class AuditCanonicalData extends Command
{
    protected $signature = 'canonical:audit {--fix : Attempt to fix pivot mismatches}';
    protected $description = 'Audit (and optionally fix) canonical reference data integrity';

    public function handle(): int
    {
        $this->info('Auditing canonical data...');

        $this->auditList('Suppliers', SupplierList::all(), MedicationSupplier::class, 'name');
        $this->auditList('Active Ingredients', array_map(fn($n) => ['name' => $n], ActiveIngredientList::all()), ActiveIngredient::class, 'name');
        $this->auditList('Dosage Forms', array_map(fn($n) => ['name' => $n], DosageFormList::all()), DosageForm::class, 'name');

        $this->auditMedications();
        $this->info('Audit complete.');
        return Command::SUCCESS;
    }

    private function auditList(string $label, array $canonical, string $modelClass, string $key)
    {
        $canonicalNames = array_column($canonical, $key);
        $existing = $modelClass::pluck($key)->all();
        $missing = array_diff($canonicalNames, $existing);
        $extra = array_diff($existing, $canonicalNames);
        $this->line("{$label}: missing=" . count($missing) . ", extra=" . count($extra));
        if ($missing) {
            $this->warn('  Missing: ' . implode(', ', $missing));
        }
        if ($extra) {
            $this->warn('  Extra: ' . implode(', ', $extra));
        }
    }

    private function auditMedications()
    {
        $canonical = MedicationList::all();
        $index = [];
        foreach ($canonical as $c) { $index[$c['name']] = $c; }

        $names = array_keys($index);
        $existing = Medication::with('activeIngredients')->get();
        $missing = array_diff($names, $existing->pluck('name')->all());
        $extra = array_diff($existing->pluck('name')->all(), $names);

        $this->line('Medications: missing=' . count($missing) . ', extra=' . count($extra));
        if ($missing) $this->warn('  Missing: ' . implode(', ', $missing));
        if ($extra) $this->warn('  Extra: ' . implode(', ', $extra));

        foreach ($existing as $med) {
            if (!isset($index[$med->name])) continue;
            $expected = $index[$med->name]['active_ingredients'];
            $expectedMap = [];
            foreach ($expected as $e) { $expectedMap[$e['name']] = $e['strength']; }
            $actualMap = [];
            foreach ($med->activeIngredients as $ai) { $actualMap[$ai->name] = $ai->pivot->strength; }
            if ($expectedMap != $actualMap) {
                $this->warn("  Pivot mismatch for {$med->name}");
                if ($this->option('fix')) {
                    $attach = [];
                    foreach ($expected as $e) {
                        $ingredient = ActiveIngredient::firstWhere('name', $e['name']);
                        if ($ingredient) { $attach[$ingredient->id] = ['strength' => $e['strength']]; }
                    }
                    if ($attach) {
                        $med->activeIngredients()->sync($attach);
                        $this->info("    Fixed pivot for {$med->name}");
                    }
                }
            }
        }
    }
}
