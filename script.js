document.addEventListener('DOMContentLoaded', () => {
  const portItems = document.querySelectorAll('.port-item');
  const sections = document.querySelectorAll('.panel-section');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // On first load: port LEDs light in sequence once (400ms total, ease-out)
  if (!prefersReducedMotion && portItems.length > 0) {
    const stepDuration = 400 / portItems.length;
    portItems.forEach((port, index) => {
      setTimeout(() => {
        port.classList.add('flash-sequence');
        setTimeout(() => {
          port.classList.remove('flash-sequence');
        }, 400);
      }, index * stepDuration);
    });
  }

  // Driven by one IntersectionObserver: active section lights the port LED
  if (sections.length > 0 && portItems.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          portItems.forEach((port) => {
            const matches = port.getAttribute('data-port') === currentId;
            if (matches) {
              port.classList.add('is-active');
              port.setAttribute('aria-current', 'true');
            } else {
              port.classList.remove('is-active');
              port.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }
});