/* VitalNet layout engine — injects sidebar + topbar on every app page.
   body needs: data-page="<file>.html"  data-role="member|doctor|admin"  data-title="Page Title" data-sub="subtitle text" */

const NAV = {
  member: {
    label: "Community Member",
    items: [
      ["dashboard.html", "Dashboard", "fa-gauge-high"],
      ["health-profile.html", "Health Profile", "fa-id-card"],
      ["health-monitoring.html", "Health Monitoring", "fa-heart-pulse"],
      ["medical-records.html", "Medical Records", "fa-file-medical"],
      ["appointments.html", "Appointments", "fa-calendar-check"],
      ["medicine-reminder.html", "Medicine Reminder", "fa-pills"],
      ["vaccination-tracker.html", "Vaccination Tracker", "fa-syringe"],
      ["fitness-tracker.html", "Fitness Tracker", "fa-person-running"],
      ["ai-assistant.html", "AI Health Assistant", "fa-robot"],
      ["notifications.html", "Notifications", "fa-bell"],
      ["settings.html", "Settings", "fa-gear"],
    ]
  },
  doctor: {
    label: "Doctor",
    items: [
      ["doctor-dashboard.html", "Doctor Dashboard", "fa-gauge-high"],
      ["doctor-patients.html", "Patient Records", "fa-file-medical"],
      ["doctor-appointments.html", "Appointments", "fa-calendar-check"],
      ["doctor-recommendations.html", "Health Recommendations", "fa-notes-medical"],
    ]
  },
  admin: {
    label: "Health Admin",
    items: [
      ["admin-dashboard.html", "Admin Dashboard", "fa-gauge-high"],
      ["admin-users.html", "User Management", "fa-users"],
      ["admin-doctors.html", "Doctor Management", "fa-user-doctor"],
      ["admin-analytics.html", "Community Analytics", "fa-chart-line"],
      ["admin-reports.html", "Reports Management", "fa-file-lines"],
      ["admin-emergency.html", "Emergency Monitoring", "fa-triangle-exclamation"],
      ["admin-settings.html", "System Settings", "fa-gear"],
    ]
  }
};

function initials(name){
  return name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
}

function renderShell(){
  const body = document.body;
  const page = body.dataset.page || "";
  const role = body.dataset.role || "member";
  const title = body.dataset.title || "";
  const sub = body.dataset.sub || "";
  const userName = localStorage.getItem("vn_name") || "Yagavi S";
  const nav = NAV[role];

  const sections = {member:"Member Workspace", doctor:"Clinical Workspace", admin:"Admin Workspace"};

  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-brand"><span class="pulse-dot"></span> VitalNet</div>
    <div class="sidebar-role">${sections[role]}</div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">${nav.label}</div>
      ${nav.items.map(([href,label,icon])=>`
        <a class="sidebar-link ${page===href?'active':''}" href="${href}">
          <i class="fa-solid ${icon}"></i><span>${label}</span>
        </a>`).join("")}
    </nav>
    <div class="sidebar-foot">
      <div class="role-switch" style="margin-bottom:.6rem;">
        <button data-role-link="member.html">Member</button>
        <button data-role-link="doctor.html">Doctor</button>
        <button data-role-link="admin.html">Admin</button>
      </div>
      <a href="index.html"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</a>
    </div>`;

  const roleHome = {member:"dashboard.html", doctor:"doctor-dashboard.html", admin:"admin-dashboard.html"};
  sidebar.querySelectorAll("[data-role-link]").forEach(btn=>{
    const target = btn.dataset.roleLink.replace("member.html","dashboard.html")
      .replace("doctor.html","doctor-dashboard.html").replace("admin.html","admin-dashboard.html");
    const r = btn.dataset.roleLink.split(".")[0];
    if(r===role) btn.classList.add("active");
    btn.addEventListener("click",()=>{ window.location.href = target; });
  });

  const topbar = document.createElement("div");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <div>
      <div class="topbar-title">${title}</div>
      <div class="topbar-sub">${sub}</div>
    </div>
    <div class="topbar-right">
      <button class="icon-btn" title="Notifications" onclick="window.location.href='${role==='member'?'notifications.html':'#'}'">
        <i class="fa-solid fa-bell"></i><span class="dot"></span>
      </button>
      <button class="icon-btn" title="Emergency alert" id="emergencyBtn"><i class="fa-solid fa-triangle-exclamation"></i></button>
      <div class="avatar" title="${userName}">${initials(userName)}</div>
    </div>`;

  const shell = document.createElement("div");
  shell.className = "app-shell";
  const mainCol = document.createElement("div");
  mainCol.className = "main-col";
  mainCol.appendChild(topbar);

  const pageWrap = document.createElement("div");
  pageWrap.className = "page";
  while(document.body.firstChild){ pageWrap.appendChild(document.body.firstChild); }

  mainCol.appendChild(pageWrap);
  shell.appendChild(sidebar);
  shell.appendChild(mainCol);
  document.body.appendChild(shell);

  document.getElementById("emergencyBtn")?.addEventListener("click",()=>{
    if(confirm("Trigger an emergency alert to your care team and emergency contact?")){
      alert("Emergency alert sent. A healthcare worker has been notified.");
    }
  });
}

document.addEventListener("DOMContentLoaded", renderShell);
