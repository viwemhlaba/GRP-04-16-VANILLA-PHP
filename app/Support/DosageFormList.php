<?php

namespace App\Support;

/**
 * Canonical list of allowed dosage forms. No other forms are permitted.
 */
class DosageFormList
{
    public const LIST = [
        'Tablet',
        'Capsule',
        'Suspension',
        'Syrup',
        'Lotion',
        'Spray',
        'Gel',
        'Suppository',
        'Injectable',
        'Drops',
        'IV Drip',
    ];

    public static function all(): array
    {
        return self::LIST;
    }
}
