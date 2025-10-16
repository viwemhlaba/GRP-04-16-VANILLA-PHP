<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer\Prescription;
use App\Models\Medication\Medication;
use App\Models\Customer\PrescriptionItem;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer\PrescriptionItem>
 */
class PrescriptionItemFactory extends Factory
{
    protected $model = PrescriptionItem::class;

    public function definition(): array
    {
        // When used standalone, create a prescription and mirror its repeats_total
        $prescription = Prescription::factory()->create();
        $med = Medication::inRandomOrder()->first();

        return [
            'prescription_id' => $prescription->id,
            'medication_id' => $med?->id,
            'quantity' => $this->faker->numberBetween(1, 3),
            'instructions' => $this->faker->sentence(),
            'repeats' => $prescription->repeats_total, // enforce same repeats
            'repeats_used' => $prescription->repeats_used, // sync starting point
            'price' => $this->faker->randomFloat(2, 20, 100),
        ];
    }
}
