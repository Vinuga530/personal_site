document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Setup ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const root = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    themeLabel.textContent = savedTheme.toUpperCase();

    // Variables to hold particle colors
    let pRgb = '139, 115, 85';
    let pInteract = '107, 79, 42';

    function updateCanvasColors() {
        // Read CSS variables on load/toggle to avoid querying DOM every frame
        const computed = getComputedStyle(root);
        pRgb = computed.getPropertyValue('--particle-rgb').trim() || '139, 115, 85';
        pInteract = computed.getPropertyValue('--particle-interact').trim() || '107, 79, 42';
    }

    themeToggle.addEventListener('click', () => {
        let currentTheme = root.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeLabel.textContent = newTheme.toUpperCase();
        
        updateCanvasColors(); // Sync canvas to new theme
    });

    updateCanvasColors(); // Initial sync

    // --- 2. Reveal Animation ---
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

 // --- 3. Nothing CMF Style Interactive Grid ---
    const canvas = document.getElementById('canvas-bg');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        let particles = [];
        
        // Grid Configuration
        const spacing = 45; // Distance between dots
        const baseSize = 1; // Default dot size
        const maxAddedSize = 2; // How much larger they get near mouse
        const interactionRadius = 150; // How far the mouse effect reaches
        
        const mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        // Reset mouse when it leaves the window
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', resize);

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            initParticles(); // Rebuild grid perfectly on resize
        }

        class GridDot {
            constructor(x, y) {
                this.baseX = x;
                this.baseY = y;
                this.x = x;
                this.y = y;
                this.size = baseSize;
                this.targetSize = baseSize;
                this.opacity = 0.15;
                this.targetOpacity = 0.15;
            }

            update() {
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.baseX;
                    let dy = mouse.y - this.baseY;
                    let dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < interactionRadius) {
                        // Calculate force based on proximity (closer = stronger)
                        const force = (interactionRadius - dist) / interactionRadius;
                        
                        this.targetSize = baseSize + (force * maxAddedSize);
                        this.targetOpacity = 0.15 + (force * 0.7); // Brightens up to 85% opacity
                        
                        // Subtle displacement (magnetic push)
                        const angle = Math.atan2(dy, dx);
                        const push = force * 6; // Max push distance in pixels
                        this.x = this.baseX - Math.cos(angle) * push;
                        this.y = this.baseY - Math.sin(angle) * push;
                    } else {
                        // Return to baseline if outside radius
                        this.targetSize = baseSize;
                        this.targetOpacity = 0.15;
                        this.x = this.baseX;
                        this.y = this.baseY;
                    }
                } else {
                    // Return to baseline if mouse is off-screen
                    this.targetSize = baseSize;
                    this.targetOpacity = 0.15;
                    this.x = this.baseX;
                    this.y = this.baseY;
                }

                // Smooth linear interpolation (lerp) for the transition
                this.size += (this.targetSize - this.size) * 0.15;
                this.opacity += (this.targetOpacity - this.opacity) * 0.15;
            }

            draw() {
                // Uses the CSS variable color established in Section 1
                ctx.fillStyle = `rgba(${pRgb}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const cols = Math.floor(w / spacing);
            const rows = Math.floor(h / spacing);
            
            // Calculate offsets to perfectly center the grid on screen
            const offsetX = (w - (cols * spacing)) / 2;
            const offsetY = (h - (rows * spacing)) / 2;

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    particles.push(new GridDot(offsetX + (i * spacing), offsetY + (j * spacing)));
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            requestAnimationFrame(animate);
        }

        resize();
        animate();
    }
    // --- 4. GitHub API Fetch ---
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
                    
                    observer.observe(li);
                });
            })
            .catch(error => {
                console.error('Error fetching repos:', error);
                if (loadingText) {
                    loadingText.innerHTML = `<span class="status-name" style="padding: 24px 0; display: block;"><span class="dot work" style="background:#ff3b30;"></span>Failed to load data.</span>`;
                }
            });
    }
});