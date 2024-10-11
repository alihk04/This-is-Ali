// ai.js

// Funktion til at sende en besked til serveren og vise svaret
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    try {
        // Tjek om brugeren har indtastet noget
        if (!userInput) {
            chatBox.innerHTML += `<p><strong>AI:</strong> Indtast venligst en besked.</p>`;
            return;
        }

        // Send POST-anmodning til serveren
        const response = await fetch('http://localhost:3000/api/chat', { // Sørg for at URL'en matcher din server's adresse
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        // Tjek om svaret fra serveren er OK
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        // Vis brugerens besked og AI'ens svar i chatten
        chatBox.innerHTML += `<p><strong>Du:</strong> ${userInput}</p>`;
        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;

        // Ryd input-feltet
        document.getElementById('user-input').value = '';
    } catch (error) {
        console.error('Fejl i kommunikationen med AI:', error);
        chatBox.innerHTML += `<p><strong>AI:</strong> Der opstod en fejl ved kommunikationen med AI'en. Fejlbesked: ${error.message}</p>`;
    }
}

// Test for at sikre, at filen indlæses korrekt
console.log("ai.js er indlæst korrekt!");
