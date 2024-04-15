<?php
if ($_SERVER['SERVER_NAME'] == '<YOUR_DOMAIN_NAME>') {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $to = "info.furlanandraz@gmail.com";
    $subject = $_POST["subject"];
    $headers = "From: " . $name . " <" . $email . "> \r\n";
    $send_email = mail($to, $subject, $message, $headers);
    if ($send_email) {
        http_response_code(200);
        exit();
    } else {
        http_response_code(400);
        exit();
    }
} else {
    exit();
}
