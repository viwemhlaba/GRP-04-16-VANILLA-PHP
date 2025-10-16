<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

/**
 * Ensures exactly one canonical pharmacy manager user exists.
 *
 * Canonical assumptions (adjust if business specifies different values):
 *  - Name: Siliziwe Yangaphi
 *  - Email: manager@eprescription.com
 *  - Password: password (DO NOT use in production; rotate via env / password reset)
 *
 * Strategy:
 *  - Ensure the 'manager' role exists.
 *  - Delete/merge any other manager users whose email != canonical.
 *  - Upsert the canonical manager user with stable credentials.
 */
class PharmacyManagerSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => User::ROLE_MANAGER]);

        $canonicalEmail = 'manager@eprescription.com';
        $canonicalName = 'Siliziwe';
        $canonicalSurname = 'Yangaphi';

        // Collect stray manager accounts (excluding canonical)
        $strayManagers = User::where('role', User::ROLE_MANAGER)
            ->where('email', '!=', $canonicalEmail)
            ->get();

        $deletedCount = 0;
        foreach ($strayManagers as $stray) {
            $stray->delete();
            $deletedCount++;
        }

        // Upsert canonical manager
        $manager = User::updateOrCreate(
            ['email' => $canonicalEmail],
            [
                'name' => $canonicalName,
                'surname' => $canonicalSurname,
                'role' => User::ROLE_MANAGER,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        if (! $manager->hasRole($role->name)) {
            $manager->assignRole($role);
        }

        $this->command?->info('👤 Canonical pharmacy manager ensured: ' . $canonicalEmail);
        if ($deletedCount) {
            $this->command?->warn("🧹 Removed {$deletedCount} stray manager user(s)");
        }
    }
}
