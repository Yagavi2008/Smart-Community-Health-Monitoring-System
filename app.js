/* Generic form-guard so demo forms never 404 or reload blank */
document.addEventListener("submit", (e)=>{
  const form = e.target.closest("form[data-demo]");
  if(form){
    e.preventDefault();
    const msg = form.dataset.demo || "Saved successfully.";
    vnToast(msg);
    if(form.dataset.redirect){ setTimeout(()=>window.location.href=form.dataset.redirect, 600); }
  }
});

function vnToast(text){
  let t = document.getElementById("vn-toast");
  if(!t){
    t = document.createElement("div");
    t.id = "vn-toast";
    t.style.cssText = "position:fixed;bottom:24px;right:24px;background:#0A3A66;color:#fff;padding:.8rem 1.2rem;border-radius:10px;font-size:.85rem;z-index:999;box-shadow:0 8px 24px rgba(14,36,56,.25);transition:opacity .3s;";
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.style.opacity = "1";
  clearTimeout(window.__vnToastTimer);
  window.__vnToastTimer = setTimeout(()=>{ t.style.opacity = "0"; }, 2400);
}

/* AI Health Assistant demo chat */
function vnAiReply(userText){
  const text = userText.toLowerCase();
  if(text.includes("fever") || text.includes("temperature")){
    return "A temperature above 100.4°F (38°C) can indicate infection. Stay hydrated, rest, and monitor every 4 hours. Seek medical care if it crosses 103°F, lasts over 3 days, or comes with breathlessness.";
  }
  if(text.includes("bp") || text.includes("blood pressure") || text.includes("hypertension")){
    return "For healthy blood pressure, aim under 120/80 mmHg. Reduce salt intake, stay active 30 min/day, manage stress, and log your readings in Health Monitoring so trends are visible to your doctor.";
  }
  if(text.includes("sugar") || text.includes("diabet")){
    return "Fasting blood sugar under 100 mg/dL is normal. Favor low-glycemic meals, walk after eating, and keep consistent meal timing. I can flag concerning trends to your doctor automatically.";
  }
  if(text.includes("sleep")){
    return "Adults generally need 7–9 hours of sleep. Keep a consistent bedtime, avoid screens 30 minutes before bed, and avoid caffeine after 4 PM.";
  }
  if(text.includes("water")){
    return "Aim for roughly 2.5–3 litres of water a day, more in hot climates or with physical activity. Your Fitness Tracker can log this for you.";
  }
  return "Thanks for sharing that. Based on general guidance, keep monitoring your vitals daily and maintain a balanced diet, regular activity, and adequate sleep. For anything urgent or unusual, please consult your doctor or use the Emergency Alert button.";
}

function vnInitChat(){
  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");
  const log = document.getElementById("aiChatLog");
  if(!form) return;
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const val = input.value.trim();
    if(!val) return;
    log.insertAdjacentHTML("beforeend", `<div class="list-row" style="justify-content:flex-end;"><div class="badge badge-info" style="max-width:75%;white-space:normal;text-align:left;">${val}</div></div>`);
    input.value = "";
    log.scrollTop = log.scrollHeight;
    setTimeout(()=>{
      const reply = vnAiReply(val);
      log.insertAdjacentHTML("beforeend", `<div class="list-row"><div class="badge badge-ok" style="max-width:75%;white-space:normal;text-align:left;"><i class="fa-solid fa-robot"></i> ${reply}</div></div>`);
      log.scrollTop = log.scrollHeight;
    }, 500);
  });
}
document.addEventListener("DOMContentLoaded", vnInitChat);
