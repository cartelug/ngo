/* ═══════════════════════════════════════════════════════════════
   NGO BUS '90 — app.js
   Clean, bulletproof JS with full mobile support
   ═══════════════════════════════════════════════════════════════ */

// ─── Data ──────────────────────────────────────────────────────
const DATA = {
  events: [
    { day: "21", mon: "Jun", title: "Mid-Year Syndicate Cocktail", loc: "Sheraton Kampala", type: "Social" },
    { day: "13", mon: "Sep", title: "Annual Old Boys' Reunion",     loc: "Namilyango College", type: "Reunion" }
  ],
  timeline: [
    { yr: "1990", title: "The Bus Arrives",        desc: "First day at Namilyango College. Boarding the bus as boys." },
    { yr: "1996", title: "Leavers' Prom",           desc: "Nabisunsa. The transition from schoolboys to men." },
    { yr: "2015", title: "N.I.C.E. Founded",        desc: "Formalization of the investment syndicate." },
    { yr: "2026", title: "Digital Infrastructure",  desc: "Deployment of the unified executive portal." }
  ],
  meetings: {
    upcoming: [
      { date: "14 Jun", title: "Q2 Strategy Review",     loc: "Kampala — Venue TBC" },
      { date: "12 Jul", title: "Mid-Year Investor Brief", loc: "Encrypted Zoom Channel" }
    ],
    recent: [
      { date: "10 May", title: "Q1 Report & Dividends",   note: "Dividends approved & distributed." },
      { date: "12 Apr", title: "Mukono Land Acquisition",  note: "Voting passed. Asset secured." }
    ]
  },
  directory: [
    { name: "John Baptist Matovu", aka: "Jibze",    tag: "Finance & Ops", img: "Images/JOHN baptist.jpg",    cat: "finance", init: "JM" },
    { name: "Mitch Egwang",        aka: "Nganga",   tag: "Mobilization",  img: "Images/mitch egwang.jpg",    cat: "all",     init: "ME" },
    { name: "Mbanda Shyaka",       aka: "Mbandzo",  tag: "Treasury",      img: "",                           cat: "finance", init: "MS" },
    { name: "[ Classified ]",      aka: "Counsel",  tag: "Legal",         img: "",                           cat: "law",     init: "LA" },
    { name: "[ Classified ]",      aka: "Doc",      tag: "Medical",       img: "",                           cat: "medicine",init: "MD" }
  ],
  marquee: "Est. 1990 <span>✦</span> 30 Years of Brotherhood <span>✦</span> Class of 1996 <span>✦</span> N.I.C.E. Investment Club <span>✦</span> Fraternitas Aeterna <span>✦</span> Namilyango College <span>✦</span> "
};

// ─── Main Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // 1. Loader
  const ld = document.getElementById('ld');
  setTimeout(() => ld.classList.add('done'), 2400);

  // 2. Hero text reveal (staggered after loader)
  setTimeout(() => {
    document.querySelectorAll('.rh').forEach(el => el.classList.add('on'));
    document.querySelectorAll('.hero-eyebrow, .hero-yr, .hero-sub, .hero-cta')
      .forEach(el => el.classList.add('visible'));
  }, 2200);

  // 3. Custom Cursor (Desktop only — fine pointer)
  if (window.matchMedia('(any-pointer: fine)').matches) {
    const cur  = document.getElementById('cur');
    const curt = document.getElementById('curt');
    let mx = 0, my = 0, tx = 0, ty = 0;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    }, { passive: true });

    const animCursor = () => {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      curt.style.transform = `translate(${tx - 20}px, ${ty - 20}px)`;
      requestAnimationFrame(animCursor);
    };
    animCursor();

    document.querySelectorAll('a, button, input').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('hover'));
      el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
    });
  }

  // 4. Scroll: progress bar + nav + FAB
  const nav  = document.getElementById('nav');
  const spb  = document.getElementById('spb');
  const fab  = document.getElementById('fab');
  const fabM = document.getElementById('fabMenu');

  let lastSY = 0;
  const onScroll = () => {
    const sy  = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    spb.style.width = `${(sy / max) * 100}%`;
    nav.classList.toggle('scrolled', sy > 60);
    fab.classList.toggle('visible', sy > 500);
    lastSY = sy;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // 5. Mobile Nav Toggle
  const ham = document.getElementById('ham');
  const nl  = document.getElementById('nl');

  ham.addEventListener('click', () => {
    const isOpen = ham.classList.toggle('open');
    nl.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  nl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      nl.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // 6. FAB Toggle
  fab.addEventListener('click', () => {
    const isOpen = fabM.classList.toggle('open');
    fab.classList.toggle('is-open', isOpen);
    fab.setAttribute('aria-expanded', String(isOpen));
  });
  // Close FAB menu when clicking elsewhere
  document.addEventListener('click', e => {
    if (!fab.contains(e.target) && !fabM.contains(e.target)) {
      fabM.classList.remove('open');
      fab.classList.remove('is-open');
    }
  });

  // 7. Marquee
  const mqt = document.getElementById('mqt');
  const txt = DATA.marquee;
  mqt.innerHTML = `<div>${txt}${txt}${txt}</div>`;

  // 8. Bulletproof Scroll Reveal
  const rvObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.04
  });
  document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

  // 9. Side Dots — section tracking
  const dots    = document.querySelectorAll('.sdot');
  const dotSecs = ['hero', 'jamas', 'nice', 'connect'];
  const dotObs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = dotSecs.indexOf(e.target.id);
        if (idx >= 0) {
          dots.forEach(d => d.classList.remove('a'));
          if (dots[idx]) dots[idx].classList.add('a');
        }
      }
    });
  }, { threshold: 0.35 });
  dotSecs.forEach(id => {
    const el = document.getElementById(id);
    if (el) dotObs.observe(el);
  });
  dots.forEach(d => {
    d.addEventListener('click', () => {
      document.getElementById(d.dataset.s)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 10. Inject Events
  document.getElementById('evList').innerHTML = DATA.events.map(ev => `
    <div class="ev-card rv">
      <div class="ev-date">
        <span class="ev-day">${ev.day}</span>
        <span class="ev-mon">${ev.mon}</span>
      </div>
      <div class="ev-info">
        <h4>${ev.title}</h4>
        <p>${ev.loc}&nbsp;·&nbsp;${ev.type}</p>
      </div>
    </div>
  `).join('');

  // 11. Inject Timeline
  document.getElementById('tlTrack').innerHTML = DATA.timeline.map(t => `
    <div class="tl-item rv">
      <div class="tl-yr">${t.yr}</div>
      <div class="tl-title">${t.title}</div>
      <div class="tl-desc">${t.desc}</div>
    </div>
  `).join('');

  // 12. Inject Meetings
  document.getElementById('upMtg').innerHTML = DATA.meetings.upcoming.map(m => `
    <li>
      <span class="date">${m.date}</span>
      <div class="info"><h4>${m.title}</h4><p>${m.loc}</p></div>
    </li>
  `).join('');

  document.getElementById('rcMtg').innerHTML = DATA.meetings.recent.map(m => `
    <li>
      <span class="date" style="color:rgba(255,255,255,0.3)">${m.date}</span>
      <div class="info"><h4>${m.title}</h4><p>${m.note}</p></div>
    </li>
  `).join('');

  // 13. Counter Animation
  const countUp = (el) => {
    const target = parseInt(el.dataset.c, 10);
    const dur    = 1800;
    const start  = performance.now();
    const tick   = (now) => {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      el.textContent = target > 999
        ? Math.floor(ease * target).toLocaleString()
        : Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cntObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-c]').forEach(el => cntObs.observe(el));

  // 14. Directory — Inject & Filter
  const rcGrid = document.getElementById('rcGrid');
  rcGrid.innerHTML = DATA.directory.map(d => `
    <div class="dir-card rv"
         role="listitem"
         data-cat="${d.cat}"
         data-search="${d.name.toLowerCase()} ${d.aka.toLowerCase()} ${d.tag.toLowerCase()}">
      <div class="dir-avatar">
        ${d.img
          ? `<img src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
        <div class="dir-ph" style="${d.img ? 'display:none' : 'display:flex'}">${d.init}</div>
      </div>
      <div class="dir-info">
        <h4>${d.name}</h4>
        <span class="dir-alias">aka "${d.aka}"</span>
        <span class="dir-tag">${d.tag}</span>
      </div>
    </div>
  `).join('');

  let activeCat = 'all', activeQ = '';

  const applyFilter = () => {
    document.querySelectorAll('.dir-card').forEach(c => {
      const catOk  = activeCat === 'all' || c.dataset.cat === activeCat;
      const srchOk = !activeQ || c.dataset.search.includes(activeQ);
      c.style.display = (catOk && srchOk) ? '' : 'none';
    });
  };

  document.querySelectorAll('.filt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      applyFilter();
    });
  });

  document.getElementById('rcSearch').addEventListener('input', e => {
    activeQ = e.target.value.toLowerCase().trim();
    applyFilter();
  });

  // Re-observe newly injected .rv elements
  document.querySelectorAll('.rv:not(.on)').forEach(el => rvObs.observe(el));

});