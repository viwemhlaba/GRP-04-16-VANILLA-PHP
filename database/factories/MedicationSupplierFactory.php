<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicationSupplier>
 */
class MedicationSupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $first = $this->faker->firstName();
        $last = $this->faker->lastName();
        return [
            'name' => $this->faker->unique()->company(),
            'contact_name' => $first,
            'contact_surname' => $last,
            'email' => strtolower($first . '.' . $last . '@example.test'),
        ];
    }
}
