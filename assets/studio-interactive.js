/**
 * KRISHNA X EDITZ — LUXURY STUDIO INTERACTIVE ENGINE
 * Full-screen theater view, mouse spotlight, and real-time interactions
 */

(function () {
  'use strict';

  // 1. MOUSE SPOTLIGHT (HOMEPAGE LUXURY PARITY)
  function initMouseSpotlight() {
    let spotlight = document.getElementById('mouseSpotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'mouseSpotlight';
      spotlight.className = 'mouse-spotlight';
      spotlight.setAttribute('aria-hidden', 'true');
      document.body.appendChild(spotlight);
    }

    window.addEventListener('pointermove', (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    }, { passive: true });
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
        const ease = 1 - Math.pow(1 - progress, 3);
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

  // 3. FULL-SCREEN DEDICATED SERVICE BREAKDOWN (NO POPUP!)
  const SERVICES_DATA = {
    'reels': {
      vol: 'Volume 01',
      title: 'Instagram Reels, YouTube Shorts & Viral Retention',
      tag: 'Short-Form Explosive Reach',
      color: '#10B981',
      summary: 'Engineered specifically for hyper-retention and maximum watch time on modern vertical video algorithms. We analyze your raw footage, identify the single most arresting visual hook, and sculpt a rhythm-matched narrative with punchy sound design, motion tracking, and kinetic captions.',
      metrics: '+340% Avg Retention • 82% Completion Rate • 24-48h Delivery',
      pipeline: [
        { phase: '01', title: 'Viral Hook Scouting & Script Sync', desc: 'Isolating the top 3-second psychological trigger and opening audio impact to instantly stop the scroll.' },
        { phase: '02', title: 'High-Pacing Assembly Cut', desc: 'Zero dead air. Trimming micro-breaths, pacing velocity speed-ramps, and frame-accurate beat-snapping.' },
        { phase: '03', title: 'Kinetic Motion Typography', desc: 'Custom stylized captions, animated emojis, motion tracking, and keyword highlight luminescence.' },
        { phase: '04', title: 'Sound Design & Foley Layering', desc: 'Whooshes, paper textures, risers, sub-bass drops, and calibrated vocal leveling to -14 LUFS.' },
        { phase: '05', title: 'Multi-Format Master Export', desc: 'Optimized 1080x1920 (9:16) 60fps ProRes & H.265 tailored for Instagram, YouTube Shorts & TikTok algorithms.' }
      ],
      deliverables: [
        '9:16 Ultra-HD Vertical Master Video (4K 60FPS)',
        'High-Retention Alternative Opening Hook Cut',
        'Stylized Embedded Subtitles + Standalone .SRT file',
        'Clean Textless Version for International Ad Campaigns',
        'Up to 2 Precision Revisions Included'
      ],
      toolkit: 'Adobe Premiere Pro 2026, After Effects, Boris FX Sapphire, Dehancer Pro, i9/RTX 4090 Studio'
    },
    'youtube': {
      vol: 'Volume 02',
      title: 'YouTube Master Video Editing & Long-Form Documentaries',
      tag: 'Long-Form Storytelling Masterclass',
      color: '#F59E0B',
      summary: 'Comprehensive end-to-end post-production for high-tier YouTubers, podcasters, documentarians, and tech creators. We turn hours of multi-cam footage and screen captures into a gripping narrative that keeps viewers glued till the end card.',
      metrics: 'Over 50M+ Views Driven • 65% End-Screen Clickthrough',
      pipeline: [
        { phase: '01', title: 'A-Roll Selection & Narrative Backbone', desc: 'Curating the sharpest takes and structuring a 3-act storytelling arc with engaging open loops.' },
        { phase: '02', title: 'Visual Dynamic Pacing & B-Roll', desc: 'Punch-in reframes, B-roll insertions every 4-6 seconds, and smooth seamless J/L-cuts.' },
        { phase: '03', title: 'Custom 2D/3D Motion Graphics', desc: 'Animated lower-thirds, financial data graphs, custom historical maps, and 3D device mockups.' },
        { phase: '04', title: 'Broadcast Audio Engineering', desc: 'Dialogue clarity leveling, dynamic multiband compression, and stereo music ducking.' },
        { phase: '05', title: '4K Cinematic Color Delivery', desc: 'DaVinci Resolve color consistency across multiple camera angles, lighting conditions, and B-roll.' }
      ],
      deliverables: [
        '16:9 4K UHD Master Video File',
        'YouTube Chapter Markers, Timestamps & End-Screen Cuts',
        '3 Clickable Shorts/Reels Promotional Cutdowns',
        'Isolated Dialogue, Music & SFX Stems',
        'Up to 2 Complete Creative Revisions'
      ],
      toolkit: 'DaVinci Resolve Studio 19, Adobe Premiere Pro 2026, After Effects'
    },
    'cinematic': {
      vol: 'Volume 03',
      title: 'Cinematic Films, Narrative Fiction & Showreels',
      tag: 'Hollywood Visual Craft',
      color: '#E11D48',
      summary: 'For directors, narrative filmmakers, and creators seeking high-end mood, atmospheric texture, and artistic visual storytelling. Features 2.39:1 anamorphic crop, custom film halation, analog 35mm grain emulation, and bespoke orchestral soundscapes.',
      metrics: 'Award-Winning Aesthetics • DaVinci Color Science Mastered',
      pipeline: [
        { phase: '01', title: 'Editorial Assembly & Story Arc', desc: 'Crafting the emotional heartbeat of the film with deliberate, resonant pacing.' },
        { phase: '02', title: 'Speed Ramping & Match Cutting', desc: 'Seamless optical flow transitions, whip pans, and kinetic energy control.' },
        { phase: '03', title: 'Atmospheric VFX & Compositing', desc: 'Sky replacements, light leaks, particle overlays, and organic film grain.' },
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
      vol: 'Volume 04',
      title: 'Brand Commercials & Tech Product Showreels',
      tag: 'High-Conversion Commercial Media',
      color: '#06B6D4',
      summary: 'Designed specifically for tech startups, luxury eCommerce brands, and enterprise software providers like Sorexa Technologies. We turn product features into sleek visual spectacles that drive sales, brand authority, and client inquiries.',
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
      vol: 'Volume 05',
      title: 'Music Videos & Beat-Synchronized Visuals',
      tag: 'Sonic & Visual Synergy',
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
      vol: 'Volume 06',
      title: 'DaVinci Resolve Color Grading & Look Development',
      tag: 'Color Science & Film Emulation',
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
    let fullView = document.getElementById('fullscreenServiceView');

    if (!fullView) {
      fullView = document.createElement('div');
      fullView.id = 'fullscreenServiceView';
      fullView.className = 'fullscreen-stage-view';
      document.body.appendChild(fullView);
    }

    const phasesHtml = data.pipeline.map(p => `
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:22px;">
        <div style="font-family:monospace;font-size:13px;font-weight:900;color:${data.color};letter-spacing:0.14em;text-transform:uppercase;">STAGE ${p.phase}</div>
        <div style="font-family:var(--serif, serif);font-size:22px;font-weight:700;color:#FFF;margin:8px 0;">${p.title}</div>
        <p style="color:var(--muted,#cfc3ac);font-size:15.5px;line-height:1.65;margin:0;">${p.desc}</p>
      </div>
    `).join('');

    const deliverablesHtml = data.deliverables.map(d => `
      <div style="display:flex;align-items:center;gap:12px;background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.22);border-radius:12px;padding:12px 16px;color:#FFF;font-size:16px;">
        <span style="color:#10B981;font-weight:900;font-size:16px;">✓</span>
        <span>${d}</span>
      </div>
    `).join('');

    fullView.innerHTML = `
      <div class="fullscreen-topbar">
        <button class="fullscreen-back-btn" onclick="closeServiceDetail()">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to All Services</span>
        </button>
        <div style="display:flex;align-items:center;gap:12px;">
          <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20want%20to%20book%20the%20${encodeURIComponent(data.title)}%20service." 
             target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:999px;background:#25D366;color:#FFF;font-family:var(--sans);font-weight:900;font-size:14px;letter-spacing:0.1em;text-decoration:none;text-transform:uppercase;">
            WhatsApp Chat ↗
          </a>
          <a href="/contact" 
             style="display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:999px;background:#F59E0B;color:#000;font-family:var(--sans);font-weight:900;font-size:14px;letter-spacing:0.1em;text-decoration:none;text-transform:uppercase;">
            Book This Service &rarr;
          </a>
        </div>
      </div>

      <div class="fullscreen-body-container">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(255,255,255,0.08);border:1px solid ${data.color};color:${data.color};font-size:13px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">
            ${data.vol} • ${data.tag}
          </span>
        </div>

        <h1 style="font-family:var(--serif, serif);font-size:clamp(32px, 5vw, 54px);color:#FFF;margin:0 0 16px 0;line-height:1.15;">
          ${data.title}
        </h1>

        <p style="color:var(--muted,#cfc3ac);font-size:clamp(16px, 1.8vw, 19px);line-height:1.7;max-width:980px;margin-bottom:30px;">
          ${data.summary}
        </p>

        <div style="background:rgba(255,255,255,0.04);border-radius:14px;padding:18px 24px;margin-bottom:48px;border-left:4px solid ${data.color};font-size:16.5px;font-weight:700;color:#FFF;">
          ⚡ Strategic Performance Benchmark: <span style="color:${data.color}">${data.metrics}</span>
        </div>

        <h2 style="font-family:var(--sans,sans-serif);font-size:16px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#FFF;margin:0 0 20px 0;">
          5-Stage End-to-End Production Pipeline
        </h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin-bottom:48px;">
          ${phasesHtml}
        </div>

        <h2 style="font-family:var(--sans,sans-serif);font-size:16px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#FFF;margin:0 0 20px 0;">
          Everything Included In Your Delivery
        </h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:48px;">
          ${deliverablesHtml}
        </div>

        <div style="background:linear-gradient(145deg, rgba(28,21,14,0.95), rgba(18,13,8,0.98));border:1.5px solid rgba(212,175,55,0.3);border-radius:20px;padding:36px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:24px;">
          <div>
            <div style="font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#F59E0B;margin-bottom:6px;">Certified Studio Arsenal</div>
            <div style="color:#FFF;font-size:17px;font-weight:700;">${data.toolkit}</div>
          </div>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <a href="https://wa.me/918449495147" target="_blank" style="padding:14px 28px;border-radius:999px;background:#25D366;color:#FFF;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">
              Direct WhatsApp ↗
            </a>
            <a href="/contact" style="padding:14px 28px;border-radius:999px;background:#F59E0B;color:#000;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">
              Book Creative Brief &rarr;
            </a>
          </div>
        </div>
      </div>
    `;

    fullView.classList.add('active');
    document.body.style.overflow = 'hidden';
    fullView.scrollTop = 0;
  };

  window.closeServiceDetail = function () {
    const fullView = document.getElementById('fullscreenServiceView');
    if (fullView) {
      fullView.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // 4. FULL-SCREEN DEDICATED VIDEO THEATER VIEW (NO POPUP!)
  window.openTheaterVideo = function (title, desc, videoSrc, tag, metric) {
    let theaterView = document.getElementById('fullscreenTheaterView');
    if (!theaterView) {
      theaterView = document.createElement('div');
      theaterView.id = 'fullscreenTheaterView';
      theaterView.className = 'fullscreen-stage-view';
      document.body.appendChild(theaterView);
    }

    theaterView.innerHTML = `
      <div class="fullscreen-topbar">
        <button class="fullscreen-back-btn" onclick="closeTheaterVideo()">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Portfolio</span>
        </button>
        <a href="/contact" style="display:inline-flex;align-items:center;gap:8px;padding:9px 20px;border-radius:999px;background:#F59E0B;color:#000;font-family:var(--sans);font-weight:900;font-size:14px;letter-spacing:0.1em;text-decoration:none;text-transform:uppercase;">
          Book an Edit Like This ↗
        </a>
      </div>

      <div class="fullscreen-body-container" style="max-width:1100px;">
        <div style="width:100%;aspect-ratio:16/9;background:#000;border-radius:20px;overflow:hidden;border:1.5px solid rgba(212,175,55,0.4);box-shadow:0 25px 60px rgba(0,0,0,0.9);margin-bottom:30px;">
          <video id="theaterMainVideo" src="${videoSrc}" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#000;"></video>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:16px;">
          <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#FBBF24;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">
            ${tag || 'Featured Work'}
          </span>
          <span style="color:#10B981;font-weight:800;font-size:13.5px;">${metric || '✦ Verified Delivered Edit'}</span>
        </div>

        <h1 style="font-family:var(--serif);font-size:clamp(26px, 4vw, 40px);color:#FFF;margin-bottom:14px;line-height:1.2;">
          ${title}
        </h1>

        <p style="color:var(--muted);font-size:16px;line-height:1.7;margin-bottom:36px;">
          ${desc}
        </p>

        <div style="background:rgba(255,255,255,0.04);border-radius:16px;padding:24px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
          <div>
            <div style="color:#FFF;font-size:17px;font-weight:700;">Interested in creating a video with this style and pacing?</div>
            <div style="color:var(--muted);font-size:15px;margin-top:4px;">Average delivery is 24-48 hours with 4K mastering and custom sound design.</div>
          </div>
          <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20saw%20your%20project%20'${encodeURIComponent(title)}'%20and%20want%20to%20discuss%20a%20similar%20edit." target="_blank" style="padding:12px 24px;border-radius:999px;background:#25D366;color:#FFF;text-decoration:none;font-weight:900;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;">
            WhatsApp Krishna Directly ↗
          </a>
        </div>
      </div>
    `;

    theaterView.classList.add('active');
    document.body.style.overflow = 'hidden';
    theaterView.scrollTop = 0;

    // Robust Cross-Browser Autoplay Engine with Sound Fallback
    const mainVid = document.getElementById('theaterMainVideo');
    if (mainVid) {
      mainVid.currentTime = 0;
      const playPromise = mainVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(function (err) {
          console.warn('[KXE Theater] Unmuted autoplay blocked by browser policy, falling back to muted autoplay:', err);
          mainVid.muted = true;
          mainVid.play().catch(function () {});

          const existingBtn = document.getElementById('theaterUnmuteBtn');
          if (existingBtn) existingBtn.remove();

          const soundPill = document.createElement('button');
          soundPill.id = 'theaterUnmuteBtn';
          soundPill.innerHTML = '🔊 Tap For Sound';
          soundPill.style.cssText = 'position:absolute;bottom:24px;left:24px;z-index:99;padding:10px 22px;border-radius:999px;background:#F59E0B;color:#000;font-family:sans-serif;font-weight:900;font-size:13px;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(245,158,11,0.6);letter-spacing:0.05em;text-transform:uppercase;';
          soundPill.onclick = function () {
            mainVid.muted = false;
            soundPill.remove();
          };
          const videoContainer = mainVid.parentElement;
          if (videoContainer) {
            videoContainer.style.position = 'relative';
            videoContainer.appendChild(soundPill);
          }
        });
      }
    }
  };

  window.closeTheaterVideo = function () {
    const theaterView = document.getElementById('fullscreenTheaterView');
    if (theaterView) {
      const vid = document.getElementById('theaterMainVideo');
      if (vid) {
        vid.pause();
        vid.src = '';
      }
      const soundBtn = document.getElementById('theaterUnmuteBtn');
      if (soundBtn) soundBtn.remove();
      theaterView.classList.remove('active');
      document.body.style.overflow = '';
    }
  };


  // 6. FULL-SCREEN PRICING EXAMPLE VIDEO SHOWCASE (NO POPUPS!)
  
  // 6. FULL-SCREEN PRICING EXAMPLE VIDEO SHOWCASE (PERFECT BACK NAVIGATION)
  window.isPricingSampleOpen = false;

  window.openPricingExampleVideo = function (title, videoSrc, price, desc) {
    window.isPricingSampleOpen = true;
    let exampleView = document.getElementById('fullscreenPricingExampleView');
    if (!exampleView) {
      exampleView = document.createElement('div');
      exampleView.id = 'fullscreenPricingExampleView';
      exampleView.className = 'fullscreen-stage-view';
      document.body.appendChild(exampleView);
    }

    // Clean plain text version of title & price for WhatsApp link
    const cleanTitle = title.replace(/<[^>]*>?/gm, '').replace(/&mdash;/g, '-').replace(/&amp;/g, '&');
    const cleanPrice = price.replace(/<[^>]*>?/gm, '').replace(/&#8377;/g, 'Rs.');

    exampleView.innerHTML = `
      <div class="fullscreen-topbar" style="position:sticky;top:0;z-index:100;background:rgba(14,10,7,0.96);backdrop-filter:blur(16px);border-bottom:1px solid rgba(212,175,55,0.3);padding:14px clamp(16px, 4vw, 40px);display:flex;align-items:center;justify-content:space-between;gap:16px;">
        <button class="fullscreen-back-btn" onclick="closePricingExampleVideo()" style="display:inline-flex;align-items:center;gap:10px;padding:10px 22px;border-radius:999px;background:rgba(28,20,14,0.95);border:1.5px solid rgba(212,175,55,0.6);color:#FFF2C6;font-family:var(--sans,sans-serif);font-size:13px;font-weight:900;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.5);transition:all 200ms;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>&larr; Back to Pricing Packages</span>
        </button>
        <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20reviewed%20the%20${encodeURIComponent(cleanTitle)}%20sample%20video%20and%20want%20to%20book%20the%20${encodeURIComponent(cleanPrice)}%20package." 
           target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:10px 24px;border-radius:999px;background:#25D366;color:#FFF;font-family:var(--sans,sans-serif);font-weight:900;font-size:13px;letter-spacing:0.06em;text-decoration:none;text-transform:uppercase;box-shadow:0 6px 20px rgba(37,211,102,0.4);transition:transform 0.2s ease;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.124-.519-1.523-.633-2.502-2.179-2.577-2.28-.076-.102-.619-.824-.619-1.572 0-.747.391-1.116.53-1.267.14-.15.305-.188.406-.188.102 0 .204.002.293.007.094.006.22-.036.344.262.13.313.444 1.082.483 1.161.04.079.066.171.013.275-.052.104-.078.169-.155.26-.077.09-.162.201-.231.27-.077.078-.158.163-.068.318.09.155.401.662.86 1.071.59.524 1.088.686 1.243.764.155.078.247.066.339-.04.093-.105.394-.46.5-.618.106-.157.213-.131.357-.079.144.053.916.432 1.073.51.157.079.262.118.3.184.04.066.04.382-.104.787z"/></svg>
          <span>Book On WhatsApp &rarr;</span>
        </a>
      </div>

      <div class="fullscreen-body-container" style="max-width:1380px;width:min(1380px,94vw);margin:30px auto 60px;padding:0 clamp(16px, 3vw, 36px);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
          <span style="display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:999px;background:rgba(212,175,55,0.15);border:1.5px solid rgba(212,175,55,0.45);color:#FBBF24;font-size:11.5px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">
            <span>&#10024; VERIFIED STUDIO DELIVERABLE SAMPLE &#10024;</span>
          </span>
          <span style="color:#10B981;font-weight:900;font-size:14px;background:rgba(16,185,129,0.15);padding:6px 16px;border-radius:999px;border:1.5px solid rgba(16,185,129,0.35);font-family:monospace;">${price} TIER</span>
        </div>

        <h1 style="font-family:var(--serif,serif);font-size:clamp(26px, 3.8vw, 42px);color:#FFF;margin-bottom:8px;line-height:1.2;">
          ${title} &mdash; Sample Edit
        </h1>
        <p style="color:var(--muted,#cfc3ac);font-size:clamp(15px, 1.3vw, 17px);max-width:850px;margin-bottom:32px;line-height:1.65;">
          ${desc}
        </p>

        <!-- DYNAMIC ADAPTIVE STAGE CONTAINER (NO DEAD LETTERBOX VOIDS) -->
        <div id="pricingSampleDynamicStage" class="pricing-sample-grid" style="display:grid;grid-template-columns:minmax(300px, 420px) 1fr;gap:clamp(24px, 3.5vw, 48px);align-items:start;">
          
          <!-- LEFT: VERTICAL / ADAPTIVE CINEMA PLAYER CARD -->
          <div id="pricingSamplePlayerCard" style="position:relative;width:100%;max-width:420px;margin:0 auto;border-radius:26px;overflow:hidden;border:2px solid rgba(212,175,55,0.5);box-shadow:0 30px 80px rgba(0,0,0,0.95), 0 0 40px rgba(245,158,11,0.25);background:#000;">
            
            <!-- Dynamic Aspect Box for Vertical / Reels -->
            <div id="pricingSampleVideoWrapper" style="position:relative;width:100%;aspect-ratio:9/16;background:#000;overflow:hidden;display:flex;align-items:center;justify-content:center;">
              <video id="pricingTheaterVideo" src="${videoSrc}" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;background:#000;display:block;"></video>
            </div>
            
            <!-- Video Bottom Bar -->
            <div style="padding:14px 18px;background:rgba(18,14,10,0.96);border-top:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#F59E0B;font-size:11.5px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;">60FPS 4K PRORES MASTER</span>
              <span style="color:#10B981;font-size:11.5px;font-weight:800;">VERIFIED CLIENT GRADE</span>
            </div>
          </div>

          <!-- RIGHT: COMPLETE DELIVERABLES, TECHNICAL SPECS & DIRECT BOOKING ACTION -->
          <div class="pricing-sample-sidebar" style="display:flex;flex-direction:column;gap:20px;">
            
            <div style="background:linear-gradient(145deg, rgba(28,21,14,0.95), rgba(18,13,8,0.98));border:1.5px solid rgba(212,175,55,0.35);border-radius:22px;padding:28px clamp(20px, 2.5vw, 32px);box-shadow:0 15px 40px rgba(0,0,0,0.6);">
              <span style="display:inline-block;color:#F59E0B;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:12px;">&#9889; WHAT IS DELIVERED IN THIS PACKAGE</span>
              <h3 style="color:#FFF;font-family:var(--serif,serif);font-size:24px;margin-bottom:18px;">
                Full Post-Production Mastery &bull; ${price}
              </h3>

              <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
                <div style="display:flex;align-items:flex-start;gap:10px;">
                  <span style="color:#10B981;font-weight:900;font-size:16px;">&#10003;</span>
                  <span style="color:#E5E7EB;font-size:14.5px;"><strong>4K 60FPS Ultra HD Master</strong> &mdash; Lossless H.264/H.265 export optimized for Instagram Reels, YouTube Shorts, &amp; TikTok algorithms.</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;">
                  <span style="color:#10B981;font-weight:900;font-size:16px;">&#10003;</span>
                  <span style="color:#E5E7EB;font-size:14.5px;"><strong>DaVinci Resolve Studio 19 Color Science</strong> &mdash; Cinematic 35mm film emulation (Kodak 2383 LUTs), skin-tone isolation, and HDR highlights.</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;">
                  <span style="color:#10B981;font-weight:900;font-size:16px;">&#10003;</span>
                  <span style="color:#E5E7EB;font-size:14.5px;"><strong>Viral Retention Pacing &amp; Beat Sync</strong> &mdash; Optical flow frame-blended slow-motion, dynamic whip cuts, and rhythm-locked transitions.</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;">
                  <span style="color:#10B981;font-weight:900;font-size:16px;">&#10003;</span>
                  <span style="color:#E5E7EB;font-size:14.5px;"><strong>Multi-Layer Audio Foley &amp; SFX</strong> &mdash; Custom swooshes, risers, atmospheric sub-bass hits, and crystal-clear voice EQ ducking.</span>
                </div>
                <div style="display:flex;align-items:flex-start;gap:10px;">
                  <span style="color:#10B981;font-weight:900;font-size:16px;">&#10003;</span>
                  <span style="color:#E5E7EB;font-size:14.5px;"><strong>Unlimited Client Revisions</strong> &mdash; 100% satisfaction guarantee with 24-48h rapid turnaround.</span>
                </div>
              </div>

              <!-- Instant WhatsApp Booking CTA -->
              <div style="display:flex;flex-direction:column;gap:12px;">
                <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20reviewed%20the%20${encodeURIComponent(cleanTitle)}%20sample%20video%20and%20want%20to%20book%20the%20${encodeURIComponent(cleanPrice)}%20package." 
                   target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:16px 28px;border-radius:14px;background:linear-gradient(135deg, #25D366, #128C7E);color:#FFF;font-family:var(--sans,sans-serif);font-weight:900;font-size:15px;letter-spacing:0.06em;text-decoration:none;text-transform:uppercase;box-shadow:0 8px 25px rgba(37,211,102,0.45);transition:transform 0.2s ease;">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.124-.519-1.523-.633-2.502-2.179-2.577-2.28-.076-.102-.619-.824-.619-1.572 0-.747.391-1.116.53-1.267.14-.15.305-.188.406-.188.102 0 .204.002.293.007.094.006.22-.036.344.262.13.313.444 1.082.483 1.161.04.079.066.171.013.275-.052.104-.078.169-.155.26-.077.09-.162.201-.231.27-.077.078-.158.163-.068.318.09.155.401.662.86 1.071.59.524 1.088.686 1.243.764.155.078.247.066.339-.04.093-.105.394-.46.5-.618.106-.157.213-.131.357-.079.144.053.916.432 1.073.51.157.079.262.118.3.184.04.066.04.382-.104.787z"/></svg>
                  <span>Book This Package on WhatsApp &rarr;</span>
                </a>

                <button type="button" onclick="closePricingExampleVideo()" style="padding:14px 24px;border-radius:14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);color:#FFF;font-weight:800;font-size:14px;cursor:pointer;transition:all 0.2s ease;">
                  &larr; Return to Pricing Options
                </button>
              </div>

            </div>

            <!-- Guarantee Strip -->
            <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);border-radius:16px;padding:18px 22px;display:flex;align-items:center;gap:14px;">
              <span style="font-size:24px;">&#128737;&#65039;</span>
              <div>
                <div style="color:#10B981;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">Krishna's Personal Guarantee</div>
                <div style="color:#D1D5DB;font-size:13.5px;line-height:1.5;">If the first cut doesn't match your brand vision, you get immediate revisions until it's 100% viral-ready.</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    // Detect video aspect ratio on loadedmetadata
    const vid = document.getElementById('pricingTheaterVideo');
    if (vid) {
      vid.onloadedmetadata = function() {
        const stage = document.getElementById('pricingSampleDynamicStage');
        const card = document.getElementById('pricingSamplePlayerCard');
        const wrapper = document.getElementById('pricingSampleVideoWrapper');
        if (vid.videoWidth && vid.videoHeight && vid.videoWidth > vid.videoHeight) {
          // Horizontal / Widescreen 16:9
          if (stage) stage.style.gridTemplateColumns = '1fr';
          if (card) {
            card.style.maxWidth = '1000px';
          }
          if (wrapper) {
            wrapper.style.aspectRatio = '16/9';
          }
          vid.style.objectFit = 'contain';
        } else {
          // Vertical / Reels 9:16
          if (stage && window.innerWidth >= 820) stage.style.gridTemplateColumns = 'minmax(300px, 420px) 1fr';
          if (card) card.style.maxWidth = '420px';
          if (wrapper) wrapper.style.aspectRatio = '9/16';
          vid.style.objectFit = 'cover';
        }
      };
    }

    exampleView.classList.add('active');
    document.body.style.overflow = 'hidden';
    exampleView.scrollTop = 0;

    // Push state for safe browser back button handling
    try {
      if (window.location.hash !== '#sample-view') {
        history.pushState({ modal: 'pricingSample' }, '', '#sample-view');
      }
    } catch(e) {}
  };

  window.closePricingExampleVideo = function (popHistory = true) {
    window.isPricingSampleOpen = false;
    const exampleView = document.getElementById('fullscreenPricingExampleView');
    if (exampleView) {
      const vid = document.getElementById('pricingTheaterVideo');
      if (vid) {
        vid.pause();
        vid.src = '';
      }
      exampleView.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (popHistory && window.location.hash === '#sample-view') {
      try {
        history.back();
      } catch(e) {}
    }
  };

  // Listen for browser back button / popstate
  window.addEventListener('popstate', function(e) {
    if (window.isPricingSampleOpen) {
      closePricingExampleVideo(false);
    }
    const theaterView = document.getElementById('fullscreenTheaterView');
    if (theaterView && theaterView.classList.contains('active')) {
      closeTheaterVideo(false);
    }
  });

  // Global Back Button Interceptor: if pricing sample or theater is open, Back closes it instead of navigating to previous page!
  document.addEventListener('click', function(e) {
    const backBtn = e.target.closest('.btn-header-back, .floating-nav-btn:not(.home-btn), [data-action="back"]');
    if (backBtn) {
      if (window.isPricingSampleOpen) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closePricingExampleVideo();
        return;
      }
      const theaterView = document.getElementById('fullscreenTheaterView');
      if (theaterView && theaterView.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeTheaterVideo();
        return;
      }
    }
  }, true);

  // Global Floating WhatsApp Button Injector (guarantees WhatsApp is on every single page)
  function ensureGlobalWhatsAppFloat() {
    if (document.querySelector('.wa-float-container')) return;
    const aside = document.createElement('aside');
    aside.className = 'wa-float-container';
    aside.setAttribute('aria-label', 'Direct WhatsApp Contact');
    aside.innerHTML = `
      <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20saw%20your%20video%20portfolio%20and%20want%20to%20discuss%20a%20project%20shoot%20or%20edit." target="_blank" class="wa-float-btn" id="floatingWhatsAppBtn" title="Chat on WhatsApp (+91 8449495147)" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span>WhatsApp Krishna</span>
      </a>
    `;
    document.body.appendChild(aside);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureGlobalWhatsAppFloat);
  } else {
    ensureGlobalWhatsAppFloat();
  }


  // 5. INITIALIZE ON DOM CONTENT LOADED
  document.addEventListener('DOMContentLoaded', () => {
    initUniversalMobileNav();
    initMouseSpotlight();
    initMetricCounters();

  
  // 6. UNIVERSAL MOBILE DRAWER & NAV CLICK ENFORCEMENT
  function initUniversalMobileNav() {
    // Build or attach the drawer
    let drawer = document.getElementById('universalMobileDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'universalMobileDrawer';
      drawer.className = 'universal-mobile-drawer';
      drawer.innerHTML = `
        <div class="drawer-top">
          <a href="/" class="drawer-brand">KRISHNA <span>X</span> EDITZ</a>
          <button type="button" class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close menu">&times;</button>
        </div>
        <nav class="drawer-links-list">
          <a href="/" class="drawer-link"><span>Home</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/services" class="drawer-link"><span>Services &amp; Stages</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/portfolio" class="drawer-link"><span>Curated Portfolio</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/my-work" class="drawer-link"><span>My Works (19 Real Edits)</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/pricing" class="drawer-link"><span>Pricing Packages</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/about" class="drawer-link"><span>About Krishna</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/founder" class="drawer-link"><span>Founder Profile</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/testimonials" class="drawer-link"><span>Client Reviews</span><span class="drawer-link-arrow">&rarr;</span></a>
          <a href="/contact" class="drawer-link"><span>Contact Studio</span><span class="drawer-link-arrow">&rarr;</span></a>
        </nav>
        <div class="drawer-footer-actions">
          <a href="/contact" class="drawer-cta-primary">Book Video Project &rarr;</a>
          <a href="https://www.sorexatech.com/" target="_blank" rel="noopener noreferrer" class="drawer-sorexa-link">Sorexa Tech Official Partner &nearr;</a>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    const closeBtn = document.getElementById('drawerCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Attach to any hamburger button on page
    const menuButtons = document.querySelectorAll('#menuButton, .studio-hamburger');
    menuButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = drawer.classList.contains('active');
        if (isOpen) {
          drawer.classList.remove('active');
          document.body.style.overflow = '';
        } else {
          drawer.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close on link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

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


  // ========================================================
  // GLOBAL ADMIN COMMAND CENTER SHORTCUTS
  // (Alt+A, Ctrl+Shift+A, or 5 quick clicks on brand logo)
  // ========================================================
  window.addEventListener('keydown', (e) => {
    if ((e.altKey && (e.key === 'a' || e.key === 'A')) || 
        (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
      e.preventDefault();
      if (typeof openAdminPortal === 'function') {
        openAdminPortal();
      } else {
        window.location.href = '/admin';
      }
    }
  });

  // 5-click easter egg on brand logo
  let logoClicks = 0;
  let logoTimer = null;
  document.querySelectorAll('.studio-brand-link, .studio-brand-logo, .footer-logo, .brand-wrap').forEach(el => {
    el.addEventListener('click', (e) => {
      logoClicks++;
      clearTimeout(logoTimer);
      if (logoClicks >= 5) {
        logoClicks = 0;
        e.preventDefault();
        if (typeof openAdminPortal === 'function') {
          openAdminPortal();
        } else {
          window.location.href = '/admin';
        }
      } else {
        logoTimer = setTimeout(() => { logoClicks = 0; }, 2000);
      }
    });
  });



  // ========================================================
  // UNIVERSAL LIVE PHONE VIEW SIMULATOR (MOBILE PREVIEW)
  // ========================================================
  function initPhoneViewSimulator() {
    // If inside an iframe, do not initialize
    try {
      if (window.self !== window.top) {
        const floatB = document.getElementById('floatingPhoneViewBtn');
        if (floatB) floatB.style.display = 'none';
        const headB = document.getElementById('headerPhoneViewBtn');
        if (headB) headB.style.display = 'none';
        return;
      }
    } catch(e) {}

    // 1. Inject Phone View button in Studio Header actions
    const headerActions = document.querySelector('.studio-actions-wrap');
    if (headerActions && !document.getElementById('headerPhoneViewBtn')) {
      const headerBtn = document.createElement('button');
      headerBtn.id = 'headerPhoneViewBtn';
      headerBtn.className = 'studio-header-phone-btn';
      headerBtn.setAttribute('type', 'button');
      headerBtn.setAttribute('title', 'Preview live mobile phone layout');
      headerBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
        <span>Phone View</span>
      `;
      headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPhoneSimulator();
      });
      headerActions.insertBefore(headerBtn, headerActions.firstChild);
    }

    // 2. Inject Floating Phone View button (bottom-left)
    if (!document.getElementById('floatingPhoneViewBtn')) {
      const floatBtn = document.createElement('button');
      floatBtn.id = 'floatingPhoneViewBtn';
      floatBtn.className = 'phone-float-btn';
      floatBtn.setAttribute('type', 'button');
      floatBtn.setAttribute('title', 'Switch to Mobile Phone View (iPhone / Android)');
      floatBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
        <span>📱 Phone View</span>
      `;
      floatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPhoneSimulator();
      });
      document.body.appendChild(floatBtn);
    }

    // 3. Build the Simulator Modal
    if (!document.getElementById('phoneSimulatorModal')) {
      const modal = document.createElement('div');
      modal.id = 'phoneSimulatorModal';
      modal.className = 'phone-sim-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="phone-sim-toolbar">
          <div class="phone-sim-title-group">
            <span class="phone-sim-badge">📱 Mobile View</span>
            <div class="phone-sim-device-pills">
              <button type="button" class="phone-sim-device-btn active" data-w="393" data-h="852">iPhone 16 Pro</button>
              <button type="button" class="phone-sim-device-btn" data-w="412" data-h="915">Galaxy S24</button>
              <button type="button" class="phone-sim-device-btn" data-w="375" data-h="667">Compact 375px</button>
            </div>
          </div>
          <div class="phone-sim-actions">
            <button type="button" class="phone-sim-action-btn" id="phoneSimRotateBtn" title="Rotate device orientation">🔄 Rotate</button>
            <button type="button" class="phone-sim-action-btn" id="phoneSimReloadBtn" title="Reload preview">↻ Reload</button>
            <button type="button" class="phone-sim-action-btn" id="phoneSimPopoutBtn" title="Open in real mobile window">↗ Pop-up Window</button>
            <button type="button" class="phone-sim-close-btn" id="phoneSimCloseBtn" title="Close Phone View (Esc)">✕</button>
          </div>
        </div>
        <div class="phone-sim-viewport-wrapper">
          <div class="phone-sim-device" id="phoneSimulatorDevice" style="width: 393px; height: 852px;">
            <div class="phone-sim-island">
              <div class="phone-sim-island-camera"></div>
            </div>
            <div class="phone-sim-statusbar">
              <span id="phoneSimTime">9:41</span>
              <div style="display: flex; align-items: center; gap: 5px;">
                <span>5G</span>
                <span>📶</span>
                <span>🔋 100%</span>
              </div>
            </div>
            <div class="phone-sim-screen-area"><iframe class="phone-sim-iframe" id="phoneSimulatorFrame" title="Mobile Preview Frame" src="about:blank"></iframe></div>
            <div class="phone-sim-home-bar"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Event Listeners for Simulator
      let curW = 393;
      let curH = 852;
      let isRotated = false;

      function updateDeviceSize() {
        const device = document.getElementById('phoneSimulatorDevice');
        if (!device) return;
        const w = isRotated ? curH : curW;
        const h = isRotated ? curW : curH;
        device.style.width = w + 'px';
        device.style.height = h + 'px';
        
        // Auto scale to comfortably fit screen height
        const availH = window.innerHeight - 120;
        const scale = Math.min(1, Math.max(0.55, availH / (h + 30)));
        device.style.transform = `scale(${scale})`;
        device.style.transformOrigin = 'top center';
      }

      // Live Clock
      function updatePhoneClock() {
        const timeEl = document.getElementById('phoneSimTime');
        if (!timeEl) return;
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      setInterval(updatePhoneClock, 10000);
      updatePhoneClock();

      // Device Switchers
      modal.querySelectorAll('.phone-sim-device-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          modal.querySelectorAll('.phone-sim-device-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          curW = parseInt(btn.getAttribute('data-w'), 10);
          curH = parseInt(btn.getAttribute('data-h'), 10);
          updateDeviceSize();
        });
      });

      // Rotate
      const rotateBtn = document.getElementById('phoneSimRotateBtn');
      if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
          isRotated = !isRotated;
          updateDeviceSize();
        });
      }

      // Reload
      const reloadBtn = document.getElementById('phoneSimReloadBtn');
      if (reloadBtn) {
        reloadBtn.addEventListener('click', () => {
          const iframe = document.getElementById('phoneSimulatorFrame');
          if (iframe) iframe.src = window.location.href;
        });
      }

      // Popout
      const popoutBtn = document.getElementById('phoneSimPopoutBtn');
      if (popoutBtn) {
        popoutBtn.addEventListener('click', () => {
          window.open(window.location.href, 'KXE_Mobile_View', `width=${curW},height=${curH},menubar=no,toolbar=no,location=no,status=no,resizable=yes`);
        });
      }

      // Close
      const closeBtn = document.getElementById('phoneSimCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', closePhoneSimulator);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('phone-sim-viewport-wrapper')) {
          closePhoneSimulator();
        }
      });

      window.addEventListener('resize', updateDeviceSize);
    }
  }

  function openPhoneSimulator() {
    const modal = document.getElementById('phoneSimulatorModal');
    const iframe = document.getElementById('phoneSimulatorFrame');
    if (!modal || !iframe) return;
    
    // Set current page url
    if (!iframe.src || iframe.src === 'about:blank' || iframe.src !== window.location.href) {
      iframe.src = window.location.href;
    }
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Trigger size adjustment
    const device = document.getElementById('phoneSimulatorDevice');
    if (device) {
      const availH = window.innerHeight - 120;
      const h = parseInt(device.style.height, 10) || 852;
      const scale = Math.min(1, Math.max(0.55, availH / (h + 30)));
      device.style.transform = `scale(${scale})`;
      device.style.transformOrigin = 'top center';
    }
  }

  function closePhoneSimulator() {
    const modal = document.getElementById('phoneSimulatorModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Keyboard shortcut Esc closes simulator
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('phoneSimulatorModal');
      if (modal && modal.classList.contains('active')) {
        closePhoneSimulator();
      }
    }
  });

  window.openPhoneSimulator = openPhoneSimulator;
  window.closePhoneSimulator = closePhoneSimulator;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhoneViewSimulator);
  } else {
    initPhoneViewSimulator();
  }



  // ========================================================
  // UNIVERSAL CINEMATIC SCROLL REVEAL OBSERVER
  // ========================================================
  function initUniversalScrollReveals() {
    // Select ALL content boxes, cards, videos, stats, and headers across ALL pages
    const selectors = [
      // Section headers & Titles
      '.section-header',
      '.editorial-heading-group',
      '.inquiry-box > h2',
      '.pricing-header',
      
      // All Video Cards & Elements across all pages
      '.real-work-card',
      '.portfolio-item-card',
      '.work-video-card',
      '.vault-card-item',
      '.vault-video-item',
      '.sample-video-box',
      '.theater-video-frame',
      
      // All Content Boxes & Cards ("Dabbe")
      '.sorexa-service-card',
      '.main-price-card',
      '.pricing-card',
      '.pricing-promo-card',
      '.book-tier-card',
      '.channel-card',
      '.perm-client-card',
      '.permanent-client-card',
      '.client-vault-view',
      '.software-luxury-card',
      '.testimonial-card',
      '.book-review-card',
      '.partner-spotlight-card',
      '.engine-card',
      '.inquiry-box',
      '.pricing-cta-box',
      '.faq-item',
      
      // All Data Boxes & Metric Capsules
      '.metric-capsule',
      '.stat-card',
      '.stat-badge-box',
      '.adm-stat-card',
      '.portfolio-metrics-grid > div',
      '.stats-grid > div',
      '.works-stats-grid > div',
      '.founder-grid',
      '.founder-executive-grid',
      '.filter-tabs-row',
      '.portfolio-filters-wrap',
      '.reveal-elem',
      '.sorexa-card-reveal'
    ];

    const targets = document.querySelectorAll(selectors.join(', '));
    if (!targets.length) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('kxe-in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          entry.target.classList.add('kxe-in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '60px 0px 60px 0px',
      threshold: 0.02
    });

    // Helper to apply stagger index
    targets.forEach(el => {
      el.classList.add('kxe-reveal');

      const parent = el.parentElement;
      if (parent) {
        const isGrid = parent.classList.contains('real-works-grid') || 
                       parent.classList.contains('services-grid') || 
                       parent.classList.contains('stats-grid') || 
                       parent.classList.contains('channels-grid') || 
                       parent.classList.contains('contact-channels-grid') ||
                       parent.classList.contains('permanent-clients-grid') ||
                       parent.classList.contains('portfolio-gallery-grid') ||
                       parent.classList.contains('portfolio-metrics-grid') ||
                       parent.classList.contains('packages-grid') ||
                       parent.classList.contains('main-pricing-grid') ||
                       parent.classList.contains('engines-grid') ||
                       parent.classList.contains('software-cards-grid') ||
                       parent.classList.contains('testimonials-grid') ||
                       parent.classList.contains('founder-grid') ||
                       parent.id === 'reviewsGrid';

        if (isGrid) {
          const siblings = Array.from(parent.children);
          const index = Math.max(0, siblings.indexOf(el));
          const delayClass = 'kxe-delay-' + Math.min(index, 11);
          el.classList.add(delayClass);
          const delayMs = Math.min(index * 75, 850);
          el.style.setProperty('transition-delay', delayMs + 'ms', 'important');
        }
      }

      observer.observe(el);
    });

    function checkVisibleElements() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach(el => {
        if (el.classList.contains('kxe-in-view')) return;
        const rect = el.getBoundingClientRect();
        // Element is visible, near viewport, or already scrolled past
        if (rect.top <= vh * 1.15) {
          el.classList.add('kxe-in-view');
        }
      });
    }

    window.addEventListener('scroll', checkVisibleElements, { passive: true });
    window.addEventListener('resize', checkVisibleElements, { passive: true });

    // On page load: Smoothly trigger elements visible in initial viewport
    setTimeout(() => { checkVisibleElements(); }, 100);
    setTimeout(() => { checkVisibleElements(); }, 350);
    setTimeout(() => { checkVisibleElements(); }, 750);
    // Absolute safety sweep: ensure no content remains hidden or missing on phone or iframes
    setTimeout(() => {
      targets.forEach(el => el.classList.add('kxe-in-view'));
    }, 1200);
  }

  // Expose globally for dynamic renders (e.g. after filter, review load, vault open)
  window.refreshScrollReveals = function() {
    initUniversalScrollReveals();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUniversalScrollReveals);
  } else {
    initUniversalScrollReveals();
  }


    // ========================================================
  // SOREXA TECHNOLOGY TEXT REVEAL ENGINE (HERO & ALL SECTIONS)
  // ========================================================
  function initSorexaTextReveals() {
    // 1. HOME HERO ENTRANCE (Khulte hi bottom to top text reveal)
    const kicker = document.querySelector('.hero-kicker-badge');
    const title1 = document.querySelector('.title-row-krishna');
    const title2 = document.querySelector('.title-row-bottom');
    const manifesto = document.querySelector('.brand-manifesto');
    const heroBtn = document.querySelector('.inner-btn-explore');

    const heroElements = [
      { el: kicker, cls: 'sorexa-hero-kicker' },
      { el: title1, cls: 'sorexa-hero-title-1' },
      { el: title2, cls: 'sorexa-hero-title-2' },
      { el: manifesto, cls: 'sorexa-hero-manifesto' },
      { el: heroBtn, cls: 'sorexa-hero-cta' }
    ];

    heroElements.forEach(item => {
      if (item.el) {
        item.el.classList.add('sorexa-text-reveal', item.cls);
      }
    });

    // Also target inner page hero titles (About, Services, Contact, etc.)
    const pageHeroTitle = document.querySelector('.page-hero-title');
    const pageHeroEyebrow = document.querySelector('.section-header:first-of-type .section-eyebrow, header + main .section-eyebrow');
    const pageHeroDesc = document.querySelector('.page-hero-title + .section-desc, .section-header:first-of-type .section-desc');

    if (pageHeroEyebrow) {
      pageHeroEyebrow.classList.add('sorexa-text-reveal', 'sorexa-hero-kicker');
    }
    if (pageHeroTitle) {
      pageHeroTitle.classList.add('sorexa-text-reveal', 'sorexa-hero-title-1');
    }
    if (pageHeroDesc) {
      pageHeroDesc.classList.add('sorexa-text-reveal', 'sorexa-hero-manifesto');
    }

    // Trigger hero text slide up after microtask so transition plays visibly on load
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroElements.forEach(item => {
          if (item.el) item.el.classList.add('sorexa-in');
        });
        if (pageHeroEyebrow) pageHeroEyebrow.classList.add('sorexa-in');
        if (pageHeroTitle) pageHeroTitle.classList.add('sorexa-in');
        if (pageHeroDesc) pageHeroDesc.classList.add('sorexa-in');
      }, 50);
    });

    // 2. ALL SECTION HEADERS ACROSS THE SITE (On Scroll or Load)
    const sectionHeaders = document.querySelectorAll('.section-header, .editorial-heading-group, .inquiry-box > h2, .pricing-header');
    if (!sectionHeaders.length) return;

    sectionHeaders.forEach(header => {
      const eyebrow = header.querySelector('.section-eyebrow, .vault-eyebrow');
      const title = header.querySelector('.section-title, .page-hero-title, .inquiry-title, h2, h3');
      const desc = header.querySelector('.section-desc, .inquiry-subtitle, p');

      if (eyebrow) eyebrow.classList.add('sorexa-text-reveal', 'sorexa-stagger-1');
      if (title) title.classList.add('sorexa-text-reveal', 'sorexa-stagger-2');
      if (desc) desc.classList.add('sorexa-text-reveal', 'sorexa-stagger-3');
    });

    // Observer to trigger section text slide-up as it comes into view
    const sorexaObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          const header = entry.target;
          header.querySelectorAll('.sorexa-text-reveal').forEach(el => el.classList.add('sorexa-in'));
          obs.unobserve(header);
        }
      });
    }, {
      root: null,
      rootMargin: '40px 0px 40px 0px',
      threshold: 0.05
    });

    sectionHeaders.forEach(header => sorexaObserver.observe(header));

    // High-FPS (50/60/120Hz) RequestAnimationFrame Throttled Scroll Engine
    let sorexaScrollTicking = false;
    function checkSorexaVisible() {
      if (sorexaScrollTicking) return;
      sorexaScrollTicking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        sectionHeaders.forEach(header => {
          const rect = header.getBoundingClientRect();
          if (rect.top <= vh * 0.92) {
            header.querySelectorAll('.sorexa-text-reveal').forEach(el => el.classList.add('sorexa-in'));
          }
        });
        sorexaScrollTicking = false;
      });
    }

    window.addEventListener('scroll', checkSorexaVisible, { passive: true });
    window.addEventListener('resize', checkSorexaVisible, { passive: true });
    setTimeout(checkSorexaVisible, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSorexaTextReveals);
  } else {
    initSorexaTextReveals();
  }

})();


  // ========================================================
  // AUTOMATED FESTIVAL DECORATIONS & DYNAMIC DISCOUNT ENGINE
  // Comprehensive Calendar with 7-10 Days Advance Lead Time (Hindu, Muslim, Christian, Sikh, National)
  // Managed Exclusively in /admin (No Public Switcher)
  // ========================================================

  const KXE_FESTIVALS = {
    diwali: {
      id: 'diwali',
      name: 'Diwali Festive Utsav & Dhanteras',
      badge: '🪔 DIWALI SPECIAL',
      tagline: 'SHUBH DIWALI DHAMAKA SALE',
      defaultDiscount: 15,
      code: 'DIWALI15',
      headline: 'FLAT 15% OFF On All Cinematic Video Edits & Retainers!',
      themeClass: 'kxe-festive-diwali',
      primaryColor: '#F59E0B',
      icon: '🪔',
      decorType: 'diya_candle',
      bulbColors: ['#FFD700', '#F59E0B', '#EF4444', '#10B981', '#38BDF8', '#EC4899', '#F97316', '#EAB308'],
      // 10 days advance lead time (Oct 18 – Nov 12)
      dateCheck: (m, d) => (m === 10 && d >= 18) || (m === 11 && d <= 12)
    },
    halloween: {
      id: 'halloween',
      name: 'Halloween Spooktacular',
      badge: '🎃 HALLOWEEN SPECIAL',
      tagline: 'HALLOWEEN SPOOKTACULAR SALE',
      defaultDiscount: 10,
      code: 'SPOOKY10',
      headline: 'FLAT 10% OFF On All High-Retention Video Edits!',
      themeClass: 'kxe-festive-halloween',
      primaryColor: '#F97316',
      icon: '🎃',
      decorType: 'pumpkin',
      bulbColors: ['#F97316', '#EA580C', '#7C3AED', '#22C55E', '#A855F7', '#FBBF24', '#EF4444', '#F59E0B'],
      // 9 days advance lead time (Oct 22 – Nov 2)
      dateCheck: (m, d) => (m === 10 && d >= 22 && d <= 31) || (m === 11 && d <= 2)
    },
    newyear: {
      id: 'newyear',
      name: 'Christmas & New Year Mega Carnival',
      badge: '🎄 NEW YEAR SPECIAL',
      tagline: 'NEW YEAR MEGA CELEBRATION',
      defaultDiscount: 20,
      code: 'NEWYEAR20',
      headline: 'FLAT 20% OFF — Start The New Year With Master Edits!',
      themeClass: 'kxe-festive-newyear',
      primaryColor: '#EF4444',
      icon: '🎄',
      decorType: 'candle',
      bulbColors: ['#EF4444', '#10B981', '#FFD700', '#38BDF8', '#FFFFFF', '#F59E0B', '#34D399', '#F43F5E'],
      // 10 days advance lead time (Dec 15 – Jan 6)
      dateCheck: (m, d) => (m === 12 && d >= 15) || (m === 1 && d <= 6)
    },
    republic: {
      id: 'republic',
      name: 'Republic Day Celebration',
      badge: '🇮🇳 REPUBLIC DAY',
      tagline: 'REPUBLIC DAY PATRIOTIC SALE',
      defaultDiscount: 10,
      code: 'REPUBLIC10',
      headline: 'FLAT 10% OFF On All Creative Video Productions!',
      themeClass: 'kxe-festive-republic',
      primaryColor: '#F97316',
      icon: '🇮🇳',
      decorType: 'tiranga',
      bulbColors: ['#FF9933', '#FFFFFF', '#138808', '#FF9933', '#FFFFFF', '#138808'],
      // 9 days advance lead time (Jan 17 – Jan 28)
      dateCheck: (m, d) => m === 1 && d >= 17 && d <= 28
    },
    shivratri: {
      id: 'shivratri',
      name: 'Maha Shivratri Divine Utsav',
      badge: '🔱 SHIVRATRI SPECIAL',
      tagline: 'MAHA SHIVRATRI UTSAV SALE',
      defaultDiscount: 10,
      code: 'SHIVRATRI10',
      headline: 'FLAT 10% OFF On All Cinematic & Cultural Master Edits!',
      themeClass: 'kxe-festive-shivratri',
      primaryColor: '#38BDF8',
      icon: '🔱',
      decorType: 'diya_candle',
      bulbColors: ['#38BDF8', '#818CF8', '#FFD700', '#06B6D4', '#A78BFA', '#FBBF24'],
      // 7 days advance lead time (Feb 18 – March 4)
      dateCheck: (m, d) => (m === 2 && d >= 18) || (m === 3 && d <= 4)
    },
    holi: {
      id: 'holi',
      name: 'Holi Colors of Cinema Utsav',
      badge: '🎨 HOLI UTSAV',
      tagline: 'RANG-BARSE HOLI SPECIAL',
      defaultDiscount: 12,
      code: 'HOLI12',
      headline: 'FLAT 12% OFF — Splash High-End Colors Onto Your Content!',
      themeClass: 'kxe-festive-holi',
      primaryColor: '#EC4899',
      icon: '🎨',
      decorType: 'colors',
      bulbColors: ['#EC4899', '#06B6D4', '#EAB308', '#8B5CF6', '#22C55E', '#F97316', '#FF1493', '#00F2FE'],
      // 8 days advance lead time (March 12 – March 29)
      dateCheck: (m, d) => m === 3 && d >= 12 && d <= 29
    },
    eid_fitr: {
      id: 'eid_fitr',
      name: 'Eid ul-Fitr Mubarak',
      badge: '🌙 EID MUBARAK',
      tagline: 'EID UL-FITR CELEBRATION SALE',
      defaultDiscount: 12,
      code: 'EID12',
      headline: 'FLAT 12% OFF On All Brand Campaigns & Viral Visuals!',
      themeClass: 'kxe-festive-eid',
      primaryColor: '#10B981',
      icon: '🌙',
      decorType: 'fanoos',
      bulbColors: ['#10B981', '#34D399', '#FFD700', '#059669', '#FBBF24', '#06B6D4', '#6EE7B7', '#FCD34D'],
      // 10 days advance lead time (March 24 – April 16)
      dateCheck: (m, d) => (m === 3 && d >= 24) || (m === 4 && d <= 16)
    },
    eid_adha: {
      id: 'eid_adha',
      name: 'Eid ul-Adha (Bakrid) Mubarak',
      badge: '🌙 BAKRID SPECIAL',
      tagline: 'EID UL-ADHA BLESSED SALE',
      defaultDiscount: 10,
      code: 'BAKRID10',
      headline: 'FLAT 10% OFF On All Master Video Packages & Retainers!',
      themeClass: 'kxe-festive-eid',
      primaryColor: '#10B981',
      icon: '🌙',
      decorType: 'fanoos',
      bulbColors: ['#10B981', '#34D399', '#FFD700', '#059669', '#FBBF24', '#06B6D4'],
      // 7 days advance lead time (June 5 – June 20)
      dateCheck: (m, d) => m === 6 && d >= 5 && d <= 20
    },
    independence: {
      id: 'independence',
      name: 'Independence Day Freedom Festival',
      badge: '🇮🇳 AZADI SPECIAL',
      tagline: 'INDEPENDENCE DAY FREEDOM SALE',
      defaultDiscount: 15,
      code: 'AZADI15',
      headline: 'FLAT 15% OFF On All Commercial & YouTube Productions!',
      themeClass: 'kxe-festive-independence',
      primaryColor: '#F97316',
      icon: '🇮🇳',
      decorType: 'tiranga',
      bulbColors: ['#FF9933', '#FFFFFF', '#138808', '#FF9933', '#FFFFFF', '#138808'],
      // 10 days advance lead time (Aug 5 – Aug 18)
      dateCheck: (m, d) => m === 8 && d >= 5 && d <= 18
    },
    rakhi: {
      id: 'rakhi',
      name: 'Raksha Bandhan Utsav',
      badge: '🧵 RAKHI SPECIAL',
      tagline: 'RAKSHA BANDHAN UTSAV SALE',
      defaultDiscount: 10,
      code: 'RAKHI10',
      headline: 'FLAT 10% OFF — Celebrate The Sacred Bond With Film Edits!',
      themeClass: 'kxe-festive-rakhi',
      primaryColor: '#F59E0B',
      icon: '🧵',
      decorType: 'diya_candle',
      bulbColors: ['#F59E0B', '#EF4444', '#FFD700', '#F97316', '#FBBF24'],
      // 7 days advance lead time (Aug 18 – Aug 28)
      dateCheck: (m, d) => m === 8 && d >= 18 && d <= 28
    },
    janmashtami: {
      id: 'janmashtami',
      name: 'Shree Krishna Janmashtami Mahotsav',
      badge: '🪶 JANMASHTAMI SPECIAL',
      tagline: 'SHREE KRISHNA JANMASHTAMI DHAMAKA',
      defaultDiscount: 15,
      code: 'KRISHNA15',
      headline: 'FLAT 15% OFF — Signature Krishna X Editz Founder Special!',
      themeClass: 'kxe-festive-janmashtami',
      primaryColor: '#00F2FE',
      icon: '🪶',
      decorType: 'mor_pankh',
      bulbColors: ['#00F2FE', '#FFD700', '#38BDF8', '#10B981', '#818CF8', '#F59E0B'],
      // 7 days advance lead time (Aug 26 – Sept 6)
      dateCheck: (m, d) => (m === 8 && d >= 26) || (m === 9 && d <= 6)
    },
    ganesh: {
      id: 'ganesh',
      name: 'Ganesh Chaturthi Mahotsav',
      badge: '🐘 GANPATI BAPPA SPECIAL',
      tagline: 'GANESH CHATURTHI UTSAV SALE',
      defaultDiscount: 12,
      code: 'GANPATI12',
      headline: 'FLAT 12% OFF — Auspicious Beginnings For Your Content!',
      themeClass: 'kxe-festive-ganesh',
      primaryColor: '#EA580C',
      icon: '🐘',
      decorType: 'diya_candle',
      bulbColors: ['#EA580C', '#FFD700', '#F59E0B', '#DC2626', '#FBBF24'],
      // 7 days advance lead time (Sept 6 – Sept 20)
      dateCheck: (m, d) => m === 9 && d >= 6 && d <= 20
    },
    navratri: {
      id: 'navratri',
      name: 'Navratri, Durga Puja & Dussehra',
      badge: '🪔 NAVRATRI UTSAV',
      tagline: 'SHUBH NAVRATRI & DUSSEHRA SALE',
      defaultDiscount: 15,
      code: 'NAVRATRI15',
      headline: 'FLAT 15% OFF On All Cinematic & Viral Visual Campaigns!',
      themeClass: 'kxe-festive-navratri',
      primaryColor: '#DC2626',
      icon: '🪔',
      decorType: 'diya_candle',
      bulbColors: ['#DC2626', '#FFD700', '#F59E0B', '#EC4899', '#38BDF8'],
      // 8 days advance lead time (Oct 1 – Oct 16)
      dateCheck: (m, d) => m === 10 && d >= 1 && d <= 16
    },
    gurpurab: {
      id: 'gurpurab',
      name: 'Guru Nanak Jayanti (Gurpurab)',
      badge: '🕯️ GURPURAB SPECIAL',
      tagline: 'GURU NANAK JAYANTI BLESSED SALE',
      defaultDiscount: 10,
      code: 'GURPURAB10',
      headline: 'FLAT 10% OFF On All Divine & Cultural Video Masterpieces!',
      themeClass: 'kxe-festive-gurpurab',
      primaryColor: '#FFD700',
      icon: '🕯️',
      decorType: 'candle',
      bulbColors: ['#FFD700', '#F59E0B', '#FBBF24', '#FFF2B2', '#D97706'],
      // 7 days advance lead time (Nov 8 – Nov 20)
      dateCheck: (m, d) => m === 11 && d >= 8 && d <= 20
    },
    standard: {
      id: 'standard',
      name: 'Studio Welcome Privilege',
      badge: '⚡ STUDIO PRIVILEGE',
      tagline: 'LIMITED CLIENT PRIVILEGE',
      defaultDiscount: 10,
      code: 'KXE10',
      headline: 'FLAT 10% OFF On Your First Project Or Retainer!',
      themeClass: 'kxe-festive-standard',
      primaryColor: '#F59E0B',
      icon: '⚡',
      decorType: 'subtle',
      bulbColors: ['#F59E0B', '#FFD700', '#FBBF24', '#D97706', '#F59E0B', '#FFF2C6'],
      dateCheck: () => true
    }
  };

  let currentFestiveState = {
    fest: null,
    discount: 15,
    mode: 'auto',
    active: true
  };

  // Helper to construct SVG Clay Diya with realistic flickering flame
  function createClayDiyaHTML() {
    return `
      <span class="kxe-clay-diya kxe-in-content-festive" aria-hidden="true">
        <span class="kxe-diya-flame"></span>
        <span class="kxe-diya-base"></span>
      </span>
    `;
  }

  // Helper to construct Wax Candle with flame
  function createMomBattiHTML() {
    return `
      <span class="kxe-mom-batti kxe-in-content-festive" aria-hidden="true">
        <span class="kxe-candle-flame"></span>
        <span class="kxe-candle-wick"></span>
        <span class="kxe-candle-body"></span>
      </span>
    `;
  }

  // Helper to construct Tirchi-Mirchi Fairy String Divider
  function createMirchiDividerHTML(bulbColors) {
    const colors = bulbColors || ['#FFD700', '#F59E0B', '#EF4444', '#10B981', '#38BDF8'];
    const bulbs = Array.from({ length: 18 }).map((_, i) => {
      const c = colors[i % colors.length];
      return `<div class="kxe-mirchi-bulb" style="background:${c}; color:${c};"></div>`;
    }).join('');

    return `
      <div class="kxe-mirchi-divider kxe-in-content-festive" aria-hidden="true">
        <div class="kxe-mirchi-wire"></div>
        ${bulbs}
      </div>
    `;
  }

  // Auto-detect festival from calendar date (Supports 7-10 days lead time)
  function detectCalendarFestival() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    // Priority Check in chronological sequence of significance
    const priorityList = [
      'diwali', 'halloween', 'newyear', 'republic', 'shivratri',
      'holi', 'eid_fitr', 'eid_adha', 'independence', 'rakhi',
      'janmashtami', 'ganesh', 'navratri', 'gurpurab'
    ];

    for (const key of priorityList) {
      const fest = KXE_FESTIVALS[key];
      if (fest && fest.dateCheck(month, day)) {
        return fest;
      }
    }

    return KXE_FESTIVALS.standard;
  }

  // Render In-Content Decorations (Diyas, Mom-battiyan, Mirchi lights between sections)
  function renderInContentDecorations(fest) {
    // 1. Remove previous in-content decorations
    document.querySelectorAll('.kxe-in-content-festive').forEach(el => el.remove());

    if (!fest || fest.id === 'off' || fest.decorType === 'subtle') return;

    // 2. Add Diya/Candle flanking accents to main Section Titles
    const sectionTitles = document.querySelectorAll('.section-title, .page-hero-title');
    sectionTitles.forEach((title, idx) => {
      if (idx > 3) return; // Top 3-4 key sections
      const wrapper = document.createElement('div');
      wrapper.className = 'section-header-festive-flankers kxe-in-content-festive';

      if (fest.decorType === 'diya_candle' || fest.id === 'diwali') {
        wrapper.innerHTML = `
          ${createClayDiyaHTML()}
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #F59E0B;">✦ ${fest.badge} ✦</span>
          ${createMomBattiHTML()}
        `;
      } else if (fest.id === 'newyear') {
        wrapper.innerHTML = `
          ${createMomBattiHTML()}
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #EF4444;">✦ ❄️ NEW YEAR FESTIVAL ❄️ ✦</span>
          ${createMomBattiHTML()}
        `;
      } else if (fest.id === 'halloween') {
        wrapper.innerHTML = `
          <span style="font-size: 20px;">🎃</span>
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #F97316;">✦ SPOOKTACULAR FESTIVAL ✦</span>
          <span style="font-size: 20px;">🦇</span>
        `;
      } else if (fest.id === 'janmashtami') {
        wrapper.innerHTML = `
          <span style="font-size: 20px;">🪶</span>
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #00F2FE;">✦ SHREE KRISHNA JANMASHTAMI ✦</span>
          <span style="font-size: 20px;">🪈</span>
        `;
      }

      if (title.parentElement && !title.parentElement.querySelector('.section-header-festive-flankers')) {
        title.parentElement.insertBefore(wrapper, title);
      }
    });

    // 3. Insert Tirchi-Mirchi Lights Dividers between content sections
    const dividerTargets = document.querySelectorAll('.real-works-grid, .services-grid, .packages-grid, .main-pricing-grid');
    dividerTargets.forEach(grid => {
      if (grid.parentElement) {
        const divContainer = document.createElement('div');
        divContainer.innerHTML = createMirchiDividerHTML(fest.bulbColors);
        const dividerNode = divContainer.firstElementChild;
        grid.parentElement.insertBefore(dividerNode, grid);
      }
    });

    // 4. Place a decorative Diya/Candle on the top corner of featured cards
    const featuredCards = document.querySelectorAll('#permCard-sorexa, .pricing-promo-card, .stat-card.gold');
    featuredCards.forEach(card => {
      card.style.position = 'relative';
      const corner = document.createElement('div');
      corner.className = 'card-festive-corner-diya kxe-in-content-festive';
      corner.innerHTML = fest.id === 'diwali' ? createClayDiyaHTML() : (fest.id === 'newyear' ? createMomBattiHTML() : `<span style="font-size:18px;">${fest.icon}</span>`);
      card.appendChild(corner);
    });
  }

  // Mount or update all festive visual decorations & discounts
  function applyFestiveTheme(fest, discountOverride) {
    if (!fest) return;
    const discount = discountOverride || fest.defaultDiscount;
    currentFestiveState.fest = fest;
    currentFestiveState.discount = discount;

    // 1. Update Document Root Colors & Theme Class
    document.documentElement.style.setProperty('--festive-primary', fest.primaryColor);
    document.documentElement.style.setProperty('--festive-border', fest.primaryColor + 'aa');
    document.documentElement.style.setProperty('--festive-glow', fest.primaryColor + '44');

    // Remove other festive classes and add current
    Object.values(KXE_FESTIVALS).forEach(f => document.body.classList.remove(f.themeClass));
    document.body.classList.add(fest.themeClass);

    // 2. Render / Update Top Announcement Ribbon
    let ribbon = document.getElementById('kxeFestiveRibbon');
    if (!ribbon) {
      ribbon = document.createElement('div');
      ribbon.id = 'kxeFestiveRibbon';
      ribbon.className = 'kxe-festive-ribbon';
      document.body.insertBefore(ribbon, document.body.firstChild);
    }

    const isDismissed = sessionStorage.getItem('kxe_festive_dismissed') === fest.id;
    if (isDismissed) {
      ribbon.style.display = 'none';
      document.body.classList.remove('has-festive-ribbon');
    } else {
      ribbon.style.display = 'flex';
      document.body.classList.add('has-festive-ribbon');
      ribbon.innerHTML = `
        <div class="kxe-festive-ribbon-inner">
          <span class="festive-tag-pill">${fest.badge}</span>
          <span class="festive-headline-text">
            <strong>${fest.tagline}:</strong> FLAT ${discount}% OFF On All Video Edits!
          </span>
          <span class="festive-coupon-box" onclick="window.copyFestiveCode('${fest.code}')" title="Click to Copy Coupon Code">
            <span class="festive-coupon-code">${fest.code}</span>
            <span class="festive-coupon-hint">Tap to Copy</span>
          </span>
          <a href="/pricing" class="festive-action-btn">Claim Offer ↗</a>
          <button type="button" class="festive-dismiss-btn" onclick="window.dismissFestiveBanner('${fest.id}')" aria-label="Dismiss banner">✕</button>
        </div>
      `;
    }

    // 3. Render / Update Festive Jhalar (Fairy Lights Garland Across Top)
    let garland = document.getElementById('kxeFestiveGarland');
    if (!garland) {
      garland = document.createElement('div');
      garland.id = 'kxeFestiveGarland';
      garland.className = 'kxe-festive-garland';
      garland.setAttribute('aria-hidden', 'true');
      document.body.appendChild(garland);
    }

    const bulbCount = window.innerWidth < 600 ? 14 : 28;
    const bulbHTML = Array.from({ length: bulbCount }).map((_, i) => {
      const color = fest.bulbColors[i % fest.bulbColors.length];
      return `<div class="kxe-fairy-bulb" style="background:${color}; color:${color};"></div>`;
    }).join('');

    garland.innerHTML = `
      <div class="kxe-garland-wire"></div>
      ${bulbHTML}
    `;

    // 4. Render Ambient Floating Particles
    let particlesWrap = document.getElementById('kxeFestiveParticles');
    if (!particlesWrap) {
      particlesWrap = document.createElement('div');
      particlesWrap.id = 'kxeFestiveParticles';
      particlesWrap.className = 'kxe-festive-particles-wrap';
      particlesWrap.setAttribute('aria-hidden', 'true');
      document.body.appendChild(particlesWrap);
    }

    const particleCount = window.innerWidth < 600 ? 6 : 12;
    particlesWrap.innerHTML = Array.from({ length: particleCount }).map((_, i) => {
      const left = Math.round((i / particleCount) * 100) + (Math.random() * 6 - 3);
      const delay = (i * 0.7).toFixed(1);
      const duration = (6 + (i % 4)).toFixed(1);
      
      let innerSymbol = '';
      if (fest.id === 'halloween') {
        innerSymbol = i % 2 === 0 ? '🦇' : '🎃';
      } else if (fest.id === 'newyear') {
        innerSymbol = '❄';
      } else if (fest.id === 'janmashtami') {
        innerSymbol = '🪶';
      } else if (fest.id === 'eid_fitr' || fest.id === 'eid_adha') {
        innerSymbol = '✨';
      }

      return `<div class="kxe-festive-particle" style="left:${left}%; animation-delay:${delay}s; animation-duration:${duration}s;">${innerSymbol}</div>`;
    }).join('');

    // 5. In-Content Decorations (Diyas, Mom-battiyan & Mirchi Lights)
    renderInContentDecorations(fest);

    // 6. Apply Dynamic Pricing Strikethrough & WhatsApp Discount Link Update
    applyDynamicPricingDiscounts(fest, discount);

    // Ensure public floating switcher button is completely removed
    const oldFloatBtn = document.getElementById('kxeFestiveFloatBtn');
    if (oldFloatBtn) oldFloatBtn.remove();
    const oldModal = document.getElementById('kxeFestiveModal');
    if (oldModal) oldModal.remove();
  }

  // Scan and calculate dynamic discounts on all pricing elements
  function applyDynamicPricingDiscounts(fest, discount) {
    const priceElements = document.querySelectorAll('.price-card-amount, .main-price-card span, .pricing-card div > span, .book-tier-card .tier-price');
    
    priceElements.forEach(el => {
      let rawNum = el.dataset.originalPrice ? parseInt(el.dataset.originalPrice, 10) : 0;
      if (!rawNum) {
        const txt = el.textContent || '';
        const match = txt.match(/₹\s*([0-9,]+)/);
        if (match) {
          rawNum = parseInt(match[1].replace(/,/g, ''), 10);
          if (rawNum > 0) el.dataset.originalPrice = rawNum;
        }
      }

      if (rawNum > 0) {
        const discounted = Math.round(rawNum * (1 - discount / 100));
        const savings = rawNum - discounted;

        el.innerHTML = `
          <span class="kxe-orig-price-strike">₹${rawNum.toLocaleString()}</span>
          <span class="kxe-festive-price">₹${discounted.toLocaleString()}</span>
          <span class="kxe-festive-save-badge">Save ₹${savings.toLocaleString()} (${discount}% OFF)</span>
        `;
      }
    });

    // Update WhatsApp Booking Links with festival promo message
    const waLinks = document.querySelectorAll('a[href*="wa.me/918449495147"]');
    waLinks.forEach(link => {
      const originalHref = link.getAttribute('data-orig-href') || link.href;
      link.setAttribute('data-orig-href', originalHref);

      try {
        const url = new URL(originalHref);
        let text = url.searchParams.get('text') || 'Hi Krishna!';
        
        if (!text.includes(fest.code)) {
          text = text.replace(/(\.|\?|$)/, ` with ${fest.name} discount (Code: ${fest.code} — ${discount}% OFF)!`);
          url.searchParams.set('text', text);
          link.href = url.toString();
        }
      } catch (e) {}
    });
  }

  // Copy festival code helper
  window.copyFestiveCode = function(code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        alert('🎉 Festival Code "' + code + '" copied to clipboard! Paste it on WhatsApp to claim your discount.');
      });
    } else {
      prompt('Copy your festival discount code:', code);
    }
  };

  // Dismiss top ribbon for session
  window.dismissFestiveBanner = function(festId) {
    sessionStorage.setItem('kxe_festive_dismissed', festId);
    const ribbon = document.getElementById('kxeFestiveRibbon');
    if (ribbon) ribbon.style.display = 'none';
    document.body.classList.remove('has-festive-ribbon');
  };

  // Initialize Festival Automation Engine
  async function initFestivalEngine() {
    let mode = 'auto';
    let discountOverride = null;

    // Check URL query parameters (for Admin testing e.g. ?fest=diwali or ?fest=eid_fitr)
    const urlParams = new URLSearchParams(window.location.search);
    const queryFest = urlParams.get('fest') || urlParams.get('festival');
    if (queryFest) {
      mode = queryFest.toLowerCase();
    } else {
      // Fetch authoritative config from server
      try {
        const res = await fetch('/api/festival');
        const data = await res.json();
        if (data && data.success && data.data) {
          mode = data.data.mode || 'auto';
          discountOverride = data.data.discount;
        }
      } catch (e) {
        // Fallback to localStorage
        const savedMode = localStorage.getItem('kxe_festival_mode');
        if (savedMode) mode = savedMode;
      }
    }

    if (mode === 'off') {
      currentFestiveState.mode = 'off';
      document.querySelectorAll('.kxe-in-content-festive, #kxeFestiveRibbon, #kxeFestiveGarland, #kxeFestiveParticles').forEach(el => el.remove());
      document.body.classList.remove('has-festive-ribbon');
      return;
    }

    let targetFest;
    if (mode === 'auto') {
      targetFest = detectCalendarFestival();
    } else {
      targetFest = KXE_FESTIVALS[mode] || detectCalendarFestival();
    }

    currentFestiveState.mode = mode;
    applyFestiveTheme(targetFest, discountOverride);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFestivalEngine);
  } else {
    initFestivalEngine();
  }

// ==========================================================================
// UNIVERSAL 3-LINE MOBILE HAMBURGER & SECTION ROUTING ENGINE
// ==========================================================================
window.closeUniversalMobileNav = function(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  window.openedFromMenuDrawer = false;
  document.body.setAttribute('data-menu', 'closed');
  const menuBtn = document.getElementById('menuButton');
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.classList.remove('is-active');
  }
  if (typeof window.updateBackBtnVisibility === 'function') window.updateBackBtnVisibility();
};

window.openUniversalMobileNav = function(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  document.body.setAttribute('data-menu', 'open');
  const menuBtn = document.getElementById('menuButton');
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.classList.add('is-active');
  }
  if (typeof window.updateBackBtnVisibility === 'function') window.updateBackBtnVisibility();
};

window.toggleUniversalMobileNav = function(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const body = document.body;
  const isOpen = body.getAttribute('data-menu') === 'open';
  if (isOpen) {
    window.closeUniversalMobileNav(e);
  } else {
    window.openUniversalMobileNav(e);
  }
};

window.handleMenuNav = function(e, targetId, fallbackUrl) {
  if (e && e.preventDefault) e.preventDefault();
  document.body.setAttribute('data-menu', 'closed');
  const menuBtn = document.getElementById('menuButton');
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.classList.remove('is-active');
  }
  if (typeof window.updateBackBtnVisibility === 'function') window.updateBackBtnVisibility();

  if (targetId === 'sec-services' || targetId === 'services-section') {
    if (typeof window.selectBook === 'function') {
      window.selectBook('services');
      if (typeof window.updateBackBtnVisibility === 'function') window.updateBackBtnVisibility();
      return;
    }
  }

  const target = document.getElementById(targetId);
  if (target) {
    setTimeout(() => {
      const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 75;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      target.style.transition = 'box-shadow 0.6s ease, outline 0.6s ease';
      target.style.outline = '2px solid rgba(245, 158, 11, 0.75)';
      target.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.4)';
      setTimeout(() => {
        target.style.outline = 'none';
        target.style.boxShadow = 'none';
      }, 2000);
    }, 120);
  } else if (fallbackUrl) {
    window.location.href = fallbackUrl;
  }
};

window.handleMenuAction = function(e, action) {
  if (e && e.preventDefault) e.preventDefault();
  document.body.setAttribute('data-menu', 'closed');
  const menuBtn = document.getElementById('menuButton');
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.classList.remove('is-active');
  }
  if (typeof window.updateBackBtnVisibility === 'function') window.updateBackBtnVisibility();

  if (action === 'booking') {
    setTimeout(() => {
      if (typeof window.openBookingModal === 'function') window.openBookingModal();
    }, 150);
  } else if (action === 'admin') {
    setTimeout(() => {
      if (typeof window.openAdminPortal === 'function') window.openAdminPortal();
    }, 150);
  } else if (action === 'whatsapp') {
    window.open('https://wa.me/918449495147?text=Hi%20Krishna!%20I%20am%20interested%20in%20video%20editing%20services.', '_blank');
  }
};
