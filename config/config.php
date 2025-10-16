<?php
/**
 * config/config.php
 * Reads the Laravel .env file and exposes values as PHP constants + a CONFIG array.
 * This is a lightweight replacement for Laravel's env() helper.
 */

$envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
$config = [];

if (!file_exists($envPath)) {
    error_log("[config] .env file not found at $envPath");
} else {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (str_starts_with(trim($line), '#')) {
            continue;
        }
        // Allow inline comments after values (split on first # only)
        $lineParts = explode('#', $line, 2);
        $line = trim($lineParts[0]);
        if ($line === '') continue;
        // Parse KEY=VALUE (allow quoted values)
        $equalsPos = strpos($line, '=');
        if ($equalsPos === false) continue;
        $key = trim(substr($line, 0, $equalsPos));
        $value = trim(substr($line, $equalsPos + 1));
        // Remove surrounding quotes
        if ((str_starts_with($value, '"') && str_ends_with($value, '"')) || (str_starts_with($value, "'") && str_ends_with($value, "'"))) {
            $value = substr($value, 1, -1);
        }
        // Variable expansion like ${APP_NAME}
        $value = preg_replace_callback('/\${([A-Z0-9_]+)}/', function ($matches) use (&$config) {
            $var = $matches[1];
            return $config[$var] ?? '';
        }, $value);
        $config[$key] = $value;
    }
}

// Define constants (ignore if already defined)
foreach ($config as $k => $v) {
    $constName = strtoupper($k);
    if (!defined($constName)) {
        define($constName, $v);
    }
}

// Expose global CONFIG for convenience
$GLOBALS['CONFIG'] = $config;

// Basic application defaults / fallbacks
if (!defined('APP_NAME')) define('APP_NAME', 'App');
if (!defined('APP_ENV')) define('APP_ENV', 'production');
if (!defined('APP_DEBUG')) define('APP_DEBUG', false);

// Helper: debug log when APP_DEBUG
function app_log(string $message): void {
    if (defined('APP_DEBUG') && (APP_DEBUG === true || APP_DEBUG === 'true' || APP_DEBUG === 1 || APP_DEBUG === '1')) {
        error_log('[APP_DEBUG] ' . $message);
    }
}

?>