/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Reveal Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // --- 2. Minimal Particle Network ---
    const canvas = document.getElementById('canvas-bg');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        let particles = [];
        
        const particleCount = 60; 
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
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < mouseDist) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDist - distance) / mouseDist;
                        const directionMultiplier = 0.03; 
                        this.vx += forceDirectionX * force * directionMultiplier;
                        this.vy += forceDirectionY * force * directionMultiplier;
                    }
                }
            }

            draw() {
                // Warm off-white for particles
                ctx.fillStyle = 'rgba(139, 115, 85, 0.4)';
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

                for (let j = i; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p1.x - p2.x;
                    let dy = p1.y - p2.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < connectionDist) {
                        ctx.beginPath();
                        let opacity = 1 - (dist / connectionDist);
                        // Swapped to match the #8b7355 brown color palette
                        ctx.strokeStyle = `rgba(139, 115, 85, ${opacity * 0.15})`; 
                        ctx.lineWidth = 1;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                if (mouse.x != null) {
                    let dx = p1.x - mouse.x;
                    let dy = p1.y - mouse.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < mouseDist) {
                        ctx.beginPath();
                        let opacity = 1 - (dist / mouseDist);
                        // Darker brown connection for mouse interaction
                        ctx.strokeStyle = `rgba(107, 79, 42, ${opacity * 0.25})`; 
                        ctx.lineWidth = 1;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        resize();
        initParticles();
        animate();
    }

    // --- 3. GitHub API Fetch ---
    const username = 'Vinuga530';
    const container = document.getElementById('github-container');
    const loadingText = document.getElementById('loading-text');

    if(container) {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(repos => {
                if (loadingText) loadingText.remove();

                repos.forEach(repo => {
                    const li = document.createElement('li');
                    li.className = 'project-item reveal';
                    
                    const lang = repo.language || 'Documentation';
                    const desc = repo.description || 'No description provided.';

                    li.innerHTML = `
                        <div class="project-info">
                            <span class="status-name">${repo.name}</span>
                            <span class="project-desc">${desc}</span>
                        </div>
                        <div class="project-meta">
                            <span class="pill ok">${lang}</span>
                            <a href="${repo.html_url}" target="_blank" class="pill work">Source →</a>
                        </div>
                    `;
                    container.appendChild(li);
                    
                    // Observe new injected elements
                    observer.observe(li);
                });
            })
            .catch(error => {
                console.error('Error fetching repos:', error);
                if (loadingText) {
                    loadingText.innerHTML = `<span class="status-name"><span class="dot work" style="background:#ff3b30;"></span>Failed to load data.</span>`;
                }
            });
    }
});