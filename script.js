
/**
 * HealthPulse — Smart Community Health Monitoring System
 * Complete JavaScript Module
 * =====================================================
 * Covers:
 *  1. Application State Management
 *  2. Authentication & Role-Based Access Control
 *  3. Navigation & Page Routing
 *  4. User Health Profile Management
 *  5. Health Monitoring & Vitals Engine
 *  6. Medical Records Management
 *  7. Appointment Management
 *  8. Medicine Reminder System
 *  9. AI Health Assistant (Chatbot Engine)
 * 10. Emergency Alert System
 * 11. Disease Risk Prediction Engine
 * 12. Smart Health Recommendations
 * 13. Community Health Analytics
 * 14. Vaccination Tracker
 * 15. Fitness & Activity Tracker
 * 16. Healthcare Locator
 * 17. Chart Management (Chart.js)
 * 18. Dark Mode
 * 19. Notification Center
 * 20. Form Validation
 * 21. Toast / Alert UI
 * 22. Settings
 * 23. Admin Panel Utilities
 * 24. Data Persistence (localStorage)
 * 25. Real-time Simulation
 */

'use strict';

/* ============================================================
   1. APPLICATION STATE
   ============================================================ */
const AppState = {
  currentUser: null,
  currentPage: 'dashboard',
  isDark: false,
  chartInstances: {},
  notifications: [],
  medicines: [],
  appointments: [],
  healthRecords: [],
  vaccinations: [],
  activities: [],
  medicalRecords: [],
  chatHistory: [],
  liveVitals: { hr: 76, bp: '120/80', sugar: 98, spo2: 98.5, temp: 98.6, bmi: 22.4 },
  simulationInterval: null,
  emergencyCheckInterval: null,
  reminderInterval: null,
  notificationCheckInterval: null,
};

/* ============================================================
   2. SAMPLE / SEED DATA
   ============================================================ */
const SeedData = {
  users: [
    { id: 1, name: 'Admin User',        email: 'admin@healthpulse.com',  password: 'password', role: 'Admin' },
    { id: 2, name: 'Dr. Anjali Mehta',  email: 'dr.anjali@healthpulse.com', password: 'password', role: 'Doctor' },
    { id: 3, name: 'Ravi Kumar',        email: 'ravi@gmail.com',         password: 'password', role: 'Community Member' },
    { id: 4, name: 'Sunita Devi',       email: 'sunita@clinic.com',      password: 'password', role: 'Healthcare Worker' },
  ],
  healthProfile: {
    age: 34, gender: 'Male', height: 172, weight: 66, bloodGroup: 'O+',
    allergies: 'Penicillin, Dust mites',
    conditions: 'Type 2 Diabetes (controlled), Hypertension',
    medications: 'Metformin 500mg, Amlodipine 5mg',
    emergencyContact: { name: 'Priya (Spouse)', phone: '+91 98765 11111', relation: 'Spouse' },
    insurance: { provider: 'Star Health Insurance', policy: 'SH-2024-789456', validUntil: '2025-12-31', coverage: '₹5,00,000' },
  },
  medicines: [
    { id: 1, name: 'Metformin 500mg',   dose: '1 tablet', frequency: 'Twice daily',  time: '08:00', food: 'After food', taken: false, startDate: '2024-01-01', endDate: '2025-12-31' },
    { id: 2, name: 'Amlodipine 5mg',    dose: '1 tablet', frequency: 'Once daily',   time: '13:00', food: 'After food', taken: false, startDate: '2024-01-01', endDate: '2025-12-31' },
    { id: 3, name: 'Atorvastatin 10mg', dose: '1 tablet', frequency: 'Once daily',   time: '22:00', food: 'Before food', taken: false, startDate: '2024-01-01', endDate: '2025-12-31' },
    { id: 4, name: 'Vitamin D3 60K',    dose: '1 capsule', frequency: 'Weekly',      time: '09:00', food: 'With milk', taken: false, startDate: '2024-01-01', endDate: '2025-12-31' },
    { id: 5, name: 'Aspirin 75mg',      dose: '1 tablet', frequency: 'Once daily',   time: '09:00', food: 'After food', taken: true,  startDate: '2024-06-01', endDate: '2025-12-31' },
  ],
  appointments: [
    { id: 1, doctor: 'Dr. Anjali Mehta', specialty: 'General Medicine', type: 'Consultation', date: '2025-06-18', time: '10:30 AM', hospital: 'Apollo Hospitals, Chennai', status: 'Confirmed', reason: 'Routine checkup' },
    { id: 2, doctor: 'Dr. Suresh Nair',  specialty: 'Cardiology',       type: 'Review',       date: '2025-06-22', time: '3:00 PM',  hospital: 'Fortis Hospital, Chennai',   status: 'Scheduled', reason: 'Cardiology follow-up' },
    { id: 3, doctor: 'Dr. Priya Rao',    specialty: 'Endocrinology',    type: 'Follow-up',    date: '2025-06-28', time: '11:00 AM', hospital: 'Fortis Hospital, Chennai',   status: 'Pending',   reason: 'Diabetes review' },
  ],
  healthRecords: [
    { id: 1, date: '2025-06-18', hr: 76,  bp: '120/80', sugar: 98,  spo2: 98.5, temp: 98.6, bmi: 22.4, notes: '', status: 'Normal' },
    { id: 2, date: '2025-06-17', hr: 82,  bp: '125/82', sugar: 105, spo2: 97.8, temp: 99.1, bmi: 22.4, notes: 'Mild stress', status: 'Mild Alert' },
    { id: 3, date: '2025-06-16', hr: 79,  bp: '118/78', sugar: 92,  spo2: 99.0, temp: 98.4, bmi: 22.3, notes: '', status: 'Normal' },
    { id: 4, date: '2025-06-15', hr: 88,  bp: '135/90', sugar: 118, spo2: 96.5, temp: 100.2, bmi: 22.5, notes: 'Fever, headache', status: 'Alert' },
    { id: 5, date: '2025-06-14', hr: 74,  bp: '117/76', sugar: 88,  spo2: 98.8, temp: 98.5, bmi: 22.3, notes: '', status: 'Normal' },
  ],
  vaccinations: [
    { id: 1, name: 'COVID-19 (Covishield) — 2nd Dose', date: '2021-09-15', hospital: 'Apollo Hospital',        status: 'done' },
    { id: 2, name: 'Hepatitis B — 3rd Dose',            date: '2022-03-10', hospital: 'Primary Health Center',  status: 'done' },
    { id: 3, name: 'Tetanus Booster (Td)',               date: '2023-07-22', hospital: 'Government Hospital',    status: 'done' },
    { id: 4, name: 'Influenza (Flu) — Annual',           date: '2025-07-01', hospital: '',                      status: 'upcoming' },
    { id: 5, name: 'Pneumococcal (PCV13)',                date: '2025-08-15', hospital: '',                      status: 'upcoming' },
    { id: 6, name: 'HPV Vaccine — Dose 2',               date: '2025-03-01', hospital: '',                      status: 'overdue' },
  ],
  activities: [
    { id: 1, date: '2025-06-18', type: 'Walking',  steps: 6248, calories: 1842, water: 1.8, exercise: 45 },
    { id: 2, date: '2025-06-17', type: 'Running',  steps: 8200, calories: 2100, water: 2.2, exercise: 60 },
    { id: 3, date: '2025-06-16', type: 'Cycling',  steps: 7500, calories: 1980, water: 2.0, exercise: 50 },
    { id: 4, date: '2025-06-15', type: 'Gym',      steps: 9100, calories: 2300, water: 2.5, exercise: 75 },
    { id: 5, date: '2025-06-14', type: 'Walking',  steps: 6800, calories: 1750, water: 1.9, exercise: 40 },
  ],
  medicalRecords: [
    { id: 'REC-001', type: 'Lab Report',  title: 'CBC + Metabolic Panel',   doctor: 'Dr. Anjali Mehta', date: '2025-06-15', hospital: 'Apollo Hospitals',  status: 'Reviewed' },
    { id: 'REC-002', type: 'Prescription',title: 'Diabetes Management',     doctor: 'Dr. Suresh Nair',  date: '2025-06-10', hospital: 'Fortis Hospital',    status: 'Active' },
    { id: 'REC-003', type: 'Imaging',     title: 'Chest X-Ray',             doctor: 'Dr. Priya Rao',    date: '2025-06-02', hospital: 'MIOT Hospital',      status: 'Normal' },
    { id: 'REC-004', type: 'Lab Report',  title: 'HbA1c Test',              doctor: 'Dr. Anjali Mehta', date: '2025-05-28', hospital: 'Apollo Hospitals',   status: 'Follow-up' },
    { id: 'REC-005', type: 'ECG',         title: 'Resting ECG',             doctor: 'Dr. Suresh Nair',  date: '2025-05-20', hospital: 'Fortis Hospital',    status: 'Normal' },
  ],
  notifications: [
    { id: 1, title: '🚨 Emergency Alert: Abnormal BP Reading', desc: 'Patient Priya Sharma recorded BP of 180/110 mmHg. Immediate attention required.', time: '2 minutes ago', read: false, type: 'emergency' },
    { id: 2, title: '💊 Medicine Reminder: Atorvastatin 10mg', desc: 'Your bedtime medication is due at 10:00 PM tonight.', time: '1 hour ago', read: false, type: 'reminder' },
    { id: 3, title: '📅 Appointment Confirmed: Dr. Anjali Mehta', desc: 'Your appointment for June 18 at 10:30 AM has been confirmed.', time: '3 hours ago', read: false, type: 'appointment' },
    { id: 4, title: '💉 Vaccination Reminder: Influenza Vaccine', desc: 'Your annual flu vaccine is due next month.', time: 'Yesterday', read: true, type: 'vaccine' },
    { id: 5, title: '📊 Monthly Health Report Available', desc: 'Your May 2025 health summary report has been generated.', time: '2 days ago', read: true, type: 'report' },
    { id: 6, title: '🤖 AI Health Tip', desc: 'Increasing daily water intake to 2.5L could improve your blood sugar control.', time: '3 days ago', read: true, type: 'ai' },
  ],
  communityStats: {
    totalMembers: 12482, activePatients: 3847, appointmentsToday: 284, emergencyCases: 17,
    healthAlerts: 43, vaccinationRate: 89.4, medicineAdherence: 76.8, avgDailySteps: 8241,
  },
  doctors: [
    { id: 1, name: 'Dr. Anjali Mehta',  specialty: 'General Medicine', hospital: 'Apollo Hospitals', experience: '12 yrs', rating: 4.8, available: true },
    { id: 2, name: 'Dr. Suresh Nair',   specialty: 'Cardiology',       hospital: 'Fortis Hospital',  experience: '18 yrs', rating: 4.9, available: true },
    { id: 3, name: 'Dr. Priya Rao',     specialty: 'Endocrinology',    hospital: 'Fortis Hospital',  experience: '10 yrs', rating: 4.7, available: false },
    { id: 4, name: 'Dr. Ramesh Kumar',  specialty: 'Orthopedics',      hospital: 'MIOT Hospital',    experience: '15 yrs', rating: 4.6, available: true },
  ],
  nearbyFacilities: [
    { id: 1, name: 'Apollo Hospitals',     type: 'Hospital',  address: 'Greams Road, Chennai', distance: 1.2, rating: 4.8, open: true,  phone: '044-28293333' },
    { id: 2, name: 'Fortis Malar Hospital',type: 'Hospital',  address: 'Adyar, Chennai',       distance: 3.5, rating: 4.6, open: true,  phone: '044-42892222' },
    { id: 3, name: 'CityMax Clinic',       type: 'Clinic',    address: 'Anna Nagar, Chennai',  distance: 0.8, rating: 4.3, open: true,  phone: '044-26151111' },
    { id: 4, name: 'MedPlus Pharmacy',     type: 'Pharmacy',  address: 'KK Nagar, Chennai',    distance: 0.4, rating: 4.5, open: true,  phone: '044-24341111', hours: '24/7' },
    { id: 5, name: 'MIOT Hospital',        type: 'Hospital',  address: 'Manapakkam, Chennai',  distance: 5.1, rating: 4.7, open: true,  phone: '044-22492288' },
    { id: 6, name: 'Govt PHC Anna Nagar',  type: 'Emergency', address: 'Anna Nagar, Chennai',  distance: 1.0, rating: 4.1, open: true,  phone: '044-26151000' },
  ],
};

/* ============================================================
   3. STORAGE UTILITIES
   ============================================================ */
const Storage = {
  prefix: 'hp_',
  set(key, val) {
    try { localStorage.setItem(this.prefix + key, JSON.stringify(val)); } catch (e) { /* quota */ }
  },
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(this.prefix + key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  remove(key) { localStorage.removeItem(this.prefix + key); },
  clear() {
    Object.keys(localStorage).filter(k => k.startsWith(this.prefix)).forEach(k => localStorage.removeItem(k));
  },
};

/* ============================================================
   4. AUTHENTICATION MODULE
   ============================================================ */
const Auth = {
  /** Switch between Login and Register tabs */
  switchTab(tab) {
    DOM.qAll('.auth-tab').forEach(t => t.classList.remove('active'));
    DOM.qAll('.auth-form').forEach(f => f.classList.remove('active'));
    const idx = tab === 'login' ? 0 : 1;
    DOM.qAll('.auth-tab')[idx]?.classList.add('active');
    DOM.id(tab + 'Form')?.classList.add('active');
  },

  /** Select a role chip */
  selectRole(el, containerSelector) {
    el.closest(containerSelector || '.role-chips')
      ?.querySelectorAll('.role-chip')
      .forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  },

  /** Main login handler */
  login() {
    const emailEl = DOM.id('loginEmail');
    const passEl  = DOM.id('loginPass');
    const email   = emailEl?.value?.trim() || '';
    const pass    = passEl?.value || '';

    if (!Validator.email(email)) { UI.toast('Please enter a valid email address.', 'error'); return; }
    if (!pass) { UI.toast('Password is required.', 'error'); return; }

    // Find user
    const user = SeedData.users.find(u => u.email === email);
    if (!user || user.password !== pass) {
      UI.toast('Invalid email or password. Try: admin@healthpulse.com / password', 'error');
      return;
    }

    // Read selected role chip
    const chip = DOM.q('#loginRoleChips .role-chip.selected');
    const role = chip ? chip.textContent.trim() : user.role;
    this._startSession({ ...user, role });
  },

  /** Quick demo login */
  quickLogin(type) {
    const map = {
      admin:  { id: 1, name: 'Admin User',       email: 'admin@healthpulse.com',  role: 'Admin' },
      doctor: { id: 2, name: 'Dr. Anjali Mehta', email: 'dr.anjali@healthpulse.com', role: 'Doctor' },
      member: { id: 3, name: 'Ravi Kumar',        email: 'ravi@gmail.com',         role: 'Community Member' },
      worker: { id: 4, name: 'Sunita Devi',       email: 'sunita@clinic.com',      role: 'Healthcare Worker' },
    };
    this._startSession(map[type] || map.member);
  },

  /** Register handler */
  register() {
    const firstName = DOM.id('regFirstName')?.value?.trim();
    const lastName  = DOM.id('regLastName')?.value?.trim();
    const email     = DOM.id('regEmail')?.value?.trim();
    const pass      = DOM.id('regPassword')?.value;
    const role      = DOM.id('regRole')?.value || 'Community Member';
    const phone     = DOM.id('regPhone')?.value?.trim();

    if (!firstName || !lastName) { UI.toast('Please enter your full name.', 'error'); return; }
    if (!Validator.email(email)) { UI.toast('Please enter a valid email.', 'error'); return; }
    if (!Validator.password(pass)) { UI.toast('Password must be at least 8 characters.', 'error'); return; }

    // Simulate registration
    const newUser = { id: Date.now(), name: `${firstName} ${lastName}`, email, role, phone };
    UI.toast(`Account created! Welcome, ${firstName}! Please sign in.`, 'success');
    this.switchTab('login');
    if (DOM.id('loginEmail')) DOM.id('loginEmail').value = email;
  },

  /** Internal: bootstrap the app session */
  _startSession(user) {
    AppState.currentUser = user;
    Storage.set('session', user);

    // Load persisted data
    AppState.medicines     = Storage.get('medicines',     SeedData.medicines);
    AppState.appointments  = Storage.get('appointments',  SeedData.appointments);
    AppState.healthRecords = Storage.get('healthRecords', SeedData.healthRecords);
    AppState.vaccinations  = Storage.get('vaccinations',  SeedData.vaccinations);
    AppState.activities    = Storage.get('activities',    SeedData.activities);
    AppState.notifications = Storage.get('notifications', SeedData.notifications);

    // Update UI
    DOM.id('authOverlay')?.classList.add('hidden');
    DOM.id('appShell')?.classList.add('active');

    // Sidebar user info
    const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    DOM.setText('sidebarAvatar', initials);
    DOM.setText('sidebarUserName', user.name);
    DOM.setText('sidebarUserRole', user.role);
    DOM.setText('dashWelcomeName', user.name.split(' ')[0]);
    DOM.setText('profileName', user.name);
    DOM.setText('profileRole', user.role);

    // Role-based nav visibility
    this._applyRoleAccess(user.role);

    // Navigate to dashboard
    Router.navigate('dashboard');
    UI.toast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');

    // Start background services
    Vitals.startSimulation();
    MedicineReminder.startChecker();
    EmergencyAlert.startChecker();
    Notifications.startChecker();
  },

  /** Show/hide nav items based on role */
  _applyRoleAccess(role) {
    const adminOnly = ['adminNav', 'adminNavItem', 'userMgmtNavItem', 'reportsNavItem', 'docMgmtNavItem', 'emergencyMonNavItem'];
    const doctorOnly = ['doctorNav', 'patientDashNavItem', 'patientRecordsNavItem', 'docApptNavItem', 'docRecsNavItem'];
    const isAdmin  = ['Admin'].includes(role);
    const isDoctor = ['Doctor'].includes(role);
    adminOnly.forEach(id  => { const el = DOM.id(id); if (el) el.style.display = isAdmin  ? '' : 'none'; });
    doctorOnly.forEach(id => { const el = DOM.id(id); if (el) el.style.display = isDoctor ? '' : 'none'; });
  },

  /** Logout */
  logout() {
    clearInterval(AppState.simulationInterval);
    clearInterval(AppState.emergencyCheckInterval);
    clearInterval(AppState.reminderInterval);
    clearInterval(AppState.notificationCheckInterval);
    Charts.destroyAll();
    AppState.currentUser = null;
    Storage.remove('session');
    DOM.id('appShell')?.classList.remove('active');
    DOM.id('authOverlay')?.classList.remove('hidden');
    UI.toast('Signed out successfully. Stay healthy! 💚', 'info');
  },
};

/* ============================================================
   5. ROUTER / NAVIGATION
   ============================================================ */
const Router = {
  pageTitles: {
    dashboard: 'Dashboard',         profile: 'Health Profile',
    monitoring: 'Health Monitoring', records: 'Medical Records',
    appointments: 'Appointments',    medicines: 'Medicine Reminder',
    vaccinations: 'Vaccination Tracker', fitness: 'Fitness Tracker',
    aiassistant: 'AI Health Assistant', locator: 'Healthcare Locator',
    analytics: 'Community Analytics',   notifications: 'Notifications',
    settings: 'Settings',            admin: 'Admin Dashboard',
    usermgmt: 'User Management',     reports: 'Reports',
    risk: 'Disease Risk Prediction',  doctorpatients: 'Patient Dashboard',
    emergency: 'Emergency Monitoring',
  },

  navigate(page) {
    if (!AppState.currentUser) return;

    // Hide all pages, deactivate nav
    DOM.qAll('.page-content').forEach(p => p.classList.remove('active'));
    DOM.qAll('.nav-item').forEach(n => n.classList.remove('active'));

    // Show target page
    const el = DOM.id('page-' + page);
    if (el) el.classList.add('active');

    // Activate matching nav item
    DOM.qAll('.nav-item').forEach(n => {
      if (n.dataset.page === page) n.classList.add('active');
    });

    // Update topbar title
    DOM.setText('topbarTitle', this.pageTitles[page] || page);
    AppState.currentPage = page;

    // Trigger page-specific initialization
    this._pageInit(page);

    // Close mobile sidebar
    UI.closeMobileMenu();

    // Scroll to top
    const main = DOM.q('.page-content.active');
    if (main) main.scrollTop = 0;
  },

  _pageInit(page) {
    const actions = {
      dashboard:    () => { Charts.initDashboard(); Dashboard.refreshStats(); },
      monitoring:   () => { Charts.initMonitoring(); Vitals.renderTable(); },
      vaccinations: () => { Charts.initVaccinations(); Vaccinations.render(); },
      analytics:    () => { Charts.initAnalytics(); },
      fitness:      () => { Charts.initFitness(); Fitness.renderTable(); },
      risk:         () => { Charts.initRisk(); RiskEngine.compute(); },
      aiassistant:  () => { AIAssistant.init(); },
      medicines:    () => { MedicineReminder.render(); },
      appointments: () => { AppointmentManager.render(); },
      records:      () => { MedicalRecords.render(); },
      notifications:() => { Notifications.render(); },
      admin:        () => { AdminPanel.initDashboard(); },
      usermgmt:     () => { AdminPanel.renderUsers(); },
      locator:      () => { Locator.render(); },
    };
    if (actions[page]) setTimeout(actions[page], 100);
  },
};

/* ============================================================
   6. DOM UTILITIES
   ============================================================ */
const DOM = {
  id:   (id)   => document.getElementById(id),
  q:    (sel)  => document.querySelector(sel),
  qAll: (sel)  => Array.from(document.querySelectorAll(sel)),
  setText(id, text) { const el = this.id(id); if (el) el.textContent = text; },
  setHTML(id, html) { const el = this.id(id); if (el) el.innerHTML = html; },
  show(id) { const el = this.id(id); if (el) el.style.display = ''; },
  hide(id) { const el = this.id(id); if (el) el.style.display = 'none'; },
  val(id)  { const el = this.id(id); return el ? el.value : ''; },
  setVal(id, v) { const el = this.id(id); if (el) el.value = v; },
};

/* ============================================================
   7. VALIDATORS
   ============================================================ */
const Validator = {
  email:    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  password: (v) => v && v.length >= 8,
  phone:    (v) => /^\+?[\d\s\-]{8,}$/.test(v),
  required: (v) => v && v.trim().length > 0,
  range:    (v, min, max) => Number(v) >= min && Number(v) <= max,
  bp:       (v) => /^\d{2,3}\/\d{2,3}$/.test(v.trim()),
};

/* ============================================================
   8. UI UTILITIES
   ============================================================ */
const UI = {
  /** Toast notifications */
  toast(msg, type = 'info', duration = 3500) {
    const container = DOM.id('toastContainer') || this._createToastContainer();
    const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warning: 'fa-triangle-exclamation' };
    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;margin-left:auto;cursor:pointer;opacity:.5;font-size:1rem;">×</button>`;
    toast.style.cssText = 'display:flex;align-items:center;gap:10px;';
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'all .35s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 350);
    }, duration);
  },

  _createToastContainer() {
    const c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  },

  /** Modal */
  modal(title, bodyHTML, footerHTML = '') {
    const existing = DOM.id('appModal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.id = 'appModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);';
    modal.innerHTML = `
      <div style="background:var(--white);border-radius:var(--radius-lg);max-width:560px;width:90%;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.3);">
        <div style="padding:20px 24px;border-bottom:1px solid var(--slate-100);display:flex;align-items:center;justify-content:space-between;">
          <div style="font-family:var(--font-display);font-weight:700;font-size:1rem;color:var(--slate-900);">${title}</div>
          <button onclick="document.getElementById('appModal').remove()" style="width:30px;height:30px;border-radius:50%;background:var(--slate-100);border:none;cursor:pointer;font-size:1rem;">×</button>
        </div>
        <div style="padding:24px;">${bodyHTML}</div>
        ${footerHTML ? `<div style="padding:16px 24px;border-top:1px solid var(--slate-100);display:flex;justify-content:flex-end;gap:8px;">${footerHTML}</div>` : ''}
      </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  },

  closeModal() { DOM.id('appModal')?.remove(); },

  /** Confirm dialog */
  confirm(msg, onYes) {
    this.modal('Confirm Action', `<p style="color:var(--slate-700);font-size:.93rem;">${msg}</p>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-danger btn-sm" onclick="UI.closeModal();(${onYes.toString()})()">Confirm</button>`);
  },

  /** Mobile sidebar */
  openMobileMenu() {
    DOM.id('sidebar')?.classList.add('open');
    DOM.id('sidebarBackdrop')?.classList.add('open');
  },
  closeMobileMenu() {
    DOM.id('sidebar')?.classList.remove('open');
    DOM.id('sidebarBackdrop')?.classList.remove('open');
  },

  /** Dark mode */
  toggleDark() {
    AppState.isDark = !AppState.isDark;
    document.documentElement.setAttribute('data-theme', AppState.isDark ? 'dark' : 'light');
    const icon = DOM.id('darkIcon');
    if (icon) icon.className = AppState.isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    Storage.set('darkMode', AppState.isDark);
    Charts.updateTheme();
  },

  /** Apply stored theme on load */
  applyStoredTheme() {
    AppState.isDark = Storage.get('darkMode', false);
    if (AppState.isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      const icon = DOM.id('darkIcon');
      if (icon) icon.className = 'fa-solid fa-sun';
    }
  },

  /** Format date */
  formatDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  },

  /** Status pill HTML */
  pill(text, color) {
    const map = { Normal:'green', 'Mild Alert':'amber', Alert:'red', Critical:'red', Confirmed:'green', Scheduled:'blue', Pending:'gray', Active:'green', Reviewed:'blue', 'Follow-up':'amber', Completed:'green', done:'green', upcoming:'amber', overdue:'red' };
    const c = color || map[text] || 'gray';
    return `<span class="pill pill-${c}">${text}</span>`;
  },

  /** Loading skeleton */
  skeleton(lines = 3) {
    return Array(lines).fill(0).map(() =>
      `<div style="height:14px;background:linear-gradient(90deg,var(--slate-100) 25%,var(--slate-50) 50%,var(--slate-100) 75%);background-size:200% 100%;border-radius:4px;margin-bottom:10px;animation:shimmer 1.5s infinite;"></div>`
    ).join('');
  },
};

/* ============================================================
   9. DASHBOARD MODULE
   ============================================================ */
const Dashboard = {
  refreshStats() {
    const s = SeedData.communityStats;
    this._updateStat('statTotalMembers',    Fmt.number(s.totalMembers));
    this._updateStat('statActivePatients',  Fmt.number(s.activePatients));
    this._updateStat('statAppointments',    Fmt.number(s.appointmentsToday));
    this._updateStat('statEmergency',       s.emergencyCases);
    this._updateStat('statAlerts',          s.healthAlerts);
    this._updateStat('statVaccRate',        s.vaccinationRate + '%');
    this._updateStat('statAdherence',       s.medicineAdherence + '%');
    this._updateStat('statSteps',           Fmt.number(s.avgDailySteps));
  },
  _updateStat(id, val) { DOM.setText(id, val); },
};

/* ============================================================
   10. VITALS / HEALTH MONITORING MODULE
   ============================================================ */
const Vitals = {
  /** Start live simulation (updates vitals every 5s) */
  startSimulation() {
    AppState.simulationInterval = setInterval(() => {
      this._fluctuate();
      this._updateLiveDisplay();
    }, 5000);
  },

  /** Gently fluctuate values */
  _fluctuate() {
    const v = AppState.liveVitals;
    v.hr    = Math.max(60, Math.min(120, v.hr    + (Math.random() - 0.5) * 4));
    v.sugar = Math.max(70, Math.min(200, v.sugar + (Math.random() - 0.5) * 6));
    v.spo2  = Math.max(90, Math.min(100, v.spo2  + (Math.random() - 0.5) * 0.4));
    v.temp  = Math.max(97, Math.min(103, v.temp  + (Math.random() - 0.5) * 0.3));
    v.bmi   = parseFloat((v.bmi + (Math.random() - 0.5) * 0.05).toFixed(1));
    // BP systolic/diastolic
    const sys = Math.max(100, Math.min(180, parseInt(v.bp.split('/')[0]) + (Math.random() - 0.5) * 4));
    const dia = Math.max(60,  Math.min(120, parseInt(v.bp.split('/')[1]) + (Math.random() - 0.5) * 2));
    v.bp = `${Math.round(sys)}/${Math.round(dia)}`;
  },

  /** Push fluctuated values into the DOM */
  _updateLiveDisplay() {
    const v = AppState.liveVitals;
    const vitalsMap = {
      'liveHR':    { val: Math.round(v.hr),        status: this._hrStatus(v.hr) },
      'liveBP':    { val: v.bp,                    status: this._bpStatus(v.bp) },
      'liveSugar': { val: Math.round(v.sugar),     status: this._sugarStatus(v.sugar) },
      'liveSpo2':  { val: v.spo2.toFixed(1),       status: this._spo2Status(v.spo2) },
      'liveTemp':  { val: v.temp.toFixed(1),       status: this._tempStatus(v.temp) },
      'liveBMI':   { val: v.bmi.toFixed(1),        status: this._bmiStatus(v.bmi) },
    };
    for (const [id, data] of Object.entries(vitalsMap)) {
      DOM.setText(id + 'Val',    data.val);
      const statusEl = DOM.id(id + 'Status');
      if (statusEl) {
        statusEl.textContent = data.status.text;
        statusEl.className = `vital-status status-${data.status.class}`;
      }
    }
    EmergencyAlert.check(v);
  },

  // Status helpers
  _hrStatus(v)    { return v < 60 ? { text:'Low',    class:'low'    } : v > 100 ? { text:'High', class:'high' } : { text:'Normal', class:'normal' }; },
  _bpStatus(v)    { const s = parseInt(v); return s >= 140 ? { text:'High', class:'high' } : s < 90 ? { text:'Low', class:'low' } : { text:'Normal', class:'normal' }; },
  _sugarStatus(v) { return v > 140 ? { text:'High', class:'high' } : v < 70 ? { text:'Low', class:'low' } : { text:'Normal', class:'normal' }; },
  _spo2Status(v)  { return v < 95 ? { text:'Low', class:'high' } : { text:'Normal', class:'normal' }; },
  _tempStatus(v)  { return v > 99.5 ? { text:'Fever', class:'high' } : v < 97 ? { text:'Low', class:'low' } : { text:'Normal', class:'normal' }; },
  _bmiStatus(v)   { return v < 18.5 ? { text:'Underweight', class:'low' } : v > 25 ? { text:'Overweight', class:'high' } : { text:'Healthy', class:'normal' }; },

  /** Classify and get label */
  classify(v) {
    return {
      hr:    this._hrStatus(v.hr),
      bp:    this._bpStatus(v.bp),
      sugar: this._sugarStatus(v.sugar),
      spo2:  this._spo2Status(v.spo2),
      temp:  this._tempStatus(v.temp),
      bmi:   this._bmiStatus(v.bmi),
    };
  },

  /** Save new vitals record */
  saveRecord(data) {
    if (!data) data = this._readForm();
    if (!this._validateForm(data)) return;

    const record = {
      id:     AppState.healthRecords.length + 1,
      date:   new Date().toISOString().split('T')[0],
      ...data,
      status: this._computeStatus(data),
    };
    AppState.healthRecords.unshift(record);
    Storage.set('healthRecords', AppState.healthRecords);
    this.renderTable();
    Charts.initMonitoring();
    UI.toast('Vitals saved successfully! 📊', 'success');
    EmergencyAlert.check(data);
  },

  _readForm() {
    return {
      hr:    parseFloat(DOM.val('inputHR')    || 76),
      bp:    DOM.val('inputBP')    || '120/80',
      sugar: parseFloat(DOM.val('inputSugar') || 98),
      spo2:  parseFloat(DOM.val('inputSpo2')  || 98.5),
      temp:  parseFloat(DOM.val('inputTemp')  || 98.6),
      bmi:   parseFloat(DOM.val('inputBMI')   || 22.4),
      notes: DOM.val('inputNotes') || '',
    };
  },

  _validateForm(d) {
    if (!Validator.range(d.hr, 30, 250)) { UI.toast('Heart rate must be 30–250 bpm', 'error'); return false; }
    if (!Validator.bp(d.bp))             { UI.toast('Blood pressure format: 120/80', 'error'); return false; }
    if (!Validator.range(d.sugar, 30, 600)) { UI.toast('Blood sugar must be 30–600 mg/dL', 'error'); return false; }
    if (!Validator.range(d.spo2, 70, 100)) { UI.toast('SpO₂ must be 70–100%', 'error'); return false; }
    return true;
  },

  _computeStatus(d) {
    const s = parseInt(d.bp?.split('/')[0] || 120);
    if (d.hr > 100 || d.hr < 50 || s > 140 || d.sugar > 180 || d.spo2 < 94 || d.temp > 101) return 'Alert';
    if (d.hr > 90 || s > 130 || d.sugar > 120 || d.spo2 < 96 || d.temp > 99.5) return 'Mild Alert';
    return 'Normal';
  },

  /** Render vitals table */
  renderTable() {
    const container = DOM.id('vitalsTableBody');
    if (!container) return;
    container.innerHTML = AppState.healthRecords.slice(0, 10).map(r => `
      <tr>
        <td>${UI.formatDate(r.date)}</td>
        <td>${r.hr} bpm</td>
        <td>${r.bp}</td>
        <td>${r.sugar} mg/dL</td>
        <td>${r.spo2}%</td>
        <td>${r.temp}°F</td>
        <td>${r.bmi}</td>
        <td>${UI.pill(r.status)}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="Vitals.viewRecord(${r.id})"><i class="fa-solid fa-eye"></i></button>
          <button class="btn btn-xs btn-danger" onclick="Vitals.deleteRecord(${r.id})" style="margin-left:4px;"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`).join('');
  },

  viewRecord(id) {
    const r = AppState.healthRecords.find(rec => rec.id === id);
    if (!r) return;
    UI.modal(`Vitals — ${UI.formatDate(r.date)}`, `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:.9rem;">
        <div><strong>Heart Rate:</strong> ${r.hr} bpm</div>
        <div><strong>Blood Pressure:</strong> ${r.bp}</div>
        <div><strong>Blood Sugar:</strong> ${r.sugar} mg/dL</div>
        <div><strong>SpO₂:</strong> ${r.spo2}%</div>
        <div><strong>Temperature:</strong> ${r.temp}°F</div>
        <div><strong>BMI:</strong> ${r.bmi}</div>
        <div><strong>Status:</strong> ${UI.pill(r.status)}</div>
        ${r.notes ? `<div style="grid-column:1/-1;"><strong>Notes:</strong> ${r.notes}</div>` : ''}
      </div>`);
  },

  deleteRecord(id) {
    UI.confirm('Delete this vitals record? This cannot be undone.', () => {
      AppState.healthRecords = AppState.healthRecords.filter(r => r.id !== id);
      Storage.set('healthRecords', AppState.healthRecords);
      this.renderTable();
      UI.toast('Record deleted.', 'info');
    });
  },

  /** Compute BMI from height/weight inputs */
  calcBMI() {
    const h = parseFloat(DOM.val('inputHeight') || 0) / 100;
    const w = parseFloat(DOM.val('inputWeight') || 0);
    if (h > 0 && w > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      DOM.setVal('inputBMI', bmi);
      const el = DOM.id('bmiResult');
      if (el) el.textContent = `BMI: ${bmi} — ${this._bmiStatus(parseFloat(bmi)).text}`;
    }
  },
};

/* ============================================================
   11. EMERGENCY ALERT MODULE
   ============================================================ */
const EmergencyAlert = {
  thresholds: {
    hrHigh: 120, hrLow: 45,
    sysHigh: 160, sysLow: 85,
    sugarHigh: 300, sugarLow: 50,
    spo2Low: 90,
    tempHigh: 103,
  },
  lastAlert: 0,

  startChecker() {
    AppState.emergencyCheckInterval = setInterval(() => this.check(AppState.liveVitals), 15000);
  },

  check(v) {
    const now = Date.now();
    if (now - this.lastAlert < 30000) return; // debounce 30s

    const sys = parseInt((v.bp || '120/80').split('/')[0]);
    const alerts = [];

    if (v.hr  > this.thresholds.hrHigh)    alerts.push(`🚨 Heart rate critically high: ${Math.round(v.hr)} bpm`);
    if (v.hr  < this.thresholds.hrLow)     alerts.push(`🚨 Heart rate critically low: ${Math.round(v.hr)} bpm`);
    if (sys   > this.thresholds.sysHigh)   alerts.push(`🚨 Blood pressure very high: ${v.bp} mmHg`);
    if (v.sugar > this.thresholds.sugarHigh) alerts.push(`🚨 Blood sugar dangerously high: ${Math.round(v.sugar)} mg/dL`);
    if (v.spo2  < this.thresholds.spo2Low) alerts.push(`🚨 SpO₂ critically low: ${v.spo2?.toFixed(1)}%`);
    if (v.temp  > this.thresholds.tempHigh) alerts.push(`🚨 High fever detected: ${v.temp?.toFixed(1)}°F`);

    if (alerts.length) {
      this.lastAlert = now;
      this._triggerAlert(alerts);
    }
  },

  _triggerAlert(alerts) {
    const msg = alerts[0];
    UI.toast(msg, 'error', 6000);
    this._addNotification(msg);
    this._updateEmergencyPanel(alerts);

    // Flash badge
    const badge = DOM.id('emergencyBadge');
    if (badge) {
      badge.style.background = '#f43f5e';
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 400);
    }
  },

  _addNotification(msg) {
    const notif = { id: Date.now(), title: msg, desc: 'Automated emergency detection — immediate attention required.', time: 'Just now', read: false, type: 'emergency' };
    AppState.notifications.unshift(notif);
    Storage.set('notifications', AppState.notifications);
    Notifications.updateBadge();
  },

  _updateEmergencyPanel(alerts) {
    const panel = DOM.id('emergencyAlertPanel');
    if (!panel) return;
    panel.innerHTML = alerts.map(a => `
      <div class="alert-item alert-critical">
        <span class="alert-icon" style="color:var(--rose-500);">🚨</span>
        <div class="alert-content">
          <div class="al-title">${a}</div>
          <div class="al-desc">Auto-detected at ${new Date().toLocaleTimeString()}</div>
        </div>
      </div>`).join('');
  },

  /** Manual emergency SOS */
  triggerSOS() {
    UI.confirm('This will send an emergency alert to your healthcare provider and emergency contact. Continue?', () => {
      UI.toast('🚨 SOS Alert Sent! Emergency services notified.', 'error', 7000);
      this._addNotification('🆘 Manual SOS triggered by patient');
    });
  },
};

/* ============================================================
   12. MEDICINE REMINDER MODULE
   ============================================================ */
const MedicineReminder = {
  startChecker() {
    AppState.reminderInterval = setInterval(() => this._checkReminders(), 60000);
    this._checkReminders(); // immediate
  },

  _checkReminders() {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');
    const cur = `${hh}:${mm}`;

    AppState.medicines.forEach(med => {
      if (!med.taken && med.time === cur) {
        UI.toast(`💊 Time to take ${med.name} — ${med.dose} (${med.food})`, 'info', 8000);
        Notifications.add(`💊 Medicine Reminder: ${med.name}`, `Take ${med.dose} — ${med.food}`, 'reminder');
      }
    });
  },

  render() {
    this._renderSchedule();
    this._renderList();
    this._updateAdherence();
  },

  _renderSchedule() {
    const container = DOM.id('medicineSchedule');
    if (!container) return;
    const grouped = {};
    AppState.medicines.forEach(m => {
      const period = this._timePeriod(m.time);
      if (!grouped[period]) grouped[period] = [];
      grouped[period].push(m);
    });
    container.innerHTML = Object.entries(grouped).map(([period, meds]) => `
      <div style="font-size:.8rem;font-weight:600;color:var(--slate-500);text-transform:uppercase;letter-spacing:.06em;margin:14px 0 8px;">${period}</div>
      ${meds.map(m => `
        <div class="med-card" id="med-card-${m.id}">
          <div class="med-icon">💊</div>
          <div class="med-info">
            <div class="med-name">${m.name}</div>
            <div class="med-time">${m.food} · ${this._fmt12(m.time)}</div>
          </div>
          <div class="med-taken ${m.taken ? 'done' : ''}" onclick="MedicineReminder.toggleTaken(${m.id})" title="${m.taken ? 'Mark not taken' : 'Mark taken'}"></div>
        </div>`).join('')}`).join('');
  },

  _renderList() {
    const container = DOM.id('medicineListBody');
    if (!container) return;
    container.innerHTML = AppState.medicines.map(m => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td>${m.dose}</td>
        <td>${m.frequency}</td>
        <td>${this._fmt12(m.time)}</td>
        <td>${m.food}</td>
        <td>${UI.formatDate(m.startDate)}</td>
        <td>${UI.formatDate(m.endDate)}</td>
        <td>${UI.pill(m.taken ? 'Taken' : 'Pending', m.taken ? 'green' : 'amber')}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="MedicineReminder.editMedicine(${m.id})"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-xs btn-danger" onclick="MedicineReminder.deleteMedicine(${m.id})" style="margin-left:4px;"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`).join('');
  },

  _updateAdherence() {
    const taken = AppState.medicines.filter(m => m.taken).length;
    const total = AppState.medicines.length;
    const pct   = total ? Math.round((taken / total) * 100) : 0;
    DOM.setText('adherencePct',  pct + '%');
    const bar = DOM.id('adherenceBar');
    if (bar) bar.style.width = pct + '%';
  },

  toggleTaken(id) {
    const med = AppState.medicines.find(m => m.id === id);
    if (!med) return;
    med.taken = !med.taken;
    Storage.set('medicines', AppState.medicines);
    this.render();
    UI.toast(med.taken ? `✅ ${med.name} marked as taken!` : `↩️ ${med.name} marked as not taken`, med.taken ? 'success' : 'info');
  },

  addMedicine() {
    const name   = DOM.val('medName');
    const dose   = DOM.val('medDose');
    const freq   = DOM.val('medFreq');
    const time   = DOM.val('medTime');
    const food   = DOM.val('medFood');
    const start  = DOM.val('medStart');
    const end    = DOM.val('medEnd');

    if (!Validator.required(name)) { UI.toast('Medicine name is required.', 'error'); return; }
    if (!time) { UI.toast('Reminder time is required.', 'error'); return; }

    const med = { id: Date.now(), name, dose: dose || '1 tablet', frequency: freq, time, food, taken: false, startDate: start || new Date().toISOString().split('T')[0], endDate: end || '' };
    AppState.medicines.push(med);
    Storage.set('medicines', AppState.medicines);
    this.render();
    ['medName','medDose','medTime','medStart','medEnd'].forEach(id => DOM.setVal(id, ''));
    UI.toast(`💊 ${name} reminder added!`, 'success');
  },

  editMedicine(id) {
    const m = AppState.medicines.find(med => med.id === id);
    if (!m) return;
    UI.modal('Edit Medicine', `
      <div class="form-group"><label class="form-label">Medicine Name</label><input class="form-control" id="editMedName" value="${m.name}"/></div>
      <div class="form-group"><label class="form-label">Dosage</label><input class="form-control" id="editMedDose" value="${m.dose}"/></div>
      <div class="form-group"><label class="form-label">Reminder Time</label><input class="form-control" type="time" id="editMedTime" value="${m.time}"/></div>
      <div class="form-group"><label class="form-label">With Food</label>
        <select class="form-select" id="editMedFood"><option ${m.food==='After food'?'selected':''}>After food</option><option ${m.food==='Before food'?'selected':''}>Before food</option><option ${m.food==='Empty stomach'?'selected':''}>Empty stomach</option></select>
      </div>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-primary btn-sm" onclick="MedicineReminder._saveEdit(${id})">Save Changes</button>`);
  },

  _saveEdit(id) {
    const m = AppState.medicines.find(med => med.id === id);
    if (!m) return;
    m.name = DOM.val('editMedName') || m.name;
    m.dose = DOM.val('editMedDose') || m.dose;
    m.time = DOM.val('editMedTime') || m.time;
    m.food = DOM.val('editMedFood') || m.food;
    Storage.set('medicines', AppState.medicines);
    UI.closeModal();
    this.render();
    UI.toast('Medicine updated!', 'success');
  },

  deleteMedicine(id) {
    UI.confirm('Remove this medicine reminder?', () => {
      AppState.medicines = AppState.medicines.filter(m => m.id !== id);
      Storage.set('medicines', AppState.medicines);
      this.render();
      UI.toast('Medicine removed.', 'info');
    });
  },

  _timePeriod(t) {
    const h = parseInt(t?.split(':')[0] ?? 8);
    if (h >= 5  && h < 12) return 'Morning (5:00 AM – 12:00 PM)';
    if (h >= 12 && h < 17) return 'Afternoon (12:00 PM – 5:00 PM)';
    if (h >= 17 && h < 21) return 'Evening (5:00 PM – 9:00 PM)';
    return 'Night (9:00 PM – 5:00 AM)';
  },

  _fmt12(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12  = h % 12 || 12;
    return `${h12}:${String(m).padStart(2,'0')} ${ampm}`;
  },

  /** Mark all today's medicines as taken */
  markAllTaken() {
    AppState.medicines.forEach(m => m.taken = true);
    Storage.set('medicines', AppState.medicines);
    this.render();
    UI.toast('All medicines marked as taken! ✅', 'success');
  },
};

/* ============================================================
   13. APPOINTMENT MANAGER MODULE
   ============================================================ */
const AppointmentManager = {
  render() {
    this._renderUpcoming();
    this._renderHistory();
  },

  _renderUpcoming() {
    const container = DOM.id('upcomingApptList');
    if (!container) return;
    const upcoming = AppState.appointments.filter(a => new Date(a.date) >= new Date()).slice(0, 5);
    container.innerHTML = upcoming.length === 0
      ? '<p style="color:var(--slate-500);font-size:.87rem;">No upcoming appointments.</p>'
      : upcoming.map(a => {
          const d = new Date(a.date);
          const day = d.getDate();
          const mon = d.toLocaleString('en-IN', { month: 'short' }).toUpperCase();
          return `
            <div class="appt-card">
              <div class="appt-date"><div class="appt-day">${day}</div><div class="appt-mon">${mon}</div></div>
              <div class="appt-info">
                <div class="appt-doc">${a.doctor}</div>
                <div class="appt-type">${a.type} · ${a.time}</div>
                <div style="font-size:.75rem;color:var(--slate-500);margin-top:2px;"><i class="fa-solid fa-location-dot"></i> ${a.hospital}</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                ${UI.pill(a.status)}
                <button class="btn btn-xs btn-outline" onclick="AppointmentManager.cancelAppt(${a.id})" style="margin-top:4px;">Cancel</button>
              </div>
            </div>`;}).join('');
  },

  _renderHistory() {
    const container = DOM.id('apptHistoryBody');
    if (!container) return;
    const past = AppState.appointments.filter(a => new Date(a.date) < new Date());
    container.innerHTML = past.length === 0
      ? '<tr><td colspan="6" style="text-align:center;color:var(--slate-500);">No past appointments</td></tr>'
      : past.map(a => `
          <tr>
            <td>${UI.formatDate(a.date)}</td>
            <td>${a.doctor}</td>
            <td>${a.specialty}</td>
            <td>${a.type}</td>
            <td>${UI.pill('Completed')}</td>
            <td>${a.reason || '—'}</td>
          </tr>`).join('');
  },

  bookAppointment() {
    const doctor  = DOM.val('apptDoctor');
    const date    = DOM.val('apptDate');
    const time    = DOM.val('apptTime');
    const type    = DOM.val('apptType');
    const reason  = DOM.val('apptReason');

    if (!doctor) { UI.toast('Please select a doctor.', 'error'); return; }
    if (!date)   { UI.toast('Please select a date.', 'error'); return; }

    const doc = SeedData.doctors.find(d => d.name === doctor) || { specialty: 'General', hospital: 'Hospital' };
    const appt = {
      id: Date.now(), doctor, specialty: doc.specialty, hospital: doc.hospital,
      type, date, time: time || '10:00 AM', status: 'Pending', reason,
    };
    AppState.appointments.push(appt);
    Storage.set('appointments', AppState.appointments);
    this.render();
    ['apptDate','apptReason'].forEach(id => DOM.setVal(id, ''));
    UI.toast(`📅 Appointment booked with ${doctor} on ${UI.formatDate(date)}!`, 'success');
    Notifications.add(`📅 Appointment Booked: ${doctor}`, `${type} on ${UI.formatDate(date)} at ${time}`, 'appointment');
  },

  cancelAppt(id) {
    UI.confirm('Cancel this appointment?', () => {
      const a = AppState.appointments.find(ap => ap.id === id);
      if (a) {
        a.status = 'Cancelled';
        Storage.set('appointments', AppState.appointments);
        this.render();
        UI.toast('Appointment cancelled.', 'info');
      }
    });
  },

  reschedule(id) {
    const a = AppState.appointments.find(ap => ap.id === id);
    if (!a) return;
    UI.modal('Reschedule Appointment', `
      <p style="color:var(--slate-700);font-size:.9rem;margin-bottom:16px;">Currently booked: <strong>${a.doctor}</strong> — ${a.time} on ${UI.formatDate(a.date)}</p>
      <div class="form-group"><label class="form-label">New Date</label><input class="form-control" type="date" id="reschedDate" /></div>
      <div class="form-group"><label class="form-label">New Time</label>
        <select class="form-select" id="reschedTime"><option>9:00 AM</option><option>10:30 AM</option><option>2:00 PM</option><option>4:00 PM</option></select></div>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-primary btn-sm" onclick="AppointmentManager._saveReschedule(${id})">Reschedule</button>`);
  },

  _saveReschedule(id) {
    const a = AppState.appointments.find(ap => ap.id === id);
    if (!a) return;
    a.date = DOM.val('reschedDate') || a.date;
    a.time = DOM.val('reschedTime') || a.time;
    a.status = 'Scheduled';
    Storage.set('appointments', AppState.appointments);
    UI.closeModal();
    this.render();
    UI.toast('Appointment rescheduled! 📅', 'success');
  },
};

/* ============================================================
   14. MEDICAL RECORDS MODULE
   ============================================================ */
const MedicalRecords = {
  filter: 'All',

  render(filter) {
    if (filter) this.filter = filter;
    const container = DOM.id('medRecordsBody');
    if (!container) return;
    const filtered = this.filter === 'All'
      ? AppState.medicalRecords
      : AppState.medicalRecords.filter(r => r.type === this.filter);

    container.innerHTML = filtered.map(r => `
      <tr>
        <td>#${r.id}</td>
        <td>${UI.pill(r.type, { 'Lab Report':'blue', Prescription:'green', Imaging:'amber', ECG:'purple' }[r.type] || 'gray')}</td>
        <td><strong>${r.title}</strong></td>
        <td>${r.doctor}</td>
        <td>${UI.formatDate(r.date)}</td>
        <td>${r.hospital}</td>
        <td>${UI.pill(r.status)}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="MedicalRecords.view('${r.id}')"><i class="fa-solid fa-eye"></i> View</button>
          <button class="btn btn-xs btn-outline" onclick="MedicalRecords.download('${r.id}')" style="margin-left:4px;"><i class="fa-solid fa-download"></i></button>
        </td>
      </tr>`).join('');
  },

  view(id) {
    const r = AppState.medicalRecords.find(rec => rec.id === id);
    if (!r) return;
    UI.modal(`${r.type}: ${r.title}`, `
      <div style="font-size:.9rem;line-height:1.8;">
        <div><strong>Record ID:</strong> #${r.id}</div>
        <div><strong>Type:</strong> ${r.type}</div>
        <div><strong>Doctor:</strong> ${r.doctor}</div>
        <div><strong>Hospital:</strong> ${r.hospital}</div>
        <div><strong>Date:</strong> ${UI.formatDate(r.date)}</div>
        <div><strong>Status:</strong> ${UI.pill(r.status)}</div>
        <hr style="margin:14px 0;border-color:var(--slate-100);">
        <div style="background:var(--slate-100);padding:14px;border-radius:8px;color:var(--slate-500);font-size:.85rem;">
          📄 Document preview requires Flask backend file storage integration.<br>
          Connect <code>Flask-Uploads</code> or <code>Amazon S3</code> for file access.
        </div>
      </div>`);
  },

  download(id) { UI.toast(`Downloading record #${id}… (Connect Flask backend for actual file download)`, 'info'); },

  uploadRecord() {
    UI.modal('Upload Health Record', `
      <div class="form-group"><label class="form-label">Record Type</label>
        <select class="form-select" id="uploadType"><option>Lab Report</option><option>Prescription</option><option>Imaging</option><option>ECG</option><option>Other</option></select></div>
      <div class="form-group"><label class="form-label">Title / Description</label><input class="form-control" id="uploadTitle" placeholder="e.g., Blood Test Report"/></div>
      <div class="form-group"><label class="form-label">Doctor</label><input class="form-control" id="uploadDoctor" placeholder="Dr. Name"/></div>
      <div class="form-group"><label class="form-label">Date</label><input class="form-control" type="date" id="uploadDate"/></div>
      <div style="border:2px dashed var(--teal-400);border-radius:10px;padding:24px;text-align:center;color:var(--teal-600,var(--teal-500));background:var(--teal-50);">
        <i class="fa-solid fa-cloud-arrow-up" style="font-size:2rem;margin-bottom:8px;opacity:.6;display:block;"></i>
        <div style="font-size:.88rem;font-weight:600;">Drop file here or click to upload</div>
        <div style="font-size:.75rem;color:var(--slate-500);margin-top:4px;">PDF, JPG, PNG up to 10 MB</div>
      </div>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-primary btn-sm" onclick="MedicalRecords._saveUpload()"><i class="fa-solid fa-upload"></i> Upload</button>`);
  },

  _saveUpload() {
    const type    = DOM.val('uploadType');
    const title   = DOM.val('uploadTitle');
    const doctor  = DOM.val('uploadDoctor');
    const date    = DOM.val('uploadDate') || new Date().toISOString().split('T')[0];
    if (!Validator.required(title)) { UI.toast('Please enter a title.', 'error'); return; }
    const rec = { id: `REC-${String(Date.now()).slice(-4)}`, type, title, doctor, date, hospital: 'Self-Upload', status: 'Uploaded' };
    AppState.medicalRecords.unshift(rec);
    UI.closeModal();
    this.render();
    UI.toast('Record uploaded successfully! 📁', 'success');
  },
};

/* ============================================================
   15. AI HEALTH ASSISTANT
   ============================================================ */
const AIAssistant = {
  typing: false,

  knowledgeBase: {
    'blood pressure': `Your blood pressure of **${AppState.liveVitals?.bp || '120/80'} mmHg** — here's what it means:\n\n• **Normal:** Below 120/80 mmHg\n• **Elevated:** 120–129 / below 80\n• **Stage 1 Hypertension:** 130–139 / 80–89\n• **Stage 2 Hypertension:** 140+ / 90+\n\n**Tips to maintain healthy BP:**\n✅ Reduce sodium intake below 2,000 mg/day\n✅ Exercise 30 min, 5 days/week\n✅ Limit alcohol and caffeine\n✅ Practice stress management (yoga, meditation)\n\nIf your BP consistently reads above 140/90, please consult your doctor.`,

    'headache|fever|temperature': `For a headache with mild fever, here are my recommendations:\n\n**Immediate steps:**\n1. 💧 Drink plenty of water — dehydration worsens both\n2. 🛌 Rest in a quiet, cool, dark room\n3. 🌡️ Monitor temperature every 2 hours\n4. 💊 Paracetamol (500mg–1g) if fever is above 100°F\n\n**When to see a doctor immediately:**\n🚨 Fever above 103°F (39.4°C)\n🚨 Severe, sudden headache ("thunderclap")\n🚨 Stiff neck + fever\n🚨 Headache with vision changes or confusion\n\nPlease rest and stay hydrated. Let me know if symptoms worsen.`,

    'diabetes|blood sugar|sugar|glucose': `Based on your profile, here's a personalized diabetes management guide:\n\n**Blood Sugar Targets:**\n• Fasting: 70–100 mg/dL (normal) / 100–125 (prediabetes)\n• Post-meal (2h): below 140 mg/dL\n• HbA1c: below 5.7% (normal) / 5.7–6.4% (prediabetes)\n\n**Diet Plan for Blood Sugar Control:**\n✅ High fiber foods: oats, legumes, leafy greens\n✅ Low glycemic index grains: quinoa, barley\n✅ Eat small meals every 3–4 hours\n❌ Avoid: white rice, refined sugar, fruit juices\n\n**Lifestyle Changes:**\n🏃 30-min walk after meals significantly lowers blood sugar\n💧 Drink water before meals (reduces glucose spikes)\n😴 Poor sleep worsens insulin resistance — aim for 7–8 hours`,

    'exercise|workout|fitness': `**Exercise Recommendations for Your Profile:**\n\n**Aerobic (Cardio) — 5 days/week:**\n• 30-min brisk walking (most effective for diabetes)\n• Cycling, swimming, or dancing\n• Target: 150 min moderate activity/week\n\n**Strength Training — 2 days/week:**\n• Bodyweight exercises (squats, push-ups)\n• Light dumbbell workout\n• Improves insulin sensitivity significantly\n\n**Flexibility & Balance — Daily:**\n• 10-min yoga/stretching\n• Deep breathing for BP management\n\n**Daily Step Goal:** 10,000 steps/day\n📊 Your current average: 8,241 steps — you're close! One extra 15-min walk will do it.`,

    'heart|cardiac|chest': `**Heart Health Guide:**\n\n**Warning Signs (Seek emergency care immediately):**\n🚨 Chest pain, pressure, or tightness\n🚨 Pain spreading to arm, jaw, or back\n🚨 Sudden shortness of breath\n🚨 Cold sweat + nausea + dizziness\n🚨 Irregular or rapid heartbeat (palpitations)\n\n**Your Heart Risk Factors:**\n• Diabetes — major heart disease risk factor\n• Hypertension — strains heart over time\n• Physical inactivity\n\n**Heart-Healthy Habits:**\n✅ Mediterranean diet (olive oil, fish, nuts, vegetables)\n✅ Omega-3 fatty acids (salmon, flaxseed)\n✅ No smoking — single biggest modifiable risk\n✅ Limit saturated fat and trans fats\n\n**Emergency:** If you experience chest pain, call 108 immediately.`,

    'diet|food|nutrition|eat': `**Personalized Nutrition Plan:**\n\nBased on your health profile (Diabetes + Hypertension):\n\n🌅 **Breakfast (7–8 AM):**\nOatmeal + berries + 1 boiled egg + green tea (~320 kcal)\n\n🌞 **Mid-Morning (10–11 AM):**\nHandful of almonds or a small apple (~150 kcal)\n\n🍱 **Lunch (1 PM):**\n2 multigrain rotis + dal + mixed vegetables + raita (~550 kcal)\n\n🌆 **Evening (4–5 PM):**\nSprouts chaat or roasted chickpeas + lemon water (~180 kcal)\n\n🌙 **Dinner (7–8 PM):**\nGrilled fish/tofu + steamed broccoli + brown rice (~450 kcal)\n\n💧 **Water:** 2.5 litres/day\n\n**Avoid:** White rice, sugar, processed foods, fried items, excess salt`,

    'sleep|insomnia|rest': `**Sleep Optimization Guide:**\n\nPoor sleep significantly worsens diabetes, BP, and heart disease.\n\n**Your Sleep Target:** 7–8 hours/night\n\n**Sleep Hygiene Tips:**\n✅ Sleep and wake at consistent times (even weekends)\n✅ Keep bedroom cool, dark, and quiet\n✅ Avoid screens 1 hour before bed\n✅ No caffeine after 2 PM\n✅ Light stretching or reading before sleep\n\n**Foods that promote sleep:**\n🥛 Warm milk (tryptophan)\n🍌 Banana (magnesium + potassium)\n🫚 A handful of walnuts\n\n**Avoid:** Heavy meals, alcohol, and vigorous exercise 2 hours before bedtime`,

    'stress|anxiety|mental': `**Stress & Mental Health Management:**\n\nChronic stress raises blood pressure and blood sugar significantly.\n\n**Proven Techniques:**\n🧘 **Mindfulness Meditation:** 10 min/day (apps: Headspace, Calm)\n🌬️ **Deep Breathing (4-7-8 method):** Inhale 4s → Hold 7s → Exhale 8s\n🚶 **Walking in nature:** 20 min reduces cortisol by 25%\n📓 **Journaling:** Writing down worries frees mental load\n👥 **Social connection:** Regular calls with family/friends\n\n**When to seek professional help:**\nIf stress, anxiety, or low mood persist more than 2 weeks, please consult a mental health professional. Many hospitals now offer free telehealth sessions.`,

    'weight|bmi|obesity': `**Healthy Weight Management:**\n\n**Your BMI: ${AppState.liveVitals?.bmi?.toFixed(1) || 22.4}** — Healthy Range (18.5–24.9)\n\n**BMI Categories:**\n• Below 18.5 → Underweight\n• 18.5–24.9 → Normal weight ✅\n• 25–29.9 → Overweight\n• 30+ → Obese\n\n**Tips to maintain healthy weight:**\n✅ Caloric deficit of 300–500 kcal/day for gradual weight loss\n✅ Protein with every meal (keeps you full)\n✅ Drink water before meals\n✅ Avoid late-night eating\n\n**Simple calorie targets:**\n• Sedentary: 1,600–1,800 kcal/day\n• Moderately active: 1,800–2,200 kcal/day\n• Very active: 2,200–2,600 kcal/day`,

    'vaccination|vaccine|immunity': `**Vaccination Recommendations for Adults (India):**\n\n**Annual (every year):**\n💉 Influenza (Flu) vaccine — October is ideal\n\n**Every 5 years:**\n💉 Tetanus + Diphtheria (Td) booster\n💉 Pneumococcal vaccine (especially for 60+ and diabetics)\n\n**One-time (if not done):**\n💉 Hepatitis B series (3 doses)\n💉 Hepatitis A (2 doses)\n💉 MMR (Measles, Mumps, Rubella)\n💉 Varicella (Chickenpox)\n\n**COVID-19:**\n💉 Boosters as per government schedule\n\n📍 Visit your nearest PHC or Apollo/Fortis for vaccination. Most are free at government hospitals.`,
  },

  defaultResponses: [
    `Based on your current health profile, your vitals are ${AppState.liveVitals?.hr > 90 ? 'slightly elevated' : 'within normal range'}. I recommend staying hydrated, maintaining your medication schedule, and getting a good night's sleep. Would you like specific advice on diet, exercise, or any symptom?`,
    `I've reviewed your health data. Your BMI of ${AppState.liveVitals?.bmi?.toFixed(1) || 22.4} is in the healthy range — great work! Your main areas to focus on are blood sugar control and maintaining consistent medication adherence. Would you like a personalized meal plan?`,
    `Regular monitoring of your vitals is excellent practice. I notice your heart rate and blood pressure are being tracked consistently. Would you like me to explain what each reading means for your specific condition?`,
    `Preventive care is the best medicine! Based on your age and health profile, I recommend: monthly vitals check, quarterly HbA1c test, annual eye and kidney function tests, and staying up-to-date with vaccinations. Shall I elaborate on any of these?`,
  ],

  init() {
    const box = DOM.id('chatMessages');
    if (!box || box.children.length > 1) return; // already initialized
    if (AppState.chatHistory.length === 0) {
      this.addMessage(`👋 Hello, **${AppState.currentUser?.name.split(' ')[0]}**! I'm your HealthPulse AI Assistant.\n\nI can help you with:\n• Symptom analysis and guidance\n• Understanding your health readings\n• Personalized diet and lifestyle advice\n• Medication information\n• Disease prevention tips\n\nHow can I assist you today?`, 'ai');
    } else {
      AppState.chatHistory.forEach(m => this.addMessage(m.text, m.from, false));
    }
  },

  send() {
    if (this.typing) return;
    const input = DOM.id('chatInput');
    const msg = input?.value?.trim();
    if (!msg) return;
    input.value = '';
    this.addMessage(msg, 'user');
    this.typing = true;
    const typingEl = this._showTyping();
    setTimeout(() => {
      typingEl?.remove();
      const response = this._getResponse(msg);
      this.addMessage(response, 'ai');
      this.typing = false;
    }, 900 + Math.random() * 600);
  },

  _getResponse(msg) {
    const lower = msg.toLowerCase();
    for (const [keywords, response] of Object.entries(this.knowledgeBase)) {
      if (keywords.split('|').some(k => lower.includes(k))) {
        return typeof response === 'function' ? response() : response;
      }
    }
    // Vitals queries
    if (lower.includes('heart rate') || lower.includes('pulse')) return `Your current heart rate is **${Math.round(AppState.liveVitals.hr)} bpm**. ${this._hrAdvice(AppState.liveVitals.hr)}`;
    if (lower.includes('temperature') || lower.includes('fever')) return `Your current temperature is **${AppState.liveVitals.temp?.toFixed(1)}°F**. ${AppState.liveVitals.temp > 99.5 ? '⚠️ This indicates a mild fever. Rest and stay hydrated. If it exceeds 103°F, seek immediate medical attention.' : 'This is within the normal range (97–99°F). ✅'}`;
    if (lower.includes('spo2') || lower.includes('oxygen')) return `Your SpO₂ is **${AppState.liveVitals.spo2?.toFixed(1)}%**. ${AppState.liveVitals.spo2 < 95 ? '⚠️ Below normal — normal range is 95–100%. Consider deep breathing exercises and seek medical evaluation.' : 'This is excellent! Normal range is 95–100%. ✅'}`;
    if (lower.includes('appointment') || lower.includes('book') || lower.includes('doctor')) return `To book an appointment, go to the **Appointments** section from the sidebar. You can choose from specialists like Dr. Anjali Mehta (General Medicine), Dr. Suresh Nair (Cardiology), Dr. Priya Rao (Endocrinology), and more. You have ${AppState.appointments.filter(a => new Date(a.date) >= new Date()).length} upcoming appointment(s).`;
    if (lower.includes('medicine') || lower.includes('medication') || lower.includes('pill')) return `You currently have **${AppState.medicines.length} active medicines**. Today's adherence: ${Math.round((AppState.medicines.filter(m=>m.taken).length / AppState.medicines.length) * 100)}%. Visit the Medicine Reminder section to log today's doses. Never skip prescribed medications without consulting your doctor.`;
    if (lower.includes('emergency') || lower.includes('sos') || lower.includes('help')) return `🚨 **EMERGENCY CONTACTS:**\n\n• **Ambulance (National):** 108\n• **Emergency Helpline:** 112\n• **Your Emergency Contact:** ${SeedData.healthProfile.emergencyContact.name} — ${SeedData.healthProfile.emergencyContact.phone}\n\nIf this is a medical emergency, please call 108 immediately or click the SOS button in the emergency panel. Do not delay seeking help.`;
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) return `Hello! 😊 I'm here to help with your health queries. You can ask me about your symptoms, vitals, diet plans, medication guidance, or any health concern. What would you like to know?`;
    // Default random
    return this.defaultResponses[Math.floor(Math.random() * this.defaultResponses.length)];
  },

  _hrAdvice(hr) {
    if (hr > 100) return '⚠️ Elevated (tachycardia). This can be due to stress, caffeine, dehydration, or physical activity. If persistent, consult your doctor.';
    if (hr < 60) return '⚠️ Lower than average (bradycardia). If you exercise regularly, this can be normal. If accompanied by dizziness, see a doctor.';
    return '✅ Within the normal range (60–100 bpm). Keep up the healthy lifestyle!';
  },

  _showTyping() {
    const box = DOM.id('chatMessages');
    if (!box) return null;
    const el = document.createElement('div');
    el.id = 'typingIndicator';
    el.className = 'chat-msg msg-ai';
    el.innerHTML = `
      <div class="chat-avatar ai-avatar"><i class="fa-solid fa-brain" style="font-size:.65rem;"></i></div>
      <div class="chat-bubble" style="display:flex;gap:4px;align-items:center;padding:12px 16px;">
        <span style="width:7px;height:7px;border-radius:50%;background:var(--slate-400);animation:bounce .9s ease infinite;"></span>
        <span style="width:7px;height:7px;border-radius:50%;background:var(--slate-400);animation:bounce .9s ease .2s infinite;"></span>
        <span style="width:7px;height:7px;border-radius:50%;background:var(--slate-400);animation:bounce .9s ease .4s infinite;"></span>
      </div>`;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
    return el;
  },

  addMessage(text, from, save = true) {
    const box = DOM.id('chatMessages');
    if (!box) return;
    const div = document.createElement('div');
    div.className = `chat-msg msg-${from}`;
    const avatar = from === 'ai'
      ? `<div class="chat-avatar ai-avatar"><i class="fa-solid fa-brain" style="font-size:.65rem;"></i></div>`
      : `<div class="chat-avatar user-avatar-chat">${AppState.currentUser?.name.charAt(0) || 'U'}</div>`;
    // Simple markdown-like formatting
    const formatted = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    div.innerHTML = avatar + `<div class="chat-bubble">${formatted}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    if (save) {
      AppState.chatHistory.push({ text, from });
      if (AppState.chatHistory.length > 100) AppState.chatHistory.shift();
    }
  },

  askQuick(question) {
    Router.navigate('aiassistant');
    setTimeout(() => {
      const input = DOM.id('chatInput');
      if (input) input.value = question;
      this.send();
    }, 150);
  },

  clearChat() {
    AppState.chatHistory = [];
    const box = DOM.id('chatMessages');
    if (box) box.innerHTML = '';
    this.addMessage('Chat cleared. How can I help you with your health today?', 'ai', false);
  },
};

/* ============================================================
   16. DISEASE RISK PREDICTION ENGINE
   ============================================================ */
const RiskEngine = {
  compute() {
    const v = AppState.liveVitals;
    const p = SeedData.healthProfile;
    const risks = this._calculate(v, p);
    this._renderRisks(risks);
    this._renderRecommendations(risks);
    Charts.initRisk(risks);
  },

  _calculate(v, p) {
    let diabetes = 10;
    let hypertension = 10;
    let heart = 10;
    let obesity = 10;
    let stroke = 10;
    let cancer = 10;

    const sys  = parseInt((v.bp || '120/80').split('/')[0]);
    const hr   = v.hr || 76;
    const sugar = v.sugar || 98;
    const bmi  = v.bmi || 22.4;
    const age  = p.age || 34;

    // Age factor
    if (age > 45) { diabetes += 12; hypertension += 10; heart += 14; stroke += 12; }
    if (age > 60) { diabetes += 20; hypertension += 20; heart += 25; stroke += 20; }

    // Blood sugar
    if (sugar > 125) diabetes += 30;
    else if (sugar > 100) diabetes += 15;

    // Blood pressure
    if (sys > 140) { hypertension += 35; heart += 20; stroke += 25; }
    else if (sys > 130) { hypertension += 18; heart += 10; stroke += 10; }

    // BMI
    if (bmi > 30) { obesity += 40; diabetes += 20; heart += 15; }
    else if (bmi > 25) { obesity += 20; diabetes += 8; heart += 8; }

    // Heart rate
    if (hr > 100) heart += 10;

    // Known conditions
    const conditions = (p.conditions || '').toLowerCase();
    if (conditions.includes('diabetes'))    { diabetes += 25; heart += 15; }
    if (conditions.includes('hypertension')){ hypertension += 30; heart += 18; stroke += 15; }

    // Cap at 95
    const cap = v => Math.min(95, Math.round(v));
    return { diabetes: cap(diabetes), hypertension: cap(hypertension), heart: cap(heart), obesity: cap(obesity), stroke: cap(stroke), cancer: cap(cancer) };
  },

  _level(score) {
    if (score >= 65) return { label: 'High',     class: 'risk-high',   color: 'var(--rose-500)',   textColor: '#9f1239' };
    if (score >= 35) return { label: 'Moderate', class: 'risk-medium', color: 'var(--amber-400)',  textColor: '#92400e' };
    return              { label: 'Low',      class: 'risk-low',    color: 'var(--mint-400)',   textColor: '#065f46' };
  },

  _renderRisks(risks) {
    const container = DOM.id('riskFactorContainer');
    if (!container) return;
    const items = [
      { key: 'diabetes',     label: 'Diabetes Risk',       icon: '🩺', desc: 'Based on blood sugar, BMI, age, and history.' },
      { key: 'hypertension', label: 'Hypertension Risk',   icon: '💓', desc: 'Based on blood pressure readings and lifestyle.' },
      { key: 'heart',        label: 'Heart Disease Risk',  icon: '❤️', desc: 'Based on BP, sugar, cholesterol factors, and BMI.' },
      { key: 'obesity',      label: 'Obesity Risk',        icon: '⚖️', desc: 'Based on BMI and current body weight.' },
    ];
    container.innerHTML = items.map(({ key, label, icon, desc }) => {
      const score = risks[key];
      const lvl   = this._level(score);
      return `
        <div class="risk-meter ${lvl.class}" style="margin-bottom:18px;">
          <div class="risk-header">
            <span class="risk-label">${icon} ${label}</span>
            <span class="risk-score" style="color:${lvl.textColor};">${score}% — ${lvl.label}</span>
          </div>
          <div class="risk-bar-track">
            <div class="risk-bar-fill" style="width:${score}%;transition:width 1.5s ease;"></div>
          </div>
          <div style="font-size:.75rem;color:var(--slate-500);margin-top:5px;">${desc}</div>
        </div>`;
    }).join('');
  },

  _renderRecommendations(risks) {
    const container = DOM.id('riskRecommendations');
    if (!container) return;
    const rec = [];
    if (risks.diabetes    >= 50) rec.push({ icon: '🍽️', title: 'Reduce refined carbs', desc: 'Switch to low-GI foods. Avoid sugar, white rice, and processed foods.' });
    if (risks.hypertension>= 40) rec.push({ icon: '🧂', title: 'Cut sodium intake', desc: 'Limit sodium to under 2,000 mg/day. Avoid pickles, chips, and fast food.' });
    if (risks.heart       >= 40) rec.push({ icon: '🚶', title: 'Daily aerobic exercise', desc: '30 min brisk walk, 5 days a week. Consult cardiologist for ECG review.' });
    if (risks.obesity     >= 40) rec.push({ icon: '⚖️', title: 'Weight management', desc: 'Aim for 500 kcal/day deficit through diet and exercise.' });
    rec.push({ icon: '💧', title: 'Stay hydrated', desc: 'Drink 2.5L water daily. Reduces blood sugar and BP naturally.' });
    rec.push({ icon: '😴', title: 'Prioritize sleep', desc: '7–8 hours nightly. Poor sleep significantly worsens all metabolic conditions.' });
    container.innerHTML = rec.map(r => `
      <div style="display:flex;gap:12px;align-items:flex-start;padding:12px;background:var(--slate-100);border-radius:var(--radius-md);margin-bottom:10px;">
        <span style="font-size:1.4rem;">${r.icon}</span>
        <div>
          <div style="font-size:.88rem;font-weight:600;color:var(--slate-900);">${r.title}</div>
          <div style="font-size:.78rem;color:var(--slate-500);margin-top:3px;">${r.desc}</div>
        </div>
      </div>`).join('');
  },
};

/* ============================================================
   17. VACCINATION TRACKER MODULE
   ============================================================ */
const Vaccinations = {
  render() {
    const container = DOM.id('vaccHistoryList');
    if (!container) return;
    container.innerHTML = AppState.vaccinations.map(v => `
      <div class="vacc-item">
        <div class="vacc-dot vacc-${v.status}"></div>
        <div class="vacc-info" style="flex:1;">
          <div class="vacc-name">${v.name}</div>
          <div class="vacc-date">${v.status === 'done' ? UI.formatDate(v.date) : (v.status === 'overdue' ? 'Overdue since: ' : 'Due: ') + UI.formatDate(v.date)} ${v.hospital ? '· ' + v.hospital : ''}</div>
        </div>
        <div class="vacc-status">${UI.pill(v.status === 'done' ? 'Done' : v.status === 'upcoming' ? 'Upcoming' : 'Overdue')}</div>
      </div>`).join('');
    this._updateStats();
  },

  _updateStats() {
    const done     = AppState.vaccinations.filter(v => v.status === 'done').length;
    const upcoming = AppState.vaccinations.filter(v => v.status === 'upcoming').length;
    const overdue  = AppState.vaccinations.filter(v => v.status === 'overdue').length;
    DOM.setText('vaccDoneCount',     done);
    DOM.setText('vaccUpcomingCount', upcoming);
    DOM.setText('vaccOverdueCount',  overdue);
    DOM.setText('vaccCoverage',      Math.round((done / AppState.vaccinations.length) * 100) + '%');
  },

  addRecord() {
    UI.modal('Add Vaccination Record', `
      <div class="form-group"><label class="form-label">Vaccine Name</label><input class="form-control" id="vaccName" placeholder="e.g., Influenza Vaccine"/></div>
      <div class="form-group"><label class="form-label">Date Received / Due Date</label><input class="form-control" type="date" id="vaccDate"/></div>
      <div class="form-group"><label class="form-label">Hospital / Clinic</label><input class="form-control" id="vaccHospital" placeholder="Where was it administered?"/></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-select" id="vaccStatus"><option value="done">Completed</option><option value="upcoming">Upcoming</option></select></div>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-primary btn-sm" onclick="Vaccinations._save()"><i class="fa-solid fa-syringe"></i> Save Record</button>`);
  },

  _save() {
    const name     = DOM.val('vaccName');
    const date     = DOM.val('vaccDate');
    const hospital = DOM.val('vaccHospital');
    const status   = DOM.val('vaccStatus') || 'done';
    if (!Validator.required(name)) { UI.toast('Please enter vaccine name.', 'error'); return; }
    if (!date) { UI.toast('Please select a date.', 'error'); return; }
    AppState.vaccinations.push({ id: Date.now(), name, date, hospital, status });
    Storage.set('vaccinations', AppState.vaccinations);
    UI.closeModal();
    this.render();
    Charts.initVaccinations();
    UI.toast('💉 Vaccination record added!', 'success');
  },
};

/* ============================================================
   18. FITNESS TRACKER MODULE
   ============================================================ */
const Fitness = {
  render() { this.renderTable(); this._updateGoals(); },

  renderTable() {
    const container = DOM.id('activityTableBody');
    if (!container) return;
    container.innerHTML = AppState.activities.map(a => `
      <tr>
        <td>${UI.formatDate(a.date)}</td>
        <td>${a.type}</td>
        <td>${Fmt.number(a.steps)}</td>
        <td>${a.calories}</td>
        <td>${a.water}L</td>
        <td>${a.exercise} min</td>
        <td><button class="btn btn-xs btn-danger" onclick="Fitness.deleteActivity(${a.id})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>`).join('');
  },

  logActivity() {
    const type     = DOM.val('actType');
    const duration = parseFloat(DOM.val('actDuration') || 0);
    const distance = parseFloat(DOM.val('actDistance') || 0);
    const calories = parseFloat(DOM.val('actCalories') || this._estimateCalories(type, duration));
    const water    = parseFloat(DOM.val('actWater') || 1.8);
    const date     = DOM.val('actDate') || new Date().toISOString().split('T')[0];
    const steps    = this._estimateSteps(type, duration, distance);

    if (!type) { UI.toast('Please select activity type.', 'error'); return; }
    if (duration <= 0) { UI.toast('Please enter duration.', 'error'); return; }

    const activity = { id: Date.now(), type, date, steps, calories, water, exercise: duration, distance };
    AppState.activities.unshift(activity);
    Storage.set('activities', AppState.activities);
    this.renderTable();
    this._updateGoals();
    Charts.initFitness();
    ['actDuration','actDistance','actCalories'].forEach(id => DOM.setVal(id, ''));
    UI.toast(`🏃 ${type} activity logged! +${steps.toLocaleString()} steps`, 'success');
  },

  _estimateCalories(type, duration) {
    const mets = { Walking: 3.5, Running: 8, Cycling: 7, Swimming: 8, Yoga: 3, Gym: 6, Other: 4 };
    const met = mets[type] || 4;
    const weight = SeedData.healthProfile.weight || 70;
    return Math.round((met * weight * duration) / 60);
  },

  _estimateSteps(type, duration, distance) {
    if (type === 'Walking') return Math.round((distance || 1) * 1300 + duration * 95);
    if (type === 'Running') return Math.round((distance || 1) * 1250 + duration * 140);
    return Math.round(duration * 80);
  },

  _updateGoals() {
    const today = AppState.activities[0] || {};
    const goals = [
      { id: 'goalSteps',    val: today.steps    || 0, max: 10000, unit: 'steps' },
      { id: 'goalWater',    val: today.water     || 0, max: 2.5,   unit: 'L' },
      { id: 'goalCalories', val: today.calories  || 0, max: 2200,  unit: 'kcal' },
      { id: 'goalExercise', val: today.exercise  || 0, max: 60,    unit: 'min' },
    ];
    goals.forEach(g => {
      const pct = Math.min(100, Math.round((g.val / g.max) * 100));
      DOM.setText(g.id + 'Val', `${Fmt.number(g.val)} / ${g.max} ${g.unit}`);
      DOM.setText(g.id + 'Pct', pct + '%');
      const bar = DOM.id(g.id + 'Bar');
      if (bar) bar.style.width = pct + '%';
    });
  },

  deleteActivity(id) {
    UI.confirm('Delete this activity log?', () => {
      AppState.activities = AppState.activities.filter(a => a.id !== id);
      Storage.set('activities', AppState.activities);
      this.renderTable();
      this._updateGoals();
      Charts.initFitness();
      UI.toast('Activity removed.', 'info');
    });
  },
};

/* ============================================================
   19. NOTIFICATIONS MODULE
   ============================================================ */
const Notifications = {
  startChecker() {
    AppState.notificationCheckInterval = setInterval(() => this.updateBadge(), 30000);
    this.updateBadge();
  },

  add(title, desc, type = 'info') {
    const notif = { id: Date.now(), title, desc, time: 'Just now', read: false, type };
    AppState.notifications.unshift(notif);
    if (AppState.notifications.length > 50) AppState.notifications.pop();
    Storage.set('notifications', AppState.notifications);
    this.updateBadge();
    if (AppState.currentPage === 'notifications') this.render();
  },

  render() {
    const container = DOM.id('notificationsBody');
    if (!container) return;
    container.innerHTML = AppState.notifications.map(n => `
      <div class="notif-item" id="notif-${n.id}" style="${n.read ? 'opacity:.75;' : ''}">
        <div class="notif-dot-wrap"><div class="notif-dot ${n.read ? 'read' : ''}"></div></div>
        <div style="flex:1;">
          <div class="notif-title" style="color:${n.read ? 'var(--slate-500)' : 'var(--slate-900)'};">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          <div class="notif-time">${n.time}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          ${!n.read ? `<button class="btn btn-xs btn-outline" onclick="Notifications.markRead(${n.id})">Mark read</button>` : ''}
          <button class="btn btn-xs btn-danger" onclick="Notifications.delete(${n.id})" style="margin-top:2px;"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`).join('');
  },

  markRead(id) {
    const n = AppState.notifications.find(n => n.id === id);
    if (n) { n.read = true; Storage.set('notifications', AppState.notifications); this.render(); this.updateBadge(); }
  },

  markAllRead() {
    AppState.notifications.forEach(n => n.read = true);
    Storage.set('notifications', AppState.notifications);
    this.render();
    this.updateBadge();
    UI.toast('All notifications marked as read ✅', 'success');
  },

  delete(id) {
    AppState.notifications = AppState.notifications.filter(n => n.id !== id);
    Storage.set('notifications', AppState.notifications);
    this.render();
    this.updateBadge();
  },

  updateBadge() {
    const unread = AppState.notifications.filter(n => !n.read).length;
    const badge  = DOM.id('navNotifBadge');
    const topBadge = DOM.id('topbarNotifBadge');
    if (badge) { badge.textContent = unread || ''; badge.style.display = unread ? '' : 'none'; }
    if (topBadge) topBadge.style.display = unread > 0 ? '' : 'none';
  },
};

/* ============================================================
   20. HEALTHCARE LOCATOR MODULE
   ============================================================ */
const Locator = {
  filter: 'All',

  render(filter) {
    if (filter) this.filter = filter;
    const container = DOM.id('facilityTableBody');
    if (!container) return;
    const filtered = this.filter === 'All'
      ? SeedData.nearbyFacilities
      : SeedData.nearbyFacilities.filter(f => f.type === this.filter);
    container.innerHTML = filtered.map(f => `
      <tr>
        <td>
          <div style="font-weight:600;">${f.name}</div>
          <div style="font-size:.75rem;color:var(--slate-500);">${f.address}</div>
        </td>
        <td>${UI.pill(f.type, { Hospital:'red', Clinic:'blue', Pharmacy:'green', Emergency:'amber' }[f.type] || 'gray')}</td>
        <td>${f.distance} km</td>
        <td>⭐ ${f.rating}</td>
        <td>${f.phone || '—'}</td>
        <td>${UI.pill(f.hours === '24/7' ? '24/7' : (f.open ? 'Open' : 'Closed'), f.open ? 'green' : 'red')}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="Locator.getDirections('${f.name}', '${f.address}')"><i class="fa-solid fa-location-dot"></i> Directions</button>
          <button class="btn btn-xs btn-outline" onclick="Locator.call('${f.phone}')" style="margin-left:4px;"><i class="fa-solid fa-phone"></i></button>
        </td>
      </tr>`).join('');
  },

  getDirections(name, address) { UI.toast(`📍 Directions to ${name}: ${address} (Connect Google Maps API key in Flask config)`, 'info', 5000); },
  call(phone)       { UI.toast(`📞 Calling ${phone}… (Requires device integration)`, 'info'); },
  getNearby()       { UI.toast('📡 Fetching nearby facilities… (Requires Geolocation + Maps API)', 'info'); },
  openEmergency()   { UI.toast('🚨 Calling Emergency Services: 108', 'error', 5000); },
};

/* ============================================================
   21. ADMIN PANEL MODULE
   ============================================================ */
const AdminPanel = {
  initDashboard() {
    this._updateSystemStats();
    this._renderLogs();
  },

  _updateSystemStats() {
    const stats = {
      adminTotalUsers:   Fmt.number(SeedData.communityStats.totalMembers),
      adminActiveDoctors: SeedData.doctors.length,
      adminUptime:        '99.8%',
      adminDBSize:        '2.4 GB',
    };
    for (const [id, val] of Object.entries(stats)) DOM.setText(id, val);
  },

  _renderLogs() {
    const logs = DOM.id('systemLogsBody');
    if (!logs) return;
    const entries = [
      { icon: 'fa-user-plus',   color: 'icon-teal',  title: 'New user registered', detail: 'Meena K. — 5 min ago' },
      { icon: 'fa-key',         color: 'icon-amber', title: 'Password reset requested', detail: 'User ID: 1092 — 22 min ago' },
      { icon: 'fa-triangle-exclamation', color: 'icon-rose', title: 'Emergency alert triggered', detail: 'Patient: Priya S. — 31 min ago' },
      { icon: 'fa-database',    color: 'icon-ocean', title: 'Database backup completed', detail: 'Size: 2.4GB — 1 hour ago' },
      { icon: 'fa-shield',      color: 'icon-mint',  title: 'Security scan completed', detail: 'No threats found — 2 hours ago' },
    ];
    logs.innerHTML = entries.map(e => `
      <div class="activity-item">
        <div class="activity-dot ${e.color}"><i class="fa-solid ${e.icon}" style="font-size:.7rem;"></i></div>
        <div class="activity-content">
          <div class="act-title">${e.title}</div>
          <div class="act-time">${e.detail}</div>
        </div>
      </div>`).join('');
  },

  renderUsers() {
    const container = DOM.id('userMgmtBody');
    if (!container) return;
    container.innerHTML = SeedData.users.map(u => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${UI.pill(u.role, { Admin:'red', Doctor:'blue', 'Healthcare Worker':'amber', 'Community Member':'green' }[u.role] || 'gray')}</td>
        <td>${u.email}</td>
        <td>Jan 2024</td>
        <td>${UI.pill('Active')}</td>
        <td>
          <button class="btn btn-xs btn-outline" onclick="AdminPanel.editUser(${u.id})"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-xs btn-danger" onclick="AdminPanel.suspendUser(${u.id})" style="margin-left:4px;"><i class="fa-solid fa-ban"></i></button>
        </td>
      </tr>`).join('');
  },

  editUser(id) {
    const u = SeedData.users.find(u => u.id === id);
    if (!u) return;
    UI.modal(`Edit User — ${u.name}`, `
      <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" id="editUserName" value="${u.name}"/></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="editUserEmail" value="${u.email}"/></div>
      <div class="form-group"><label class="form-label">Role</label>
        <select class="form-select" id="editUserRole">
          <option ${u.role==='Admin'?'selected':''}>Admin</option>
          <option ${u.role==='Doctor'?'selected':''}>Doctor</option>
          <option ${u.role==='Healthcare Worker'?'selected':''}>Healthcare Worker</option>
          <option ${u.role==='Community Member'?'selected':''}>Community Member</option>
        </select></div>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-primary btn-sm" onclick="AdminPanel._saveUser(${id})">Save Changes</button>`);
  },

  _saveUser(id) {
    const u = SeedData.users.find(u => u.id === id);
    if (u) {
      u.name  = DOM.val('editUserName') || u.name;
      u.email = DOM.val('editUserEmail') || u.email;
      u.role  = DOM.val('editUserRole') || u.role;
    }
    UI.closeModal();
    this.renderUsers();
    UI.toast('User updated successfully! ✅', 'success');
  },

  suspendUser(id) {
    UI.confirm('Suspend this user account? They will lose access immediately.', () => { UI.toast('User account suspended.', 'info'); this.renderUsers(); });
  },

  addUser() {
    UI.modal('Add New User', `
      <div style="display:flex;gap:10px;">
        <div style="flex:1;" class="form-group"><label class="form-label">First Name</label><input class="form-control" id="newUserFirst" placeholder="John"/></div>
        <div style="flex:1;" class="form-group"><label class="form-label">Last Name</label><input class="form-control" id="newUserLast" placeholder="Doe"/></div>
      </div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="newUserEmail" type="email" placeholder="user@email.com"/></div>
      <div class="form-group"><label class="form-label">Role</label>
        <select class="form-select" id="newUserRole"><option>Community Member</option><option>Healthcare Worker</option><option>Doctor</option><option>Admin</option></select></div>
      <div class="form-group"><label class="form-label">Temporary Password</label><input class="form-control" id="newUserPass" type="password" placeholder="Min. 8 characters"/></div>`,
      `<button class="btn btn-outline btn-sm" onclick="UI.closeModal()">Cancel</button>
       <button class="btn btn-primary btn-sm" onclick="AdminPanel._createUser()"><i class="fa-solid fa-user-plus"></i> Create User</button>`);
  },

  _createUser() {
    const first = DOM.val('newUserFirst');
    const last  = DOM.val('newUserLast');
    const email = DOM.val('newUserEmail');
    const role  = DOM.val('newUserRole');
    const pass  = DOM.val('newUserPass');
    if (!Validator.required(first) || !Validator.required(last)) { UI.toast('Name is required.', 'error'); return; }
    if (!Validator.email(email)) { UI.toast('Valid email required.', 'error'); return; }
    if (!Validator.password(pass)) { UI.toast('Password must be 8+ characters.', 'error'); return; }
    SeedData.users.push({ id: Date.now(), name: `${first} ${last}`, email, role, password: pass });
    UI.closeModal();
    this.renderUsers();
    UI.toast(`User ${first} ${last} created! ✅`, 'success');
  },

  generateReport(type) {
    UI.toast(`📊 Generating ${type} report… (Connect Flask backend for PDF generation using ReportLab)`, 'info', 5000);
    setTimeout(() => UI.toast(`✅ ${type} report ready for download!`, 'success'), 2500);
  },
};

/* ============================================================
   22. CHART MANAGEMENT (Chart.js)
   ============================================================ */
const Charts = {
  defaults: {
    font: { family: "'Inter', sans-serif", size: 11 },
    color: () => getComputedStyle(document.documentElement).getPropertyValue('--slate-500').trim() || '#64748b',
  },

  destroy(id) {
    if (AppState.chartInstances[id]) {
      AppState.chartInstances[id].destroy();
      delete AppState.chartInstances[id];
    }
  },
  destroyAll() { Object.keys(AppState.chartInstances).forEach(id => this.destroy(id)); },

  create(id, config) {
    this.destroy(id);
    const canvas = DOM.id(id);
    if (!canvas) return null;
    try {
      const chart = new Chart(canvas, config);
      AppState.chartInstances[id] = chart;
      return chart;
    } catch (e) { console.warn('Chart creation failed:', id, e); return null; }
  },

  updateTheme() {
    // Recreate all active charts when theme changes
    const page = AppState.currentPage;
    if (page === 'dashboard')   this.initDashboard();
    if (page === 'monitoring')  this.initMonitoring();
    if (page === 'analytics')   this.initAnalytics();
    if (page === 'vaccinations')this.initVaccinations();
    if (page === 'fitness')     this.initFitness();
    if (page === 'risk')        this.initRisk();
  },

  _gridColor()   { return AppState.isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)'; },
  _textColor()   { return AppState.isDark ? '#94a3b8' : '#64748b'; },

  initDashboard() {
    // Health Trend Chart
    this.create('healthTrendChart', {
      type: 'line',
      data: {
        labels: ['Jun 12','Jun 13','Jun 14','Jun 15','Jun 16','Jun 17','Jun 18'],
        datasets: [
          { label: 'Heart Rate (bpm)', data: AppState.healthRecords.slice(0, 7).reverse().map(r => r.hr), borderColor: '#f43f5e', backgroundColor: 'rgba(244,63,94,.08)', tension: .4, fill: false, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: '#f43f5e' },
          { label: 'Blood Sugar (mg/dL)', data: AppState.healthRecords.slice(0, 7).reverse().map(r => r.sugar), borderColor: '#13827a', backgroundColor: 'rgba(19,130,122,.08)', tension: .4, fill: false, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: '#13827a' },
          { label: 'SpO₂ (%)', data: AppState.healthRecords.slice(0, 7).reverse().map(r => r.spo2), borderColor: '#2492d4', backgroundColor: 'rgba(36,146,212,.08)', tension: .4, fill: false, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: '#2492d4' },
        ],
      },
      options: { responsive: true, interaction: { mode: 'index', intersect: false }, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, color: this._textColor() } } }, scales: { y: { grid: { color: this._gridColor() }, ticks: { color: this._textColor() } }, x: { grid: { color: this._gridColor() }, ticks: { color: this._textColor() } } } },
    });

    // Disease Distribution Pie
    this.create('diseasePieChart', {
      type: 'doughnut',
      data: {
        labels: ['Diabetes','Hypertension','Obesity','Heart Disease','Respiratory','Other'],
        datasets: [{ data: [23, 19, 15, 12, 11, 20], backgroundColor: ['#13827a','#2492d4','#fbbf24','#f43f5e','#8b5cf6','#94a3b8'], borderWidth: 2, borderColor: AppState.isDark ? '#1e293b' : 'white', hoverOffset: 8 }],
      },
      options: { responsive: true, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, color: this._textColor() } } } },
    });
  },

  initMonitoring() {
    const labels = AppState.healthRecords.slice(0, 7).reverse().map(r => UI.formatDate(r.date));
    const hData  = AppState.healthRecords.slice(0, 7).reverse().map(r => r.hr);
    const sBpData = AppState.healthRecords.slice(0, 7).reverse().map(r => parseInt(r.bp.split('/')[0]));
    const dBpData = AppState.healthRecords.slice(0, 7).reverse().map(r => parseInt(r.bp.split('/')[1]));

    this.create('hrHistoryChart', {
      type: 'line', data: { labels, datasets: [{ label: 'Heart Rate (bpm)', data: hData, borderColor: '#f43f5e', backgroundColor: 'rgba(244,63,94,.1)', tension: .4, fill: true, pointRadius: 4, pointBackgroundColor: '#f43f5e' }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 50, max: 120, grid: { color: this._gridColor() }, ticks: { color: this._textColor() } }, x: { grid: { color: this._gridColor() }, ticks: { color: this._textColor(), maxRotation: 0 } } } },
    });

    this.create('bpHistoryChart', {
      type: 'line', data: { labels, datasets: [
        { label: 'Systolic', data: sBpData, borderColor: '#2492d4', tension: .4, fill: false, pointRadius: 4 },
        { label: 'Diastolic', data: dBpData, borderColor: '#13827a', tension: .4, fill: false, pointRadius: 4 },
      ]},
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: this._textColor(), font: { size: 11 } } } }, scales: { y: { grid: { color: this._gridColor() }, ticks: { color: this._textColor() } }, x: { grid: { color: this._gridColor() }, ticks: { color: this._textColor(), maxRotation: 0 } } } },
    });
  },

  initVaccinations() {
    this.create('vaccChart', {
      type: 'bar', data: { labels: ['COVID-19','Flu','Hepatitis B','Tetanus','HPV','Pneumococcal'], datasets: [{ label: 'Vaccination Rate (%)', data: [91, 67, 78, 85, 54, 62], backgroundColor: ['#13827a','#fbbf24','#2492d4','#34d399','#8b5cf6','#f43f5e'], borderRadius: 6, borderSkipped: false }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { max: 100, grid: { color: this._gridColor() }, ticks: { color: this._textColor(), callback: v => v + '%' } }, x: { grid: { display: false }, ticks: { color: this._textColor() } } } },
    });
  },

  initFitness() {
    const labels = AppState.activities.slice(0, 7).reverse().map(a => UI.formatDate(a.date));
    const steps  = AppState.activities.slice(0, 7).reverse().map(a => a.steps);
    const cals   = AppState.activities.slice(0, 7).reverse().map(a => a.calories);

    this.create('fitnessChart', {
      type: 'bar', data: { labels, datasets: [
        { label: 'Steps', data: steps, backgroundColor: 'rgba(19,130,122,.75)', borderRadius: 6, borderSkipped: false },
        { label: 'Calories Burned', data: cals, backgroundColor: 'rgba(36,146,212,.55)', borderRadius: 6, borderSkipped: false },
      ]},
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: this._textColor(), font: { size: 11 } } } }, scales: { y: { grid: { color: this._gridColor() }, ticks: { color: this._textColor() } }, x: { grid: { display: false }, ticks: { color: this._textColor(), maxRotation: 0 } } } },
    });
  },

  initAnalytics() {
    this.create('communityTrendChart', {
      type: 'line', data: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], datasets: [
        { label: 'New Cases',  data: [234,198,287,312,276,241], borderColor: '#f43f5e', tension: .4, fill: false, pointRadius: 4 },
        { label: 'Recovered', data: [180,210,260,295,280,258], borderColor: '#13827a', tension: .4, fill: false, pointRadius: 4 },
        { label: 'Vaccinated', data: [1240,1580,1820,2100,2340,2580], borderColor: '#2492d4', tension: .4, fill: false, pointRadius: 4, yAxisID: 'y1' },
      ]},
      options: { responsive: true, interaction: { mode: 'index', intersect: false }, plugins: { legend: { position: 'bottom', labels: { color: this._textColor(), font: { size: 11 } } } }, scales: { y: { grid: { color: this._gridColor() }, ticks: { color: this._textColor() } }, y1: { type: 'linear', display: false, position: 'right' }, x: { grid: { color: this._gridColor() }, ticks: { color: this._textColor() } } } },
    });

    this.create('ageHealthChart', {
      type: 'bar', data: { labels: ['0–18','19–30','31–45','46–60','60+'], datasets: [
        { label: 'Healthy', data: [92,78,65,52,38], backgroundColor: '#13827a', borderRadius: 4, borderSkipped: false },
        { label: 'At Risk',  data: [8, 22,35,48,62], backgroundColor: '#fbbf24', borderRadius: 4, borderSkipped: false },
      ]},
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: this._textColor(), font: { size: 11 } } } }, scales: { x: { stacked: true, grid: { display: false }, ticks: { color: this._textColor() } }, y: { stacked: true, grid: { color: this._gridColor() }, ticks: { color: this._textColor(), callback: v => v + '%' } } } },
    });
  },

  initRisk(risks) {
    const r = risks || { diabetes: 72, hypertension: 48, heart: 22, obesity: 18, stroke: 30, cancer: 15 };
    this.create('riskRadarChart', {
      type: 'radar', data: { labels: ['Diabetes','Hypertension','Heart Disease','Obesity','Stroke','Cancer'], datasets: [
        { label: 'Your Risk %',    data: [r.diabetes, r.hypertension, r.heart, r.obesity, r.stroke, r.cancer], borderColor: '#f43f5e', backgroundColor: 'rgba(244,63,94,.15)', pointBackgroundColor: '#f43f5e', pointRadius: 5 },
        { label: 'Community Avg', data: [35,28,20,25,22,18], borderColor: '#13827a', backgroundColor: 'rgba(19,130,122,.1)', pointBackgroundColor: '#13827a', pointRadius: 5 },
      ]},
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: this._textColor(), font: { size: 11 } } } }, scales: { r: { min: 0, max: 100, grid: { color: this._gridColor() }, ticks: { stepSize: 20, font: { size: 10 }, color: this._textColor(), backdropColor: 'transparent' }, pointLabels: { color: this._textColor(), font: { size: 11 } } } } },
    });
  },
};

/* ============================================================
   23. SEARCH MODULE
   ============================================================ */
const Search = {
  index: [
    { page: 'dashboard',     label: 'Dashboard',              icon: 'fa-gauge-high' },
    { page: 'profile',       label: 'Health Profile',         icon: 'fa-id-card-clip' },
    { page: 'monitoring',    label: 'Health Monitoring',      icon: 'fa-heart-pulse' },
    { page: 'records',       label: 'Medical Records',        icon: 'fa-folder-open' },
    { page: 'appointments',  label: 'Appointments',           icon: 'fa-calendar-check' },
    { page: 'medicines',     label: 'Medicine Reminder',      icon: 'fa-pills' },
    { page: 'vaccinations',  label: 'Vaccination Tracker',    icon: 'fa-syringe' },
    { page: 'fitness',       label: 'Fitness Tracker',        icon: 'fa-dumbbell' },
    { page: 'aiassistant',   label: 'AI Health Assistant',    icon: 'fa-brain' },
    { page: 'risk',          label: 'Disease Risk Prediction',icon: 'fa-triangle-exclamation' },
    { page: 'locator',       label: 'Healthcare Locator',     icon: 'fa-map-location-dot' },
    { page: 'analytics',     label: 'Community Analytics',    icon: 'fa-chart-bar' },
    { page: 'notifications', label: 'Notifications',          icon: 'fa-bell' },
    { page: 'settings',      label: 'Settings',               icon: 'fa-sliders' },
  ],

  query(q) {
    if (!q || q.length < 2) { this.hideResults(); return; }
    const lower = q.toLowerCase();
    const results = this.index.filter(item =>
      item.label.toLowerCase().includes(lower) ||
      item.page.toLowerCase().includes(lower)
    ).slice(0, 6);
    this.showResults(results, q);
  },

  showResults(results, q) {
    let dropdown = DOM.id('searchDropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'searchDropdown';
      dropdown.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:var(--white);border:1px solid var(--slate-300);border-radius:10px;box-shadow:var(--shadow-lift);z-index:999;overflow:hidden;margin-top:4px;';
      DOM.q('.topbar-search')?.appendChild(dropdown);
    }
    if (results.length === 0) {
      dropdown.innerHTML = '<div style="padding:12px 16px;font-size:.85rem;color:var(--slate-500);">No results found</div>';
    } else {
      dropdown.innerHTML = results.map(r => `
        <div onclick="Router.navigate('${r.page}');Search.hideResults();" style="padding:10px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.87rem;color:var(--slate-700);transition:.15s;" onmouseover="this.style.background='var(--teal-50)'" onmouseout="this.style.background=''">
          <i class="fa-solid ${r.icon}" style="color:var(--teal-500);width:16px;"></i>
          ${r.label}
        </div>`).join('');
    }
    dropdown.style.display = 'block';
  },

  hideResults() {
    const el = DOM.id('searchDropdown');
    if (el) el.style.display = 'none';
  },
};

/* ============================================================
   24. PROFILE MODULE
   ============================================================ */
const Profile = {
  save() {
    const data = {
      firstName: DOM.val('profileFirstName'),
      lastName:  DOM.val('profileLastName'),
      dob:       DOM.val('profileDOB'),
      gender:    DOM.val('profileGender'),
      phone:     DOM.val('profilePhone'),
      email:     DOM.val('profileEmail'),
      height:    DOM.val('profileHeight'),
      weight:    DOM.val('profileWeight'),
      bloodGroup:DOM.val('profileBloodGroup'),
      allergies: DOM.val('profileAllergies'),
      conditions:DOM.val('profileConditions'),
      medications:DOM.val('profileMedications'),
      ecName:    DOM.val('profileECName'),
      ecPhone:   DOM.val('profileECPhone'),
    };

    if (data.email && !Validator.email(data.email)) { UI.toast('Invalid email format.', 'error'); return; }

    // Update BMI if height and weight given
    if (data.height && data.weight) {
      const h = parseFloat(data.height) / 100;
      const w = parseFloat(data.weight);
      if (h > 0 && w > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        AppState.liveVitals.bmi = parseFloat(bmi);
        DOM.setVal('profileBMI', bmi);
      }
    }

    Storage.set('profile', data);
    UI.toast('✅ Profile saved successfully!', 'success');
  },

  changeAvatar() { UI.toast('Avatar upload: connect to Flask backend with Flask-Uploads', 'info'); },
};

/* ============================================================
   25. SETTINGS MODULE
   ============================================================ */
const Settings = {
  save() {
    const prefs = {
      name:     DOM.val('settingsName'),
      email:    DOM.val('settingsEmail'),
      phone:    DOM.val('settingsPhone'),
      language: DOM.val('settingsLanguage'),
    };
    if (prefs.email && !Validator.email(prefs.email)) { UI.toast('Invalid email format.', 'error'); return; }
    Storage.set('userPrefs', prefs);
    UI.toast('⚙️ Settings saved!', 'success');
  },

  changePassword() {
    const current = DOM.val('settingsCurrentPass');
    const newPass  = DOM.val('settingsNewPass');
    const confirm  = DOM.val('settingsConfirmPass');
    if (!current) { UI.toast('Enter your current password.', 'error'); return; }
    if (!Validator.password(newPass)) { UI.toast('New password must be at least 8 characters.', 'error'); return; }
    if (newPass !== confirm) { UI.toast('Passwords do not match.', 'error'); return; }
    UI.toast('🔒 Password changed successfully!', 'success');
    ['settingsCurrentPass','settingsNewPass','settingsConfirmPass'].forEach(id => DOM.setVal(id, ''));
  },

  exportData() {
    const data = {
      profile:      SeedData.healthProfile,
      healthRecords:AppState.healthRecords,
      medicines:    AppState.medicines,
      appointments: AppState.appointments,
      vaccinations: AppState.vaccinations,
      activities:   AppState.activities,
      exportDate:   new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'healthpulse_data.json'; a.click();
    URL.revokeObjectURL(url);
    UI.toast('📦 Health data exported!', 'success');
  },

  requestDelete() {
    UI.confirm('This will permanently delete your account and all health data. This action CANNOT be undone. Are you absolutely sure?', () => {
      Storage.clear();
      Auth.logout();
      UI.toast('Account deletion request submitted. You will be contacted within 7 days.', 'info', 7000);
    });
  },
};

/* ============================================================
   26. LANDING PAGE MODULE
   ============================================================ */
const Landing = {
  show() {
    DOM.id('authOverlay')?.classList.add('hidden');
    DOM.id('landingPage').style.display = 'block';
  },
  hide() {
    DOM.id('landingPage').style.display = 'none';
    DOM.id('authOverlay')?.classList.remove('hidden');
  },
};

/* ============================================================
   27. FORMATTERS
   ============================================================ */
const Fmt = {
  number: (n) => new Intl.NumberFormat('en-IN').format(Math.round(n)),
  percent:(n) => Math.round(n) + '%',
  date:   (d) => UI.formatDate(d),
};

/* ============================================================
   28. KEYBOARD SHORTCUTS
   ============================================================ */
const Keyboard = {
  init() {
    document.addEventListener('keydown', e => {
      if (!AppState.currentUser) return;
      // Ctrl/Cmd + K → focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        DOM.q('.topbar-search input')?.focus();
      }
      // Escape → close modal/dropdown
      if (e.key === 'Escape') {
        UI.closeModal();
        Search.hideResults();
      }
      // Enter in chat input
      if (e.key === 'Enter' && document.activeElement?.id === 'chatInput') {
        AIAssistant.send();
      }
    });
  },
};

/* ============================================================
   29. REAL-TIME UPDATES SIMULATION
   ============================================================ */
const RealTime = {
  /** Simulate incoming emergency alerts from community */
  simulateCommunityAlert() {
    const alerts = [
      'Patient #2847 — BP reading: 175/108 mmHg',
      'Patient #3102 — SpO₂ dropped to 89%',
      'Patient #1923 — Blood sugar critically high: 380 mg/dL',
      'Patient #4215 — Temperature: 104.2°F (high fever)',
    ];
    const msg = alerts[Math.floor(Math.random() * alerts.length)];
    UI.toast(`🚨 Community Alert: ${msg}`, 'error', 7000);
    Notifications.add(`🚨 Emergency: ${msg}`, 'Automated vitals monitoring alert', 'emergency');
  },

  /** Update dashboard stats counter with animation */
  animateCounter(id, target, duration = 1500) {
    const el = DOM.id(id);
    if (!el) return;
    const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
    const step  = (target - start) / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += step;
      if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
        el.textContent = Fmt.number(target);
        clearInterval(timer);
      } else {
        el.textContent = Fmt.number(Math.round(current));
      }
    }, 16);
  },
};

/* ============================================================
   30. INITIALIZATION
   ============================================================ */
const App = {
  init() {
    UI.applyStoredTheme();
    Keyboard.init();
    this._injectBounceKeyframes();
    this._injectShimmerKeyframes();

    // Check for existing session
    const session = Storage.get('session');
    if (session) {
      Auth._startSession(session);
    }

    console.log('%cHealthPulse JS Engine Ready ✅', 'color:#13827a;font-size:14px;font-weight:700;');
    console.log('%cAll modules loaded: Auth, Vitals, AI, Charts, Alerts, Reminders, Risk, Analytics', 'color:#64748b;font-size:11px;');
  },

  _injectBounceKeyframes() {
    if (DOM.id('bounceStyle')) return;
    const style = document.createElement('style');
    style.id = 'bounceStyle';
    style.textContent = `
      @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
    `;
    document.head.appendChild(style);
  },

  _injectShimmerKeyframes() { /* handled above */ },
};

/* ============================================================
   GLOBAL ALIASES — for inline onclick="..." HTML attributes
   ============================================================ */
// Auth
window.switchAuth     = (t)    => Auth.switchTab(t);
window.selectRole     = (el,c) => Auth.selectRole(el, c);
window.doLogin        = ()     => Auth.login();
window.doRegister     = ()     => Auth.register();
window.quickLogin     = (t)    => Auth.quickLogin(t);
window.doLogout       = ()     => Auth.logout();

// Navigation
window.navigate       = (p)    => Router.navigate(p);

// UI
window.UI             = UI;
window.toggleDark     = ()     => UI.toggleDark();
window.showToast      = (m,t,d)=> UI.toast(m,t,d);

// Landing
window.showLanding    = ()     => Landing.show();
window.hideLanding    = ()     => Landing.hide();

// Sidebar / Mobile
window.openMobileMenu  = ()   => UI.openMobileMenu();
window.closeMobileMenu = ()   => UI.closeMobileMenu();

// Vitals
window.Vitals          = Vitals;
window.saveVitals      = ()   => Vitals.saveRecord();
window.calcBMI         = ()   => Vitals.calcBMI();

// AI Assistant
window.AIAssistant     = AIAssistant;
window.sendMessage     = ()   => AIAssistant.send();
window.askQuick        = (q)  => AIAssistant.askQuick(q);
window.clearChat       = ()   => AIAssistant.clearChat();

// Emergency
window.EmergencyAlert  = EmergencyAlert;
window.triggerSOS      = ()   => EmergencyAlert.triggerSOS();

// Medicines
window.MedicineReminder= MedicineReminder;
window.addMedicine     = ()   => MedicineReminder.addMedicine();
window.markAllTaken    = ()   => MedicineReminder.markAllTaken();

// Appointments
window.AppointmentManager = AppointmentManager;
window.bookAppointment = ()   => AppointmentManager.bookAppointment();

// Medical Records
window.MedicalRecords  = MedicalRecords;
window.uploadRecord    = ()   => MedicalRecords.uploadRecord();
window.filterRecords   = (f)  => MedicalRecords.render(f);

// Vaccinations
window.Vaccinations    = Vaccinations;
window.addVaccRecord   = ()   => Vaccinations.addRecord();

// Fitness
window.Fitness         = Fitness;
window.logActivity     = ()   => Fitness.logActivity();

// Risk
window.RiskEngine      = RiskEngine;
window.reAnalyzeRisk   = ()   => RiskEngine.compute();

// Notifications
window.Notifications   = Notifications;
window.markAllRead     = ()   => Notifications.markAllRead();

// Locator
window.Locator         = Locator;
window.filterFacilities= (f)  => Locator.render(f);
window.getNearby       = ()   => Locator.getNearby();

// Admin
window.AdminPanel      = AdminPanel;
window.addUser         = ()   => AdminPanel.addUser();
window.generateReport  = (t)  => AdminPanel.generateReport(t);

// Profile
window.Profile         = Profile;
window.saveProfile     = ()   => Profile.save();

// Settings
window.Settings        = Settings;
window.saveSettings    = ()   => Settings.save();
window.changePassword  = ()   => Settings.changePassword();
window.exportData      = ()   => Settings.exportData();
window.requestDelete   = ()   => Settings.requestDelete();

// Search
window.searchQuery     = (q)  => Search.query(q);
window.hideSearch      = ()   => Search.hideResults();

// Real-time simulation (for demo)
window.simulateAlert   = ()   => RealTime.simulateCommunityAlert();

// Charts (exposed for landing pages / direct calls)
window.Charts          = Charts;

// RealTime
window.RealTime        = RealTime;

/* ============================================================
   AUTO-INITIALIZE on DOM Ready
   ============================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

v
