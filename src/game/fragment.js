// src/game/fragment.js
import { dioramaData } from '../data/dioramas.js';
import { playSound } from '../audio.js';
import { t } from '../i18n.js';

let puzzleGrid = [];
let targetSprite = null;
let placedPieces = 0;
const GRID_COLS = 3;
const GRID_ROWS = 3;
const PIECE_SIZE = 150; 

const getAssetUrl = (url) => {
  if (url && url.startsWith('/assets/')) {
    return import.meta.env.BASE_URL + url.substring(1);
  }
  return url;
};

export function startFragment() {
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();
  
  document.getElementById('bottom-bar').classList.add('hidden');
  document.getElementById('sidebar-left').classList.add('hidden');
  document.getElementById('sidebar-right').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  
  document.getElementById('fr-ui').classList.remove('hidden');
  document.getElementById('fr-victory-modal').classList.add('hidden');
  
  import('../globe.js').then(g => g.setGlobeTexture('//unpkg.com/three-globe/example/img/earth-topology.png'));
  
  pickTarget();
  buildBoard();
}

function buildSpritePool() {
  const pool = [];
  Object.values(dioramaData).forEach(loc => {
    loc.sprites.forEach(s => {
      pool.push({
        url: `${loc.basePath}/${s.file}`,
        title: s.title
      });
    });
  });
  return pool;
}

function pickTarget() {
  const pool = buildSpritePool();
  targetSprite = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('fr-status').textContent = `RECONSTRUCTING: ${targetSprite.title}`;
  placedPieces = 0;
}

function buildBoard() {
  const area = document.getElementById('fr-game-area');
  area.innerHTML = '';
  
  const areaWidth = area.clientWidth;
  const areaHeight = area.clientHeight;
  
  // Center grid
  const gridOffsetX = (areaWidth - (GRID_COLS * PIECE_SIZE)) / 2;
  const gridOffsetY = (areaHeight - (GRID_ROWS * PIECE_SIZE)) / 2;
  
  const resolvedUrl = getAssetUrl(targetSprite.url);
  
  // Create drop slots
  puzzleGrid = [];
  for (let r=0; r<GRID_ROWS; r++) {
    for (let c=0; c<GRID_COLS; c++) {
      const slot = document.createElement('div');
      slot.className = 'fr-slot';
      slot.style.width = `${PIECE_SIZE}px`;
      slot.style.height = `${PIECE_SIZE}px`;
      slot.style.left = `${gridOffsetX + c * PIECE_SIZE}px`;
      slot.style.top = `${gridOffsetY + r * PIECE_SIZE}px`;
      
      slot.dataset.r = r;
      slot.dataset.c = c;
      
      area.appendChild(slot);
      puzzleGrid.push({ r, c, x: gridOffsetX + c * PIECE_SIZE, y: gridOffsetY + r * PIECE_SIZE, filled: false });
      
      // Create draggables
      const piece = document.createElement('div');
      piece.className = 'fr-piece';
      piece.style.width = `${PIECE_SIZE}px`;
      piece.style.height = `${PIECE_SIZE}px`;
      piece.style.backgroundImage = `url(${resolvedUrl})`;
      
      // Image slicing using background-position
      // Assume the original image maps to the 3x3 grid
      piece.style.backgroundSize = `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`;
      piece.style.backgroundPosition = `${c * (100/(GRID_COLS-1))}% ${r * (100/(GRID_ROWS-1))}%`;
      
      // Random starting positions near edges
      piece.style.left = `${Math.random() * (areaWidth - PIECE_SIZE)}px`;
      piece.style.top = `${Math.random() * (areaHeight - PIECE_SIZE)}px`;
      
      // Drag Logic
      let isDragging = false;
      let startX, startY, initialLeft, initialTop;
      
      const onDown = (e) => {
        if (piece.classList.contains('snapped')) return;
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        initialLeft = parseFloat(piece.style.left);
        initialTop = parseFloat(piece.style.top);
        piece.style.zIndex = '100';
      };
      
      const onMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        piece.style.left = `${initialLeft + dx}px`;
        piece.style.top = `${initialTop + dy}px`;
      };
      
      const onUp = () => {
        if (!isDragging) return;
        isDragging = false;
        piece.style.zIndex = '10';
        
        // Check snap
        const pLeft = parseFloat(piece.style.left);
        const pTop = parseFloat(piece.style.top);
        
        const targetSlot = puzzleGrid.find(g => g.r === r && g.c === c);
        const dist = Math.sqrt(Math.pow(pLeft - targetSlot.x, 2) + Math.pow(pTop - targetSlot.y, 2));
        
        if (dist < 50) {
          // Snap!
          piece.style.left = `${targetSlot.x}px`;
          piece.style.top = `${targetSlot.y}px`;
          piece.classList.add('snapped');
          playSound('matched');
          placedPieces++;
          
          if (placedPieces >= GRID_ROWS * GRID_COLS) {
            playSound('victory');
            document.getElementById('fr-victory-modal').classList.remove('hidden');
          }
        }
      };
      
      piece.addEventListener('mousedown', onDown);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      
      piece.addEventListener('touchstart', onDown, {passive: false});
      document.addEventListener('touchmove', onMove, {passive: false});
      document.addEventListener('touchend', onUp);
      
      area.appendChild(piece);
    }
  }
}

export function exitFragment() {
  document.getElementById('fr-ui').classList.add('hidden');
  
  document.getElementById('bottom-bar').classList.remove('hidden');
  document.getElementById('sidebar-left').classList.remove('hidden');
  document.getElementById('sidebar-right').classList.remove('hidden');
  document.getElementById('top-bar').classList.remove('hidden');
  
  import('../globe.js').then(g => {
    g.setGlobeTexture('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    g.resetGlobeView();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btnPlay = document.getElementById('fr-btn-playagain');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      playSound('click');
      startFragment();
    });
  }
  
  const btnOrbit = document.getElementById('fr-btn-orbit');
  if (btnOrbit) {
    btnOrbit.addEventListener('click', () => {
      playSound('click');
      exitFragment();
    });
  }
});
