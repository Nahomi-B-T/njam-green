<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir archivos de PHPMailer
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Verificar que el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $mensaje = $_POST['mensaje'];

    $mail = new PHPMailer(true);

    try {
        // Configurar servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'melaniesofiapalomeque@gmail.com'; 
        $mail->Password = 'svadbkzzgthwgrpr';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Configurar remitente y destinatario
        $mail->setFrom($correo, $nombre);
        $mail->addAddress('DESTINO@correo.com', 'NJAM GREEN');

        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = '📬 Nuevo mensaje desde NJAM Green';
        $mail->Body = "
            <h2>Mensaje recibido desde el formulario de contacto</h2>
            <p><strong>Nombre:</strong> $nombre</p>
            <p><strong>Correo:</strong> $correo</p>
            <p><strong>Mensaje:</strong><br>$mensaje</p>
        ";

        $mail->send();
        echo "<script>alert('✅ Mensaje enviado con éxito'); window.location.href='index.html';</script>";
    } catch (Exception $e) {
        echo "<script>alert('❌ Error al enviar: {$mail->ErrorInfo}'); window.history.back();</script>";
    }
}
?>
