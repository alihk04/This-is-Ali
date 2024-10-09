<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Få input fra formularen
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validerer, at felterne ikke er tomme
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Modtagerens email
        $to = "alihassan0202@outlook.dk"; // Skift dette til din email
        $subject = "Ny besked fra din Hjemmeside";
        $body = "Navn: $name\nEmail: $email\n\nBesked:\n$message";

        // Header for at sætte afsenderens e-mail
        $headers = "From: $email";

        // Forsøg at sende mailen
        if (mail($to, $subject, $body, $headers)) {
            echo "Besked sendt! Tak for din henvendelse.";
        } else {
            echo "Noget gik galt, prøv venligst igen senere.";
        }
    } else {
        echo "Alle felter skal udfyldes!";
    }
}
?>
