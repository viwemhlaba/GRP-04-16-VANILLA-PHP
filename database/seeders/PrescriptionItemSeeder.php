<?php

namespace Database\Seeders;

use App\Models\Customer\Prescription;
use App\Models\Customer\PrescriptionItem;
use App\Models\Medication\Medication;
use Illuminate\Database\Seeder;

class PrescriptionItemSeeder extends Seeder
{
    public function run(): void
    {
        $prescriptions = Prescription::all();
        $medications = Medication::all();

        foreach ($prescriptions as $prescription) {
            // Choose 1-3 meds but enforce uniform item repeats = prescription repeats_total
            $meds = $medications->random(min($medications->count(), rand(1, 3)));

            foreach ($meds as $med) {
                PrescriptionItem::create([
                    'prescription_id' => $prescription->id,
                    'medication_id' => $med->id,
                    'quantity' => rand(1, 3),
                    'instructions' => 'Take as directed',
                    'repeats' => $prescription->repeats_total,
                    'repeats_used' => $prescription->repeats_used,
                    'price' => $med->current_sale_price ?? rand(50, 150),
                ]);
            }
        }
    }
}
