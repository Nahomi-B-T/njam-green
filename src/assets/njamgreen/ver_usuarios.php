<?php
require 'conexion.php';

$stmt = $conn->query("SELECT * FROM usuarios");
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Usuarios Registrados</title>
  <link rel="stylesheet" href="css/styles.css">
  <style>
    body {
      font-family: 'Urbanist', sans-serif;
      background-color: #f4fbf6;
      color: #234c2e;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }
    th {
      background-color: #1e6234;
      color: white;
    }
    h2 {
      text-align: center;
    }
  </style>
</head>
<body>
  <h2>👥 Usuarios Registrados</h2>
  <?php if (count($usuarios) > 0): ?>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($usuarios as $user): ?>
          <tr>
            <td><?= htmlspecialchars($user['id']) ?></td>
            <td><?= htmlspecialchars($user['nombre']) ?></td>
            <td><?= htmlspecialchars($user['correo']) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php else: ?>
    <p>No hay usuarios registrados todavía.</p>
  <?php endif; ?>
</body>
</html>
