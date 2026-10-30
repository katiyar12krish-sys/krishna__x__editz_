/**
 * KRISHNA X EDITZ — STUDIO INTERACTIVE ENGINE
 * High-end interactions, animations, and deep-dive modal logic
 */

(function () {
  'use strict';

  // 1. SCROLL REVEAL ENGINE (IntersectionObserver)
  function initScrollReveal() {
    const revealElems = document.querySelectorAll('.reveal-on-scroll, [data-reveal]');
    if (!revealElems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElems.forEach((el) => observer.observe(el));
  }

  // 2. LIVE METRIC COUNTERS
  function initMetricCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));

    function animateCount(el) {
      const target = parseFloat(el.getAttribute('data-counter-target')) || 0;
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const duration = 2000;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        const current = target * ease;
        el.innerText = prefix + (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.innerText = prefix + target + suffix;
        }
      }
      requestAnimationFrame(step);
    }
  }

  // 3. BEFORE/AFTER COLOR GRADING COMPARISON SLIDER
  function initGradingSlider() {
    const containers = document.querySelectorAll('.grading-slider-container');
    containers.forEach((container) => {
      const handle = container.querySelector('.grading-handle');
      const afterLayer = container.querySelector('.grading-after');
      if (!handle || !afterLayer) return;

      let isDragging = false;

      function updateSlider(clientX) {
        const rect = container.getBoundingClientRect();
        let posX = clientX - rect.left;
        posX = Math.max(0, Math.min(posX, rect.width));
        const percent = (posX / rect.width) * 100;

        handle.style.left = `${percent}%`;
        afterLayer.style.width = `${percent}%`;
      }

      function onPointerDown(e) {
        isDragging = true;
        updateSlider(e.clientX || (e.touches && e.touches[0].clientX));
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onPointerUp);
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        updateSlider(e.clientX);
      }

      function onTouchMove(e) {
        if (!isDragging || !e.touches.length) return;
        updateSlider(e.touches[0].clientX);
      }

      function onPointerUp() {
        isDragging = false;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onPointerUp);
      }

      container.addEventListener('pointerdown', onPointerDown);
    });
  }

  // 4. 3D CARD TILT ON MOUSEMOVE
  function initTiltEffect() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // 5. IN-DEPTH SERVICE BREAKDOWN DATABASE & MODAL
  const SERVICES_DATA = {
    'reels': {
      title: 'Instagram Reels, YouTube Shorts & Viral Hooks',
      tag: 'Volume 01 • Short-Form Explosive Growth',
      color: '#10B981',
      summary: 'Engineered specifically for hyper-retention and maximum watch time on modern vertical video algorithms. We analyze your raw footage, identify the single most arresting visual hook, and sculpt a rhythm-matched narrative with punchy sound design and kinetic captions.',
      metrics: '+340% Avg Retention • 82% Completion Rate • 24-48h Delivery',
      pipeline: [
        { phase: '01', title: 'Viral Hook Scouting', desc: 'Isolating the top 3-second psychological trigger and opening audio impact.' },
        { phase: '02', title: 'High-Pacing Assembly Cut', desc: 'Zero dead air. Trimming micro-breaths, pacing speed-ramps, and beat-snapping.' },
        { phase: '03', title: 'Kinetic Motion Typography', desc: 'Custom stylized captions, emojis, motion tracking, and keyword highlight effects.' },
        { phase: '04', title: 'Sound Design & Foley Layering', desc: 'Whooshes, risers, paper textures, sub-bass drops, and balanced vocal LUFS.' },
        { phase: '05', title: 'Multi-Format Master Export', desc: 'Optimized 1080x1920 (9:16) 60fps ProRes & H.265 tailored for Instagram & TikTok algorithms.' }
      ],
      deliverables: [
        '9:16 Ultra-HD Vertical Master Video',
        'High-Retention Custom Hook Alternative',
        'Embedded Stylized Subtitles / SRT file',
        'Clean Textless Version for Ad Testing',
        'Up to 2 Free Precision Revisions'
      ],
      toolkit: 'Adobe Premiere Pro 2026, After Effects, Boris FX Sapphire, Dehancer Pro'
    },
    'youtube': {
      title: 'YouTube Master Video Editing & Documentaries',
      tag: 'Volume 02 • Long-Form Retention Masterclass',
      color: '#F59E0B',
      summary: 'Comprehensive end-to-end post-production for high-tier YouTubers, podcasters, documentarians, and tech channels. We turn hours of multi-cam footage and screen captures into a gripping narrative that keeps viewers glued till the end card.',
      metrics: 'Over 50M+ Views Driven • 65% End-Screen Click Rate',
      pipeline: [
        { phase: '01', title: 'A-Roll Selection & Script Sync', desc: 'Curating the sharpest takes and building a structured 3-act narrative backbone.' },
        { phase: '02', title: 'Visual Dynamic Pacing', desc: 'Punch-in reframes, B-roll insertions every 4-6 seconds, and smooth J/L-cuts.' },
        { phase: '03', title: 'Custom 2D/3D Motion Graphics', desc: 'Animated lower-thirds, data graphs, custom maps, and 3D mockups.' },
        { phase: '04', title: 'Broadcast Audio Mixing', desc: 'Dialogue clarity leveling, dynamic compression, stereo music ducking (-14 LUFS).' },
        { phase: '05', title: '4K Cinematic Color Delivery', desc: 'DaVinci Resolve color consistency across all cameras and ambient lighting.' }
      ],
      deliverables: [
        '16:9 4K UHD Master Video File',
        'YouTube Chapter Markers & Timestamps',
        '3 Clickable Shorts/Reels Cuts for Promotion',
        'Stereo Mastered WAV Audio Track',
        'Up to 2 Complete Creative Revisions'
      ],
      toolkit: 'DaVinci Resolve Studio 19, Adobe Premiere Pro 2026, After Effects'
    },
    'cinematic': {
      title: 'Cinematic Film, Showreels & Narrative Fiction',
      tag: 'Volume 03 • Hollywood Visual Craft',
      color: '#E11D48',
      summary: 'For directors, narrative filmmakers, and creators seeking high-end mood, atmospheric texture, and artistic visual storytelling. Features 2.39:1 anamorphic crop, custom film halation, grain emulation, and bespoke orchestral soundscapes.',
      metrics: 'Award-Winning Aesthetics • DaVinci Color Science Mastered',
      pipeline: [
        { phase: '01', title: 'Editorial Assembly & Story Arc', desc: 'Crafting the emotional heartbeat of the film with deliberate pacing.' },
        { phase: '02', title: 'Speed Ramping & Match Cutting', desc: 'Seamless optical flow transitions, whip pans, and kinetic energy control.' },
        { phase: '03', title: 'Atmospheric VFX & Compositing', desc: 'Sky replacements, light leaks, particle overlays, and cinematic grain.' },
        { phase: '04', title: 'Film LUT Development & Look Dev', desc: 'Kodak 2383 / Fuji film print emulation and custom split-toning.' },
        { phase: '05', title: '5.1 / Stereo Soundscape Mastering', desc: 'Multi-channel ambient textures, sub-harmonic risers, and Foley.' }
      ],
      deliverables: [
        'Cinematic 2.39:1 & 16:9 4K Master Files',
        'ProRes 4444 Color Master with Metadata',
        'Isolated Music, Dialogue & FX Stems',
        'Custom Look-Dev LUT (.cube file)',
        'Full Archival Package'
      ],
      toolkit: 'DaVinci Resolve Studio, Dehancer Pro, After Effects, Mocha Pro'
    },
    'commercial': {
      title: 'Brand Commercials & Tech Product Showreels',
      tag: 'Volume 04 • High-Conversion Business Media',
      color: '#06B6D4',
      summary: 'Designed specifically for tech startups, luxury eCommerce brands, and enterprise software providers like Sorexa Tech. We turn product features into sleek visual spectacles that drive sales, brand authority, and client inquiries.',
      metrics: 'Engineered for Sorexa Tech & Premium B2B Conversion',
      pipeline: [
        { phase: '01', title: 'Brand Identity Alignment', desc: 'Matching brand guidelines, typography, color codes, and target demographics.' },
        { phase: '02', title: 'High-Impact 3D/2D Screen Mockups', desc: 'Animating UI screens, device frames, and features with snappy physics.' },
        { phase: '03', title: 'Rhythmic Music Synchronization', desc: 'Syncing cuts to high-energy electronic, corporate, or ambient beats.' },
        { phase: '04', title: 'Call-to-Action & Logo Reveal', desc: 'High-conversion closing stingers, URLs, and animated brand logos.' },
        { phase: '05', title: 'Omni-Channel Aspect Ratio Outputs', desc: 'Simultaneous exports in 16:9 (Desktop/TV), 9:16 (Mobile/Stories), and 1:1 (Feed).' }
      ],
      deliverables: [
        '16:9, 9:16, and 1:1 High-Bitrate Master Files',
        'Full Commercial Broadcasting License',
        'Transparent Logo Sting Animation',
        'Direct Developer / Founder Collaboration',
        'Rapid 24-48h Project Delivery'
      ],
      toolkit: 'After Effects, Premiere Pro, DaVinci Resolve, Cinema 4D Assets'
    },
    'music': {
      title: 'Music Videos & Beat-Synchronized Visuals',
      tag: 'Volume 05 • Sonic & Visual Synergy',
      color: '#8B5CF6',
      summary: 'Precision editing matched down to the millisecond of the audio waveform. Bass drops, hi-hat rolls, and vocal melodies dictate every cut, flash, and velocity ramp for music releases, AMVs, and dance performances.',
      metrics: 'Frame-Accurate Beat Snapping • Hypnotic Visual Flow',
      pipeline: [
        { phase: '01', title: 'Waveform Beat Marker Mapping', desc: 'Detailed audio transient mapping down to every drum kick and snare.' },
        { phase: '02', title: 'Velocity Curve Ramping', desc: 'Speed acceleration and deceleration synced to rhythm energy.' },
        { phase: '03', title: 'RGB Glitch & Optical Light Flashes', desc: 'Custom displacement maps, chromatic aberration, and neon blooms.' },
        { phase: '04', title: 'Lyric Typography & Calligraphy Sync', desc: 'Floating animated text synced with vocal phrasing.' },
        { phase: '05', title: 'Color Grade & Aesthetic Atmosphere', desc: 'Moody neon, vintage VHS tape, or clean high-fashion visual treatment.' }
      ],
      deliverables: [
        'Full 4K Music Video Master',
        '3 High-Energy Teaser Cuts for Instagram/TikTok',
        'Motion Album Art / Spotify Canvas Loop (9:16)',
        'Up to 2 Creative Fine-Tuning Sessions'
      ],
      toolkit: 'Premiere Pro 2026, After Effects, Boris FX Sapphire, Dehancer'
    },
    'color': {
      title: 'DaVinci Resolve Color Grading & Look Development',
      tag: 'Volume 06 • Color Science & Film Emulation',
      color: '#F97316',
      summary: 'Transform flat, dull LOG footage from Sony S-Log, Canon C-Log, Arri Log-C, and Blackmagic RAW into vibrant, cinematic film stock with organic film grain, halation, and accurate skin tones.',
      metrics: 'Calibrated Color Pipeline • Custom 3D LUT Delivery',
      pipeline: [
        { phase: '01', title: 'Color Space Transform (CST)', desc: 'Properly mapping sensor LOG inputs to Rec.709 / P3-D65 color gamuts.' },
        { phase: '02', title: 'Shot-to-Shot Color Matching', desc: 'Balancing exposure, white balance, and contrast across varying cameras.' },
        { phase: '03', title: 'Skin Tone Protection & Isolation', desc: 'Natural melanin saturation and qualifier masks preventing oversaturation.' },
        { phase: '04', title: 'Creative Stylization & Split Toning', desc: 'Warm amber highlights, teal shadow roll-off, and film print emulation.' },
        { phase: '05', title: 'Halation, Grain & Master Export', desc: 'Analog optical artifacts that give digital footage physical weight.' }
      ],
      deliverables: [
        'Graded 4K Master Video (ProRes / H.265)',
        'Custom .CUBE 3D LUT for on-set monitoring',
        'Before vs After Split Showcase Video',
        'Technical Color Conformance Report'
      ],
      toolkit: 'DaVinci Resolve Studio 19, Dehancer Film Pro, X-Rite ColorChecker'
    }
  };

  window.openServiceDetail = function (serviceKey) {
    const data = SERVICES_DATA[serviceKey] || SERVICES_DATA['reels'];
    let modalBackdrop = document.getElementById('serviceDetailModal');

    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'serviceDetailModal';
      modalBackdrop.className = 'service-modal-backdrop';
      modalBackdrop.innerHTML = `
        <div class="service-modal-box">
          <button class="service-modal-close" onclick="closeServiceDetail()" aria-label="Close modal">✕</button>
          <div id="serviceModalContent"></div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeServiceDetail();
      });
    }

    const phasesHtml = data.pipeline.map(p => `
      <div class="modal-phase-item">
        <div class="modal-phase-num" style="color:${data.color}">STAGE ${p.phase}</div>
        <div class="modal-phase-title">${p.title}</div>
        <p class="modal-phase-desc">${p.desc}</p>
      </div>
    `).join('');

    const deliverablesHtml = data.deliverables.map(d => `
      <li><span style="color:${data.color};font-weight:900;">✓</span> ${d}</li>
    `).join('');

    const contentEl = document.getElementById('serviceModalContent');
    contentEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(255,255,255,0.08);border:1px solid ${data.color};color:${data.color};font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">
          ${data.tag}
        </span>
      </div>
      <h2 style="font-family:var(--serif, serif);font-size:clamp(24px, 4vw, 34px);color:#FFF;margin:0 0 14px 0;line-height:1.2;">
        ${data.title}
      </h2>
      <p style="color:var(--muted,#cfc3ac);font-size:14.5px;line-height:1.65;margin-bottom:20px;">
        ${data.summary}
      </p>

      <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:12px 18px;margin-bottom:24px;border-left:3px solid ${data.color};font-size:13px;font-weight:700;color:#FFF;">
        ⚡ Strategic Benchmark: <span style="color:${data.color}">${data.metrics}</span>
      </div>

      <h4 style="font-family:var(--sans,sans-serif);font-size:13px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#FFF;margin:0 0 12px 0;">
        5-Stage Production Workflow
      </h4>
      <div class="modal-phase-grid">${phasesHtml}</div>

      <h4 style="font-family:var(--sans,sans-serif);font-size:13px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#FFF;margin:24px 0 12px 0;">
        Included Deliverables Checklist
      </h4>
      <ul class="modal-deliverables-list">${deliverablesHtml}</ul>

      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);">
        <div style="color:var(--muted);font-size:12.5px;">
          Software Toolkit: <strong style="color:#FFF;">${data.toolkit}</strong>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20want%20to%20book%20the%20${encodeURIComponent(data.title)}%20service." 
             target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:999px;background:#25D366;color:#FFF;font-weight:800;font-size:12.5px;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;">
            Book on WhatsApp ↗
          </a>
          <a href="/contact" 
             style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:999px;background:${data.color};color:#000;font-weight:900;font-size:12.5px;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;">
            Submit Creative Brief &rarr;
          </a>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeServiceDetail = function () {
    const modalBackdrop = document.getElementById('serviceDetailModal');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // 6. INITIALIZE ON DOM CONTENT LOADED
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMetricCounters();
    initGradingSlider();
    initTiltEffect();

    // Sticky Header Scroll Controller
    const header = document.querySelector('.studio-header') || document.getElementById('topbar');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  });

})();
