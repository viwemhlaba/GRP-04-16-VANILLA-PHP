<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medication\ActiveIngredient;
use App\Support\ActiveIngredientList;

class ActiveIngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allowed = ActiveIngredientList::all();

        // Remove any records not in canonical list
        ActiveIngredient::whereNotIn('name', $allowed)->delete();

        // Ensure each allowed name exists exactly once
        foreach ($allowed as $name) {
            ActiveIngredient::firstOrCreate(['name' => $name]);
        }
    }
}
