async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        // Vis brugerens besked og AI'ens svar i chatten
        chatBox.innerHTML += `<p><strong>Du:</strong> ${userInput}</p>`;
        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;

        // Ryd input-feltet
        document.getElementById('user-input').value = '';
    } catch (error) {
        console.error('Fejl i kommunikationen med AI:', error);
        chatBox.innerHTML += `<p><strong>AI:</strong> Der opstod en fejl ved kommunikationen med AI'en.</p>`;
    }
}
