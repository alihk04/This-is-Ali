const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stringSimilarity = require('string-similarity'); // Importer string-similarity biblioteket
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Brug CORS til at tillade cross-origin anmodninger
app.use(cors());

// Inkluder data direkte i koden som et array af spørgsmål og svar
const personalData = [
    { Question: 'Hej, hvor bor du?', Answer: 'Jeg bor i Danmark.' },
    { Question: 'Hvad studerer du?', Answer: 'Jeg studerer IT og økonomi på DTU.' },
    { Question: 'Hvor langt er du i dine studier?', Answer: 'Jeg er i gang med 5. semester og har planer om at færdiggøre til og med 7. semester.' },
    { Question: 'Hvor arbejder du henne?', Answer: 'Jeg arbejder hos Drivn som UX designer og IT-admin, og jeg hjælper også med backend-opgaver.' },
    { Question: 'Hvor mange timer arbejder du normalt?', Answer: 'Jeg foretrækker at arbejde 10-15 timer om ugen, men jeg kan godt arbejde flere timer i ferier eller på fridage fra universitetet.' },
    { Question: 'Hvilke interesseområder har du inden for IT?', Answer: 'Jeg interesserer mig meget for IT-sikkerhed, softwareudvikling og UX design.' },
    { Question: 'Hvad går dit arbejde med Dash Detailerz ud på?', Answer: 'Jeg arbejder på en business case for Dash Detailerz, som fokuserer på B2B bilrengøringstjenester til en lufthavn.' },
    { Question: 'Hvilke sprog taler du?', Answer: 'Jeg taler både dansk og engelsk.' },
    { Question: 'Hvad laver du på din hjemmeside?', Answer: 'Jeg bruger min hjemmeside til at eksperimentere med forskellige former for UI og har også en front-end til mit AI-projekt.' },
    { Question: 'Hvilken type AI arbejder du på?', Answer: 'Jeg arbejder på at skabe en visuel AI, der kan bevæge sig og ligner mig selv.' },
    { Question: 'Hvilke færdigheder har du inden for softwareudvikling?', Answer: 'Jeg har erfaring med design, installation, test og vedligeholdelse af software samt kendskab til avancerede udviklingsværktøjer.' },
    { Question: 'Har du en bil?', Answer: 'Ja, jeg har en Kia Xceed.' }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test endpoint for at se, om serveren kører
app.get('/', (req, res) => {
    res.send('AI Backend is running!');
});

// Endpoint for at håndtere AI-chat
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message?.toLowerCase();
    console.log(`Modtaget besked fra bruger: ${userMessage}`);

    if (!userMessage) {
        return res.status(400).json({ reply: 'Der blev ikke modtaget nogen besked.' });
    }

    // Brug string-similarity til at finde det bedste matchende spørgsmål
    const questions = personalData.map(item => item.Question.toLowerCase());
    const bestMatch = stringSimilarity.findBestMatch(userMessage, questions);

    console.log(`Bedste match score: ${bestMatch.bestMatch.rating}, spørgsmål: ${questions[bestMatch.bestMatchIndex]}`);

    if (bestMatch.bestMatch.rating > 0.1) { // Brug en tærskel for at sikre god matching
        const matchedAnswer = personalData[bestMatch.bestMatchIndex].Answer;
        res.json({ reply: matchedAnswer });
    } else {
        res.json({ reply: "Jeg er ikke sikker på, hvordan jeg skal svare på det. Kan du stille spørgsmålet på en anden måde?" });
    }
});

// Start serveren
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
