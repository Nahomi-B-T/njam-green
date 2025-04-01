<?php
require 'session-check.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Panel - NJAM Green</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="header-top">
    <h1 class="brand">NJAM GREEN</h1>
    <p class="tagline">eco 4 You</p>
  </header>

  <nav class="navbar">
    <ul>
      <li><a href="index.html">Inicio</a></li>
      <li><a href="acerca.html">Acerca de</a></li>
      <li><a href="logout.php">Salir</a></li>
    </ul>
  </nav>

  <main class="intro fade-in">
    <h2>🎉 Bienvenido/a, <?php echo $_SESSION['usuario']; ?>!</h2>
    <p>Explora la información del proyecto y su estructura de negocio.</p>

    <h3>📌 Modelo de Negocio - BMC</h3>
    <img src="BMC.jpg" alt="Business Model Canvas NJAM Green" style="max-width:90%; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">

    <h3>⚙ Sistema ERP</h3>
    <p>El ERP que utilizamos para administrar los módulos clave del negocio es [nombre].</p>
    <a href="#" class="boton">Ver ERP</a>

    <h3>📫 ¿Dudas?</h3>
    <p>Envía un mensaje desde la página principal o visita la sección de contacto.</p>
  </main>
  <script>
// Tiempo de inactividad en milisegundos (5 minutos = 300000 ms)
const tiempoLimite = 60000;

let temporizador;

function reiniciarTemporizador() {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    alert("⏳ Tu sesión ha expirado por inactividad.");
    window.location.href = "logout.php";
  }, tiempoLimite);
}

// Detectar actividad
document.addEventListener("mousemove", reiniciarTemporizador);
document.addEventListener("keypress", reiniciarTemporizador);
document.addEventListener("click", reiniciarTemporizador);

// Inicia el contador al cargar la página
reiniciarTemporizador();
</script>
</body>
</html>
