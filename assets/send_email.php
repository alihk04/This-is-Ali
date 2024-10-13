<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Hent data fra POST
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Definer modtageren og emnet for e-mailen
    $to = "alihassan0202@outlook.dk";  // Skift til din e-mailadresse
    $subject = "Ny besked fra din hjemmeside";
    $body = "Navn: $name\nEmail: $email\n\nBesked:\n$message";
    $headers = "From: $email";

    // Send e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Beskeden blev sendt. Tak for din besked!";
    } else {
        echo "Der opstod en fejl. Prøv venligst igen.";
    }
} else {
    echo "Kun POST-anmodninger er tilladt.";
}
?>
