/**
 * Engagement Ceremony Invitation Script
 * Mandapalli Jyothsna & Palleti Praveen Kumar
 * Features:
 *  - Ultra-smooth Lenis Momentum Scroll with zero jank
 *  - High-performance 60/120fps Flower Petal & Sparkle Canvas Engine
 *  - Web Audio API Classical Ambient Wedding Synthesizer
 *  - Live Dynamic Countdown to 03 October 2026
 *  - Google Calendar & .ics Download Integration
 *  - Pushpa Vrishti (Flower Shower) Launcher
 *  - Digital Guestbook & Live Feed
 */

// Force browser to start at hero section at every refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

let lenisInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Always ensure top position
  window.scrollTo(0, 0);

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Ultra-Smooth Lenis Scrolling
  initSmoothScroll();

  initDoorIntroSequence();
  initPetalCanvas();
  initCountdown();
  initScrollReveal();
  setupCalendarHandlers();
});

/* ==========================================================================
   1. LENIS ULTRA-SMOOTH MOMENTUM SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  if (typeof Lenis === 'function') {
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      infinite: false
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   2. HIGH-PERFORMANCE PETAL & SPARKLE CANVAS (OPTIMIZED 60/120FPS)
   ========================================================================== */
let canvas, ctx;
let particles = [];
const PARTICLE_COUNT = 32;

const petalPalette = [
  { fill: '#A876B5', stroke: '#7A4B85', type: 'lilac' },
  { fill: '#D8B4E2', stroke: '#A876B5', type: 'soft_mauve' },
  { fill: '#FFFFFF', stroke: '#EAD7F0', type: 'white_lily' },
  { fill: '#E5BE6B', stroke: '#C99B42', type: 'gold_petal' },
  { fill: '#FFF5DC', stroke: '#E5BE6B', type: 'sparkle' }
];

function initPetalCanvas() {
  canvas = document.getElementById('petalCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d', { alpha: true });

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle(true));
  }

  // Throttle mouse interaction for smooth FPS
  let lastMove = 0;
  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - lastMove > 60) {
      lastMove = now;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 7 + 4,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 1.5 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        color: petalPalette[Math.floor(Math.random() * petalPalette.length)],
        opacity: 0.85,
        decay: 0.02
      });
    }
  }, { passive: true });

  animateParticles();
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle(randomY = false) {
  return {
    x: Math.random() * (canvas ? canvas.width : window.innerWidth),
    y: randomY ? Math.random() * (canvas ? canvas.height : window.innerHeight) : -20,
    size: Math.random() * 9 + 5,
    speedX: Math.sin(Math.random() * Math.PI * 2) * 1.1 + (Math.random() - 0.5),
    speedY: Math.random() * 1.4 + 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    oscillationSpeed: Math.random() * 0.02 + 0.01,
    seed: Math.random() * 100,
    color: petalPalette[Math.floor(Math.random() * petalPalette.length)],
    opacity: Math.random() * 0.4 + 0.5,
    decay: 0
  };
}

function animateParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.y += p.speedY;
    p.seed += p.oscillationSpeed;
    p.x += Math.sin(p.seed) * 0.9 + p.speedX * 0.15;
    p.rotation += p.rotationSpeed;

    if (p.decay > 0) {
      p.opacity -= p.decay;
      if (p.opacity <= 0) {
        particles.splice(i, 1);
        continue;
      }
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;

    if (p.color.type === 'sparkle') {
      ctx.fillStyle = p.color.fill;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = p.color.fill;
      ctx.strokeStyle = p.color.stroke;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();

    if (p.y > canvas.height + 25 && p.decay === 0) {
      particles[i] = createParticle(false);
    }
  }

  requestAnimationFrame(animateParticles);
}

/* ==========================================================================
   3. GRAND CEREMONY DOOR OPENING INTRO SEQUENCE & FULLSCREEN GLOW
   ========================================================================== */
function initDoorIntroSequence() {
  const overlay = document.getElementById('introVideoOverlay');
  const video = document.getElementById('introDoorVideo');
  const tapBadge = document.getElementById('tapToOpenBadge');
  const glow = document.getElementById('screenGlowEffect');

  if (!overlay || !video) return;

  // Guarantee hero section is ready at top
  window.scrollTo(0, 0);
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  }

  // Pre-load video immediately
  try {
    video.muted = true;
    video.defaultMuted = true;
    video.load();
  } catch (e) {}

  let hasStarted = false;
  let hasTriggeredGlow = false;

  function startIntroDoorPlay(e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (hasStarted) return;
    hasStarted = true;

    if (tapBadge) {
      tapBadge.classList.add('faded');
    }

    // Always ensure muted=true on video element for guaranteed instant playback in all browsers
    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Video playing smoothly
      }).catch((err) => {
        console.warn("Autoplay notice, retrying with direct play:", err);
        video.muted = true;
        video.play().catch(() => {
          onDoorOpeningFinish();
        });
      });
    }

    // Start melodious harp accompaniment via Web Audio
    try {
      toggleAudio(true);
    } catch (e) {}

    // Safety timeout in case video ends or stalls unexpectedly
    setTimeout(() => {
      if (!hasTriggeredGlow) {
        onDoorOpeningFinish();
      }
    }, 6000);
  }

  // Attach listeners across all interaction types
  overlay.addEventListener('click', startIntroDoorPlay);
  overlay.addEventListener('pointerdown', startIntroDoorPlay);
  overlay.addEventListener('touchstart', startIntroDoorPlay, { passive: true });
  if (tapBadge) {
    tapBadge.addEventListener('click', startIntroDoorPlay);
    tapBadge.addEventListener('pointerdown', startIntroDoorPlay);
  }

  function onDoorOpeningFinish() {
    if (hasTriggeredGlow) return;
    hasTriggeredGlow = true;

    // Trigger full screen radiant heavenly glow
    if (glow) {
      glow.classList.add('active-glow');
    }

    setTimeout(() => {
      // Dismiss video overlay behind the glow
      overlay.classList.add('dismissed');

      // Guarantee hero section is shown
      window.scrollTo(0, 0);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }

      // Shower flower petals
      triggerGrandFlowerShower();

      // Smoothly dissolve the glow to reveal the website hero section
      if (glow) {
        glow.classList.remove('active-glow');
        glow.classList.add('fading-glow');
        setTimeout(() => {
          glow.classList.remove('fading-glow');
        }, 900);
      }
    }, 450);
  }

  video.addEventListener('ended', onDoorOpeningFinish);

  video.addEventListener('timeupdate', () => {
    if (video.duration && video.duration > 0) {
      // Near end of the door opening video, start radiant glow transition
      if (video.currentTime >= video.duration - 0.35) {
        onDoorOpeningFinish();
      }
    }
  });

  video.addEventListener('error', (e) => {
    console.warn("Video load error:", e);
    onDoorOpeningFinish();
  });
}

/* ==========================================================================
   4. WEDDING BACKGROUND MUSIC (IMG/AUDIO.MP3 IN CONTINUOUS LOOP)
   ========================================================================== */
let weddingAudio = null;
let isAudioPlaying = false;

function initWeddingAudio() {
  if (!weddingAudio) {
    weddingAudio = new Audio('img/audio.mp3');
    weddingAudio.loop = true;
    weddingAudio.preload = 'auto';
    weddingAudio.volume = 0.85;
  }
}

function startWeddingMelody() {
  initWeddingAudio();
  if (weddingAudio) {
    const playPromise = weddingAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioPlaying = true;
        updateAudioBtnUI();
      }).catch((err) => {
        console.warn("Audio waiting for user gesture:", err);
      });
    }
  }
}

function stopWeddingMelody() {
  if (weddingAudio && isAudioPlaying) {
    weddingAudio.pause();
    isAudioPlaying = false;
    updateAudioBtnUI();
  }
}

function toggleAudio(forcePlay = null) {
  if (forcePlay === true) {
    if (!isAudioPlaying) startWeddingMelody();
  } else if (forcePlay === false) {
    stopWeddingMelody();
  } else {
    if (isAudioPlaying) {
      stopWeddingMelody();
    } else {
      startWeddingMelody();
    }
  }
}

const audioToggleBtn = document.getElementById('audioToggleBtn');
if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', () => toggleAudio());
}

function updateAudioBtnUI() {
  if (!audioToggleBtn) return;
  if (isAudioPlaying) {
    audioToggleBtn.classList.add('playing');
    audioToggleBtn.setAttribute('title', 'Pause Melody');
  } else {
    audioToggleBtn.classList.remove('playing');
    audioToggleBtn.setAttribute('title', 'Play Wedding Melody');
  }
}

/* ==========================================================================
   5. LIVE COUNTDOWN TIMER (03 OCTOBER 2026)
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date('2026-10-03T10:00:00+05:30').getTime();

  const daysEl = document.getElementById('daysVal');
  const hoursEl = document.getElementById('hoursVal');
  const minsEl = document.getElementById('minsVal');
  const secsEl = document.getElementById('secsVal');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minsEl.innerText = "00";
      secsEl.innerText = "00";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(minutes).padStart(2, '0');
    secsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   6. CALENDAR INTEGRATION
   ========================================================================== */
function setupCalendarHandlers() {
  const googleBtn = document.getElementById('googleCalBtn');

  const eventDetails = {
    title: "Engagement Ceremony | Mandapalli Jyothsna & Palleti Praveen Kumar",
    description: "Cordially invite you to celebrate the Engagement Ceremony of Mandapalli Jyothsna & Palleti Praveen Kumar.\n\nBride's Parents: Late Mandapalli Prasad & Mrs. Vijaya\nGroom's Parents: Palleti Ganeswara Rao & Mrs. Mary\n\nVenue: S.S. Venue, Kondagunturu\nMap: https://maps.app.goo.gl/o4W5Bzf2MsF22cyV8",
    location: "S.S. Venue, Kondagunturu, Andhra Pradesh, India",
    startDate: "20261003T043000Z",
    endDate: "20261003T093000Z"
  };

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
      window.open(gCalUrl, '_blank');
    });
  }
}

/* ==========================================================================
   7. FLOWER SHOWER
   ========================================================================== */
let blessingCount = 1248;

function triggerGrandFlowerShower() {
  if (typeof confetti === 'function') {
    const count = 160;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#A876B5', '#D8B4E2', '#E5BE6B', '#FFF5DC', '#FFFFFF', '#7A4B85']
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 50 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.4 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  blessingCount++;
  const display = document.getElementById('blessingCountDisplay');
  if (display) {
    display.innerText = blessingCount.toLocaleString();
    display.style.transform = 'scale(1.2)';
    display.style.color = '#7A4B85';
    setTimeout(() => {
      display.style.transform = 'scale(1)';
      display.style.color = '';
    }, 300);
  }
}

/* ==========================================================================
   8. GUESTBOOK & WISHES
   ========================================================================== */
function insertQuickWish(text) {
  const messageInput = document.getElementById('guestMessage');
  if (messageInput) {
    messageInput.value = text;
    messageInput.focus();
  }
}

function handleSendWish(event) {
  event.preventDefault();
  const nameInput = document.getElementById('guestName');
  const messageInput = document.getElementById('guestMessage');
  const feed = document.getElementById('wishesFeed');

  if (!nameInput || !messageInput || !feed) return;

  const name = nameInput.value.trim();
  const msg = messageInput.value.trim();

  if (!name || !msg) return;

  const newWish = document.createElement('div');
  newWish.className = 'wish-item';
  newWish.innerHTML = `
    <div class="wish-meta">
      <span class="wish-sender"><i data-lucide="heart"></i> ${escapeHtml(name)}</span>
      <span class="wish-date">Just now</span>
    </div>
    <p class="wish-text">${escapeHtml(msg)}</p>
  `;

  feed.prepend(newWish);
  if (window.lucide) window.lucide.createIcons();

  triggerGrandFlowerShower();

  nameInput.value = '';
  messageInput.value = '';

  alert("Thank you for sending your heartfelt blessings to Jyothsna & Praveen!");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* ==========================================================================
   9. WHATSAPP & LINK SHARE
   ========================================================================== */
function shareOnWhatsApp() {
  const text = `*Engagement Ceremony Invitation*\n\nWith the blessings of our beloved elders, we cordially invite you to celebrate the Engagement Ceremony of\n*Mandapalli Jyothsna* & *Palleti Praveen Kumar*\n\nDate: 03 October 2026\nVenue: S.S. Venue, Kondagunturu\n\nView the digital card online: ${window.location.href}`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function copyInviteLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const copyText = document.getElementById('copyLinkText');
    if (copyText) {
      copyText.innerText = 'Link Copied! ✓';
      setTimeout(() => {
        copyText.innerText = 'Copy Invitation Link';
      }, 2500);
    }
  }).catch(() => {
    alert("Link: " + window.location.href);
  });
}

/* ==========================================================================
   10. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}
