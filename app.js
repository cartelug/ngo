// Centralized Executive Data
const DATA = {
  events: [
    { day: "21", mon: "Jun", title: "Mid-Year Syndicate Cocktail", loc: "Sheraton Kampala", type: "Social" },
    { day: "13", mon: "Sep", title: "Annual Old Boys' Reunion", loc: "Namilyango College", type: "Reunion" }
  ],
  timeline: [
    { yr: "1990", title: "The Bus Arrives", desc: "First day at Namilyango College. Boarding the bus as boys." },
    { yr: "1996", title: "Leavers' Prom", desc: "Nabisunsa. The transition from schoolboys to men." },
    { yr: "2015", title: "N.I.C.E. Founded", desc: "Formalization of the investment syndicate." },
    { yr: "2026", title: "Digital Infrastructure", desc: "Deployment of the unified executive portal." }
  ],
  meetings: {
    upcoming: [
      { date: "14 Jun", title: "Q2 Strategy Review", loc: "Kampala — Venue TBC" },
      { date: "12 Jul", title: "Mid-Year Investor Brief", loc: "Encrypted Zoom Channel" }
    ],
    recent: [
      { date: "10 May", title: "Q1 Report & Dividends", note: "Dividends approved & distributed." },
      { date: "12 Apr", title: "Mukono Land Acquisition", note: "Voting passed. Asset secured." }
    ]
  },
  directory: [
    { name: "John Baptist Matovu", aka: "Jibze", tag: "Finance & Ops", img: "Images/JOHN baptist.jpg", cat: "finance", init: "JM" },
    { name: "Mitch Egwang", aka: "Nganga", tag: "Mobilization", img: "Images/mitch egwang.jpg", cat: "all", init: "ME" },
    { name: "Mbanda Shyaka", aka: "Mbandzo", tag: "Treasury", img: "", cat: "finance", init: "MS" },
    { name: "[ Classified ]", aka: "Counsel", tag: "Legal", img: "", cat: "law", init: "LA" },
    { name: "[ Classified ]", aka: "Doc", tag: "Medical", img: "", cat: "medicine", init: "MD" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loader Logic (Failsafe included)
  const ld = document.getElementById('ld');
  setTimeout(() => ld.classList.add('done'), 2200);

  // 2. Advanced Custom Pointer (Desktop Only, NO touch interference)
  const cur = document.getElementById('cur');
  const curt = document.getElementById('curt');
  if (window.matchMedia("(any-pointer: fine)").matches) {
    let mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    });
    const loop = () => {
      tx += (mx - tx) * 0.2; ty += (my - ty) * 0.2;
      curt.style.transform = `translate(${tx - 20}px, ${ty - 20}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    
    document.querySelectorAll('a, button, input').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('hover'));
      el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
    });
  }

  // 3. Scroll & Nav Handlers
  const nav = document.getElementById('nav');
  const spb = document.getElementById('spb');
  const fab = document.getElementById('fab');
  const fabMenu = document.getElementById('fabMenu');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    // Progress Bar
    const scrollPercent = sy / (document.body.scrollHeight - window.innerHeight);
    spb.style.width = `${scrollPercent * 100}%`;
    
    // Nav & FAB
    nav.classList.toggle('scrolled', sy > 50);
    fab.classList.toggle('visible', sy > 500);
  }, { passive: true });

  // 4. Mobile Menu Toggle
  const ham = document.getElementById('ham');
  const nl = document.getElementById('nl');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    nl.classList.toggle('open');
  });
  nl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      nl.classList.remove('open');
    });
  });

  // FAB Toggle
  fab.addEventListener('click', () => {
    const isOpen = fabMenu.classList.toggle('open');
    fab.textContent = isOpen ? '×' : '+';
  });

  // 5. Text Reveal Animation (Hero)
  const animateText = () => {
    document.querySelectorAll('.reveal-text').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.display = 'inline-block';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${2.4 + (index * 0.2)}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });
  };
  animateText();

  // 6. Marquee Generator
  const mqt = document.getElementById('mqt');
  const mText = "Est. 1990 <span>✦</span> 30 Years of Brotherhood <span>✦</span> Class of 1996 <span>✦</span> N.I.C.E. Investment Club <span>✦</span> Fraternitas Aeterna <span>✦</span> Namilyango College <span>✦</span> ";
  mqt.innerHTML = `<div>${mText}${mText}${mText}</div>`;

  // 7. BULLETPROOF Scroll Reveal Observer (Highly forgiving for mobile)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px', // Triggers slightly before it hits the bottom
    threshold: 0.05 // Triggers as soon as 5% is visible (fixes the mobile tall-div bug)
  };
  
  const revealObs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target); // Stop observing once revealed for performance
      }
    });
  }, observerOptions);

  document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));

  // 8. Desktop Section Side Dots Observer
  const dots = document.querySelectorAll('.sdot');
  const sections = ['hero', 'jamas', 'nice', 'connect'];
  const dotObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        dots.forEach(d => d.classList.remove('a'));
        const idx = sections.indexOf(e.target.id);
        if(idx >= 0 && dots[idx]) dots[idx].classList.add('a');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => { const el = document.getElementById(id); if(el) dotObs.observe(el); });

  dots.forEach(d => {
    d.addEventListener('click', () => {
      document.getElementById(d.dataset.s).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 9. Inject Data (Events, Timeline, Meetings)
  document.getElementById('evList').innerHTML = DATA.events.map(ev => `
    <div class="ev-card rv">
      <div class="ev-date"><span class="ev-day">${ev.day}</span><span class="ev-mon">${ev.mon}</span></div>
      <div class="ev-info"><h4>${ev.title}</h4><p>${ev.loc} • ${ev.type}</p></div>
    </div>
  `).join('');

  document.getElementById('tlTrack').innerHTML = DATA.timeline.map(t => `
    <div class="tl-item rv"><div class="tl-yr">${t.yr}</div><div class="tl-title">${t.title}</div><div class="tl-desc">${t.desc}</div></div>
  `).join('');

  document.getElementById('upMtg').innerHTML = DATA.meetings.upcoming.map(m => `
    <li><span class="date">${m.date}</span><div class="info"><h4>${m.title}</h4><p>${m.loc}</p></div></li>
  `).join('');

  document.getElementById('rcMtg').innerHTML = DATA.meetings.recent.map(m => `
    <li><span class="date" style="color:var(--text-muted)">${m.date}</span><div class="info"><h4>${m.title}</h4><p>${m.note}</p></div></li>
  `).join('');

  // Number Counter Animation
  const countUp = (el) => {
    const target = parseInt(el.dataset.c);
    const dur = 2000;
    const start = performance.now();
    const isBig = target > 1000;
    const animate = (time) => {
      const p = Math.min((time - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      const val = Math.floor(ease * target);
      el.textContent = isBig ? val.toLocaleString() : val;
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        countUp(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-c]').forEach(el => countObs.observe(el));

  // 10. Directory / Roll Call System
  const rcGrid = document.getElementById('rcGrid');
  rcGrid.innerHTML = DATA.directory.map(d => `
    <div class="dir-card rv" data-cat="${d.cat}" data-search="${d.name.toLowerCase()} ${d.aka.toLowerCase()} ${d.tag.toLowerCase()}">
      <div class="dir-img">
        ${d.img ? `<img src="${d.img}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
        <div class="dir-ph" style="${d.img ? 'display:none' : 'display:flex'}">${d.init}</div>
      </div>
      <div class="dir-info">
        <h4>${d.name}</h4>
        <span>aka "${d.aka}"</span>
        <span class="dir-tag">${d.tag}</span>
      </div>
    </div>
  `).join('');

  // Filtering System
  let activeFilt = 'all', activeSearch = '';
  const filterGrid = () => {
    document.querySelectorAll('.dir-card').forEach(c => {
      const mCat = activeFilt === 'all' || c.dataset.cat === activeFilt;
      const mSearch = activeSearch === '' || c.dataset.search.includes(activeSearch);
      c.style.display = (mCat && mSearch) ? 'flex' : 'none';
    });
  };

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeFilt = e.target.dataset.cat;
      filterGrid();
    });
  });

  document.getElementById('rcSearch').addEventListener('input', (e) => {
    activeSearch = e.target.value.toLowerCase().trim();
    filterGrid();
  });
});