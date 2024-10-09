// Array med projektdetaljer: hver indeholder beskrivelse, programmer/sprog og billeder
const projectDetails = [
    {
        description: "Score Ball - The Ultimate Football App for True Fans. Score Ball is an innovative football app designed to enhance the experience for fans worldwide...",
        technologies: "Figma, Android Studio, Kotlin",
        images: [], // Ingen billeder for Score Ball projektet
        figmaLink: "https://www.figma.com/proto/CjgIlj0KM1F2GZHMG987Rr/Sports-app-ny-udgave?node-id=0-1&t=TNwDGu6Q8GAdsQ6W-1https://embed.figma.com/design/CjgIlj0KM1F2GZHMG987Rr/Sports-app-ny-udgave?node-id=0-1&embed-host=share" // Indsæt dit Figma prototype-link her
    },
    {
        description: "RoboRally focuses on robotics and AI implementation, building a platform for interactive games using machine learning.",
        technologies: "Python, TensorFlow, OpenCV",
        images: ["assets/images/RB1.jpg"]
    },
    {
        description: "Webshop project involves creating a modern, responsive e-commerce platform with full functionality for shopping and checkout.",
        technologies: "HTML, CSS, JavaScript, React, Node.js",
        images: ["assets/images/FR1.jpg", "assets/images/FR2.jpg", "assets/images/FR3.jpg"]
    },
    {
        description: "Project 4 was a collaborative effort to create a mobile application that brings efficiency and style to everyday tasks...",
        technologies: "React Native, Firebase",
        images: ["https://via.placeholder.com/150"]
    },
    {
        description: "Project 5 involved data analysis using machine learning techniques, aimed at providing accurate predictions and insights...",
        technologies: "Python, Scikit-Learn, Pandas",
        images: ["https://via.placeholder.com/150"]
    },
    {
        description: "Project 6 focused on cybersecurity enhancements, implementing secure authentication protocols and data encryption...",
        technologies: "Java, Spring Boot, MySQL",
        images: ["https://via.placeholder.com/150"]
    }
];

let currentIndex = 0;
let currentProjectIndex = 0; // Holder styr på det valgte projekt

// Funktion til at åbne modalen og vise projektdata
function openModal(projectIndex) {
    currentProjectIndex = projectIndex;
    currentIndex = 0;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-description').textContent = projectDetails[projectIndex].description;
    document.getElementById('modal-technologies').textContent = "Technologies: " + projectDetails[projectIndex].technologies;

    // Opdater modalindhold afhængig af Figma-link
    const figmaEmbed = document.getElementById('figma-embed');
    const modalImage = document.getElementById('modal-image');
    const imageControls = document.getElementById('image-controls');

    if (projectDetails[projectIndex].figmaLink) {
        // Hvis projektet har en Figma prototype, vis iframe og skjul billedet
        figmaEmbed.style.display = 'block';
        figmaEmbed.src = projectDetails[projectIndex].figmaLink;
        modalImage.style.display = 'none';
        imageControls.style.display = 'none';
    } else {
        // Hvis der ikke er en Figma prototype, vis billeder og navigationsknapper
        figmaEmbed.style.display = 'none';
        modalImage.style.display = 'block';
        updateImage(projectIndex);
        updateNavigationButtons(projectIndex);
    }
}

// Funktion til at opdatere billedet i modalen
function updateImage(projectIndex) {
    const imageArray = projectDetails[projectIndex].images;
    const imageElement = document.getElementById('modal-image');
    imageElement.src = imageArray[currentIndex];
}

// Funktion til at opdatere navigationsknapperne
function updateNavigationButtons(projectIndex) {
    const imageArray = projectDetails[projectIndex].images;
    const prevButton = document.querySelector('.image-navigation .prev');
    const nextButton = document.querySelector('.image-navigation .next');

    if (imageArray.length > 1) {
        prevButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
    } else {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
}

// Funktion til at vise det forrige billede
function prevImage() {
    const imageArray = projectDetails[currentProjectIndex].images;
    currentIndex = (currentIndex === 0) ? imageArray.length - 1 : currentIndex - 1;
    updateImage(currentProjectIndex);
}

// Funktion til at vise det næste billede
function nextImage() {
    const imageArray = projectDetails[currentProjectIndex].images;
    currentIndex = (currentIndex === imageArray.length - 1) ? 0 : currentIndex + 1;
    updateImage(currentProjectIndex);
}

// Funktion til at lukke modalen
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
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