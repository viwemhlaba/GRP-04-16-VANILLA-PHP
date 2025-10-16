<?php

namespace App\Observers;

use App\Models\Medication\Medication;
use App\Support\MedicationList;

class MedicationObserver
{
    private array $canonicalIndex;

    public function __construct()
    {
        $this->canonicalIndex = [];
        foreach (MedicationList::all() as $m) {
            $this->canonicalIndex[$m['name']] = $m;
        }
    }

    public function creating(Medication $med): bool
    {
        // Block creation of non-canonical medication names
        if (!isset($this->canonicalIndex[$med->name])) {
            return false; // silently abort; could throw if preferred
        }
        return true;
    }

    public function updating(Medication $med): bool
    {
        // Prevent renaming into a non-canonical name
        if (!isset($this->canonicalIndex[$med->name])) {
            return false;
        }
        return true;
    }
}
