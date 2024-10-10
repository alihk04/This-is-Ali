const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test endpoint for at se, om serveren kører
app.get('/', (req, res) => {
    res.send('AI Backend is running!');
});

// Endpoint for at håndtere AI-chat
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    // Placeholder svar fra AI (kan udskiftes med ægte AI-logik senere)
    res.json({ reply: `Dette er et test svar på: ${userMessage}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
