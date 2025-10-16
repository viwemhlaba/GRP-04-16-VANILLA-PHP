Purpose
-------
This document explains how to install the Microsoft SQL Server PHP drivers (sqlsrv and pdo_sqlsrv) that are compatible with PHP 8.4 on Windows, and how to configure a local PHP 8.4 CLI so your artisan/CLI commands match the server environment.

Prerequisites
-------------
- PHP 8.4 NTS x64 binary (for CLI)c 
- Visual C++ Redistributable matching PHP build (Visual C++ 2022/x64)
- Microsoft ODBC Driver for SQL Server (msodbcsql18 recommended)
- PHP extension DLLs for sqlsrv and pdo_sqlsrv built for PHP 8.4 (from msphpsql releases)

Quick links
-----------
- msphpsql releases: https://github.com/microsoft/msphpsql/releases
- MS ODBC Driver downloads (Windows): https://learn.microsoft.com/sql/connect/odbc/download-odbc-driver-for-sql-server
- PHP for Windows downloads: https://windows.php.net/download/

Steps (concise)
---------------
1. Install PHP 8.4 CLI
   - Download the PHP 8.4 (x64) Non Thread Safe zip from windows.php.net and extract to C:\php8.4.
   - Copy php.ini-production to C:\php8.4\php.ini and edit extension_dir as needed.

2. Install prerequisites on Windows
   - Install the Visual C++ Redistributable for Visual Studio 2022 (x64).
   - Install Microsoft ODBC Driver 18 for SQL Server (msodbcsql18) using the official installer.

3. Download msphpsql Windows DLLs
   - Visit https://github.com/microsoft/msphpsql/releases and find the release that supports PHP 8.4 (the release assets list contains Windows DLLs).
   - Download the two DLLs that match: PHP 8.4, x64, NTS. Typical filenames:
     - php_pdo_sqlsrv.dll
     - php_sqlsrv.dll
   - Copy them to C:\php8.4\ext

4. Enable extensions
   - Edit C:\php8.4\php.ini and add:
     extension=php_pdo_sqlsrv.dll
     extension=php_sqlsrv.dll

5. Verify
   - Run:
     C:\php8.4\php.exe -v
     C:\php8.4\php.exe -m | Select-String -Pattern "pdo_sqlsrv|sqlsrv"
   - If there are no "Unable to initialize module" errors and the modules appear, you're good.

Using the helper script
-----------------------
- A helper script `run-artisan.ps1` lives in the repo root. It calls the PHP binary at `C:\php8.4\php.exe` by default. You can override by setting the `PHP84_PATH` environment variable.

Notes and troubleshooting
-------------------------
- Match these exactly: PHP version, architecture (x64), thread safety (NTS), and Visual C++ runtime. Mismatches cause "Module compiled with module API = ..." errors.
- If you see a missing dependency error, ensure msodbcsql and the VC runtime are installed and available in PATH.
- If you prefer not to store DLLs in git, store them on a shared drive (Z:) or in a release artifact and use a script to copy them into place.

If you want, I can:
- Find the exact msphpsql release asset filenames and direct download links for PHP 8.4 NTS x64.
- Add a small PowerShell script to download those DLLs from GitHub releases into a local folder.

