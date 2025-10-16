<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Support\DoctorList;
use App\Models\Doctor;

class CanonicalDoctorTest extends TestCase
{
    use RefreshDatabase;

    public function test_canonical_doctors_seeded_exclusively(): void
    {
        $this->seed();

        $expected = DoctorList::practiceNumbers();
        $dbPracticeNumbers = Doctor::pluck('practice_number')->sort()->values()->all();

        $this->assertSame($expected, $dbPracticeNumbers, 'Database doctors must match canonical list exactly');
    }

    public function test_non_canonical_doctor_creation_blocked(): void
    {
        $this->seed();

        $response = null;
        try {
            $doctor = Doctor::create([
                'name' => 'Fake',
                'surname' => 'Doctor',
                'email' => 'fake.doctor@example.com',
                'phone' => '000-000-0000',
                'practice_number' => 'HPC-FAKE1',
            ]);
            $response = $doctor;
        } catch (\Throwable $e) {
            // ignore; creation should be blocked by observer returning false
        }

        $this->assertNull($response, 'Non-canonical doctor creation should be blocked');
        $this->assertDatabaseMissing('doctors', ['practice_number' => 'HPC-FAKE1']);
    }
}
