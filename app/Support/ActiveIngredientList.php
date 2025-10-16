<?php

namespace App\Support;

/**
 * Canonical list of allowed Active Ingredient names (order matters).
 * No other active ingredient names are permitted in the system.
 */
class ActiveIngredientList
{
    public const LIST = [
        'Pylorazine',
        'Vaspril',
        'Zentropine',
        'Histarelin',
        'Lorvexamine',
        'Aterolazine',
        'Bronchomid',
        'Alveclear',
        'Epidraxol',
        'Cortizane',
        'Glycetrol',
        'Somnexil',
        'Calcitrine',
        'Phospholax',
        'Virocelin',
        'Immubrine',
        'Trosamine',
        'Velocidine',
        'Nexorin',
        'Zyphralex',
        'Cardionol',
        'Alveretol',
        'Xylogran',
        'Fematrix',
        'Plastorin',
        'Seralox',
        'Quantrel',
        'Myvetrin',
        'Draxolene',
        'Veltraxin',
    ];

    public static function all(): array
    {
        return self::LIST;
    }
}
