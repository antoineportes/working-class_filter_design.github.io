//  1. COLLAPSE ASIDE
function toggleSidebar()
{
  const sidebar = document.querySelector('aside');
  sidebar.classList.toggle('collapsed');
}

//  2. RESIZE ASIDE
const sidebar = document.querySelector('aside');
const resizer = document.querySelector('aside .handle');
const container = document.querySelector('wc-cosmic-wrap');

resizer.addEventListener('mousedown', (e) =>
{
  e.preventDefault();
  container.classList.add('is-resizing');

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});
function handleMouseMove(e)
{
  // Bind width
  let targetWidth = e.clientX;
  if (targetWidth >= 200 && targetWidth <= 600)
  {
    // dragging ? collapse = verboten : alles gut;
    sidebar.classList.remove('collapsed');
    document.documentElement.style.setProperty('--left-pan-width', `${targetWidth}px`);
  }
}
function handleMouseUp()
{
  container.classList.remove('is-resizing');
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

//  3. HIGHLIGHT ACTIVE SECTION
const navLinks = document.querySelectorAll('aside nav ul li a[data-target]');
const trackedElements = document.querySelectorAll('section[id]');
const observerOptions =
{
  root: null,
  rootMargin: '-10% 0px -70% 0px',
  threshold: 0
};
const observer = new IntersectionObserver
(
  (entries) =>
  {
    entries.forEach
    (
      entry =>
      {
        if (entry.isIntersecting)
        {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(
            link => link.classList.remove('active')
          );
          const activeLink = document.querySelector(`aside nav ul li a[data-target="${id}"]`);
          if (activeLink)
          {
            activeLink.classList.add('active');
          }
        }
      }
    );
  },
  observerOptions
);
trackedElements.forEach(element => observer.observe(element));

//  4. BODY > NAV (top)
function toggleDropdown(event)
{
  event.stopPropagation();
  const menu = document.querySelector('body > nav .dropdown menu');
  const btn = document.querySelector('body > nav .dropdown button');
  const isOpen = menu.classList.contains('show');
  if (isOpen)
  {
    menu.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
  }
  else
  {
    menu.classList.add('show');
    btn.setAttribute('aria-expanded', 'true');
  }
}
//  Close on click (anywhere)
window.addEventListener
(
  'click', () =>
  {
    const menu = document.querySelector('body > nav .dropdown menu');
    const btn = document.querySelector('body > nav .dropdown button');
    if (menu && menu.classList.contains('show'))
    {
      menu.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  }
);

//  5. RESIZE DIAGRAMS
window.addEventListener
(
  'load', () =>
  {
    // 1. Get the scale factor from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const scaleFactor = parseFloat(rootStyles.getPropertyValue('--diagram-scale')) || 1.5;
    const containers = document.querySelectorAll('.block-diagram');
    containers.forEach
    (
      container =>
      {
        const svg = container.querySelector('svg');
        // 2. Measure the current size (already scaled)
        const rect = svg.getBoundingClientRect();
        // 3. Calculate original dimensions
        const originalWidth = rect.width / scaleFactor;
        const originalHeight = rect.height / scaleFactor;
        // 4. Calculate adding
        const extraWidth = rect.width - originalWidth;
        const extraHeight = rect.height - originalHeight;
        // 5. Apply to container
        container.style.paddingRight = `${extraWidth}px`;
        container.style.paddingBottom = `calc(${extraHeight}px + var(--general-bot))`;
      }
    );
  }
);

//  6. POP-UPs
document.body.addEventListener
(
  'mouseover', (e) =>
  {
    const trigger = e.target.closest('wc-popup');
    if (!trigger) return;
    const popup = trigger.querySelector('.actual-popup');
    if (!popup) return;
    document.body.appendChild(popup);
    const rect = trigger.getBoundingClientRect();
    popup.style.left = `${rect.left + (rect.width * 0.5)}px`;
    popup.style.top = `${rect.top}px`;
    popup.offsetHeight;
    popup.classList.add('is-visible');
    trigger.addEventListener
    (
      'mouseleave', () =>
      {
        popup.classList.remove('is-visible');
        setTimeout
        (
          () =>
            {
              if (!popup.classList.contains('is-visible'))
              {
                trigger.appendChild(popup);
              }
            }, 200
          );
      },
      { once: true }
    );
  }
);