<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Support\DoctorList;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $canonical = DoctorList::all();

        // Delete any doctors whose practice_number is not in the canonical list
        $practiceNumbers = array_column($canonical, 'practice_number');
        Doctor::whereNotIn('practice_number', $practiceNumbers)->delete();

        // Upsert (idempotent) canonical doctors by unique keys (practice_number)
        foreach ($canonical as $order => $data) {
            Doctor::updateOrCreate(
                ['practice_number' => $data['practice_number']],
                [
                    'name' => $data['name'],
                    'surname' => $data['surname'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                ]
            );
        }
    }
}
