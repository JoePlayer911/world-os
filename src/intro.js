// src/intro.js
import { dioramaData } from './data/dioramas.js';

export function initIntroSequence() {
  const introContainer = document.getElementById('cinematic-intro');
  const blackLayer = document.getElementById('intro-black-layer');
  const pressBtn = document.getElementById('press-to-soar');
  
  if (!introContainer || !pressBtn) return;
  
  let removed = false;

  // Preload graphics in the background so they are ready by the time the user reaches the diorama
  function preloadAssets() {
    Object.values(dioramaData).forEach(island => {
      if (island.layers) {
        island.layers.forEach(layer => {
          if (layer.url) {
            const img = new Image();
            img.src = layer.url.startsWith('/') 
              ? import.meta.env.BASE_URL + layer.url.substring(1) 
              : layer.url;
          }
        });
      }
    });
  }
  
  // Begin async preloading immediately
  setTimeout(preloadAssets, 500);

  // Show the "Click Anywhere" button after a short delay
  setTimeout(() => {
    pressBtn.classList.remove('hidden');
  }, 1500);

  function killIntro() {
    if (removed) return;
    removed = true;

    // Make parent transparent so the black layer fade actually reveals the app
    introContainer.style.backgroundColor = 'transparent';

    // Hide the globe animation
    const globeAnim = introContainer.querySelector('.intro-globe-anim');
    if (globeAnim) globeAnim.style.opacity = '0';

    if (blackLayer) {
      blackLayer.classList.add('fade-out');
      setTimeout(() => {
        introContainer.remove();
      }, 3200);
    } else {
      introContainer.remove();
    }
  }

  introContainer.addEventListener('click', () => {
    if (pressBtn.classList.contains('hidden')) return;
    killIntro();
  });
}
