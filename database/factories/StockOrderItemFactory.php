<?php

namespace Database\Factories;

use App\Models\Medication\Medication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockOrderItem>
 */
class StockOrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Pick an existing canonical medication. The MedicationObserver blocks creation
        // of non-canonical names, so using Medication::factory() here caused failures and
        // NULL medication_id values. We instead select from the already-seeded canonical list.
        $medicationId = Medication::inRandomOrder()->value('id');

        // Fallback: if for some reason medications haven't been seeded yet, just grab first.
        if (!$medicationId) {
            $medicationId = Medication::query()->value('id');
        }

        return [
            // stock_order_id is intentionally omitted; when used via ->has(..., 'items') the
            // parent factory will set the foreign key automatically.
            'medication_id' => $medicationId,
            'quantity' => $this->faker->numberBetween(5, 50),
        ];
    }
}
