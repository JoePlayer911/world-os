// src/game/spritehunter.js
import { dioramaData } from '../data/dioramas.js';
import { playSound } from '../audio.js';
import { t } from '../i18n.js';

let activeSprites = [];
let targetSprite = null;
let score = 0;
let gameInterval;
let isCooldown = false;
let spriteIdCounter = 0;

const getAssetUrl = (url) => {
  if (url && url.startsWith('/assets/')) {
    return import.meta.env.BASE_URL + url.substring(1);
  }
  return url;
};

export function startSpriteHunter() {
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();
  
  document.getElementById('bottom-bar').classList.add('hidden');
  document.getElementById('sidebar-left').classList.add('hidden');
  document.getElementById('sidebar-right').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  
  document.getElementById('sh-ui').classList.remove('hidden');
  document.getElementById('sh-victory-modal').classList.add('hidden');
  document.getElementById('diorama-view').classList.add('hidden');
  
  // Set random globe texture
  const globeOpts = [
    '//unpkg.com/three-globe/example/img/earth-night.jpg',
    '//unpkg.com/three-globe/example/img/earth-water.png',
    '//unpkg.com/three-globe/example/img/earth-dark.jpg'
  ];
  import('../globe.js').then(g => g.setGlobeTexture(globeOpts[Math.floor(Math.random()*globeOpts.length)]));
  
  score = 0;
  activeSprites = [];
  isCooldown = false;
  document.getElementById('sh-score').textContent = `SCORE: 0 / 10`;
  document.getElementById('sh-lanes-container').innerHTML = '';
  
  pickNewTarget();
  spawnSprites();
  
  gameInterval = setInterval(spawnSprites, 2500);
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

function pickNewTarget() {
  const pool = buildSpritePool();
  targetSprite = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('sh-target-word').textContent = targetSprite.title;
}

function spawnSprites() {
  if (isCooldown) return;
  
  const pool = buildSpritePool();
  const lanesCount = 5;
  const container = document.getElementById('sh-lanes-container');
  
  // Sometimes force the target to spawn
  let willSpawnTarget = Math.random() > 0.4;
  
  for (let i=0; i<2; i++) {
    const laneIndex = Math.floor(Math.random() * lanesCount);
    const spriteData = (willSpawnTarget && i===0) ? targetSprite : pool[Math.floor(Math.random() * pool.length)];
    
    const id = `sh-spr-${spriteIdCounter++}`;
    
    const el = document.createElement('div');
    el.className = 'sh-sprite';
    el.id = id;
    
    const resolvedUrl = getAssetUrl(spriteData.url);
    el.style.backgroundImage = `url(${resolvedUrl})`;
    el.style.top = `${laneIndex * 15 + 5}%`;
    
    // Randomize speed
    const duration = 5 + Math.random() * 5; 
    el.style.animationDuration = `${duration}s`;
    
    el.addEventListener('mousedown', () => handleSpriteHit(el, spriteData));
    el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleSpriteHit(el, spriteData);
    });
    
    container.appendChild(el);
    activeSprites.push({id, el, data: spriteData});
    
    // Cleanup when anim finishes
    setTimeout(() => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
      activeSprites = activeSprites.filter(s => s.id !== id);
    }, duration * 1000);
  }
}

function handleSpriteHit(el, data) {
  if (isCooldown) return;
  
  el.parentNode.removeChild(el);
  activeSprites = activeSprites.filter(s => s.id !== el.id);
  
  if (data.url === targetSprite.url) {
    // Hit target!
    playSound('matched');
    score++;
    document.getElementById('sh-score').textContent = `SCORE: ${score} / 10`;
    
    // Visual pop
    const targetText = document.getElementById('sh-target-word');
    targetText.style.color = '#00f0ff';
    targetText.style.transform = 'scale(1.2)';
    setTimeout(() => {
      targetText.style.color = '#fff';
      targetText.style.transform = 'scale(1)';
    }, 300);
    
    if (score >= 10) {
      playSound('victory');
      clearInterval(gameInterval);
      document.getElementById('sh-victory-modal').classList.remove('hidden');
    } else {
      pickNewTarget();
    }
  } else {
    // Wrong target
    playSound('wrong');
    isCooldown = true;
    const ui = document.getElementById('sh-ui');
    ui.classList.add('sh-cooldown-active');
    
    const toast = document.getElementById('sh-feedback-toast');
    toast.textContent = t('toast-cooldown');
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      isCooldown = false;
      ui.classList.remove('sh-cooldown-active');
      toast.classList.add('hidden');
    }, 2000);
  }
}

export function exitSpriteHunter() {
  clearInterval(gameInterval);
  document.getElementById('sh-lanes-container').innerHTML = '';
  document.getElementById('sh-ui').classList.add('hidden');
  
  // Restore main UI
  document.getElementById('bottom-bar').classList.remove('hidden');
  document.getElementById('sidebar-left').classList.remove('hidden');
  document.getElementById('sidebar-right').classList.remove('hidden');
  document.getElementById('top-bar').classList.remove('hidden');
  
  import('../globe.js').then(g => g.resetGlobeView());
}

document.addEventListener('DOMContentLoaded', () => {
  const btnPlay = document.getElementById('sh-btn-playagain');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      playSound('click');
      startSpriteHunter();
    });
  }
  
  const btnOrbit = document.getElementById('sh-btn-orbit');
  if (btnOrbit) {
    btnOrbit.addEventListener('click', () => {
      playSound('click');
      exitSpriteHunter();
    });
  }
});
