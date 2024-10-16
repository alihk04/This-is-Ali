// Hide the loading screen after the page loads
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
});

// Smooth scrolling to sections
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    circle.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor link behavior
        const targetSelector = this.getAttribute('data-target');
        if (targetSelector) {
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Target not found:', targetSelector);
            }
        } else {
            console.error('Data-target attribute is missing for this circle:', this);
        }
    });
});


// Open CV Download Popup
const downloadCvButton = document.getElementById('download-cv');
if (downloadCvButton) {
    downloadCvButton.addEventListener('click', function() {
        openCVPopup();
    });
}

function openCVPopup() {
    const popup = document.getElementById('cv-download-popup');
    if (popup) {
        popup.style.display = 'block';
    }
}

// Close CV Download Popup if selecting a CV link
const cvLinks = document.querySelectorAll('#cv-download-popup a');
cvLinks.forEach(link => {
    link.addEventListener('click', function() {
        const popup = document.getElementById('cv-download-popup');
        if (popup) {
            popup.style.display = 'none';
        }
    });
});

const entries = document.querySelectorAll('.timeline-entry');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
});

entries.forEach(entry => {
    observer.observe(entry);
});


// Canvas setup for the bouncing skill balls
const canvas = document.getElementById('skillsCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Dynamically adjust canvas size based on the window width
    canvas.width = window.innerWidth * 0.9;
    canvas.height = 400;

    // Skill data for bouncing balls
    const skills = ["MS Office", "React", "Java", "MySQL", "R-Studio", "UML", "Project Management",
        "Figma", "Android Studio", "SAP", "Planday", "Projektledelse", "Flexible", "UI Design", 
        "Cybersikkerhed", "Creative", "Problemsolver"];

    // Ball object creation
    function Ball(x, y, radius, skill) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.skill = skill;
        this.dx = Math.random() * 2 - 1; // Speed in x direction (both directions)
        this.dy = Math.random() * 2 - 1; // Speed in y direction (both directions)

        this.draw = function() {
            const gradient = ctx.createRadialGradient(this.x - this.radius / 3, this.y - this.radius / 3, this.radius / 10, this.x, this.y, this.radius);
            gradient.addColorStop(0, '#333');
            gradient.addColorStop(1, '#000');

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.closePath();

            ctx.font = '12px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.skill, this.x, this.y);
        };

        this.update = function() {
            // Bounce off the edges of the canvas
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        };
    }

    // Create the balls and store them in an array
    const ballsArray = [];
    for (let i = 0; i < skills.length; i++) {
        let radius = 50;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let ball = new Ball(x, y, radius, skills[i]);
        ballsArray.push(ball);
    }

    // Animation loop to keep the balls moving
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ballsArray.forEach(ball => ball.update());
        requestAnimationFrame(animate);
    }

    animate(); // Start the animation loop
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
