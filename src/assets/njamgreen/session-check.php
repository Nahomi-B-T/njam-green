<?php
session_start();

if (!isset($_SESSION['usuario'])) {
  header("Location: login.html");
  exit();
}

// --- Control de inactividad  ---
$inactividad = 20; // segundos
if (isset($_SESSION['timeout'])) {
    $tiempo_inactivo = time() - $_SESSION['timeout'];
    if ($tiempo_inactivo > $inactividad) {
        session_unset();
        session_destroy();
        header("Location: login.html?error=inactivo");
        exit();
    }
}
$_SESSION['timeout'] = time(); // Reinicia contador
?>