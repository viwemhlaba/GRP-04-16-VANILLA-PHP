<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pharmacy_manager', function (Blueprint $table) {
            // Add unique constraint to ensure each manager (user_id) can only manage one pharmacy
            $table->unique('user_id', 'unique_manager_pharmacy');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pharmacy_manager', function (Blueprint $table) {
            // Drop the unique constraint
            $table->dropUnique('unique_manager_pharmacy');
        });
    }
};
