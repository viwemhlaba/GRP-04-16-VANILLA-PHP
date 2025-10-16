<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\PharmacistSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CanonicalPharmacistTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function seeder_creates_only_canonical_pharmacists(): void
    {
        // Arrange: create a stray pharmacist user that should be removed
        $stray = User::factory()->create([
            'email' => 'stray.pharmacist@example.com',
            'role' => User::ROLE_PHARMACIST,
        ]);

        // Act: run seeder
        $this->seed(PharmacistSeeder::class);

        // Assert: stray removed
        $this->assertDatabaseMissing('users', ['email' => $stray->email]);

        // Assert: canonical pharmacists present
        $canonicalEmails = [
            'sarah.johnson@pharmacy.com',
            'michael.chen@pharmacy.com',
            'nomsa.mthembu@pharmacy.com',
        ];
        foreach ($canonicalEmails as $email) {
            $this->assertDatabaseHas('users', [
                'email' => $email,
                'role' => User::ROLE_PHARMACIST,
            ]);
        }
    }
}
