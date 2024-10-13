document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.reply);
        } else {
            alert('Der opstod en fejl ved afsendelse af beskeden. Prøv venligst igen senere.');
        }
    } catch (error) {
        console.error('Fejl ved afsendelse af besked:', error);
        alert('Der opstod en fejl ved afsendelse af beskeden. Prøv venligst igen senere.');
    }
});
