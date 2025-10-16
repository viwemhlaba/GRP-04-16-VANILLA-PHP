<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Medication\DosageForm;
use App\Support\DosageFormList;

class DosageFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $canonical = DosageFormList::all();

        // Delete any existing non-canonical entries
        DosageForm::whereNotIn('name', $canonical)->delete();

        foreach ($canonical as $form) {
            DosageForm::firstOrCreate(['name' => $form]);
        }

        $this->command->info('Canonical dosage forms synced successfully.');
    }
}
