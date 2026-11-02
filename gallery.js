/* ===== Project gallery: auto-detects every image in assets/projects ===== */
(() => {
  const REPO = 'Nethumnimsara/Nethumnimsara.github.io', DIR = 'assets/projects', PAGE = 9;
  const NEWEST_FIRST = false;           // true = latest project shown first
  const FALLBACK_MAX = 40;              // used only if the GitHub API is unavailable
  // Optional: give a project a custom title / category / description.
  // Key = file name without extension. Projects not listed here get "Project 06" etc.
  const INFO = {
    'project-1': { title: 'FlexGen Screen Recorder', cat: 'Software', desc: 'Desktop screen recording and screenshot application.' },
    'project-2': { title: 'FlexGen Video Editor',    cat: 'Software', desc: 'Video editing application from the FlexGen ecosystem.' },
    // 'project-6': { title: 'My Poster Design', cat: 'Graphic Design', desc: 'Short description here.' },
  };

  const root = document.getElementById('gallery');
  const moreBtn = document.getElementById('galleryMore');
  const countEl = document.getElementById('galleryCount');
  if (!root) return;
  let items = [], shown = 0, cur = 0;

  const num = f => parseInt((f.match(/(\d+)/) || [0, 0])[1], 10);
  const meta = f => {
    const key = f.replace(/\.[^.]+$/, ''), n = num(f);
    return Object.assign({ title: 'Project ' + String(n).padStart(2, '0'), cat: 'Creative Work', desc: '' }, INFO[key] || {});
  };

  async function discover() {
    try {
      const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${DIR}`);
      if (!r.ok) throw 0;
      const list = (await r.json()).filter(x => /\.(jpe?g|png|webp|gif|avif)$/i.test(x.name)).map(x => x.name);
      if (!list.length) throw 0;
      return list;
    } catch (e) {            // fallback: probe project-1 … project-N
      const exts = ['jpg', 'png', 'webp', 'jpeg'], found = [];
      const probe = src => new Promise(ok => { const i = new Image(); i.onload = () => ok(true); i.onerror = () => ok(false); i.src = src; });
      await Promise.all(Array.from({ length: FALLBACK_MAX }, async (_, k) => {
        for (const x of exts) { const f = `project-${k + 1}.${x}`; if (await probe(`${DIR}/${f}`)) { found.push(f); break; } }
      }));
      return found;
    }
  }

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -40px 0px' });

  function render() {
    const end = Math.min(shown + PAGE, items.length);
    for (let i = shown; i < end; i++) {
      const it = items[i], fig = document.createElement('figure');
      fig.className = 'g-item'; fig.tabIndex = 0;
      fig.innerHTML = `<img src="${DIR}/${encodeURIComponent(it.file)}" alt="${it.title}" loading="lazy" decoding="async">
        <figcaption class="g-cap"><small>${it.cat.toUpperCase()}</small><strong>${it.title}</strong><b>↗</b></figcaption>`;
      fig.addEventListener('click', () => open(i));
      fig.addEventListener('keydown', e => { if (e.key === 'Enter') open(i); });
      root.appendChild(fig); io.observe(fig);
    }
    shown = end;
    if (countEl) countEl.textContent = `SHOWING ${shown} OF ${items.length} PROJECTS`;
    if (moreBtn) moreBtn.style.display = shown >= items.length ? 'none' : '';
  }

  // Lightbox
  const lb = document.createElement('div'); lb.className = 'lb';
  lb.innerHTML = '<button class="lb-x" aria-label="Close">×</button><button class="lb-p" aria-label="Previous">‹</button><button class="lb-n" aria-label="Next">›</button><img alt=""><div class="lb-cap"></div>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lb-cap');
  function open(i) {
    cur = (i + items.length) % items.length; const it = items[cur];
    lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    lbImg.src = `${DIR}/${encodeURIComponent(it.file)}`; lbImg.alt = it.title;
    lbCap.innerHTML = `<small>${it.cat.toUpperCase()} · ${cur + 1}/${items.length}</small><strong>${it.title}</strong>${it.desc ? `<p>${it.desc}</p>` : ''}`;
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  lb.querySelector('.lb-x').onclick = close;
  lb.querySelector('.lb-p').onclick = () => open(cur - 1);
  lb.querySelector('.lb-n').onclick = () => open(cur + 1);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') open(cur - 1); if (e.key === 'ArrowRight') open(cur + 1); });
  let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) open(cur + (d < 0 ? 1 : -1)); });

  if (moreBtn) moreBtn.addEventListener('click', render);
  discover().then(files => {
    files.sort((a, b) => num(a) - num(b)); if (NEWEST_FIRST) files.reverse();
    items = files.map(f => Object.assign({ file: f }, meta(f)));
    render();
  });
})();
