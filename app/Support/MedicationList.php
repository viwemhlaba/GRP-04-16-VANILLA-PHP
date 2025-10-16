<?php

namespace App\Support;

/**
 * Canonical medication definitions with supplier, dosage form, stock info,
 * reorder levels, and active ingredient strengths.
 *
 * Notes / Assumptions:
 * - 'Tablets' mapped to 'Tablet' (plural normalization)
 * - 'Powder' is NOT in canonical DosageFormList; mapped to 'Suspension' by assumption.
 *   Adjust if you intend to add 'Powder' as its own dosage form.
 * - Null reorder_level / stock_on_hand values are coerced to 0 because current schema requires non-null ints.
 */
class MedicationList
{
    public const LIST = [
        [
            'name' => 'CardioVex',
            'schedule' => '6',
            'dosage_form' => 'Tablet',
            'supplier' => 'NovaCure',
            // High schedule cardiovascular medication – higher price point
            'current_sale_price' => 185.00,
            're_order_level' => 100,
            'stock_on_hand' => 90,
            'active_ingredients' => [
                ['name' => 'Aterolazine', 'strength' => '18mg'],
            ],
        ],
        [
            'name' => 'Neurocalm',
            'schedule' => '2',
            'dosage_form' => 'Tablet',
            'supplier' => 'HelixMed',
            'current_sale_price' => 95.00,
            're_order_level' => 110,
            'stock_on_hand' => 100,
            'active_ingredients' => [
                ['name' => 'Vaspril', 'strength' => '2mg'],
                ['name' => 'Zentropine', 'strength' => '50mg'],
            ],
        ],
        [
            'name' => 'Allerfree Duo',
            'schedule' => '0',
            'dosage_form' => 'Powder', // mapped to Suspension later
            'supplier' => 'VitaGenix',
            'current_sale_price' => 45.00,
            're_order_level' => 150,
            'stock_on_hand' => 100,
            'active_ingredients' => [
                ['name' => 'Histarelin', 'strength' => '325mg'],
                ['name' => 'Lorvexamine', 'strength' => '453.6g'],
            ],
        ],
        [
            'name' => 'GastroEase',
            'schedule' => '3',
            'dosage_form' => 'Tablets', // mapped to Tablet
            'supplier' => 'Apex Biomed',
            'current_sale_price' => 120.00,
            're_order_level' => 400,
            'stock_on_hand' => 470,
            'active_ingredients' => [
                ['name' => 'Pylorazine', 'strength' => '5mg'],
            ],
        ],
        [
            'name' => 'Respivent',
            'schedule' => '3',
            'dosage_form' => 'Tablet',
            'supplier' => 'CuraNova',
            'current_sale_price' => 135.00,
            're_order_level' => 300,
            'stock_on_hand' => 490,
            'active_ingredients' => [
                ['name' => 'Bronchomid', 'strength' => '100mg'],
                ['name' => 'Alveclear', 'strength' => '25mg'],
            ],
        ],
        [
            'name' => 'Dermagard',
            'schedule' => '3',
            'dosage_form' => 'Tablet',
            'supplier' => 'HelixMed',
            'current_sale_price' => 150.00,
            're_order_level' => 600,
            'stock_on_hand' => 790,
            'active_ingredients' => [
                ['name' => 'Epidraxol', 'strength' => '1mg'],
                ['name' => 'Cortizane', 'strength' => '2mg'],
            ],
        ],
        [
            'name' => 'Metaborex',
            'schedule' => '4',
            'dosage_form' => 'Tablet',
            'supplier' => 'HelixMed',
            'current_sale_price' => 160.00,
            're_order_level' => null,
            'stock_on_hand' => null,
            'active_ingredients' => [
                ['name' => 'Glycetrol', 'strength' => '10mg'],
            ],
        ],
        [
            'name' => 'Sleeptraze',
            'schedule' => '2',
            'dosage_form' => 'Tablet',
            'supplier' => 'HelixMed',
            'current_sale_price' => 110.00,
            're_order_level' => 100,
            'stock_on_hand' => 110,
            'active_ingredients' => [
                ['name' => 'Somnexil', 'strength' => '45mg'],
            ],
        ],
        [
            'name' => 'OsteoFlex',
            'schedule' => '3',
            'dosage_form' => 'Suspension',
            'supplier' => 'HelixMed',
            'current_sale_price' => 140.00,
            're_order_level' => 200,
            'stock_on_hand' => 210,
            'active_ingredients' => [
                ['name' => 'Calcitrine', 'strength' => '200mg'],
                ['name' => 'Phospholax', 'strength' => '250mg'],
            ],
        ],
        [
            'name' => 'Immunexin',
            'schedule' => '6',
            'dosage_form' => 'Injectable',
            'supplier' => 'HelixMed',
            'current_sale_price' => 320.00,
            're_order_level' => 200,
            'stock_on_hand' => 190,
            'active_ingredients' => [
                ['name' => 'Virocelin', 'strength' => '20mg'],
                ['name' => 'Immubrine', 'strength' => '30mg'],
            ],
        ],
        [
            'name' => 'CardioPlus',
            'schedule' => '6',
            'dosage_form' => 'IV Drip',
            'supplier' => 'HelixMed',
            'current_sale_price' => 275.00,
            're_order_level' => 500,
            'stock_on_hand' => 600,
            'active_ingredients' => [
                ['name' => 'Calcitrine', 'strength' => '50mg'],
                ['name' => 'Aterolazine', 'strength' => '30mg'],
            ],
        ],
        [
            'name' => 'AllerCalm',
            'schedule' => '6',
            'dosage_form' => 'IV Drip',
            'supplier' => 'HelixMed',
            'current_sale_price' => 230.00,
            're_order_level' => 400,
            'stock_on_hand' => 410,
            'active_ingredients' => [
                ['name' => 'Histarelin', 'strength' => '50mg'],
            ],
        ],
        [
            'name' => 'RespirAid',
            'schedule' => '6',
            'dosage_form' => 'Injectable',
            'supplier' => 'HelixMed',
            'current_sale_price' => 260.00,
            're_order_level' => 100,
            'stock_on_hand' => 100,
            'active_ingredients' => [
                ['name' => 'Bronchomid', 'strength' => '20mg'],
            ],
        ],
        [
            'name' => 'DermaClear',
            'schedule' => '6',
            'dosage_form' => 'Lotion',
            'supplier' => 'HelixMed',
            'current_sale_price' => 190.00,
            're_order_level' => 100,
            'stock_on_hand' => 200,
            'active_ingredients' => [
                ['name' => 'Epidraxol', 'strength' => '20mg'],
            ],
        ],
        [
            'name' => 'OsteoPrime',
            'schedule' => '6',
            'dosage_form' => 'Capsule',
            'supplier' => 'HelixMed',
            'current_sale_price' => 210.00,
            're_order_level' => 100,
            'stock_on_hand' => 400,
            'active_ingredients' => [
                ['name' => 'Calcitrine', 'strength' => '20mg'],
            ],
        ],
    ];

    public static function all(): array
    {
        return self::LIST;
    }
}
