<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CustomerSeeder;
use Database\Seeders\Customer\PrescriptionSeeder;
use Database\Seeders\DoctorSeeder;
use Database\Seeders\MedicationSeeder;
use Database\Seeders\PrescriptionItemSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\MedicationSupplierSeeder;
use Database\Seeders\StockOrderSeeder;
use Database\Seeders\CustomerRepeatDemoSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\PharmacySeeder;
use Database\Seeders\ActiveIngredientSeeder;
use Database\Seeders\ActiveIngredientMedicationSeeder;
use Database\Seeders\AllergySeeder;
use Database\Seeders\AllergyCustomerSeeder;
use Database\Seeders\DosageFormSeeder;
use Database\Seeders\PharmacistSeeder;
use Database\Seeders\CustomerOrderSeeder;
use Database\Seeders\DispensedItemSeeder;
use Database\Seeders\RepeatRequestTestSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌱 Starting database seeding...');

        $this->call([
            // Core system setup
            RoleSeeder::class,
            PharmacyManagerSeeder::class,
            UserSeeder::class,
            
            // Basic data
            DosageFormSeeder::class,
            ActiveIngredientSeeder::class,
            AllergySeeder::class,
            MedicationSupplierSeeder::class,
            
            // Pharmacy setup
            PharmacySeeder::class,
            DoctorSeeder::class,
            PharmacistSeeder::class,
            
            // Medications and relationships
            MedicationSeeder::class,
            ActiveIngredientMedicationSeeder::class,
            
            // Customers and relationships
            CustomerSeeder::class,
            AllergyCustomerSeeder::class,
            
            // Prescriptions and orders
            PrescriptionSeeder::class,
            PrescriptionItemSeeder::class,
            CustomerOrderSeeder::class,
            
            // Stock management
            StockOrderSeeder::class,
            CustomerRepeatDemoSeeder::class,
            // Test / demo data for pharmacist requested repeats queue
            RepeatRequestTestSeeder::class,
        ]);

        $this->command->info('✅ Database seeding completed successfully!');
    }
}
