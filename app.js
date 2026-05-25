// Data Configuration (Moved from HTML to JS for cleanliness)
const CONFIG = {
  funeral: {
    total: 18450000, 
    currency: "UGX",
    updated: "12 May 2026",
    manager: "Mbanda Shyaka (Mbandzo)",
    supplier: "Internal · Brotherhood-managed"
  },
  meetings: {
    upcoming: [
      {day:"14", mon:"Jun 2026", title:"Q2 Strategy Review", loc:"Kampala — Venue TBC"},
      {day:"12", mon:"Jul 2026", title:"Mid-Year Investor Meeting", loc:"Online · Zoom"}
    ],
    recent: [
      {day:"10", mon:"May 2026", title:"Q1 Report Presentation", note:"Q1 dividends approved"},
      {day:"12", mon:"Apr 2026", title:"Land Project Vote", note:"Mukono parcel acquired"}
    ]
  },
  events: [
    {day:"21", mon:"June", year:"2026", fullDate:"2026-06-21", title:"Mid-Year Members' Cocktail", loc:"Sheraton Kampala · 6 PM", type:"Social"},
    {day:"13", mon:"Sep", year:"2026", fullDate:"2026-09-13", title:"Annual Old Boys' Reunion", loc:"Namilyango College", type:"Reunion"}
  ],
  timeline: [
    {year:"1990", title:"The Bus Arrives", desc:"We boarded as boys. The first day at Namilyango College."},
    {year:"1996", title:"Leavers' Prom", desc:"Nabisunsa. The last night as schoolboys. The first night as men."},
    {year:"2015", title:"N.I.C.E. Founded", desc:"The investment club is formalized. We start building wealth together."},
    {year:"2026", title:"Digital Home", desc:"This platform. A permanent place for memory, connection, and what's next."}
  ],
  voices: [
    {quote:"This brotherhood has been with me through everything — the births, the burials, the broken roads.", author:"A Jama", role:"Class of 1996"},
    {quote:"What we built at Namilyango never left us. Thirty years later, one phone call still moves the entire class.", author:"A Jama", role:"Inner Council"},
    {quote:"My son just started university. His first mentor wasn't me — it was a Jama. That's the brotherhood at work.", author:"A Jama", role:"Class of 1996"}
  ],
  rollCall: [
    { name: "John Baptist Matovu", aka: "Jibze", tag: "Finance", role: "Chairman", img: "Images/JOHN baptist.jpg", cat: "finance", init: "JM" },
    { name: "Mitch Egwang", aka: "Nganga", tag: "Mobilization", role: "Chief Mobilizer", img: "Images/mitch egwang.jpg", cat: "all", init: "ME" },
    { name: "Mbanda Shyaka", aka: "Mbandzo", tag: "Finance", role: "Treasurer", img: "", cat: "finance", init: "MS" },
    { name: "[ Member Name ]", aka: "Nickname", tag: "Law", role: "Senior Partner", img: "", cat: "law", init: "LA" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader
  setTimeout(() => document.getElementById('ld').classList.add('out'), 2500);

  // 2. Custom Cursor (Only on fine pointers)
  const cur = document.getElementById('cur');
  const curt = document.getElementById('curt');
  if (window.matchMedia("(pointer: fine)").matches) {
    let mx = 0, my = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { 
      mx = e.clientX; my = e.clientY; 
      cur.style.left = mx + 'px'; cur.style.top = my + 'px'; 
    });
    (function loop() { 
      tx += (mx - tx) * .15; ty += (my - ty) * .15; 
      curt.style.left = tx + 'px'; curt.style.top = ty + 'px'; 
      requestAnimationFrame(loop); 
    })();
    
    // Add hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .council-card, .rc-card, .gallery-card, input');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('h'));
      el.addEventListener('mouseleave', () => cur.classList.remove('h'));
    });
  }

  // 3. Navigation & Scroll Handling
  const nav = document.getElementById('nav');
  const spb = document.getElementById('spb');
  const fab = document.getElementById('fab');
  const fabMenu = document.getElementById('fabMenu');
  
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    spb.style.width = (sy / maxScroll * 100) + '%';
    
    nav.classList.toggle('sc', sy > 50);
    fab.classList.toggle('show', sy > 500);
  }, { passive: true });

  // 4. Mobile Menu
  const ham = document.getElementById('ham');
  const nl = document.getElementById('nl');
  ham.addEventListener('click', () => {
    ham.classList.toggle('o');
    nl.classList.toggle('mobile-active');
  });
  
  nl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('o');
      nl.classList.remove('mobile-active');
    });
  });

  // FAB Toggle
  fab.addEventListener('click', () => {
    const isShowing = fabMenu.classList.toggle('show');
    fab.textContent = isShowing ? '×' : '+';
  });
  fabMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      fabMenu.classList.remove('show');
      fab.textContent = '+';
    });
  });

  // 5. Hero Letters Animation
  const animateLetters = (selector, delayStr) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.textContent;
    el.innerHTML = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'lt';
      if(el.classList.contains('gold-lt')) span.classList.add('gold-lt');
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.style.animationDelay = `calc(${delayStr}s + ${i * 0.08}s)`;
      el.appendChild(span);
    });
  };
  animateLetters('.tm-1', '2.8');
  animateLetters('.tm-2', '3.1');

  // 6. Marquee Generation
  const mqt = document.getElementById('mqt');
  const marqueeContent = "Est. 1990 <span>✦</span> 30 Years of Brotherhood <span>✦</span> Class of 1996 <span>✦</span> N.I.C.E. Investment Club <span>✦</span> Fraternitas Aeterna <span>✦</span> Namilyango College <span>✦</span> ";
  // Duplicate for seamless scroll
  mqt.innerHTML = `<div class="marquee-item">${marqueeContent}</div><div class="marquee-item">${marqueeContent}</div><div class="marquee-item">${marqueeContent}</div><div class="marquee-item">${marqueeContent}</div>`;

  // 7. Scroll Reveals & Counters (Intersection Observer)
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  
  document.querySelectorAll('.rv, .rvr').forEach(el => revealObs.observe(el));

  // Counters
  const countUp = (el) => {
    const target = parseInt(el.dataset.c);
    const isBig = target > 1000;
    const dur = 1500;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4); // ease out quart
      const val = Math.floor(ease * target);
      el.textContent = isBig ? val.toLocaleString() : val;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        countUp(e.target);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-c]').forEach(el => countObs.observe(el));

  // 8. Desktop Section Dots Observer
  const dots = document.querySelectorAll('.sdot');
  const sids = ['hero', 'jamas', 'council', 'events', 'timeline', 'nice', 'connect', 'plan'];
  const dotObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        dots.forEach(d => d.classList.remove('a'));
        const idx = sids.indexOf(e.target.id);
        if(idx >= 0 && dots[idx]) dots[idx].classList.add('a');
      }
    });
  }, { threshold: 0.3 });
  sids.forEach(id => { const s = document.getElementById(id); if(s) dotObs.observe(s); });
  
  dots.forEach(d => d.addEventListener('click', () => {
    const section = document.getElementById(d.dataset.s);
    if(section) section.scrollIntoView({ behavior: 'smooth' });
  }));

  // 9. 3D Tilt Effect (Desktop Only)
  if(window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const cx = r.width / 2, cy = r.height / 2;
        const rotX = ((y - cy) / cy) * -4;
        const rotY = ((x - cx) / cx) * 4;
        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  // 10. Inject Content from CONFIG
  // Events
  document.getElementById('evList').innerHTML = CONFIG.events.map(ev => `
    <div class="ev-card rv">
      <div class="ev-date"><div class="ev-day">${ev.day}</div><div class="ev-mon">${ev.mon}</div></div>
      <div class="ev-info"><div class="ev-title">${ev.title}</div><div class="ev-loc">${ev.loc}</div></div>
      <div class="ev-badge"><span>${ev.type}</span></div>
    </div>
  `).join('');
  
  // Timeline
  document.getElementById('tlTrack').innerHTML = CONFIG.timeline.map((t, i) => `
    <div class="tl-item rv" style="transition-delay: ${i*0.1}s">
      <div class="tl-year">${t.year}</div>
      <div class="tl-content"><div class="tl-title">${t.title}</div><div class="tl-desc">${t.desc}</div></div>
    </div>
  `).join('');

  // Meetings
  document.getElementById('upMtg').innerHTML = CONFIG.meetings.upcoming.map(m => `
    <li><div class="mtg-date"><div class="mtg-day" style="color:var(--gold)">${m.day}</div><div class="mtg-mon">${m.mon}</div></div><div><div style="font-weight:700">${m.title}</div><div style="font-size:13px;color:var(--ink4)">${m.loc}</div></div></li>
  `).join('');
  document.getElementById('rcMtg').innerHTML = CONFIG.meetings.recent.map(m => `
    <li><div class="mtg-date"><div class="mtg-day" style="color:var(--forest3)">${m.day}</div><div class="mtg-mon">${m.mon}</div></div><div><div style="font-weight:700">${m.title}</div><div style="font-size:13px;color:var(--ink4)">${m.note}</div></div></li>
  `).join('');

  // Funeral Plan
  document.getElementById('fpTotal').textContent = `${CONFIG.funeral.currency} ${CONFIG.funeral.total.toLocaleString()}`;
  document.getElementById('fpDate').textContent = CONFIG.funeral.updated;

  // Voices
  const vStage = document.getElementById('voicesStage');
  const vDots = document.getElementById('voicesDots');
  vStage.innerHTML = CONFIG.voices.map((v, i) => `
    <div class="voice ${i===0?'active':''}" data-v="${i}">
      <p class="voice-quote">"${v.quote}"</p>
      <div class="voice-author">— ${v.author} <span style="font-weight:400; font-size: 12px; margin-left: 8px; color: var(--ink4);">${v.role}</span></div>
    </div>
  `).join('');
  vDots.innerHTML = CONFIG.voices.map((v, i) => `<button class="voices-dot ${i===0?'active':''}" data-v="${i}"></button>`).join('');
  
  let curVoice = 0;
  const switchVoice = (i) => {
    document.querySelectorAll('.voice').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.voices-dot').forEach(d => d.classList.remove('active'));
    document.querySelector(`.voice[data-v="${i}"]`).classList.add('active');
    document.querySelector(`.voices-dot[data-v="${i}"]`).classList.add('active');
    curVoice = i;
  };
  vDots.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => switchVoice(parseInt(btn.dataset.v))));
  setInterval(() => switchVoice((curVoice + 1) % CONFIG.voices.length), 6000);

  // Roll Call Rendering
  const rcGrid = document.getElementById('rcGrid');
  rcGrid.innerHTML = CONFIG.rollCall.map(rc => `
    <div class="rc-card rv" data-cat="${rc.cat}" data-search="${rc.name.toLowerCase()} ${rc.aka.toLowerCase()} ${rc.tag.toLowerCase()}">
      ${rc.img ? `<img class="rc-card-img" src="${rc.img}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
      <div class="rc-card-img-ph" style="${rc.img ? 'display:none' : 'display:flex'}">${rc.init}</div>
      <div class="rc-body">
        <div class="rc-occ-tag">${rc.tag}</div>
        <div class="rc-name">${rc.name}</div>
        <div class="rc-aka">aka ${rc.aka}</div>
        <div class="rc-occ">${rc.role}</div>
      </div>
    </div>
  `).join('');

  // 11. Roll Call Search & Filter
  let curFilt = 'all', curSearch = '';
  const applyRCFilters = () => {
    let visible = 0;
    document.querySelectorAll('.rc-card').forEach(c => {
      const matchCat = curFilt === 'all' || c.dataset.cat === curFilt;
      const matchSearch = curSearch === '' || c.dataset.search.includes(curSearch);
      if(matchCat && matchSearch) {
        c.classList.remove('hidden');
        visible++;
      } else {
        c.classList.add('hidden');
      }
    });
    
    let emptyEl = document.querySelector('.rc-empty');
    if(visible === 0) {
      if(!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'rc-empty';
        emptyEl.textContent = 'No Jamas found matching your criteria.';
        rcGrid.appendChild(emptyEl);
      }
      emptyEl.style.display = 'block';
    } else if(emptyEl) {
      emptyEl.style.display = 'none';
    }
  };

  document.querySelectorAll('.rc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.rc-btn').forEach(b => b.classList.remove('a'));
      e.target.classList.add('a');
      curFilt = e.target.dataset.cat;
      applyRCFilters();
    });
  });

  const searchInput = document.getElementById('rcSearch');
  searchInput.addEventListener('input', (e) => {
    curSearch = e.target.value.toLowerCase().trim();
    applyRCFilters();
  });

  // 12. Gallery Drag (Optimized for desktop touch/drag)
  const gw = document.getElementById('gw'), gt = document.getElementById('gt');
  if (window.matchMedia("(min-width: 768px)").matches) {
    let isDrag = false, startX, startScroll, curX = 0;
    gw.addEventListener('mousedown', e => { isDrag = true; startX = e.pageX; startScroll = curX; });
    window.addEventListener('mouseup', () => isDrag = false);
    window.addEventListener('mousemove', e => {
      if(!isDrag) return;
      e.preventDefault();
      const maxScroll = -(gt.scrollWidth - gw.clientWidth);
      curX = Math.max(maxScroll, Math.min(0, startScroll + (e.pageX - startX)));
      gt.style.transform = `translateX(${curX}px)`;
    });
  }
  
  // 13. Canvas Particles (Hero Background)
  const cv = document.getElementById('hc');
  const ctx = cv.getContext('2d');
  let pts = [];
  const resizeCv = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
  resizeCv(); window.addEventListener('resize', resizeCv);
  
  class Particle {
    constructor() { this.reset(); }
    reset() { 
      this.x = Math.random() * cv.width; 
      this.y = Math.random() * cv.height; 
      this.s = Math.random() * 1.5 + 0.5; 
      this.vx = (Math.random() - 0.5) * 0.15; 
      this.vy = -(Math.random() * 0.15 + 0.05); 
      this.alpha = Math.random() * 0.3 + 0.1;
      this.life = Math.random() * 400 + 200;
      this.age = 0;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.age++;
      if (this.age > this.life || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196,149,42,${this.alpha * (1 - this.age/this.life)})`;
      ctx.fill();
    }
  }
  for(let i=0; i<70; i++) pts.push(new Particle());
  const animPts = () => {
    ctx.clearRect(0,0,cv.width,cv.height);
    pts.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animPts);
  };
  animPts();
});