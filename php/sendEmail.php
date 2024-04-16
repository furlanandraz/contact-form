<?php
$options = array(
    'domain' => '<YOUR_DOMAIN_NAME>',
    'address' => '<YOUR_EMAIL_ADDRESS>'
);
if ($_SERVER['SERVER_NAME'] == $options['domain']) {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $to = $options['address'];
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
