console.log('[Libby Full Width] content script loaded');

function applyFullWidth() {
  const pillar = document.querySelector('.book-pillar');
  if (!pillar) {
    console.log('[Libby Full Width] no .book-pillar found');
    return;
  }

  console.log('[Libby Full Width] found .book-pillar, applying scale');

  // Debug: flash a red border so we know it's working
  pillar.style.outline = '3px solid red';
  setTimeout(() => { pillar.style.outline = ''; }, 3000);

  const update = () => {
    const rect = pillar.getBoundingClientRect();
    const currentWidth = rect.width;
    if (currentWidth <= 0) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const scaleX = vw / currentWidth;
    const currentHeight = rect.height;
    const scaleY = currentHeight > 0 ? vh / currentHeight : scaleX;
    const scale = Math.min(scaleX, scaleY);

    console.log(`[Libby Full Width] vw=${vw}, pillarW=${currentWidth}, scale=${scale}`);

    if (scale > 1.01) {
      pillar.style.setProperty('transform', `scale(${scale})`, 'important');
      pillar.style.setProperty('transform-origin', 'center top', 'important');
    }
  };

  update();
  window.addEventListener('resize', update);
}

if (document.querySelector('.book-pillar')) {
  applyFullWidth();
} else {
  const observer = new MutationObserver(() => {
    if (document.querySelector('.book-pillar')) {
      observer.disconnect();
      applyFullWidth();
    }
  });
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
}
