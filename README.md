# VinugaK — Personal Portfolio

A personal portfolio site for a cybersecurity and networking student, styled after a network engineer's patch panel and cable labels.

Built with vanilla HTML, CSS, and JavaScript. No build step, no dependencies, no frameworks.

---

## Architecture & Design Direction

- **Visual Concept:** Network engineer's patch panel ports and cable labels.
- **Typography:** Bricolage Grotesque (headings & body), IBM Plex Mono (metadata, ports, labels).
- **Color System:** Surface, content, muted, accent, and signal tokens matching system `prefers-color-scheme` (light and dark).
- **Navigation:** Sequential patch panel port row with LED indicators driven by a single `IntersectionObserver`.
- **Accessibility:** 44px minimum target sizes, visible focus rings, semantic structure, responsive down to 320px width, full functionality without JavaScript.

---

## File Structure

```text
.
├── index.html        # Semantic document structure and content
├── styles.css        # Token palette, layout, and component styling
├── script.js         # Port LED sequence on load and active observer
├── favicon.ico       # Favicon
├── LICENSE           # License terms
└── README.md         # Repository documentation
```

---

## Deployment

This site contains only static files (`index.html`, `styles.css`, `script.js`, `favicon.ico`). It can be hosted on any static file server or hosting provider by serving the repository root.
