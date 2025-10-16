<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Support\MedicationList;
use App\Models\Medication\Medication;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CanonicalMedicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_canonical_medications_seed_correctly(): void
    {
        $this->artisan('db:seed', ['--class' => 'ActiveIngredientSeeder']);
        $this->artisan('db:seed', ['--class' => 'DosageFormSeeder']);
        $this->artisan('db:seed', ['--class' => 'MedicationSupplierSeeder']);
        $this->artisan('db:seed', ['--class' => 'MedicationSeeder']);

        $canonical = MedicationList::all();
        $this->assertCount(count($canonical), Medication::all());

        foreach ($canonical as $m) {
            $this->assertDatabaseHas('medications', ['name' => $m['name']]);
        }
    }

    public function test_block_non_canonical_creation(): void
    {
        $this->artisan('db:seed', ['--class' => 'ActiveIngredientSeeder']);
        $this->artisan('db:seed', ['--class' => 'DosageFormSeeder']);
        $this->artisan('db:seed', ['--class' => 'MedicationSupplierSeeder']);
        $this->artisan('db:seed', ['--class' => 'MedicationSeeder']);

        $created = Medication::create([
            'name' => 'RandomMedX',
            'dosage_form_id' => 1,
            'schedule' => 1,
            'supplier_id' => 1,
            'reorder_level' => 1,
            'quantity_on_hand' => 1,
        ]);

        $this->assertNull($created->id, 'Non-canonical medication should not persist');
    }
}
