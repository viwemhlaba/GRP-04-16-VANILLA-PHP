<?php

namespace Database\Factories\Customer;

use App\Models\User;
use App\Models\Doctor;
use App\Models\Customer\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer\Prescription>
 */
class PrescriptionFactory extends Factory
{
    protected $model = Prescription::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $total = $this->faker->numberBetween(1, 6);
        $used = $this->faker->numberBetween(0, $total - 1); // ensure not exceeding total

        return [
            'user_id' => User::factory(),
            'doctor_id' => Doctor::inRandomOrder()->first()?->id,
            'name' => $this->faker->sentence(3),
            'file_path' => 'prescriptions/sample.pdf',
            'status' => fake()->randomElement(['pending', 'approved', 'rejected', 'dispensed']),
            'notes' => fake()->boolean(30) ? fake()->sentence() : null,
            'repeats_total' => $total,
            'repeats_used' => $used,
            'next_repeat_date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
        ];
    }
}
