<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure roles exist
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $pharmacistRole = Role::firstOrCreate(['name' => 'pharmacist']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        // Manager user(s) now handled exclusively by PharmacyManagerSeeder to enforce a single canonical manager.

        // Create pharmacist users
        $pharmacist = User::firstOrCreate(
            ['email' => 'pharmacist@example.com'],
            [
                'name' => 'Pharmacist',
                'surname' => 'User',
                'password' => Hash::make('password'),
                'role' => 'pharmacist',
                'email_verified_at' => now(),
            ]
        );
        $pharmacist->assignRole($pharmacistRole);

        // Create customer users
        $customer = User::firstOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Customer',
                'surname' => 'User',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'email_verified_at' => now(),
            ]
        );
        $customer->assignRole($customerRole);

        // Create a test customer with known credentials
        $testCustomer = User::firstOrCreate(
            ['email' => 'test.customer@example.com'],
            [
                'name' => 'Test',
                'surname' => 'Customer',
                'password' => Hash::make('password123'),
                'role' => 'customer',
                'email_verified_at' => now(),
            ]
        );
        $testCustomer->assignRole($customerRole);

        $this->command->info('✅ Core users created successfully!');
    $this->command->info('📧 Manager: (seeded via PharmacyManagerSeeder)');
        $this->command->info('📧 Pharmacist: pharmacist@example.com / password');
        $this->command->info('📧 Customer: customer@example.com / password');
        $this->command->info('📧 Test Customer: test.customer@example.com / password123');
    }
}
