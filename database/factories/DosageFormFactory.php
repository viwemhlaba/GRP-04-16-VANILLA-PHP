<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Medication\DosageForm;
use App\Support\DosageFormList;

class DosageFormFactory extends Factory
{
    protected $model = DosageForm::class;

    public function definition(): array
    {
        static $i = 0;
        $list = DosageFormList::all();
        $name = $list[$i] ?? end($list);
        $i++;
        return [
            'name' => $name,
        ];
    }
}
