// src/game/nusantacraft.js
import { dioramaData } from '../data/dioramas.js';
import { openDiorama } from '../diorama.js';
import { playSound } from '../audio.js';
import { t } from '../i18n.js';

let currentGameIslandId = null;
let activeTargetEl = null;
let remainingItems = 0;

const getAssetUrl = (url) => {
  if (url && url.startsWith('/assets/')) {
    return import.meta.env.BASE_URL + url.substring(1);
  }
  return url;
};

export function startNusantacraft() {
  const islands = Object.keys(dioramaData);
  const randomIsland = islands[Math.floor(Math.random() * islands.length)];
  currentGameIslandId = randomIsland;
  
  // Close the panels
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();
  
  // Launch Diorama in Game Mode
  openDiorama(randomIsland, true); // true = gameMode
  
  // Reset state
  activeTargetEl = null;
  
  // Build the UI
  document.getElementById('nc-ui').classList.remove('hidden');
  document.getElementById('nc-victory-modal').classList.add('hidden');
  
  const container = document.getElementById('diorama-layers-container');
  container.removeEventListener('click', handleDioramaClick);
  container.addEventListener('click', handleDioramaClick);
  
  buildInventory(randomIsland);
}

function handleDioramaClick(e) {
  const target = e.target.closest('.nc-drop-target');
  if (!target) {
    if (activeTargetEl) {
      activeTargetEl.classList.remove('nc-target-selected');
      activeTargetEl = null;
      playSound('deselect');
    }
    return;
  }
  
  if (activeTargetEl === target) {
    target.classList.remove('nc-target-selected');
    activeTargetEl = null;
    playSound('deselect');
    return;
  }
  
  if (activeTargetEl) {
    activeTargetEl.classList.remove('nc-target-selected');
  }
  
  activeTargetEl = target;
  target.classList.add('nc-target-selected');
  playSound('select');
}

function buildInventory(correctIslandId) {
  const track = document.getElementById('nc-inventory-track');
  track.innerHTML = '';
  
  const correctData = dioramaData[correctIslandId];
  const correctSprites = correctData.sprites.map(s => ({
    url: `${correctData.basePath}/${s.file}`,
    title: s.title
  }));
  remainingItems = correctSprites.length;
  
  // Build pool of all sprites across all locations
  let allSprites = [];
  Object.values(dioramaData).forEach(loc => {
    loc.sprites.forEach(s => {
      allSprites.push({
        url: `${loc.basePath}/${s.file}`,
        title: s.title
      });
    });
  });
  
  // Gather items: correct ones + random distractors
  const inventoryItems = [...correctSprites];
  
  while (inventoryItems.length < 15 && allSprites.length > 0) {
    const randomDecoy = allSprites[Math.floor(Math.random() * allSprites.length)];
    if (!inventoryItems.find(i => i.url === randomDecoy.url)) {
      inventoryItems.push(randomDecoy);
    }
  }
  
  // Shuffle
  inventoryItems.sort(() => Math.random() - 0.5);
  
  inventoryItems.forEach(itemData => {
    const slot = document.createElement('div');
    slot.className = 'nc-slot';
    
    const sprite = document.createElement('div');
    sprite.className = 'nc-draggable-sprite';
    sprite.setAttribute('data-url', itemData.url);
    const resolvedUrl = getAssetUrl(itemData.url);
    sprite.style.backgroundImage = `url(${resolvedUrl})`;
    
    sprite.addEventListener('click', () => {
      handleTrayItemClick(sprite, itemData.url);
    });
    
    slot.appendChild(sprite);
    track.appendChild(slot);
  });
}

function handleTrayItemClick(spriteEl, itemUrl) {
  if (!activeTargetEl) {
    showToast(t('toast-empty-slot'));
    playSound('wrong');
    return;
  }
  
  const requiredUrl = activeTargetEl.getAttribute('data-expected-url');
  
  if (requiredUrl === itemUrl) {
    handleSuccess(spriteEl, activeTargetEl);
  } else {
    handleFail();
  }
}

function handleSuccess(spriteEl, dropZoneEl) {
  dropZoneEl.className = 'diorama-layer'; 
  dropZoneEl.style.animation = 'none';
  dropZoneEl.style.border = 'none';
  dropZoneEl.innerHTML = '';
  dropZoneEl.style.backgroundColor = 'transparent';
  
  const resolvedUrl = spriteEl.style.backgroundImage;
  dropZoneEl.style.backgroundImage = resolvedUrl;
  
  spriteEl.style.opacity = '0';
  spriteEl.style.pointerEvents = 'none';
  
  activeTargetEl = null;
  
  remainingItems--;
  if (remainingItems <= 0) {
    playSound('victory');
    showVictory();
  } else {
    playSound('matched');
  }
}

function handleFail() {
  playSound('wrong');
  showToast(t('toast-wrong-item'));
}

function showToast(msg) {
  const toast = document.getElementById('nc-feedback-toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

function showVictory() {
  document.getElementById('nc-victory-modal').classList.remove('hidden');
  document.getElementById('nc-inventory-wrapper').classList.add('hidden');
}

// Global binds
document.addEventListener('DOMContentLoaded', () => {
  const btnPlay = document.getElementById('nc-btn-playagain');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      playSound('click');
      document.getElementById('nc-inventory-wrapper').classList.remove('hidden');
      startNusantacraft();
    });
  }
  
  const btnOrbit = document.getElementById('nc-btn-orbit');
  if (btnOrbit) {
    btnOrbit.addEventListener('click', () => {
      playSound('click');
      document.getElementById('nc-ui').classList.add('hidden');
      document.getElementById('diorama-exit-btn').click();
    });
  }
});
