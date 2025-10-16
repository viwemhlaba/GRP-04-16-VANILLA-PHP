<?php

namespace App\Support;

/**
 * Canonical immutable list of Doctors used by seeders and integrity checks.
 * Field mapping (incoming canonical keys -> DB columns):
 *  - contact_number => phone
 *  - email_address => email
 *  - health_council_registration_number => practice_number
 */
class DoctorList
{
    /**
     * Return canonical doctors in desired order.
     * Each entry already uses the database column names for simplicity.
     */
    public static function all(): array
    {
        // Original provided keys remapped to: name, surname, phone, email, practice_number
        return [
            [
                'name' => 'Emily',
                'surname' => 'Johnson',
                'phone' => '123-456-7890',
                'email' => 'emily.johnson@example.com',
                'practice_number' => 'HPC-12345',
            ],
            [
                'name' => 'Michael',
                'surname' => 'Smith',
                'phone' => '987-654-3210',
                'email' => 'michael.smith@example.com',
                'practice_number' => 'HPC-67890',
            ],
            [
                'name' => 'Sophia',
                'surname' => 'Williams',
                'phone' => '555-123-4567',
                'email' => 'sophia.williams@example.com',
                'practice_number' => 'HPC-11223',
            ],
            [
                'name' => 'James',
                'surname' => 'Brown',
                'phone' => '444-555-6666',
                'email' => 'james.brown@example.com',
                'practice_number' => 'HPC-44556',
            ],
            [
                'name' => 'Olivia',
                'surname' => 'Davis',
                'phone' => '333-444-5555',
                'email' => 'olivia.davis@example.com',
                'practice_number' => 'HPC-77889',
            ],
            [
                'name' => 'Liam',
                'surname' => 'Miller',
                'phone' => '222-333-4444',
                'email' => 'liam.miller@example.com',
                'practice_number' => 'HPC-99100',
            ],
            [
                'name' => 'Ava',
                'surname' => 'Garcia',
                'phone' => '111-222-3333',
                'email' => 'ava.garcia@example.com',
                'practice_number' => 'HPC-22334',
            ],
            [
                'name' => 'Noah',
                'surname' => 'Martinez',
                'phone' => '999-888-7777',
                'email' => 'noah.martinez@example.com',
                'practice_number' => 'HPC-55667',
            ],
            [
                'name' => 'Isabella',
                'surname' => 'Hernandez',
                'phone' => '888-777-6666',
                'email' => 'isabella.hernandez@example.com',
                'practice_number' => 'HPC-88990',
            ],
            [
                'name' => 'Ethan',
                'surname' => 'Lopez',
                'phone' => '777-666-5555',
                'email' => 'ethan.lopez@example.com',
                'practice_number' => 'HPC-33445',
            ],
        ];
    }

    public static function practiceNumbers(): array
    {
        return array_column(static::all(), 'practice_number');
    }

    public static function emails(): array
    {
        return array_column(static::all(), 'email');
    }
}
