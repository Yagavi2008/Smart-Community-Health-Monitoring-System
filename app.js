// VitalNet - Shared JS
(function () {

  // ── Sidebar toggle (mobile) ──
  function initSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar   = document.querySelector('.sidebar');
    if (!hamburger || !sidebar) return;
    hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target))
        sidebar.classList.remove('open');
    });
  }

  // ── Tabs ──
  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-tabs]') || btn.closest('.card') || btn.parentElement.parentElement;
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  // ── Clock ──
  function initClock() {
    const el = document.getElementById('live-clock');
    if (!el) return;
    function update() {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    update(); setInterval(update, 1000);
  }

  // ── Animate counters ──
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec    = el.dataset.dec || 0;
      let start = 0; const dur = 1200;
      const step = timestamp => {
        if (!start) start = timestamp;
        const prog = Math.min((timestamp - start) / dur, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        el.textContent = (eased * target).toFixed(dec) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  // ── Toast ──
  window.VNToast = function (msg, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      Object.assign(container.style, {
        position: 'fixed', top: '80px', right: '20px',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px'
      });
      document.body.appendChild(container);
    }
    const icons = { info: 'circle-info', success: 'check-circle', warning: 'triangle-exclamation', danger: 'circle-xmark' };
    const colors = { info: '#1565C0', success: '#2E7D32', warning: '#F57F17', danger: '#C62828' };
    const t = document.createElement('div');
    t.style.cssText = `
      background:#fff; border:1px solid #E3E8EF; border-left:4px solid ${colors[type]};
      border-radius:10px; padding:12px 16px; box-shadow:0 4px 16px rgba(0,0,0,.12);
      display:flex; align-items:center; gap:10px; min-width:280px; max-width:360px;
      font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:#0F1923;
      transform:translateX(120%); transition:transform .3s ease; cursor:pointer;
    `;
    t.innerHTML = `<i class="fa-solid fa-${icons[type]}" style="color:${colors[type]};font-size:16px;"></i><span style="flex:1">${msg}</span>`;
    t.addEventListener('click', () => remove());
    container.appendChild(t);
    setTimeout(() => t.style.transform = 'translateX(0)', 50);
    const tid = setTimeout(() => remove(), duration);
    function remove() { clearTimeout(tid); t.style.transform = 'translateX(120%)'; setTimeout(() => t.remove(), 300); }
  };

  // ── Simulated vitals (demo) ──
  window.VNVitals = {
    heartRate: 72, spo2: 98, bp_s: 120, bp_d: 80, temp: 98.4, rr: 16,
    randomize() {
      this.heartRate = 65 + Math.floor(Math.random() * 30);
      this.spo2      = 95 + Math.floor(Math.random() * 5);
      this.bp_s      = 110 + Math.floor(Math.random() * 30);
      this.bp_d      = 70  + Math.floor(Math.random() * 20);
      this.temp      = +(98.0 + Math.random() * 2.5).toFixed(1);
      this.rr        = 12  + Math.floor(Math.random() * 8);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initTabs();
    initClock();
    animateCounters();
  });

})();
