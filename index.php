<?php
// index.php - main entry and simple router
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/db.php';

// Simple page resolution
$page = isset($_GET['page']) ? trim($_GET['page']) : 'home';
// Allow only alphanumeric, dash, underscore
if (!preg_match('/^[A-Za-z0-9_-]+$/', $page)) {
    http_response_code(400);
    echo '<h1>400 Invalid page parameter</h1>';
    exit;
}

$file = __DIR__ . '/pages/' . $page . '.php';
if (!file_exists($file)) {
    http_response_code(404);
    echo '<h1>404 Page not found</h1>';
    exit;
}

// Provide $db connection to pages if needed
$db = null;
try {
    $db = db();
} catch (Throwable $e) {
    // Already handled in db() but we keep a fallback
}

// Basic layout wrapper
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title><?php echo htmlspecialchars(APP_NAME ?? 'App'); ?> - <?php echo htmlspecialchars(ucfirst($page)); ?></title>
    <link rel="stylesheet" href="/css/app.css" />
    <script defer src="/js/app.js"></script>
</head>
<body>
<header>
    <h1><?php echo htmlspecialchars(APP_NAME ?? 'App'); ?></h1>
    <nav>
        <a href="?page=home">Home</a> | 
        <a href="?page=prescriptions">Prescriptions</a>
    </nav>
</header>
<main>
<?php include $file; ?>
</main>
<footer>
    <small>&copy; <?php echo date('Y'); ?> <?php echo htmlspecialchars(APP_NAME ?? 'App'); ?></small>
</footer>
</body>
</html>
