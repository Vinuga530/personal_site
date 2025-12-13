/* script.js */

const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Resize canvas to fill screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: 150 // Radius of interaction
}

// Track mouse position
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#1a1a1a'; // Very dark gray dots (subtle)
        ctx.fill();
    }

    // Update particle position & check mouse interaction
    update() {
        // Wall collision detection
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse Interaction (Collision)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        // If mouse is close, gently push particle away to clear text space?
        // Or pull it in? Let's do a gentle pull for "Network" feel.
        // But keep it subtle.
        
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw particle
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    // Calculate number of particles based on screen size (Density)
    let numberOfParticles = (canvas.height * canvas.width) / 12000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        
        // Speed
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        
        let color = '#333';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles with lines if they are close OR close to mouse
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        
        // 1. Connect particle to particle (if very close)
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                         + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                // Determine opacity based on distance
                opacityValue = 1 - (distance / 20000);
                if(opacityValue > 0) {
                    ctx.strokeStyle = 'rgba(30, 30, 30,' + opacityValue + ')'; // Dark static lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }

        // 2. Connect particle to MOUSE (The Interactive Part)
        let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x))
                          + ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));

        if (mouseDistance < 25000) { // Interaction radius
             ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)'; // CYAN accent when near mouse
             ctx.lineWidth = 1;
             ctx.beginPath();
             ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Handle Resize
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.height/80));
    init();
});

// Run
init();
animate();

// Remove mouse position when mouse leaves window
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});
