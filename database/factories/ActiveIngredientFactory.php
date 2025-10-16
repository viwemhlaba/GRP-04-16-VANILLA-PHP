<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Medication\ActiveIngredient;
use App\Support\ActiveIngredientList;

class ActiveIngredientFactory extends Factory
{
    protected $model = ActiveIngredient::class;

    private static int $pointer = 0; // index into canonical list

    public function definition(): array
    {
        // Fetch the next ingredient in order; if we exhaust the list, keep returning the last one.
        $list = ActiveIngredientList::all();
        if (self::$pointer < count($list)) {
            $name = $list[self::$pointer];
            self::$pointer++;
        } else {
            $name = end($list) ?: 'ActiveIngredient';
        }

        return [
            'name' => $name,
        ];
    }
}
