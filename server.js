require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER); // For at tjekke om miljøvariablerne indlæses korrekt
console.log('EMAIL_PASS:', process.env.EMAIL_PASS); // For at tjekke om adgangskoden indlæses korrekt

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Brug CORS til at tillade cross-origin anmodninger
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Test endpoint for at se, om serveren kører
app.get('/', (req, res) => {
    res.send('AI Backend is running!');
});

// Endpoint for kontaktformularen
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ reply: 'Alle felter skal udfyldes.' });
    }

    // Kontroller at miljøvariablerne er til stede
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Manglende e-mail legitimationsoplysninger');
        return res.status(500).json({ reply: 'Serverfejl: Manglende e-mail legitimationsoplysninger.' });
    }

    // Opret en transporter til at sende e-mails
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // Brug true til port 465, ellers false til port 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.verify((error, success) => {
        if (error) {
            console.error('Fejl ved verifikation af SMTP forbindelse:', error);
            return res.status(500).json({ reply: 'Serverfejl: Kunne ikke oprette forbindelse til e-mail serveren.' });
        } else {
            const mailOptions = {
                from: process.env.EMAIL_USER, // Senderens e-mailadresse
                to: process.env.EMAIL_USER, // Din e-mailadresse som skal modtage kontaktformularen
                subject: `Ny besked fra ${name}`,
                text: `Navn: ${name}
Email: ${email}

Besked:
${message}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Fejl ved afsendelse af e-mail:', error); // Dette vil give flere detaljer
                    return res.status(500).json({ reply: 'Der opstod en fejl ved afsendelse af beskeden. Prøv venligst igen senere.' });
                } else {
                    console.log('Email sendt: ' + info.response);
                    res.json({ reply: 'Tak for din besked! Jeg vender tilbage hurtigst muligt.' });
                }
            });
        }
    });
});

// Start serveren
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});