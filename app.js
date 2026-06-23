/* ============================================
   VITALNET - Core Application JavaScript
   ============================================ */

'use strict';

/* ---- Theme Management ---- */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('vn-theme') || 'light';
    this.set(saved);
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vn-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  },
  toggle() {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    this.set(cur === 'dark' ? 'light' : 'dark');
  }
};

/* ---- Sidebar Management ---- */
const Sidebar = {
  isOpen: true,
  init() {
    const ham = document.querySelector('.hamburger');
    if (ham) ham.addEventListener('click', () => this.toggle());

    // Overlay for mobile
    const overlay = document.createElement('div');
    overlay.id = 'sidebarOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999;display:none;';
    overlay.addEventListener('click', () => this.close());
    document.body.appendChild(overlay);

    // Active nav items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        if (window.innerWidth < 900) this.close();
      });
    });
  },
  toggle() {
    const sb = document.querySelector('.sidebar');
    const ov = document.getElementById('sidebarOverlay');
    if (!sb) return;
    sb.classList.toggle('open');
    if (ov) ov.style.display = sb.classList.contains('open') ? 'block' : 'none';
  },
  close() {
    const sb = document.querySelector('.sidebar');
    const ov = document.getElementById('sidebarOverlay');
    if (sb) sb.classList.remove('open');
    if (ov) ov.style.display = 'none';
  }
};

/* ---- Toast Notifications ---- */
const Toast = {
  container: null,
  init() {
    this.container = document.createElement('div');
    this.container.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(this.container);
  },
  show(msg, type = 'success', duration = 3500) {
    const icons = { success: 'check-circle', danger: 'exclamation-circle', warning: 'exclamation-triangle', info: 'info-circle' };
    const colors = { success: '#10b981', danger: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };

    const t = document.createElement('div');
    t.style.cssText = `background:var(--bg-card);border:1px solid var(--border-color);border-left:4px solid ${colors[type]};
      border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-lg);
      min-width:280px;max-width:360px;animation:fadeIn .3s ease;font-size:13px;font-weight:500;color:var(--text-primary);`;

    t.innerHTML = `<i class="fas fa-${icons[type]}" style="color:${colors[type]};font-size:16px;flex-shrink:0;"></i>
      <span style="flex:1;">${msg}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:16px;line-height:1;">&times;</button>`;

    this.container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, duration);
  }
};

/* ---- Modal Management ---- */
const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  },
  close(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  },
  closeAll() {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  },
  init() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', () => Modal.open(btn.dataset.modalOpen));
    });
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => Modal.close(btn.dataset.modalClose || btn.closest('.modal-overlay').id));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') Modal.closeAll(); });
  }
};

/* ---- Tabs ---- */
const Tabs = {
  init() {
    document.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        const group = tab.closest('[data-tab-group]')?.dataset.tabGroup;
        if (group) {
          document.querySelectorAll(`[data-tab-group="${group}"] .tab-item`).forEach(t => t.classList.remove('active'));
          document.querySelectorAll(`[data-tab-panel="${group}"]`).forEach(p => p.style.display = 'none');
          tab.classList.add('active');
          const panel = document.getElementById(tab.dataset.tab);
          if (panel) panel.style.display = 'block';
        } else {
          const parent = tab.parentElement;
          parent.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const target = document.getElementById(tab.dataset.tab);
          if (target) {
            document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
            target.style.display = 'block';
          }
        }
      });
    });
  }
};

/* ---- Filter Chips ---- */
const FilterChips = {
  init() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.closest('.filter-bar');
        if (group) group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }
};

/* ---- Medicine Checklist ---- */
const MedCheck = {
  init() {
    document.querySelectorAll('.med-check').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('done');
        if (btn.classList.contains('done')) {
          btn.innerHTML = '<i class="fas fa-check"></i>';
          Toast.show('Medicine marked as taken!', 'success');
        } else {
          btn.innerHTML = '';
        }
      });
    });
  }
};

/* ---- Counter Animation ---- */
const Counter = {
  animate(el, target, duration = 1500) {
    const start = performance.now();
    const initial = parseInt(el.textContent) || 0;
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(initial + (target - initial) * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },
  initAll() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count || el.textContent.replace(/,/g, ''));
          if (!isNaN(target)) this.animate(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: .3 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }
};

/* ---- Real-time Vitals Simulation ---- */
const VitalsSimulator = {
  data: {
    heartRate: 72,
    bpSys: 120, bpDia: 80,
    sugar: 95,
    spo2: 98,
    temp: 98.6
  },
  intervals: [],
  start() {
    this.intervals.push(setInterval(() => {
      this.data.heartRate = this.jitter(this.data.heartRate, 65, 90, 3);
      this.data.bpSys  = this.jitter(this.data.bpSys, 110, 135, 2);
      this.data.bpDia  = this.jitter(this.data.bpDia, 70, 90, 2);
      this.data.sugar  = this.jitter(this.data.sugar, 85, 110, 2);
      this.data.spo2   = this.jitter(this.data.spo2, 96, 99, 0.5);
      this.data.temp   = this.jitter(this.data.temp, 97.5, 99.2, .1);
      this.update();
    }, 3000));
  },
  jitter(val, min, max, delta) {
    return Math.min(max, Math.max(min, +(val + (Math.random() * delta * 2 - delta)).toFixed(1)));
  },
  update() {
    const map = {
      'live-hr':   this.data.heartRate,
      'live-bp':   `${Math.round(this.data.bpSys)}/${Math.round(this.data.bpDia)}`,
      'live-sugar': this.data.sugar,
      'live-spo2':  this.data.spo2 + '%',
      'live-temp':  this.data.temp + '°F',
    };
    Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) { el.textContent = val; el.style.transition = 'color .4s'; el.style.color = 'var(--teal-400)'; setTimeout(() => el.style.color = '', 600); }
    });
  },
  stop() { this.intervals.forEach(clearInterval); this.intervals = []; }
};

/* ---- Chart.js Configurations ---- */
const Charts = {
  defaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#5c7070';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
    Chart.defaults.plugins.legend.labels.boxHeight = 8;
  },

  gradient(ctx, color1, color2) {
    const g = ctx.createLinearGradient(0, 0, 0, 300);
    g.addColorStop(0, color1);
    g.addColorStop(1, color2);
    return g;
  },

  healthTrends(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Heart Rate',
            data: [70,73,68,75,72,69,74,71,76,73,70,72],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,.08)',
            fill: true,
            tension: .4,
            pointBackgroundColor: '#ef4444',
            pointRadius: 4, pointHoverRadius: 6,
          },
          {
            label: 'Systolic BP',
            data: [118,122,120,125,121,118,124,122,119,121,118,120],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,.08)',
            fill: true,
            tension: .4,
            pointBackgroundColor: '#3b82f6',
            pointRadius: 4, pointHoverRadius: 6,
          },
          {
            label: 'Blood Sugar',
            data: [92,96,94,98,95,91,97,94,93,96,92,95],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245,158,11,.08)',
            fill: true,
            tension: .4,
            pointBackgroundColor: '#f59e0b',
            pointRadius: 4, pointHoverRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'top' }, tooltip: { backgroundColor: 'var(--bg-card)', titleColor: 'var(--text-primary)', bodyColor: 'var(--text-muted)', borderColor: 'var(--border-color)', borderWidth: 1, padding: 12 } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,.04)' }, border: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,.04)' }, border: { display: false } }
        }
      }
    });
  },

  diseaseDistribution(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Hypertension','Diabetes','Obesity','Heart Disease','Respiratory','Other'],
        datasets: [{
          data: [28, 22, 18, 14, 10, 8],
          backgroundColor: ['#169090','#3b82f6','#f59e0b','#ef4444','#8b5cf6','#10b981'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'right' },
          tooltip: { backgroundColor: 'var(--bg-card)', titleColor: 'var(--text-primary)', bodyColor: 'var(--text-muted)', borderColor: 'var(--border-color)', borderWidth: 1, padding: 12 }
        }
      }
    });
  },

  ageGroupHealth(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['0-14','15-24','25-34','35-44','45-54','55-64','65+'],
        datasets: [
          { label: 'Healthy', data: [92,87,78,68,55,42,35], backgroundColor: '#10b981', borderRadius: 6 },
          { label: 'At Risk',  data: [5, 8, 14, 20, 28, 35, 38], backgroundColor: '#f59e0b', borderRadius: 6 },
          { label: 'Critical', data: [3, 5, 8, 12, 17, 23, 27], backgroundColor: '#ef4444', borderRadius: 6 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' }, tooltip: { backgroundColor: 'var(--bg-card)', titleColor: 'var(--text-primary)', bodyColor: 'var(--text-muted)', borderColor: 'var(--border-color)', borderWidth: 1, padding: 12 } },
        scales: {
          x: { stacked: true, grid: { display: false }, border: { display: false } },
          y: { stacked: true, grid: { color: 'rgba(0,0,0,.04)' }, border: { display: false } }
        }
      }
    });
  },

  monthlyReports(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    const g1 = this.gradient(ctx, 'rgba(22,144,144,.6)', 'rgba(22,144,144,.02)');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{
          label: 'Health Reports',
          data: [142, 168, 155, 201, 188, 225],
          borderColor: 'var(--teal-400)',
          backgroundColor: g1,
          fill: true,
          tension: .5,
          pointBackgroundColor: 'var(--teal-400)',
          pointRadius: 5, pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: 'var(--bg-card)', titleColor: 'var(--text-primary)', bodyColor: 'var(--text-muted)', borderColor: 'var(--border-color)', borderWidth: 1, padding: 12 } },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,.04)' }, border: { display: false } }
        }
      }
    });
  },

  fitnessRadar(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Steps','Calories','Water','Sleep','Exercise','Nutrition'],
        datasets: [
          { label: 'This Week', data: [72, 65, 80, 70, 60, 75], borderColor: 'var(--teal-400)', backgroundColor: 'rgba(0,212,212,.15)', pointBackgroundColor: 'var(--teal-400)', pointRadius: 4 },
          { label: 'Goal',      data: [100,100,100,100,100,100], borderColor: 'rgba(0,0,0,.15)', backgroundColor: 'transparent', pointRadius: 0, borderDash: [5,5] }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 25 }, grid: { color: 'rgba(0,0,0,.06)' } } }
      }
    });
  },

  bloodSugarWeek(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'Fasting',
          data: [95,98,92,100,96,94,97],
          backgroundColor: 'rgba(22,144,144,.7)',
          borderRadius: 8,
        }, {
          label: 'Post-meal',
          data: [135,142,128,155,138,131,140],
          backgroundColor: 'rgba(245,158,11,.7)',
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' }, tooltip: { backgroundColor: 'var(--bg-card)', titleColor: 'var(--text-primary)', bodyColor: 'var(--text-muted)', borderColor: 'var(--border-color)', borderWidth: 1, padding: 12 } },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,.04)' }, border: { display: false }, suggestedMin: 60, suggestedMax: 180 }
        }
      }
    });
  },

  activityLine(id) {
    const el = document.getElementById(id);
    if (!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    const steps = Array.from({length:7}, () => Math.floor(Math.random()*5000)+4000);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'Steps',
          data: steps,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.1)',
          fill: true,
          tension: .4,
          pointBackgroundColor: '#10b981',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: 'var(--bg-card)', titleColor: 'var(--text-primary)', bodyColor: 'var(--text-muted)', borderColor: 'var(--border-color)', borderWidth: 1, padding: 12 } },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,.04)' }, border: { display: false } }
        }
      }
    });
  }
};

/* ---- AI Health Chat ---- */
const AIChat = {
  responses: {
    greeting: ["Hello! I'm VitalNet AI Health Assistant. I can help you with health questions, symptom analysis, and wellness recommendations. How can I assist you today?"],
    headache: ["Headaches can have many causes. Common triggers include dehydration, stress, lack of sleep, or eye strain. Try drinking water, resting in a quiet dark room, and if it persists more than 24 hours or is severe, please consult a doctor.", "For your headache, I recommend: 1) Stay hydrated (8+ glasses/day), 2) Rest in a dark, quiet room, 3) Apply a cold or warm compress, 4) Check if screen time may be a trigger. If headaches are frequent, book an appointment with a neurologist."],
    fever: ["A fever indicates your body is fighting an infection. Recommended steps: 1) Rest and stay hydrated, 2) Monitor temperature every 4 hours, 3) Paracetamol can help manage fever, 4) Seek immediate care if temperature exceeds 103°F (39.4°C) or lasts more than 3 days."],
    diabetes: ["Based on your health profile, here are diabetes management tips: 1) Monitor blood sugar regularly (track in Health Monitoring), 2) Follow a low-GI diet, 3) Exercise 30 minutes daily, 4) Take medications as prescribed, 5) Schedule regular HbA1c tests every 3 months."],
    bp: ["For blood pressure management: 1) Reduce sodium intake to <2,300mg/day, 2) Regular aerobic exercise, 3) Maintain healthy weight, 4) Limit alcohol, 5) Manage stress through meditation. Your BP logs show some variation — I'd recommend discussing this with your doctor."],
    default: ["I understand your concern. Based on general health guidelines, I recommend monitoring your symptoms closely and consulting with a healthcare professional if symptoms worsen or persist. Would you like me to help you book an appointment with a doctor?", "That's a great health question! Let me provide some general guidance. Remember that for personalized medical advice, always consult with a qualified healthcare provider. Shall I help you find a nearby specialist?", "I've analyzed your query and your health profile. Here are my recommendations: 1) Monitor your symptoms for 24-48 hours, 2) Ensure adequate rest and hydration, 3) Log your vitals in the Health Monitoring section. Would you like to schedule a consultation?"]
  },

  getResponse(msg) {
    const m = msg.toLowerCase();
    if (m.includes('hello') || m.includes('hi') || m.includes('hey')) return this.random('greeting');
    if (m.includes('headache') || m.includes('head pain') || m.includes('migraine')) return this.random('headache');
    if (m.includes('fever') || m.includes('temperature')) return this.random('fever');
    if (m.includes('diabetes') || m.includes('sugar') || m.includes('glucose')) return this.random('diabetes');
    if (m.includes('blood pressure') || m.includes('bp') || m.includes('hypertension')) return this.random('bp');
    return this.random('default');
  },

  random(key) {
    const arr = this.responses[key] || this.responses.default;
    return arr[Math.floor(Math.random() * arr.length)];
  },

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const msgs    = container.querySelector('.chat-messages');
    const input   = container.querySelector('.chat-input');
    const sendBtn = container.querySelector('.chat-send');

    const addMsg = (text, role) => {
      const isAI = role === 'ai';
      const div = document.createElement('div');
      div.className = `chat-msg ${role}`;
      div.innerHTML = `
        <div class="chat-avatar ${isAI ? 'ai' : 'user-av'}">
          ${isAI ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
        </div>
        <div class="chat-bubble">${text}</div>
      `;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    };

    const handleSend = () => {
      const text = input.value.trim();
      if (!text) return;
      addMsg(text, 'user');
      input.value = '';
      setTimeout(() => {
        const typing = document.createElement('div');
        typing.className = 'chat-msg ai';
        typing.id = 'typing-indicator';
        typing.innerHTML = `<div class="chat-avatar ai"><i class="fas fa-robot"></i></div><div class="chat-bubble"><i class="fas fa-ellipsis-h" style="animation:pulse-anim 1s infinite"></i></div>`;
        msgs.appendChild(typing);
        msgs.scrollTop = msgs.scrollHeight;
        setTimeout(() => {
          document.getElementById('typing-indicator')?.remove();
          addMsg(this.getResponse(text), 'ai');
        }, 1200);
      }, 400);
    };

    sendBtn?.addEventListener('click', handleSend);
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
  }
};

/* ---- Emergency Alert System ---- */
const Emergency = {
  checkVitals(vitals) {
    const alerts = [];
    if (vitals.heartRate < 50 || vitals.heartRate > 100) alerts.push({ type: 'Heart Rate', value: vitals.heartRate, threshold: '60-100 bpm', severity: 'critical' });
    if (vitals.bpSys > 140 || vitals.bpSys < 90) alerts.push({ type: 'Blood Pressure', value: `${vitals.bpSys}/${vitals.bpDia}`, threshold: '90-140/60-90 mmHg', severity: 'warning' });
    if (vitals.spo2 < 95) alerts.push({ type: 'SpO₂', value: vitals.spo2 + '%', threshold: '≥95%', severity: 'critical' });
    if (vitals.sugar > 180 || vitals.sugar < 70) alerts.push({ type: 'Blood Sugar', value: vitals.sugar, threshold: '70-140 mg/dL', severity: vitals.sugar > 300 || vitals.sugar < 54 ? 'critical' : 'warning' });
    return alerts;
  }
};

/* ---- Search Functionality ---- */
const Search = {
  init() {
    const input = document.querySelector('.topbar-search input');
    if (!input) return;
    input.addEventListener('input', debounce((e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length < 2) { this.clearResults(); return; }
      this.showResults(q);
    }, 300));
  },
  results: ['Dashboard', 'Health Profile', 'Vitals Monitoring', 'Blood Pressure', 'Medical Records', 'Appointments', 'Medicine Reminder', 'AI Health Assistant', 'Emergency Alerts', 'Vaccination Tracker', 'Fitness Tracker', 'Community Analytics'],
  showResults(q) {
    const filtered = this.results.filter(r => r.toLowerCase().includes(q));
    // In production, render a dropdown
    console.log('Search results:', filtered);
  },
  clearResults() {}
};

/* ---- Form Validation ---- */
const FormValidator = {
  validate(formEl) {
    let valid = true;
    formEl.querySelectorAll('[required]').forEach(field => {
      const isValid = field.value.trim() !== '';
      field.style.borderColor = isValid ? '' : 'var(--danger)';
      if (!isValid) valid = false;
    });
    return valid;
  },
  init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (this.validate(form)) {
          Toast.show('Form submitted successfully!', 'success');
          form.reset();
        } else {
          Toast.show('Please fill in all required fields.', 'danger');
        }
      });
    });

    // Live validation
    document.querySelectorAll('.form-control[required]').forEach(field => {
      field.addEventListener('blur', () => {
        field.style.borderColor = field.value.trim() ? '' : 'var(--danger)';
      });
      field.addEventListener('input', () => {
        if (field.value.trim()) field.style.borderColor = '';
      });
    });
  }
};

/* ---- Page Router (SPA-like) ---- */
const Router = {
  pages: {},
  register(id, initFn) { this.pages[id] = initFn; },
  navigate(id) {
    document.querySelectorAll('.app-page').forEach(p => p.style.display = 'none');
    const page = document.getElementById(id);
    if (page) {
      page.style.display = 'block';
      page.style.animation = 'fadeIn .3s ease';
      if (this.pages[id]) this.pages[id]();
    }
  }
};

/* ---- Utility Functions ---- */
function debounce(fn, delay) {
  let t;
  return function(...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), delay); };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getRiskClass(pct) {
  if (pct < 30) return { cls: 'green', label: 'Low Risk', color: '#10b981' };
  if (pct < 60) return { cls: 'orange', label: 'Moderate Risk', color: '#f59e0b' };
  return { cls: 'red', label: 'High Risk', color: '#ef4444' };
}

/* ---- App Initializer ---- */
const App = {
  init() {
    ThemeManager.init();
    Sidebar.init();
    Toast.init();
    Modal.init();
    Tabs.init();
    FilterChips.init();
    MedCheck.init();
    Counter.initAll();
    FormValidator.init();
    Search.init();

    // Charts
    if (typeof Chart !== 'undefined') {
      Charts.defaults();
      Charts.healthTrends('healthTrendsChart');
      Charts.diseaseDistribution('diseaseChart');
      Charts.ageGroupHealth('ageGroupChart');
      Charts.monthlyReports('monthlyReportsChart');
      Charts.fitnessRadar('fitnessRadarChart');
      Charts.bloodSugarWeek('sugarWeekChart');
      Charts.activityLine('activityChart');
    }

    // AI Chat
    AIChat.init('aiChatContainer');

    // Vitals
    VitalsSimulator.start();

    // Theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => ThemeManager.toggle());

    // Notification badge
    const notifBtn = document.querySelector('.topbar-btn[data-action="notifications"]');
    notifBtn?.addEventListener('click', () => Modal.open('notifModal'));

    // Landing page hero mock animation
    this.animateMockBars();
  },

  animateMockBars() {
    const bars = document.querySelectorAll('.mock-bar');
    if (!bars.length) return;
    const heights = [40, 65, 50, 80, 55, 70, 45, 85, 60, 75];
    bars.forEach((bar, i) => { bar.style.height = heights[i % heights.length] + 'px'; });
    setInterval(() => {
      bars.forEach(bar => { bar.style.height = (Math.random() * 60 + 20) + 'px'; });
    }, 2000);
  }
};

/* ---- Boot ---- */
document.addEventListener('DOMContentLoaded', () => App.init());
