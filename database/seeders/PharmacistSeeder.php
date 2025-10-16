<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Pharmacist;
use App\Models\PharmacistProfile;
use App\Models\Pharmacy;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Support\PharmacistList;

class PharmacistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $canonical = PharmacistList::all();
        $emails = PharmacistList::emails();

        // Ensure pharmacist role exists
        $pharmacistRole = Role::firstOrCreate(['name' => User::ROLE_PHARMACIST]);

        // Ensure a pharmacy exists for profile assignment
        $pharmacy = Pharmacy::first();
        if (! $pharmacy) {
            $this->command?->warn('No pharmacy found. Creating a default pharmacy for pharmacist profiles.');
            $pharmacy = Pharmacy::create([
                'name' => 'Default Pharmacy',
                'health_council_registration_number' => 'HCP000000',
                'physical_address' => '123 Default Street, Default City, Default Province 00000',
                'contact_number' => '+27 11 000 0000',
                'email' => 'default@pharmacy.co.za',
                'website_url' => 'https://defaultpharmacy.co.za'
            ]);
        }

        // Remove stray pharmacist users outside canonical set
        $strayUsers = User::where('role', User::ROLE_PHARMACIST)
            ->whereNotIn('email', $emails)
            ->get();
        $removed = 0;
        foreach ($strayUsers as $stray) {
            $stray->delete();
            $removed++;
        }

        foreach ($canonical as $data) {
            $user = User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'surname' => $data['surname'],
                    'password' => Hash::make('password'), // rotate in prod
                    'role' => User::ROLE_PHARMACIST,
                    'email_verified_at' => now(),
                ]
            );

            if (! $user->hasRole($pharmacistRole->name)) {
                $user->assignRole($pharmacistRole);
            }

            Pharmacist::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'id_number' => $data['id_number'],
                    'cellphone_number' => $data['cellphone_number'],
                    'health_council_registration_number' => $data['health_council_registration_number'],
                ]
            );

            PharmacistProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'pharmacy_id' => $pharmacy->id,
                    'profile_completed' => true,
                    'updated_at' => now(),
                ]
            );

            $this->command?->info('✅ Pharmacist ensured: ' . $data['email']);
        }

        if ($removed) {
            $this->command?->warn("🧹 Removed {$removed} non-canonical pharmacist user(s)");
        }
    }
}
