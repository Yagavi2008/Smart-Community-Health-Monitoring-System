/* Shared Chart.js theme + builders for VitalNet */
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = "#5B7186";
Chart.defaults.borderColor = "#E1EBF3";

const VN_COLORS = {primary:"#0B4F8C", teal:"#0FB6A6", alert:"#E6484F", warn:"#E3A008", ok:"#1D9A6C", grid:"#E1EBF3"};

function vnLineChart(ctx, labels, datasets){
  return new Chart(ctx, {
    type:"line",
    data:{ labels, datasets: datasets.map(d=>({
      tension:.4, fill:true, pointRadius:0, borderWidth:2.5, ...d
    })) },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:datasets.length>1, position:"bottom", labels:{boxWidth:8,usePointStyle:true}}},
      scales:{ x:{grid:{display:false}}, y:{grid:{color:VN_COLORS.grid}} }
    }
  });
}

function vnBarChart(ctx, labels, datasets){
  return new Chart(ctx, {
    type:"bar",
    data:{ labels, datasets: datasets.map(d=>({borderRadius:6, ...d})) },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:datasets.length>1, position:"bottom"}},
      scales:{ x:{grid:{display:false}}, y:{grid:{color:VN_COLORS.grid}, beginAtZero:true} }
    }
  });
}

function vnDoughnut(ctx, labels, data, colors){
  return new Chart(ctx, {
    type:"doughnut",
    data:{ labels, datasets:[{ data, backgroundColor:colors, borderWidth:0 }] },
    options:{
      responsive:true, maintainAspectRatio:false, cutout:"68%",
      plugins:{legend:{position:"bottom", labels:{boxWidth:8,usePointStyle:true}}}
    }
  });
}
