<?php

namespace App\Support;

/**
 * Canonical immutable list of Pharmacists.
 * Used by seeders and integrity/audit routines.
 *
 * Field mapping to models:
 *  - user: name, surname, email, role=pharmacist
 *  - pharmacist: id_number, cellphone_number, health_council_registration_number
 */
class PharmacistList
{
    /**
     * Return canonical pharmacists in deterministic order.
     * Keys: name, surname, email, id_number, cellphone_number, health_council_registration_number
     */
    public static function all(): array
    {
        // Current canonical list derived from previous non-deterministic seeder entries.
        // Update here if business supplies a different source of truth.
        return [
            [
                'name' => 'Dr. Sarah',
                'surname' => 'Johnson',
                'email' => 'sarah.johnson@pharmacy.com',
                'id_number' => '8501015678901',
                'cellphone_number' => '+27821234567',
                'health_council_registration_number' => 'SAPC12345',
            ],
            [
                'name' => 'Dr. Michael',
                'surname' => 'Chen',
                'email' => 'michael.chen@pharmacy.com',
                'id_number' => '7809123456789',
                'cellphone_number' => '+27829876543',
                'health_council_registration_number' => 'SAPC67890',
            ],
            [
                'name' => 'Dr. Nomsa',
                'surname' => 'Mthembu',
                'email' => 'nomsa.mthembu@pharmacy.com',
                'id_number' => '9203087654321',
                'cellphone_number' => '+27835551234',
                'health_council_registration_number' => 'SAPC54321',
            ],
        ];
    }

    public static function emails(): array
    {
        return array_column(static::all(), 'email');
    }
}
