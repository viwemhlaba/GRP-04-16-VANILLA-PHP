<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Medication\Medication;
use App\Models\Doctor;
use App\Observers\MedicationObserver;
use App\Observers\DoctorObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Medication::observe(MedicationObserver::class);
        Doctor::observe(DoctorObserver::class);
    }
}
