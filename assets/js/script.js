// Skjul loading skærm efter siden er fuldt indlæst
window.addEventListener('load', function() {
    var loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
});

// Tilstandsskifte (lys/mørk)
document.getElementById('mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    // Skift ikon
    var icon = this.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Formular submission logik
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Forhindre siden i at genindlæse
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Navn:', name);
    console.log('Email:', email);
    console.log('Besked:', message);
});

// Få den nuværende URL-path
const currentPath = window.location.pathname;

// Vælg alle navigationslinks
const navLinks = document.querySelectorAll('.nav-link');

// Loop igennem hvert link og tilføj 'active' klassen, hvis linkets href matcher den nuværende URL
navLinks.forEach(link => {
    if (link.href.includes(currentPath)) {
        link.classList.add('active');
    }
});
