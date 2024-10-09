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
