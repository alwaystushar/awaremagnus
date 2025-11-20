  // Event data
  const events = [
    { name: "Email Sent",       time: "2025-05-23T14:00:00" },
    { name: "Email Open",       time: "2025-05-26T16:00:00" },
    { name: "Clicked Link",     time: "2025-05-27T18:00:00" },
    { name: "Interact Form",    time: "2025-05-28T19:30:00" },
    { name: "Form Submit",      time: "2025-05-29T20:15:00" },
    { name: "Attachment Open",  time: "2025-05-30T21:00:00" }
  ];

var options = {
  series: [{
    name: "Journey",
    data: events.map(e => ({ x: e.name, y: new Date(e.time).getTime() }))
  }],
  chart: {
    type: "area",   // area = line + gradient fill
    height: 400,
    toolbar: { show: false }
  },
  dataLabels: {
    enabled: false   // 👈 removes numbers on the line
  },
  stroke: {
    curve: "smooth",
    width: 3
  },
  markers: {
    size: 6,
    colors: ["#00CCC4"],
    strokeColors: "#fff",
    strokeWidth: 2
  },
  colors: ["#00CCC4"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      gradientToColors: ["#009688"], // darker teal
      inverseColors: false,
      opacityFrom: 0.4,  // top of gradient
      opacityTo: 0,      // fade to transparent
      stops: [0, 100]
    }
  },
  xaxis: {
    type: "category",
    categories: events.map(e => e.name),
    labels: {
      style: { fontSize: "14px" }
    }
  },
  yaxis: {
    min: new Date(events[0].time).getTime(),
    max: new Date(events[events.length - 1].time).getTime(),
    labels: {
      formatter: val => {
        const d = new Date(val);
        return d.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "2-digit"
        });
      }
    },
    title: { text: "Date" }
  },
  tooltip: {
    y: {
      formatter: val => {
        const d = new Date(val);
        return d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    }
  },
  grid: {
    borderColor: "#ccc",
    strokeDashArray: 4
  }
};


  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();






// Data
const emailViewed = 100;
const linksClicked = 70;
const targetCompromised = 25;

// Calculate totals
const total = emailViewed + linksClicked + targetCompromised;

// Update left labels dynamically
document.getElementById('emailViewedText').innerText = `${emailViewed} People`;
document.getElementById('linksClickedText').innerText = `${linksClicked} People`;
document.getElementById('targetCompromisedText').innerText = `${targetCompromised} People`;

// ApexCharts Configuration
var successOptions = {
  series: [emailViewed, linksClicked, targetCompromised],
  chart: {
    type: 'donut',
    height: '100%'
  },
  labels: ['Email Viewed', 'Links Clicked', 'Target Compromised'],
  colors: ['#38bdf8', '#f87171', '#34d399'],
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: {
        size: '80%',
        labels: {
          show: true,
          name: { show: false },
          value: {
            show: true,
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#111827',
            formatter: () => total // ✅ show total number in center
          },
          total: {
            show: true,
            label: 'Total People',
            fontSize: '14px',
            color: '#6b7280',
            fontWeight: 'normal',
            formatter: () => '' // just keep the label, no extra number
          }
        }
      }
    }
  },
  legend: { show: false },
  stroke: { width: 0 },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + ' People'; // ✅ shows data of that slice
      }
    }
  }
};

new ApexCharts(document.querySelector("#successChart"), successOptions).render();







// Employees Phishing Segments
var segmentsOptions = {
  series: [20, 10, 15, 30, 25],
  chart: {
    type: 'donut',
    height: 300
  },
  labels: [
    'Received Email',
    'Email Not opened',
    'Interact Form',
    'Submit Data',
    'Attachment Opened'
  ],
  colors: ['#60a5fa', '#e5e7eb', '#fbbf24', '#a78bfa', '#4ade80'],
  legend: {
    position: 'bottom',
    fontSize: '14px',
    horizontalAlign: 'center',
    formatter: function (seriesName, opts) {
      return "&nbsp; " +seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
    },
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + " People";
      }
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '80%'
      }
    }
  }
};

new ApexCharts(document.querySelector("#segmentsChart"), segmentsOptions).render();


    // Reported To Admin
    var reportOptions = {
      series: [40, 30, 30],
      chart: { type: 'pie', height: 300 },
      labels: ['Email Opened Not Reported', 'Email Opened & Reported', 'Email Not Opened & Reported'],
      colors: ['#f87171', '#60a5fa', '#4ade80'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: false },
      tooltip: { enabled: true }
    };
    new ApexCharts(document.querySelector("#reportChart"), reportOptions).render();

    // Semi Donut Charts for bottom
function createSemiDonut(selector, colors, total) {
  var options = {
    series: [40, 32], // Example values
    chart: { type: 'donut', height: 180 },
    colors: colors,
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: '90%',
          labels: {
            show: true,
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              label: total,
              fontSize: '22px',
              fontWeight: 600,
              color: '#333'
            }
          }
        }
      }
    },
    tooltip: { enabled: true }
  };

  new ApexCharts(document.querySelector(selector), options).render();
}

createSemiDonut("#linksChart", ['#ef4444', '#22c55e'], '50');
createSemiDonut("#formChart", ['#fbbf24', '#22c55e'], '50');
createSemiDonut("#submitChart", ['#a78bfa', '#22c55e'], '50');
createSemiDonut("#attachChart", ['#3b82f6', '#22c55e'], '50');










function createSemiDonutChart(el, sentValue, openedValue, label1, label2, color1, color2) {
  var options = {
    series: [sentValue, openedValue],
    chart: {
      type: 'donut',
      height: 320,
      offsetY: -10
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 20,
              fontSize: '16px',
              color: '#000',
              formatter: () => label1 // Use custom label for main name
            },
            value: {
              offsetY: -20,
              fontSize: '28px',
              fontWeight: 'medium',
              color: '#000',
              show: true
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 'light',
              color: '#000',
              formatter: function (w) {
                let sent = w.globals.series[0];
                let opened = w.globals.series[1];
                return sent + opened;
              }
            }
          }
        }
      }
    },
    colors: [color1, color2],
    labels: [label1, label2], // Custom labels for legend
    legend: {
      show: true,
      fontSize: '14px',
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: -70,
      itemMargin: {
        horizontal: 8,
        vertical: 2
      },
      formatter: function (val, opts) {
        return val + "  " + opts.w.globals.series[opts.seriesIndex];
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      lineCap: 'round'
    }
  };

  var chart = new ApexCharts(el, options);
  chart.render();
}

// Auto-generate charts from attributes
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.semichart').forEach((el) => {
    const sent = parseInt(el.getAttribute('sent'), 10) || 0;
    const opened = parseInt(el.getAttribute('opened'), 10) || 0;
    const label1 = el.getAttribute('label1') || 'Sent';
    const label2 = el.getAttribute('label2') || 'Opened';
    const color1 = el.getAttribute('color1') || '#CFE2FF';
    const color2 = el.getAttribute('color2') || '#4BA6FF';

    createSemiDonutChart(el, sent, opened, label1, label2, color1, color2);
  });
});