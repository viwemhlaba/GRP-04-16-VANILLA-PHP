<?php

namespace App\Support;

/**
 * Canonical supplier list. Only these suppliers are allowed.
 */
class SupplierList
{
    public const LIST = [
        [
            'name' => 'NovaCure',
            'contact_name' => 'Davie',
            'contact_surname' => 'Jones',
            'email' => 'davie@example.com',
        ],
        [
            'name' => 'HelixMed',
            'contact_name' => 'Nicky',
            'contact_surname' => 'Mostert',
            'email' => 'nmostert@mandela.ac.za',
        ],
        [
            'name' => 'VitaGenix',
            'contact_name' => 'Matimu',
            'contact_surname' => 'Vuqa',
            'email' => 'matimu@example.com',
        ],
        [
            'name' => 'Apex Biomed',
            'contact_name' => 'Lulu',
            'contact_surname' => 'Ndhambi',
            'email' => 'lulu@example.com',
        ],
        [
            'name' => 'CuraNova',
            'contact_name' => 'Siliziwe',
            'contact_surname' => 'Yangaphi',
            'email' => 's217956289@mandela.ac.za',
        ],
    ];

    public static function all(): array
    {
        return self::LIST;
    }
}
