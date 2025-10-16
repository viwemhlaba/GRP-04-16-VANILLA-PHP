<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('medication_suppliers', function (Blueprint $table) {
            if (!Schema::hasColumn('medication_suppliers', 'contact_name')) {
                $table->string('contact_name')->nullable()->after('name');
            }
            if (!Schema::hasColumn('medication_suppliers', 'contact_surname')) {
                $table->string('contact_surname')->nullable()->after('contact_name');
            }
        });

        // Attempt to split existing contact_person into name/surname
        if (Schema::hasColumn('medication_suppliers', 'contact_person')) {
            DB::table('medication_suppliers')->select('id', 'contact_person')->orderBy('id')->chunk(100, function ($rows) {
                foreach ($rows as $row) {
                    if (!$row->contact_person) continue;
                    $parts = preg_split('/\s+/', trim($row->contact_person));
                    $first = array_shift($parts) ?: null;
                    $surname = $parts ? implode(' ', $parts) : null;
                    DB::table('medication_suppliers')->where('id', $row->id)->update([
                        'contact_name' => $first,
                        'contact_surname' => $surname,
                    ]);
                }
            });
        }

        // Drop obsolete column if present
        Schema::table('medication_suppliers', function (Blueprint $table) {
            if (Schema::hasColumn('medication_suppliers', 'contact_person')) {
                $table->dropColumn('contact_person');
            }
        });

        // Make new columns required (non-null) after migration if data exists
        Schema::table('medication_suppliers', function (Blueprint $table) {
            $table->string('contact_name')->nullable(false)->change();
            $table->string('contact_surname')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('medication_suppliers', function (Blueprint $table) {
            if (!Schema::hasColumn('medication_suppliers', 'contact_person')) {
                $table->string('contact_person')->nullable();
            }
        });

        // Reconstruct contact_person from name + surname
        DB::table('medication_suppliers')->select('id', 'contact_name', 'contact_surname')->orderBy('id')->chunk(100, function ($rows) {
            foreach ($rows as $row) {
                $full = trim(($row->contact_name ?? '') . ' ' . ($row->contact_surname ?? '')) ?: null;
                DB::table('medication_suppliers')->where('id', $row->id)->update(['contact_person' => $full]);
            }
        });

        Schema::table('medication_suppliers', function (Blueprint $table) {
            if (Schema::hasColumn('medication_suppliers', 'contact_name')) {
                $table->dropColumn('contact_name');
            }
            if (Schema::hasColumn('medication_suppliers', 'contact_surname')) {
                $table->dropColumn('contact_surname');
            }
        });
    }
};
