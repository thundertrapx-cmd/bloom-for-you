/* ============================================================
   BLOOM FOR YOU — Full Version JavaScript
   ============================================================ */

// ─────────────────────────────────────────────
// 0. CONFIGURABLE CONTENT — edit freely ✏️
// ─────────────────────────────────────────────
const CONFIG = {
  // Anniversary start date (YYYY, MM-1, DD) — adjust to your real date!
  anniversaryDate: new Date(2024, 5, 28), // June 28, 2024

  // Letter text (supports \n for new lines)
  letterText:
`Two years with you have been the greatest chapter of my life.

Sometimes we fight, but we always fix things and stick together.
Sometimes we're tired, but we still fulfill each other.

No matter what happens in our lives, we’ll stick together till the end. 
Just know that I’ll always choose you, every single time.

Happy 2nd Anniversary, my dear. ❤️`,
  letterSign: "— Forever yours 💕",

  // Gallery moments
  gallery: [
    { emoji: "🌅", label: "Our First Date", caption: "The day everything changed. I was nervous, you were perfect." },
    { emoji: "🎂", label: "1st Anniversary", caption: "365 days of choosing each other. Worth every single one." },
    { emoji: "🌊", label: "Beach Trip", caption: "Sand between our toes and nowhere else we'd rather be." },
    { emoji: "🍜", label: "Late Night Ramen", caption: "2AM and we were still talking like time had stopped." },
    { emoji: "⭐", label: "Stargazing Night", caption: "You pointed at a star and said 'that one's ours now'." },
    { emoji: "🎌", label: "Our Spot", caption: "Every time I pass by, I think of you." },
  ],

  // Garden flowers with messages
  gardenFlowers: [
    { emoji: "🌹", msg: "I love your smile — the real one, not the polite one. The one that reaches your eyes." },
    { emoji: "🌷", msg: "Thank you for staying by my side on the hard days, not just the beautiful ones." },
    { emoji: "🌼", msg: "You are my favorite person to do absolutely nothing with." },
    { emoji: "🌸", msg: "I'd choose you again and again in every version of my life." },
    { emoji: "🌺", msg: "You make me want to be better — not because you demand it, but just because of who you are." },
    { emoji: "💐", msg: "Two years ago my heart found its home. It's still there." },
  ],

  // Bloom SVG message
  bloomMessage: "You make every day bloom 🌸",
};

// ─────────────────────────────────────────────
// 1. HEART CURSOR
// ─────────────────────────────────────────────
const heartCursor = document.getElementById('heart-cursor');
let mx = -100, my = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.addEventListener('touchmove', e => {
  const t = e.touches[0];
  mx = t.clientX; my = t.clientY;
}, { passive: true });

function animateCursor() {
  heartCursor.style.left = mx + 'px';
  heartCursor.style.top  = my + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ─────────────────────────────────────────────
// 2. FALLING PETAL CANVAS
// ─────────────────────────────────────────────
(function initPetals() {
  const canvas = document.getElementById('petal-canvas');
  const ctx    = canvas.getContext('2d');
  const PETALS = [];
  const EMOJIS = ['🌸','🌷','🌹','🌼','🌺','🍃','💮'];
  const N = window.innerWidth < 600 ? 16 : 28;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < N; i++) {
    PETALS.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 14 + Math.random() * 18,
      speed: .4 + Math.random() * .8,
      drift: (Math.random() - .5) * .6,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: .01 + Math.random() * .02,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - .5) * .04,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      opacity: .6 + Math.random() * .4,
    });
  }

  function drawPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of PETALS) {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();

      p.y += p.speed;
      p.x += p.drift + Math.sin(p.sway) * .5;
      p.sway += p.swaySpeed;
      p.rot  += p.rotSpeed;

      if (p.y > canvas.height + 30) {
        p.y = -30;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -30) p.x = canvas.width + 30;
      if (p.x > canvas.width + 30) p.x = -30;
    }
    requestAnimationFrame(drawPetals);
  }
  drawPetals();
})();

// ─────────────────────────────────────────────
// 3. SECTION NAVIGATION
// ─────────────────────────────────────────────
const SECTIONS = [
  's-hero', 's-countdown', 's-letter', 's-gallery',
  's-garden', 's-bloom', 's-final'
];
let currentSection = 0;

function goTo(index) {
  const prev = document.getElementById(SECTIONS[currentSection]);
  const next = document.getElementById(SECTIONS[index]);
  if (!next) return;

  prev.classList.remove('active');
  prev.classList.add('exit');
  setTimeout(() => prev.classList.remove('exit'), 800);

  next.classList.add('active');
  currentSection = index;

  // trigger section initializers
  if (index === 1) initCountdown();
  if (index === 2) initLetter();
  if (index === 3) initGallery();
  if (index === 4) initGarden();
  if (index === 5) initBloom();
  if (index === 6) initFinal();
}

// Hero → Countdown
document.getElementById('btn-open').addEventListener('click', () => goTo(1));

// Countdown auto-advances after 4s
function initCountdown() {
  startCountdown();
  setTimeout(() => goTo(2), 6000);
}

// Letter → Gallery
document.getElementById('btn-letter-next').addEventListener('click', () => goTo(3));

// Gallery → Garden
document.getElementById('btn-gallery-next').addEventListener('click', () => goTo(4));

// Garden → Bloom
document.getElementById('btn-garden-next').addEventListener('click', () => goTo(5));

// Bloom → Final
document.getElementById('btn-bloom-next').addEventListener('click', () => goTo(6));

// Replay
document.getElementById('btn-replay').addEventListener('click', () => {
  currentSection = 0;
  document.getElementById('s-hero').classList.add('active');
  document.getElementById('s-final').classList.remove('active');
  gardenBloomed = 0;
});

// ─────────────────────────────────────────────
// 4. COUNTDOWN TIMER
// ─────────────────────────────────────────────
let countdownInterval = null;
function startCountdown() {
  if (countdownInterval) return;
  function update() {
    const now   = new Date();
    const diff  = now - CONFIG.anniversaryDate;
    const days  = Math.floor(diff / 864e5);
    const hours = Math.floor((diff % 864e5) / 36e5);
    const mins  = Math.floor((diff % 36e5) / 6e4);
    const secs  = Math.floor((diff % 6e4) / 1e3);

    const animate = (id, val) => {
      const el = document.getElementById(id);
      if (el.textContent !== String(val)) {
        el.style.transform = 'translateY(-8px)';
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = val;
          el.style.transition = 'transform .3s, opacity .3s';
          el.style.transform = '';
          el.style.opacity = '';
        }, 150);
      }
    };
    animate('cnt-days',  days);
    animate('cnt-hours', hours);
    animate('cnt-mins',  mins);
    animate('cnt-secs',  secs);
  }
  update();
  countdownInterval = setInterval(update, 1000);
}

// ─────────────────────────────────────────────
// 5. TYPEWRITER LETTER
// ─────────────────────────────────────────────
function initLetter() {
  const bodyEl = document.getElementById('letter-text');
  const signEl = document.getElementById('letter-sign');
  const btnNext = document.getElementById('btn-letter-next');
  bodyEl.textContent = '';
  signEl.textContent = '';
  btnNext.style.display = 'none';
  bodyEl.classList.remove('done');

  let i = 0;
  const full = CONFIG.letterText;
  const speed = 28;

  function type() {
    if (i <= full.length) {
      bodyEl.textContent = full.slice(0, i);
      i++;
      setTimeout(type, speed);
    } else {
      bodyEl.classList.add('done');
      typeSign();
    }
  }

  function typeSign() {
    let j = 0;
    const sign = CONFIG.letterSign;
    function typeSig() {
      if (j <= sign.length) {
        signEl.textContent = sign.slice(0, j++);
        setTimeout(typeSig, 40);
      } else {
        btnNext.style.display = 'inline-block';
      }
    }
    setTimeout(typeSig, 400);
  }

  setTimeout(type, 600);
}

// ─────────────────────────────────────────────
// 6. GALLERY
// ─────────────────────────────────────────────
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  if (grid.children.length) return; // already built

  CONFIG.gallery.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.animationDelay = (idx * .08) + 's';
    card.innerHTML = `
      <div class="card-emoji">${item.emoji}</div>
      <div class="card-label">${item.label}</div>
    `;
    card.style.opacity = '0';
    card.style.transform = 'scale(.7) translateY(20px)';
    card.style.transition = `opacity .5s ease ${idx * .08}s, transform .5s var(--ease-spring) ${idx * .08}s`;

    card.addEventListener('click', () => openLightbox(item));
    grid.appendChild(card);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = '';
    }));
  });
}

function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lb-photo').textContent   = item.emoji;
  document.getElementById('lb-caption').textContent = item.caption;
  lb.classList.remove('hidden');
}

document.getElementById('lb-close').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
});
document.getElementById('lb-overlay').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
});

// ─────────────────────────────────────────────
// 7. GARDEN
// ─────────────────────────────────────────────
let gardenBloomed = 0;

function initGarden() {
  const grid = document.getElementById('garden-grid');
  if (grid.children.length) return;
  gardenBloomed = 0;

  CONFIG.gardenFlowers.forEach((f, i) => {
    const btn = document.createElement('button');
    btn.className = 'garden-flower';
    btn.textContent = f.emoji;
    btn.setAttribute('data-num', i + 1);
    btn.setAttribute('data-msg', f.msg);
    btn.setAttribute('aria-label', `Flower ${i + 1}`);

    btn.addEventListener('click', () => {
      if (btn.classList.contains('bloomed')) return;
      btn.classList.add('bloomed');
      gardenBloomed++;

      const msgBox = document.getElementById('garden-msg-box');
      const msgEl  = document.getElementById('garden-msg');
      msgEl.textContent = f.msg;
      msgBox.classList.remove('hidden');

      if (gardenBloomed === CONFIG.gardenFlowers.length) {
        setTimeout(() => {
          document.getElementById('btn-garden-next').classList.remove('hidden');
        }, 1200);
      }
    });
    grid.appendChild(btn);
  });
}

// ─────────────────────────────────────────────
// 8. BLOOMING SVG FLOWER
// ─────────────────────────────────────────────
function initBloom() {
  const petals  = document.querySelectorAll('#petals-group .petal');
  const center  = document.getElementById('bloom-center-dot');
  const stem    = document.getElementById('bloom-stem');
  const leaf    = document.getElementById('bloom-leaf');
  const textEl  = document.getElementById('bloom-text');
  const nextBtn = document.getElementById('btn-bloom-next');
  textEl.textContent = '';
  nextBtn.style.display = 'none';

  // Reset
  petals.forEach(p => { p.style.transition = ''; p.setAttribute('opacity','0'); });
  center.setAttribute('r','0'); center.style.transition = '';
  stem.setAttribute('x2','150'); stem.setAttribute('y2','150'); stem.style.transition = '';
  leaf.setAttribute('rx','0'); leaf.setAttribute('ry','0'); leaf.style.transition = '';

  // Animate stem
  setTimeout(() => {
    stem.style.transition = 'y2 .8s ease, x2 .1s';
    stem.setAttribute('y2','270');
  }, 300);

  // Animate leaf
  setTimeout(() => {
    leaf.style.transition = 'all .5s var(--ease-spring)';
    leaf.setAttribute('opacity','1');
    leaf.setAttribute('rx','22'); leaf.setAttribute('ry','10');
  }, 900);

  // Animate petals one by one
  petals.forEach((p, i) => {
    setTimeout(() => {
      p.style.transition = 'opacity .5s ease, transform .5s var(--ease-spring)';
      p.setAttribute('opacity','1');
    }, 1300 + i * 120);
  });

  // Animate center
  setTimeout(() => {
    center.style.transition = 'r .5s var(--ease-spring)';
    center.setAttribute('r','22');
  }, 2400);

  // Typewriter message
  setTimeout(() => {
    let i = 0;
    const msg = CONFIG.bloomMessage;
    const iv = setInterval(() => {
      textEl.textContent = msg.slice(0, ++i);
      if (i >= msg.length) {
        clearInterval(iv);
        setTimeout(() => nextBtn.style.display = 'inline-block', 500);
      }
    }, 55);
  }, 2800);
}

// ─────────────────────────────────────────────
// 9. FINAL SECTION — Confetti + Rising Hearts
// ─────────────────────────────────────────────
function initFinal() {
  launchConfetti();
  spawnHearts();
  document.getElementById('game-btn').classList.remove('hidden');
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const PIECES = [];
  const COLORS = ['#ff6fa1','#ff8fab','#ffb3cc','#ffe066','#9b59b6','#ffffff','#ff4081'];
  const N = 160;

  for (let i = 0; i < N; i++) {
    PIECES.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - .5) * .15,
      speed: 2 + Math.random() * 3,
      drift: (Math.random() - .5) * 1.5,
      opacity: .8 + Math.random() * .2,
    });
  }

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of PIECES) {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();

      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rotSpeed;
      p.opacity -= .0015;

      if (p.y > canvas.height || p.opacity <= 0) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
        p.opacity = .8 + Math.random() * .2;
      }
    }
    frame = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0,0,canvas.width,canvas.height); }, 9000);
}

function spawnHearts() {
  const container = document.getElementById('final-hearts');
  container.innerHTML = '';
  const HEART_EMOJIS = ['❤️','💕','💖','💗','💝','🌸'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'final-heart';
    const fs = 16 + Math.random() * 30;
    const dur = 4 + Math.random() * 5;
    h.style.setProperty('--fs', fs + 'px');
    h.style.setProperty('--dur', dur + 's');
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDelay = (Math.random() * 6) + 's';
    h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    container.appendChild(h);
  }
}

// ─────────────────────────────────────────────
// 10. MUSIC
// ─────────────────────────────────────────────
const musicBtn = document.getElementById('music-btn');
const bgMusic  = document.getElementById('bg-music');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('playing');
    musicPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        musicBtn.textContent = '🔇';
        musicBtn.classList.add('playing');
        musicPlaying = true;
      })
      .catch(() => {
        showToast('ไม่พบไฟล์ music.mp3 ในโฟลเดอร์ 🎵');
      });
  }
});

// ─────────────────────────────────────────────
// 11. FLOWER MINI-GAME
// ─────────────────────────────────────────────
document.getElementById('game-btn').addEventListener('click', () => {
  document.getElementById('game-overlay').classList.remove('hidden');
  startFlowerGame();
});
document.getElementById('game-close').addEventListener('click', () => {
  document.getElementById('game-overlay').classList.add('hidden');
  stopFlowerGame();
});

let gameRunning = false, gameScore = 0, gameAnimFrame, gameFlowers = [], gameTime = 20;
let gameTimerInterval;

function startFlowerGame() {
  const canvas = document.getElementById('game-canvas');
  const W = Math.min(340, window.innerWidth - 60);
  canvas.width  = W;
  canvas.height = Math.round(W * 1.2);
  const ctx = canvas.getContext('2d');

  gameScore = 0; gameFlowers = []; gameRunning = true; gameTime = 20;
  document.getElementById('game-score').textContent = 'Score: 0';
  document.getElementById('game-result').classList.add('hidden');

  const FLOWER_EMOJIS = ['🌸','🌷','🌹','🌼','🌺','💮'];

  function spawnFlower() {
    gameFlowers.push({
      x: 30 + Math.random() * (canvas.width - 60),
      y: -30,
      size: 28 + Math.random() * 18,
      speed: 1.2 + Math.random() * 1.6,
      emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
      opacity: 1,
    });
  }

  let spawnTimer = 0;
  const SPAWN_RATE = 40;

  function loop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,'#fff0f8');
    grad.addColorStop(1,'#f5e0ff');
    ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);

    // Timer bar
    const barW = (gameTime / 20) * canvas.width;
    ctx.fillStyle = 'rgba(255,111,161,.2)';
    ctx.fillRect(0, 0, canvas.width, 6);
    ctx.fillStyle = '#ff6fa1';
    ctx.fillRect(0, 0, barW, 6);

    spawnTimer++;
    if (spawnTimer % SPAWN_RATE === 0) spawnFlower();

    ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = gameFlowers.length - 1; i >= 0; i--) {
      const f = gameFlowers[i];
      ctx.globalAlpha = f.opacity;
      ctx.font = f.size + 'px serif';
      ctx.fillText(f.emoji, f.x, f.y);
      ctx.globalAlpha = 1;
      f.y += f.speed;
      if (f.y > canvas.height + 40) gameFlowers.splice(i, 1);
    }

    // Score display
    ctx.fillStyle = '#c94080';
    ctx.font = '700 15px Lato, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Tap the flowers! 🌸', 12, 22);

    gameAnimFrame = requestAnimationFrame(loop);
  }

  // Tap/click handler
  function handleTap(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    for (let i = gameFlowers.length - 1; i >= 0; i--) {
      const f = gameFlowers[i];
      const d = Math.hypot(x - f.x, y - f.y);
      if (d < f.size / 1.4) {
        gameScore++;
        document.getElementById('game-score').textContent = `Score: ${gameScore}`;
        showGameParticle(canvas, f.x, f.y, f.emoji);
        gameFlowers.splice(i, 1);
        break;
      }
    }
  }

  canvas.addEventListener('click', handleTap);
  canvas.addEventListener('touchstart', handleTap, { passive: false });

  gameTimerInterval = setInterval(() => {
    gameTime--;
    if (gameTime <= 0) {
      clearInterval(gameTimerInterval);
      gameRunning = false;
      cancelAnimationFrame(gameAnimFrame);
      const result = document.getElementById('game-result');
      result.textContent = `You caught ${gameScore} flowers! 🌸 Love you! 💕`;
      result.classList.remove('hidden');
    }
  }, 1000);

  loop();
}

function showGameParticle(canvas, x, y, emoji) {
  // Quick DOM particle for visual feedback
  const p = document.createElement('div');
  p.textContent = emoji;
  p.style.cssText = `position:absolute;pointer-events:none;font-size:24px;
    left:${x + canvas.getBoundingClientRect().left}px;
    top:${y + canvas.getBoundingClientRect().top}px;
    transform:translate(-50%,-50%);
    animation:fade-up .5s ease forwards;z-index:900;`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 500);
}

function stopFlowerGame() {
  gameRunning = false;
  clearInterval(gameTimerInterval);
  cancelAnimationFrame(gameAnimFrame);
}

// ─────────────────────────────────────────────
// 12. PARALLAX on hero (mouse)
// ─────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  if (currentSection !== 0) return;
  const xRatio = (e.clientX / window.innerWidth - .5) * 20;
  const yRatio = (e.clientY / window.innerHeight - .5) * 10;
  const icon = document.getElementById('bloom-icon');
  if (icon) icon.style.transform = `translate(${xRatio}px,${yRatio}px)`;
});

// ─────────────────────────────────────────────
// 13. TOAST UTILITY
// ─────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
    background:rgba(255,111,161,.92);color:#fff;padding:10px 20px;border-radius:30px;
    font-size:14px;z-index:1000;box-shadow:0 4px 16px rgba(255,111,161,.4);
    transition:opacity .4s;pointer-events:none;backdrop-filter:blur(6px);`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 2800);
}

// ─────────────────────────────────────────────
// 14. KEYBOARD NAV (arrow keys)
// ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    if (currentSection < SECTIONS.length - 1) goTo(currentSection + 1);
  }
});

// ─────────────────────────────────────────────
// 15. INIT
// ─────────────────────────────────────────────
document.getElementById('s-hero').classList.add('active');
