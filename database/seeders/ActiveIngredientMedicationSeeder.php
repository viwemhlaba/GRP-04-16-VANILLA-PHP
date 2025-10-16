<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medication\Medication;
use App\Models\Medication\ActiveIngredient;

class ActiveIngredientMedicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disabled random attachment to preserve canonical medication -> ingredient mappings.
        if (app()->runningInConsole()) {
            $this->command?->info('ActiveIngredientMedicationSeeder skipped (canonical medication attachments enforced by MedicationSeeder).');
        }
    }
}
