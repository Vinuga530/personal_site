/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Particle Network Animation (Minimal) ---
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.directionX = (Math.random() * 0.4) - 0.2; // Slow movement
            this.directionY = (Math.random() * 0.4) - 0.2;
            this.size = Math.random() * 2 + 1;
            this.color = '#64ffda';
        }

        update() {
            if (this.x > width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.3; // Very subtle dots
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (width * height) / 15000; // Density
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (width/7) * (height/7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(100, 255, 218,' + opacityValue * 0.15 + ')'; // Very faint lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Resize Event
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    });

    init();
    animate();


    // --- 2. Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(section => {
        observer.observe(section);
    });

    // --- 3. Mobile Menu Logic ---
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Basic mobile styling injection if active
            if (navLinks.classList.contains('active')) {
                Object.assign(navLinks.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '90px',
                    right: '0',
                    width: '100%',
                    background: '#112240',
                    padding: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                });
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
});
