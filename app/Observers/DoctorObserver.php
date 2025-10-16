<?php

namespace App\Observers;

use App\Models\Doctor;
use App\Support\DoctorList;

class DoctorObserver
{
    protected array $allowedPracticeNumbers;

    public function __construct()
    {
        $this->allowedPracticeNumbers = DoctorList::practiceNumbers();
    }

    public function creating(Doctor $doctor): bool
    {
        return $this->isAllowed($doctor);
    }

    public function updating(Doctor $doctor): bool
    {
        return $this->isAllowed($doctor);
    }

    protected function isAllowed(Doctor $doctor): bool
    {
        return in_array($doctor->practice_number, $this->allowedPracticeNumbers, true);
    }
}
