<?php

namespace Database\Seeders;

use App\Models\MedicationSupplier;
use App\Support\SupplierList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicationSupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $canonical = SupplierList::all();

        // Remove any suppliers not in canonical list
        $names = array_column($canonical, 'name');
        MedicationSupplier::whereNotIn('name', $names)->delete();

        foreach ($canonical as $entry) {
            MedicationSupplier::updateOrCreate(
                ['name' => $entry['name']],
                [
                    'contact_name' => $entry['contact_name'],
                    'contact_surname' => $entry['contact_surname'],
                    'email' => $entry['email'],
                ]
            );
        }

        $this->command->info('Canonical medication suppliers synced successfully!');
    }
}
