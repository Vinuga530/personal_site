/* github-fetch.js */

document.addEventListener('DOMContentLoaded', () => {
    const username = 'Vinuga530';
    const container = document.getElementById('github-container');
    const loadingText = document.getElementById('loading-text');

    // Fetch projects from GitHub API
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(repos => {
            // Remove loading text
            if (loadingText) loadingText.remove();

            repos.forEach(repo => {
                // Ignore empty or completely unused repos if desired, or just show all
                const card = document.createElement('div');
                card.className = 'card glass reveal'; // Adds glassmorphism[cite: 3] and reveal animation[cite: 2]

                // Format the output
                card.innerHTML = `
                    <div class="card-header">
                        <h4 class="m-0" style="color: var(--color-primary);">${repo.name}</h4>
                        <span class="badge text-xs" style="margin-top: 8px; display: inline-block;">
                            ${repo.language || 'Documentation/Mixed'}
                        </span>
                    </div>
                    <div class="card-body">
                        <p class="text-sm">${repo.description || 'No description provided.'}</p>
                    </div>
                    <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center;">
                        <a href="${repo.html_url}" target="_blank" class="text-sm" style="font-weight: 500;">View Source →</a>
                        <span class="text-xs text-tertiary">★ ${repo.stargazers_count}</span>
                    </div>
                `;

                container.appendChild(card);
            });

            // Re-trigger the Intersection Observer for the newly added dynamic elements[cite: 2]
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

            // Observe the newly added cards
            const newRevealElements = container.querySelectorAll('.reveal');
            newRevealElements.forEach(el => observer.observe(el));
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            if (loadingText) {
                loadingText.innerText = 'Failed to load projects. Please check GitHub directly.';
                loadingText.style.color = 'var(--color-accent-error)';
            }
        });
});