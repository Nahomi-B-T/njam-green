<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $password = trim($_POST['password']);

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($correo) || empty($password)) {
        echo "<script>alert('⚠️ Por favor completa todos los campos.'); window.history.back();</script>";
        exit();
    }

    // Hashear la contraseña
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Intentar insertar el usuario
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $correo, $passwordHash]);

        echo "<script>alert('✅ Usuario registrado correctamente.'); window.location.href='login.html';</script>";
        exit();
    } catch (PDOException $e) {
        // Código 23000 = restricción UNIQUE (correo ya existe)
        if ($e->getCode() == 23000) {
            echo "<script>alert('⚠️ El correo ya está registrado. Usa otro.'); window.history.back();</script>";
        } else {
            echo "<script>alert('❌ Error inesperado: " . $e->getMessage() . "'); window.history.back();</script>";
        }
        exit();
    }
}
?>