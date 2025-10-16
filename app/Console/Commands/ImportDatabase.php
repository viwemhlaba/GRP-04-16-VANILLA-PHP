<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:import {file : Path to the SQL file to import} {--chunk=0 : (Future) Optional chunk size for very large files}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import SQL file to database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = $this->argument('file');

        if (! $file) {
            $this->error('You must specify a path to a .sql file');
            return Command::INVALID;
        }

        if (! file_exists($file)) {
            $this->error("File '{$file}' not found. Provide a relative or absolute path (e.g. database/backups/dump.sql)");
            return Command::FAILURE;
        }

        if (! is_readable($file)) {
            $this->error("File '{$file}' is not readable (permissions)");
            return Command::FAILURE;
        }

        if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) !== 'sql') {
            $this->warn("File does not have .sql extension, continuing anyway...");
        }

        $size = filesize($file);
        $this->info("Importing '{$file}' (" . number_format($size) . " bytes)...");
        
        $sql = file_get_contents($file);
        if ($sql === false) {
            $this->error('Failed to read file contents.');
            return Command::FAILURE;
        }
        
        // Remove comments and split by semicolon
        $statements = array_filter(
            array_map('trim', explode(';', $sql)),
            function($statement) {
                return !empty($statement) && 
                       !str_starts_with($statement, '--') && 
                       !str_starts_with($statement, '/*');
            }
        );

        $bar = $this->output->createProgressBar(count($statements));
        $bar->start();

        foreach ($statements as $statement) {
            if (trim($statement)) {
                try {
                    DB::unprepared($statement);
                } catch (\Exception $e) {
                    $this->error("\nError executing: " . substr($statement, 0, 100) . "...");
                    $this->error($e->getMessage());
                }
            }
            $bar->advance();
        }

        $bar->finish();
        $this->info("\nDatabase import completed!");
        
        return Command::SUCCESS;
    }
}
