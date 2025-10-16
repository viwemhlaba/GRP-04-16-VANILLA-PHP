<?php
/**
 * config/db.php
 * Provides a PDO connection to SQL Server via ODBC using settings loaded in config.php
 */
require_once __DIR__ . '/config.php';

class Database {
    private static ?PDO $instance = null;

    public static function connection(): PDO {
        if (self::$instance !== null) {
            return self::$instance;
        }

        $cfg = $GLOBALS['CONFIG'] ?? [];
        $driver = $cfg['DB_CONNECTION'] ?? 'sqlsrv';
        if ($driver !== 'sqlsrv') {
            throw new RuntimeException('Only sqlsrv driver supported in this vanilla port. Found: ' . $driver);
        }

        $host = $cfg['DB_HOST'] ?? 'DESKTOP-OHOMJF4';
        $port = $cfg['DB_PORT'] ?? '1433';
        $dbName = $cfg['DB_DATABASE'] ?? 'GRP-04-16';
        $user = $cfg['DB_USERNAME'] ?? '';
        $pass = $cfg['DB_PASSWORD'] ?? '';
        $encrypt = ($cfg['DB_ENCRYPT'] ?? 'no') === 'yes' ? 'Yes' : 'No';
        $trustCert = ($cfg['DB_TRUST_SERVER_CERTIFICATE'] ?? 'false') === 'true' ? 'Yes' : 'No';

    // Build basic PDO sqlsrv DSN (no explicit ODBC driver)
    // Format: sqlsrv:Server=host,port;Database=dbname;Encrypt=Yes|No;TrustServerCertificate=Yes|No
    $dsn = "sqlsrv:Server=$host,$port;Database=$dbName;Encrypt=$encrypt;TrustServerCertificate=$trustCert";

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            self::$instance = new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            // Provide a clear message and log details
            error_log('[DB] Connection failed: ' . $e->getMessage());
            $debug = $cfg['APP_DEBUG'] ?? false;
            if ($debug === true || $debug === 'true' || $debug === 1 || $debug === '1') {
                die('<h1>Database connection error</h1><pre>' . htmlspecialchars($e->getMessage()) . '</pre>');
            }
            die('<h1>Service temporarily unavailable</h1>');
        }

        return self::$instance;
    }
}

// Convenience helper
function db(): PDO {
    return Database::connection();
}

?>