/* ══════════════════════════════════════════════════════
   NGO BUS '90 — V10  |  app.js
   All data + functionality. Mobile-first, 0 errors.
══════════════════════════════════════════════════════ */

// ── DATA ────────────────────────────────────────────────
const DATA = {
  events: [
    { day:"21", mon:"Jun", title:"Mid-Year Syndicate Cocktail", loc:"Sheraton Kampala · 6 PM", type:"Social",   fullDate:"2026-06-21" },
    { day:"13", mon:"Sep", title:"Annual Old Boys' Reunion",     loc:"Namilyango College Grounds", type:"Reunion", fullDate:"2026-09-13" },
    { day:"07", mon:"Dec", title:"Year-End Gala",                loc:"Kampala Serena · Black Tie", type:"Gala",    fullDate:"2026-12-07" }
  ],
  timeline: [
    { yr:"1990", title:"The Bus Arrives",        desc:"First day at Namilyango College. Boarding as boys." },
    { yr:"1993", title:"Brotherhood Forms",       desc:"Dormitories, rugby pitches, prefect appointments — bonds forged in iron." },
    { yr:"1996", title:"Leavers' Prom",           desc:"Nabisunsa. Last night as schoolboys. First night as men." },
    { yr:"2015", title:"N.I.C.E. Founded",        desc:"Formalization of the investment syndicate." },
    { yr:"2026", title:"Digital Infrastructure",  desc:"Deployment of the unified executive portal." }
  ],
  meetings: {
    upcoming: [
      { date:"14 Jun", title:"Q2 Strategy Review",     loc:"Kampala — Venue TBC" },
      { date:"12 Jul", title:"Mid-Year Investor Brief", loc:"Encrypted Zoom Channel" }
    ],
    recent: [
      { date:"10 May", title:"Q1 Report & Dividends",   note:"Dividends approved & distributed." },
      { date:"12 Apr", title:"Mukono Land Acquisition",  note:"Voting passed. Asset secured." }
    ]
  },
  directory: [
    { name:"John Baptist Matovu", aka:"Jibze",   tag:"Finance & Ops", img:"Images/JOHN baptist.jpg",  cat:"finance", init:"JM" },
    { name:"Mitch Egwang",        aka:"Nganga",  tag:"Mobilization",  img:"Images/mitch egwang.jpg",  cat:"all",     init:"ME" },
    { name:"Mbanda Shyaka",       aka:"Mbandzo", tag:"Treasury",      img:"Images/mbanda.jpg",            cat:"finance", init:"MS" },
    { name:"[ Classified ]",      aka:"Counsel", tag:"Legal",         img:"",                          cat:"law",     init:"LA" },
    { name:"[ Classified ]",      aka:"Doc",     tag:"Medical",       img:"",                          cat:"medicine",init:"MD" }
  ],
  voices: [
    {
      text: "Thirty six years on, I still hear the bell from the chapel every morning. That sound is woven into who I became. Everything we built after — N.I.C.E., the reunions, this brotherhood — it all started on that bus.",
      name: "John Baptist Matovu", alias: "aka \"Jibze\" · Chairman", init: "JM"
    },
    {
      text: "When you share a dormitory with a man for six years, you see his fears and his fire. There is no pretence. That is why when one of us needs something — we all move. No questions asked.",
      name: "Mitch Egwang", alias: "aka \"Nganga\" · Chief Mobilizer", init: "ME"
    },
    {
      text: "The investment club was not about money first. It was about proving that the trust we built in those school halls could be turned into something tangible for the next generation.",
      name: "Mbanda Shyaka", alias: "aka \"Mbandzo\" · Treasurer", init: "MS"
    }
  ],
  marquee: 'Est. 1990 <span>✦</span> 36 Years of Brotherhood <span>✦</span> Class of 1996 <span>✦</span> N.I.C.E. Investment Club <span>✦</span> Fraternitas Aeterna <span>✦</span> Namilyango College <span>✦</span> '
};

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ─ 1. Loader ──────────────────────────────────────────
  setTimeout(() => document.getElementById('ld').classList.add('done'), 2400);

  // ─ 2. Hero text reveal ────────────────────────────────
  setTimeout(() => {
    document.querySelectorAll('.rh').forEach(el => el.classList.add('on'));
    ['heye', 'hyr', 'hsub', 'hcta'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('on');
    });
  }, 2200);

  // ─ 3. Custom cursor (fine-pointer desktops only) ──────
  if (window.matchMedia('(any-pointer:fine)').matches) {
    const cur = document.getElementById('cur');
    const curt = document.getElementById('curt');
    let mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    }, { passive: true });
    (function loop() {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      curt.style.transform = `translate(${tx - 20}px,${ty - 20}px)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,input').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('hov'));
      el.addEventListener('mouseleave', () => cur.classList.remove('hov'));
    });
  }

  // ─ 4. Scroll: progress bar + nav + FAB + bottom nav ───
  const nav = document.getElementById('nav');
  const spb = document.getElementById('spb');
  const fab = document.getElementById('fab');
  const SECTIONS = ['hero','jamas','council','events','vault','nice','voices','connect','plan','memoriam'];
  const NAV_MAP  = { hero:'hero', jamas:'hero', council:'council', events:'council', vault:'nice', nice:'nice', voices:'nice', connect:'connect', plan:'plan', memoriam:'plan' };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const sy  = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) spb.style.width = `${(sy / max) * 100}%`;
      nav.classList.toggle('sc', sy > 60);
      fab.classList.toggle('vis', sy > 500);
      // Bottom nav active
      let active = 'hero';
      SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) active = id;
      });
      document.querySelectorAll('.bi').forEach(b => b.classList.toggle('act', b.dataset.sec === NAV_MAP[active]));
      ticking = false;
    });
  }, { passive: true });

  // ─ 5. Mobile nav ──────────────────────────────────────
  const ham = document.getElementById('ham');
  const nl  = document.getElementById('nl');
  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    nl.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    nl.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  // ─ 6. FAB ─────────────────────────────────────────────
  const fabM = document.getElementById('fabM');
  fab.addEventListener('click', () => {
    const open = fabM.classList.toggle('open');
    fab.classList.toggle('open', open);
    fab.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {
    if (!fab.contains(e.target) && !fabM.contains(e.target)) {
      fabM.classList.remove('open');
      fab.classList.remove('open');
    }
  });

  // ─ 7. Side dots ───────────────────────────────────────
  const dots  = document.querySelectorAll('.sdot');
  const dSecs = ['hero', 'jamas', 'nice', 'voices', 'connect'];
  const dotObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const i = dSecs.indexOf(e.target.id);
        if (i >= 0) { dots.forEach(d => d.classList.remove('a')); if (dots[i]) dots[i].classList.add('a'); }
      }
    });
  }, { threshold: 0.3 });
  dSecs.forEach(id => { const el = document.getElementById(id); if (el) dotObs.observe(el); });
  dots.forEach(d => d.addEventListener('click', () => document.getElementById(d.dataset.s)?.scrollIntoView({ behavior:'smooth' })));

  // ─ 8. Marquee ─────────────────────────────────────────
  const mqt = document.getElementById('mqt');
  const mq  = DATA.marquee;
  mqt.innerHTML = `<div>${mq}${mq}${mq}</div>`;

  // ─ 9. Scroll reveal ───────────────────────────────────
  const rvObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
    });
  }, { rootMargin:'0px 0px -5% 0px', threshold:0.04 });
  document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

  // ─ 10. Counter animation ──────────────────────────────
  const countUp = el => {
    const tgt = parseInt(el.dataset.c, 10);
    const dur = 1800;
    const start = performance.now();
    const tick = now => {
      const p   = Math.min((now - start) / dur, 1);
      const val = Math.floor((1 - Math.pow(1 - p, 4)) * tgt);
      el.textContent = tgt > 999 ? val.toLocaleString() : val;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cntObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-c]').forEach(el => cntObs.observe(el));

  // ─ 11. Countdown timer ────────────────────────────────
  const now   = new Date();
  const next  = DATA.events.reduce((acc, ev) => {
    const d = new Date(ev.fullDate);
    return d > now && (!acc || d < new Date(acc.fullDate)) ? ev : acc;
  }, null);

  if (next) {
    const titleEl = document.getElementById('cdTitle');
    const locEl   = document.getElementById('cdLoc');
    const dEl     = document.getElementById('cdD');
    const hEl     = document.getElementById('cdH');
    const mEl     = document.getElementById('cdM');

    if (titleEl) titleEl.textContent = next.title;
    if (locEl)   locEl.textContent   = next.loc;

    const tick = () => {
      const diff = new Date(next.fullDate) - new Date();
      if (diff <= 0) {
        if (dEl) dEl.textContent = '00';
        if (hEl) hEl.textContent = '00';
        if (mEl) mEl.textContent = '00';
        return;
      }
      const d = Math.floor(diff / 864e5);
      const h = Math.floor((diff % 864e5) / 36e5);
      const m = Math.floor((diff % 36e5) / 6e4);
      if (dEl) dEl.textContent = String(d).padStart(2, '0');
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
    };
    tick();
    setInterval(tick, 60000);
  }

  // ─ 12. Inject events ──────────────────────────────────
  const evList = document.getElementById('evList');
  if (evList) {
    evList.innerHTML = DATA.events.map(ev => `
      <div class="ev-card rv">
        <div class="ev-dt">
          <span class="ev-day">${ev.day}</span>
          <span class="ev-mon">${ev.mon}</span>
        </div>
        <div class="ev-info">
          <h4>${ev.title}</h4>
          <p>${ev.loc}</p>
          <span class="ev-type">${ev.type}</span>
        </div>
      </div>`).join('');
  }

  // ─ 13. Inject timeline ────────────────────────────────
  const tlTrack = document.getElementById('tlTrack');
  if (tlTrack) {
    tlTrack.innerHTML = DATA.timeline.map(t => `
      <div class="tl-item rv">
        <div class="tl-yr">${t.yr}</div>
        <div class="tl-title">${t.title}</div>
        <div class="tl-desc">${t.desc}</div>
      </div>`).join('');
  }

  // ─ 14. Inject meetings ────────────────────────────────
  const upMtg = document.getElementById('upMtg');
  const rcMtg = document.getElementById('rcMtg');
  if (upMtg) {
    upMtg.innerHTML = DATA.meetings.upcoming.map(m => `
      <li>
        <span class="mtg-date">${m.date}</span>
        <div class="mtg-info"><h4>${m.title}</h4><p>${m.loc}</p></div>
      </li>`).join('');
  }
  if (rcMtg) {
    rcMtg.innerHTML = DATA.meetings.recent.map(m => `
      <li>
        <span class="mtg-date" style="color:rgba(255,255,255,.3)">${m.date}</span>
        <div class="mtg-info"><h4>${m.title}</h4><p>${m.note}</p></div>
      </li>`).join('');
  }

  // ─ 15. Council scroll dots ────────────────────────────
  const cWrap = document.getElementById('councilWrap');
  const cHints = document.getElementById('councilHints');
  if (cWrap && cHints) {
    const cCards = cWrap.querySelectorAll('.cc');
    cHints.innerHTML = Array.from(cCards).map((_, i) =>
      `<button class="ch-dot${i === 0 ? ' a' : ''}" aria-label="Council member ${i + 1}"></button>`
    ).join('');
    const cDots = cHints.querySelectorAll('.ch-dot');
    cWrap.addEventListener('scroll', () => {
      if (cWrap.scrollWidth <= cWrap.clientWidth) return;
      const idx = Math.round(cWrap.scrollLeft / (cWrap.scrollWidth / cCards.length));
      cDots.forEach((d, i) => d.classList.toggle('a', i === idx));
    }, { passive: true });
    cDots.forEach((d, i) => d.addEventListener('click', () => {
      const w = cWrap.scrollWidth / cCards.length;
      cWrap.scrollTo({ left: i * w, behavior: 'smooth' });
    }));
  }

  // ─ 16. Voices carousel ────────────────────────────────
  const vTrack = document.getElementById('vTrack');
  const vDots  = document.getElementById('vDots');
  const vWrap  = document.getElementById('vWrap');
  const vPrev  = document.getElementById('vPrev');
  const vNext  = document.getElementById('vNext');

  if (vTrack && vDots) {
    // Rebuild slides from DATA for correctness
    vTrack.innerHTML = DATA.voices.map(v => `
      <div class="voice-slide">
        <p class="voice-q">${v.text}</p>
        <div class="voice-attr">
          <div class="voice-av">${v.init}</div>
          <div>
            <div class="voice-name">${v.name}</div>
            <div class="voice-alias">${v.alias}</div>
          </div>
        </div>
      </div>`).join('');

    const slides = vTrack.querySelectorAll('.voice-slide');
    let cur = 0, autoTimer;

    // Build dots
    vDots.innerHTML = DATA.voices.map((_, i) =>
      `<button class="v-dot${i === 0 ? ' a' : ''}" aria-label="Voice ${i + 1}"><span class="v-dot-inner"></span></button>`
    ).join('');
    const dotEls = vDots.querySelectorAll('.v-dot');

    const goTo = n => {
      cur = ((n % slides.length) + slides.length) % slides.length;
      vTrack.style.transform = `translateX(-${cur * 100}%)`;
      dotEls.forEach((d, i) => d.classList.toggle('a', i === cur));
    };

    const resetAuto = () => { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(cur + 1), 5200); };

    if (vPrev) vPrev.addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
    if (vNext) vNext.addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
    dotEls.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));

    // Touch swipe
    if (vWrap) {
      let tx0 = 0;
      vWrap.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
      vWrap.addEventListener('touchend', e => {
        const dx = tx0 - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 44) { goTo(dx > 0 ? cur + 1 : cur - 1); resetAuto(); }
      }, { passive: true });
    }
    resetAuto();
  }

  // ─ 17. Directory ──────────────────────────────────────
  const rcGrid = document.getElementById('rcGrid');
  if (rcGrid) {
    rcGrid.innerHTML = DATA.directory.map(d => `
      <div class="dc rv" role="listitem"
           data-cat="${d.cat}"
           data-search="${d.name.toLowerCase()} ${d.aka.toLowerCase()} ${d.tag.toLowerCase()}">
        <div class="dc-av">
          ${d.img
            ? `<img src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''}
          <div class="dc-ph" style="${d.img ? 'display:none' : 'display:flex'}">${d.init}</div>
        </div>
        <div class="dc-info">
          <h4>${d.name}</h4>
          <span class="dc-alias">aka "${d.aka}"</span>
          <span class="dc-tag">${d.tag}</span>
        </div>
      </div>`).join('');

    let activeCat = 'all', activeQ = '';
    const applyFilter = () => {
      rcGrid.querySelectorAll('.dc').forEach(c => {
        const catOk  = activeCat === 'all' || c.dataset.cat === activeCat;
        const srchOk = !activeQ || c.dataset.search.includes(activeQ);
        c.style.display = (catOk && srchOk) ? '' : 'none';
      });
    };

    document.querySelectorAll('.flt').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.flt').forEach(b => b.classList.remove('a'));
      btn.classList.add('a');
      activeCat = btn.dataset.cat;
      applyFilter();
    }));

    const srch = document.getElementById('rcSearch');
    if (srch) srch.addEventListener('input', e => { activeQ = e.target.value.toLowerCase().trim(); applyFilter(); });
  }

  // ─ 18. Re-observe injected .rv elements ───────────────
  setTimeout(() => {
    document.querySelectorAll('.rv:not(.on)').forEach(el => rvObs.observe(el));
  }, 100);

});
