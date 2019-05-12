<?php 
    require_once '../sqldbconnect.php';
    $data = json_decode(file_get_contents('php://input'), true);
    $to = 'divya.kaushik1010@gmail.com';
    $subject = $data['subject'];
    $email = $data['email'];
    $query = $data['query']; 
    $headers = "From: '$email'". "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $email, $headers);
?>