/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Blur Reveal Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    // --- 2. Minimal Particle Network ---
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');
    
    let w, h;
    let particles = [];
    
    // Config
    const particleCount = 60; // Low count for minimalism
    const connectionDist = 150;
    const mouseDist = 200;

    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('resize', resize);

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5; // Very slow velocity
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;

            // Mouse Interaction (Gentle Repel/Attract mix)
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < mouseDist) {
                    // Subtle attraction to create "organic" feel
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDist - distance) / mouseDist;
                    
                    // Pull closer very gently
                    const directionMultiplier = 0.03; 
                    this.vx += forceDirectionX * force * directionMultiplier;
                    this.vy += forceDirectionY * force * directionMultiplier;
                }
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i];
            p1.update();
            p1.draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < connectionDist) {
                    ctx.beginPath();
                    // Opacity based on distance (fades out)
                    let opacity = 1 - (dist / connectionDist);
                    ctx.strokeStyle = `rgba(100, 255, 218, ${opacity * 0.15})`; // Cyan tint
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            // Draw Mouse Connections
            if (mouse.x != null) {
                let dx = p1.x - mouse.x;
                let dy = p1.y - mouse.y;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < mouseDist) {
                    ctx.beginPath();
                    let opacity = 1 - (dist / mouseDist);
                    ctx.strokeStyle = `rgba(10, 255, 240, ${opacity * 0.2})`; // Brighter Cyan for mouse
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Init
    resize();
    initParticles();
    animate();
});
