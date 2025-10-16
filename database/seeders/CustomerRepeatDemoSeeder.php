<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Customer\Prescription;
use Illuminate\Support\Facades\Hash;

class CustomerRepeatDemoSeeder extends Seeder
{
    public function run(): void
    {
        // Find or create a demo customer
        $customer = User::firstOrCreate(
            ['email' => 'demo.customer@example.com'],
            [
                'name' => 'Demo',
                'surname' => 'Customer',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'password_changed_at' => now(),
            ]
        );

        // Create a prescription with repeats if none exist for this user
        if (!Prescription::where('user_id', $customer->id)->where('repeats_total', '>', 0)->exists()) {
            Prescription::create([
                'user_id' => $customer->id,
                'name' => 'Chronic Medication Pack',
                'file_path' => 'prescriptions/sample.pdf',
                'status' => 'approved',
                'delivery_method' => 'pickup',
                'repeats_total' => 3,
                'repeats_used' => 1,
                'next_repeat_date' => now()->subDays(2)->format('Y-m-d'), // overdue so button visible
            ]);
        }
    }
}
