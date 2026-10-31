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
  };

  window.closeTheaterVideo = function () {
    const theaterView = document.getElementById('fullscreenTheaterView');
    if (theaterView) {
      const vid = document.getElementById('theaterMainVideo');
      if (vid) vid.pause();
      theaterView.classList.remove('active');
      document.body.style.overflow = '';
    }
  };


  // 6. FULL-SCREEN PRICING EXAMPLE VIDEO SHOWCASE (NO POPUPS!)
  window.openPricingExampleVideo = function (title, videoSrc, price, desc) {
    let exampleView = document.getElementById('fullscreenPricingExampleView');
    if (!exampleView) {
      exampleView = document.createElement('div');
      exampleView.id = 'fullscreenPricingExampleView';
      exampleView.className = 'fullscreen-stage-view';
      document.body.appendChild(exampleView);
    }

    exampleView.innerHTML = `
      <div class="fullscreen-topbar">
        <button class="fullscreen-back-btn" onclick="closePricingExampleVideo()">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Pricing Packages</span>
        </button>
        <a href="https://wa.me/918449495147?text=Hi%20Krishna!%20I%20reviewed%20the%20example%20video%20and%20want%20to%20book%20the%20${encodeURIComponent(title)}%20package%20(${encodeURIComponent(price)})." 
           target="_blank" style="padding:10px 22px;border-radius:999px;background:#F59E0B;color:#000;font-family:var(--sans);font-weight:900;font-size:14px;letter-spacing:0.1em;text-decoration:none;text-transform:uppercase;">
          Book This Package (${price}) ↗
        </a>
      </div>

      <div class="fullscreen-body-container" style="max-width:1100px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <span style="display:inline-block;padding:5px 14px;border-radius:999px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.4);color:#FBBF24;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">
            ✦ Verified Package Showcase Edit ✦
          </span>
          <span style="color:#10B981;font-weight:800;font-size:13px;">${price} Tier</span>
        </div>

        <h1 style="font-family:var(--serif);font-size:clamp(26px, 4vw, 42px);color:#FFF;margin-bottom:8px;line-height:1.2;">
          ${title} — Sample Video Edit
        </h1>
        <p style="color:var(--muted);font-size:17px;margin-bottom:24px;">
          ${desc}
        </p>

        <!-- Big Theater Video Player -->
        <div style="width:100%;aspect-ratio:16/9;background:#000;border-radius:20px;overflow:hidden;border:1.5px solid rgba(212,175,55,0.4);box-shadow:0 25px 60px rgba(0,0,0,0.9);margin-bottom:24px;">
          <video id="pricingTheaterVideo" src="${videoSrc}" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#000;"></video>
        </div>

        <div style="background:rgba(255,255,255,0.04);border-radius:16px;padding:22px 28px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
          <div>
            <div style="color:#F59E0B;font-size:13px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:4px;">✦ Krishna's Editing Guarantee</div>
            <div style="color:#FFF;font-size:17.5px;font-weight:700;">Includes 4K master export, beat sync, kinetic typography &amp; revisions.</div>
            <div style="color:var(--muted);font-size:14.5px;margin-top:2px;">(Krishna will customize the exact showcase video for this section as requested).</div>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="https://wa.me/918449495147" target="_blank" style="padding:12px 24px;border-radius:999px;background:#25D366;color:#FFF;font-weight:900;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">
              WhatsApp Krishna ↗
            </a>
            <a href="/contact" style="padding:12px 24px;border-radius:999px;background:#F59E0B;color:#000;font-weight:900;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">
              Confirm Project Brief &rarr;
            </a>
          </div>
        </div>
      </div>
    `;

    exampleView.classList.add('active');
    document.body.style.overflow = 'hidden';
    exampleView.scrollTop = 0;
  };

  window.closePricingExampleVideo = function () {
    const exampleView = document.getElementById('fullscreenPricingExampleView');
    if (exampleView) {
      const vid = document.getElementById('pricingTheaterVideo');
      if (vid) vid.pause();
      exampleView.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

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

})();
