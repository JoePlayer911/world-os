// src/diorama.js
import { dioramaData } from './data/dioramas.js';
import { islandsData } from './data/islands.js';
import { resetGlobeView } from './globe.js';

let isDioramaActive = false;
let isDioramaGameMode = false;
let isDioramaFocused = false;
let currentDioramaContext = null;

const getAssetUrl = (url) => {
  if (url && url.startsWith('/assets/')) {
    return import.meta.env.BASE_URL + url.substring(1);
  }
  return url;
};
import { playSound } from './audio.js';

export function initDioramaSystem() {
  const exitBtn = document.getElementById('diorama-exit-btn');
  const view = document.getElementById('diorama-view');
  
  if (exitBtn) {
    exitBtn.addEventListener('click', closeDiorama);
  }

  // Parallax mouse movement
  document.addEventListener('mousemove', (e) => {
    if (!isDioramaActive || isDioramaGameMode || isDioramaFocused) return;
    
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

    const layers = document.querySelectorAll('.diorama-layer');
    layers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
      const moveX = mouseX * speed * -100;
      const moveY = mouseY * speed * -50; 
      
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Touch tracking for smartboards
  document.addEventListener('touchmove', (e) => {
    if (!isDioramaActive || isDioramaGameMode || isDioramaFocused || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    
    const mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (touch.clientY / window.innerHeight) * 2 - 1;

    const layers = document.querySelectorAll('.diorama-layer');
    layers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
      const moveX = mouseX * speed * -100;
      const moveY = mouseY * speed * -50;
      
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Setup close button on annotation
  document.getElementById('anno-close').addEventListener('click', () => {
    document.getElementById('diorama-annotation').classList.add('hidden');
    isDioramaFocused = false;
    
    // Un-focus all layers
    document.querySelectorAll('.diorama-layer').forEach(l => {
      l.style.filter = '';
      if (l.dataset.focused === 'true') {
        l.style.top = l.dataset.originalTop;
        l.style.left = l.dataset.originalLeft;
        l.style.transform = l.dataset.originalTransform;
        l.style.zIndex = l.dataset.originalZIndex;
        l.style.scale = '1';
        
        setTimeout(() => {
          if (!isDioramaFocused) l.style.transition = 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        }, 500);
        
        delete l.dataset.focused;
      }
    });
  });
}

/**
 * Algorithmic layout engine.
 * Given N sprites, each gets viewWidth/N horizontal space.
 * Placed left-to-right, vertically centered.
 * 
 * Example with 4 sprites on a 1920x1080 screen:
 *   slotWidth = 1920/4 = 480
 *   sprite 0: centerX = 240,  centerY = 540
 *   sprite 1: centerX = 720,  centerY = 540
 *   sprite 2: centerX = 1200, centerY = 540
 *   sprite 3: centerX = 1680, centerY = 540
 */
function computeLayout(spriteCount) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const slotWidth = vw / spriteCount;
  const centerY = vh / 2;
  
  const positions = [];
  for (let i = 0; i < spriteCount; i++) {
    const centerX = slotWidth * i + slotWidth / 2;
    positions.push({
      centerX,
      centerY,
      slotWidth,
      // Each sprite is sized to fit within its slot with some padding
      maxWidth: slotWidth * 0.85,
      maxHeight: vh * 0.7,
      // Depth increases left→right for parallax (back sprites on left, front on right)
      depth: 0.2 + (i / spriteCount) * 0.6
    });
  }
  return positions;
}

export function openDiorama(islandId, isGameMode = false) {
  const data = dioramaData[islandId];
  const islandInfo = islandsData.find(i => i.id === islandId);
  const continent = islandInfo ? islandInfo.continent : 'asia';

  if (!data) {
    console.warn("No diorama data for:", islandId);
    return;
  }

  isDioramaActive = true;
  isDioramaGameMode = isGameMode;
  const view = document.getElementById('diorama-view');
  const container = document.getElementById('diorama-layers-container');
  const bgLayer = document.querySelector('.bg-layer');
  
  // Set UI
  document.getElementById('diorama-title').textContent = data.title;
  bgLayer.style.backgroundColor = data.bgColor;
  const bgUrl = getAssetUrl(`/assets/Places/Backgrounds/${continent}_bg.png`);
  bgLayer.style.backgroundImage = `url('${bgUrl}')`;
  bgLayer.style.backgroundSize = 'cover';
  bgLayer.style.backgroundPosition = 'center';
  document.getElementById('diorama-annotation').classList.add('hidden');

  // Build layers algorithmically
  container.innerHTML = '';
  const sprites = data.sprites;
  const layout = computeLayout(sprites.length);

  sprites.forEach((spriteData, i) => {
    const pos = layout[i];
    const url = `${data.basePath}/${spriteData.file}`;
    const resolvedUrl = getAssetUrl(url);
    
    const layerEl = document.createElement('div');
    layerEl.className = 'diorama-layer';
    layerEl.setAttribute('data-speed', pos.depth.toString());
    layerEl.style.zIndex = Math.floor(pos.depth * 100);
    
    // Size: fit within slot
    layerEl.style.width = `${pos.maxWidth}px`;
    layerEl.style.height = `${pos.maxHeight}px`;
    // Position: center on computed slot center
    layerEl.style.left = `${pos.centerX - pos.maxWidth / 2}px`;
    layerEl.style.top = `${pos.centerY - pos.maxHeight / 2}px`;
    
    if (isGameMode) {
      // Game Mode: placeholder drop zone
      layerEl.classList.add('nc-drop-target');
      layerEl.setAttribute('data-expected-url', url);
      layerEl.setAttribute('data-hint', `${data.title} — ${spriteData.title}`);
    } else {
      // Normal Mode: show the image
      layerEl.style.backgroundImage = `url(${resolvedUrl})`;
    }

    // Add hotspot
    if (!isGameMode) {
      const hsEl = document.createElement('div');
      hsEl.className = 'diorama-hotspot';
      hsEl.style.width = '60px';
      hsEl.style.height = '60px';
      hsEl.style.top = '50%';
      hsEl.style.left = '50%';
      hsEl.style.transform = 'translate(-50%, -50%)';
      
      hsEl.addEventListener('mouseenter', () => {
        if (!isDioramaFocused) {
          layerEl.style.transition = 'transform 0.3s ease, scale 0.3s ease';
          layerEl.style.scale = '1.05';
          hsEl.style.transform = 'translate(-50%, -50%) scale(1.2)';
        }
      });
      
      hsEl.addEventListener('mouseleave', () => {
        if (!isDioramaFocused) {
          layerEl.style.scale = '1';
          hsEl.style.transform = 'translate(-50%, -50%) scale(1)';
          setTimeout(() => {
            if (!isDioramaFocused) layerEl.style.transition = 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)';
          }, 300);
        }
      });
      
      hsEl.addEventListener('click', (e) => {
        e.stopPropagation();
        isDioramaFocused = true;
        
        // Blur other layers
        document.querySelectorAll('.diorama-layer').forEach(l => {
           if (l !== layerEl && !l.classList.contains('bg-layer')) {
               l.style.transition = 'filter 0.5s ease';
               l.style.filter = 'blur(6px) brightness(0.6)';
           }
        });
        
        if (!layerEl.dataset.focused) {
            layerEl.dataset.originalTop = layerEl.style.top;
            layerEl.dataset.originalLeft = layerEl.style.left;
            layerEl.dataset.originalTransform = layerEl.style.transform || 'translate(0px, 0px)';
            layerEl.dataset.originalZIndex = layerEl.style.zIndex;
        }
        
        layerEl.dataset.focused = 'true';
        layerEl.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        layerEl.style.zIndex = '9999';
        layerEl.style.top = '50%';
        layerEl.style.left = '30%';
        layerEl.style.transform = 'translate(-50%, -50%)';
        layerEl.style.scale = '1.3';
        
        showAnnotation(spriteData.title, spriteData.desc);
      });
      
      layerEl.appendChild(hsEl);
    }

    container.appendChild(layerEl);
  });

  // Hide main UI, Fade in Diorama
  document.getElementById('bottom-bar').classList.add('hidden');
  document.getElementById('sidebar-left').classList.add('hidden');
  document.getElementById('sidebar-right').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  
  view.style.opacity = '0';
  view.classList.remove('hidden');
  
  // Trigger reflow for transition
  void view.offsetWidth;
  view.style.opacity = '1';

  playSound('enter');
}

export function closeDiorama() {
  isDioramaActive = false;
  isDioramaGameMode = false;
  const view = document.getElementById('diorama-view');
  
  view.style.opacity = '0';
  
  // Wipe Nusantacraft UI to prevent bleeding into normal mode
  const ncui = document.getElementById('nc-ui');
  if (ncui) ncui.classList.add('hidden');
  
  playSound('exit');
  
  // Reset the globe view
  resetGlobeView();
  
  setTimeout(() => {
    view.classList.add('hidden');
    // Restore main UI
    document.getElementById('bottom-bar').classList.remove('hidden');
    document.getElementById('sidebar-left').classList.remove('hidden');
    document.getElementById('sidebar-right').classList.remove('hidden');
    document.getElementById('top-bar').classList.remove('hidden');
    
    document.getElementById('diorama-layers-container').innerHTML = '';
  }, 800); // Wait for fade out
}

function showAnnotation(title, desc) {
  const anno = document.getElementById('diorama-annotation');
  document.getElementById('anno-title').textContent = title;
  document.getElementById('anno-desc').textContent = desc;
  
  anno.classList.remove('hidden');
}
