<?php
session_start();
require 'conexion.php';

// Tiempo máximo de inactividad en segundos
$timeout = 300;

// Inicializar intentos si no existen
if (!isset($_SESSION['intentos'])) {
    $_SESSION['intentos'] = 0;
}

// Si hay 3 intentos fallidos, bloquear el acceso
if ($_SESSION['intentos'] >= 3) {
    echo "<script>alert('🚫 Demasiados intentos fallidos. Intenta más tarde.'); window.location.href='login.html';</script>";
    exit();
}

// Verificar reCAPTCHA
$secretKey = "6LezHwIrAAAAAHxjgW5TfffmMlCUckyFYo_Lh122"; // ← Tu clave secreta correcta
$captchaResponse = $_POST['g-recaptcha-response'] ?? '';

$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captchaResponse");
$captchaSuccess = json_decode($response, true);

if (!$captchaSuccess["success"]) {
    echo "<script>alert('❌ Verificación reCAPTCHA fallida.'); window.location.href='login.html';</script>";
    exit();
}

// Datos del formulario
$correo = trim($_POST['correo']);
$password = trim($_POST['password']);

try {
    $sql = "SELECT * FROM usuarios WHERE correo = :correo";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Login exitoso
        $_SESSION['usuario'] = $user['nombre'];
        $_SESSION['start_time'] = time();
        $_SESSION['intentos'] = 0;

        echo "<script>alert('✅ Bienvenido/a {$user['nombre']}'); window.location.href='dashboard.php';</script>";
        exit();
    } else {
        // Falló el login
        $_SESSION['intentos']++;
        echo "<script>alert('❌ Credenciales incorrectas'); window.location.href='login.html';</script>";
        exit();
    }

} catch (PDOException $e) {
    echo "<script>alert('⚠️ Error en la base de datos');</script>";
    exit();
}
?>