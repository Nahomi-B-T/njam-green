<?php
require 'conexion.php';

try {
    $sql = "CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )";

    $conn->exec($sql);
    echo "<h3 style='color: green;'>✅ Base de datos y tabla 'usuarios' creadas correctamente.</h3>";
} catch (PDOException $e) {
    echo "<h3 style='color: red;'>❌ Error al crear la base de datos: " . $e->getMessage() . "</h3>";
}
?>
