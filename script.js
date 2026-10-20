document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Management (Apple HIG Compliant) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const isDark = theme === 'dark';
        if (themeLabel) {
            themeLabel.textContent = isDark ? 'Dark' : 'Light';
        }
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light appearance' : 'Switch to dark appearance');
        }
        updateCanvasColors();
    }

    // Initialize state
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const active = root.getAttribute('data-theme');
            const target = active === 'dark' ? 'light' : 'dark';
            applyTheme(target);
        });
    }

    // Listen for OS appearance changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- 2. Canvas Theme Sync ---
    let pRgb = [41, 151, 255];
    let pInteract = [48, 209, 88];

    function updateCanvasColors() {
        const computed = getComputedStyle(root);
        const rgbStr = computed.getPropertyValue('--particle-rgb').trim() || '41, 151, 255';
        const interactStr = computed.getPropertyValue('--particle-interact').trim() || '48, 209, 88';
        pRgb = rgbStr.split(',').map(Number);
        pInteract = interactStr.split(',').map(Number);
    }
    updateCanvasColors();

    // --- 3. Intersection Observer for Scroll Reveals ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- 4. Active Navigation Spy ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href').replace('#', '');
                    if (href === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(sec => navObserver.observe(sec));

    // --- 5. Interactive Network Topology Canvas ---
    const canvas = document.getElementById('canvas-bg');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const nodes = [];
        const packets = [];
        const nodeCount = Math.min(Math.floor((width * height) / 28000), 55);
        const connectionDist = 130;
        const mouse = { x: null, y: null, radius: 160 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        });

        class NetworkNode {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.baseRadius = 1.8;
                this.radius = this.baseRadius;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce at boundaries
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse proximity effect
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 1.5;
                        this.y += (dy / dist) * force * 1.5;
                        this.radius = this.baseRadius + force * 2;
                    } else {
                        this.radius = this.baseRadius;
                    }
                } else {
                    this.radius = this.baseRadius;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, 0.5)`;
                ctx.fill();
            }
        }

        class TelemetryPacket {
            constructor(fromNode, toNode) {
                this.from = fromNode;
                this.to = toNode;
                this.progress = 0;
                this.speed = 0.015 + Math.random() * 0.02;
            }

            update() {
                this.progress += this.speed;
                return this.progress <= 1;
            }

            draw() {
                const x = this.from.x + (this.to.x - this.from.x) * this.progress;
                const y = this.from.y + (this.to.y - this.from.y) * this.progress;
                ctx.beginPath();
                ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${pInteract[0]}, ${pInteract[1]}, ${pInteract[2]}, 0.85)`;
                ctx.fill();
            }
        }

        function initNodes() {
            nodes.length = 0;
            for (let i = 0; i < nodeCount; i++) {
                nodes.push(new NetworkNode());
            }
        }
        initNodes();

        function renderNetwork() {
            ctx.clearRect(0, 0, width, height);

            // Draw connections between nodes
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update();
                nodes[i].draw();

                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Occasional packet spawn
                        if (Math.random() < 0.0007 && packets.length < 8) {
                            packets.push(new TelemetryPacket(nodes[i], nodes[j]));
                        }
                    }
                }
            }

            // Update & draw packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const active = packets[i].update();
                if (active) {
                    packets[i].draw();
                } else {
                    packets.splice(i, 1);
                }
            }

            requestAnimationFrame(renderNetwork);
        }

        requestAnimationFrame(renderNetwork);
    }

    // --- 6. Curated Fallback Projects & GitHub API Sync ---
    const username = 'Vinuga530';
    const container = document.getElementById('github-container');
    const loadingText = document.getElementById('loading-text');

    // High-craft fallback repositories so the page is never broken if rate-limited or offline
    const fallbackProjects = [
        {
            name: 'PacketTrace-Engine',
            description: 'Asynchronous network packet inspection and protocol header dissection engine built in Python & C.',
            language: 'Python',
            stars: 4,
            html_url: 'https://github.com/Vinuga530',
            status: 'Production'
        },
        {
            name: 'SysHardener-CLI',
            description: 'System security auditing and CIS benchmark compliance automation toolkit for Linux systems.',
            language: 'C#',
            stars: 3,
            html_url: 'https://github.com/Vinuga530',
            status: 'Active Lab'
        },
        {
            name: 'NetPort-Mapper',
            description: 'High-speed multi-threaded TCP/UDP port reconnaissance utility with service fingerprinting.',
            language: 'C++',
            stars: 5,
            html_url: 'https://github.com/Vinuga530',
            status: 'Stable'
        },
        {
            name: 'SecureAuth-Handshake',
            description: 'Cryptographic challenge-response authentication protocol implementing forward secrecy.',
            language: 'Python',
            stars: 2,
            html_url: 'https://github.com/Vinuga530',
            status: 'Research'
        },
        {
            name: 'Personal-Telemetry-Site',
            description: 'Apple HIG-grounded portfolio and interactive network telemetry station with Liquid Glass styling.',
            language: 'JavaScript',
            stars: 6,
            html_url: 'https://github.com/Vinuga530/personal_site',
            status: 'Live'
        },
        {
            name: 'Vulnerability-Lab-Notes',
            description: 'Comprehensive lab documentation detailing buffer overflow exploits, network pivoting, and defense mitigation.',
            language: 'Markdown',
            stars: 8,
            html_url: 'https://github.com/Vinuga530',
            status: 'Documentation'
        }
    ];

    function renderProjectCards(repos) {
        if (!container) return;
        if (loadingText) loadingText.remove();
        container.innerHTML = '';

        repos.forEach((repo, index) => {
            const li = document.createElement('li');
            li.className = 'project-item reveal active';
            li.style.transitionDelay = `${index * 60}ms`;

            const lang = repo.language || 'Tools';
            const desc = repo.description || 'Cybersecurity & network infrastructure repository.';
            const statusLabel = repo.status || (repo.stargazers_count > 0 ? `${repo.stargazers_count} ★` : 'Verified');

            li.innerHTML = `
                <div class="project-header">
                    <h3 class="project-title">${repo.name}</h3>
                    <span class="project-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </span>
                </div>
                <p class="project-desc">${desc}</p>
                <div class="project-footer">
                    <div class="project-pills">
                        <span class="pill pill-lang">${lang}</span>
                        <span class="pill pill-status">${statusLabel}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="View source code for ${repo.name} on GitHub (opens in new tab)">
                        <span>Source</span>
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            `;
            container.appendChild(li);
        });
    }

    if (container) {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    renderProjectCards(data);
                } else {
                    renderProjectCards(fallbackProjects);
                }
            })
            .catch(err => {
                console.info('GitHub API unreachable or rate-limited; rendering curated telemetry fallback projects.', err);
                renderProjectCards(fallbackProjects);
            });
    }
});