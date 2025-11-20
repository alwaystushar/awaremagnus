// Bar chart 



var barOptions = {
  series: [{
    data: [32, 12, 34, 18, 38, 10]
  }],
  chart: {
    type: 'bar',
    height: 340,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '45%',
      distributed: true
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [
      'QR Sent',
      'QR Open',
      'Clicked Linked',
      'Interact Form',
      'Form Submit',
      'Attachment Opened'
    ],
    labels: {
      style: {
        colors: '#6b7280',
        fontSize: '14px',
        fontWeight: 500
      }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#9ca3af',
        fontSize: '12px'
      }
    }
  },
  grid: {
    borderColor: '#f3f4f6',
    strokeDashArray: 4,
    xaxis: {
      lines: { show: false }
    }
  },
  colors: ['#38bdf8', '#a3e635', '#f87171', '#fbbf24', '#a78bfa', '#6366f1'],
  tooltip: {
    theme: 'light'
  }
};

new ApexCharts(document.querySelector("#barChart"), barOptions).render();







// Sucess chart 

  // Data
  const QRViewed = 100;
  const linksClicked = 70;
  const targetCompromised = 25;

  // Calculate success rate using new formula:
  // (QR Viewed + Target Compromised) - Links Clicked
  const total = QRViewed + linksClicked + targetCompromised;
  const successFormula = (QRViewed + targetCompromised) - linksClicked;
  const successRate = Math.max(0, Math.round((successFormula / total) * 100)); // Prevent negative %

  // Update left labels dynamically
  document.getElementById('QRViewedText').innerText = `${QRViewed} People`;
  document.getElementById('linksClickedText').innerText = `${linksClicked} People`;
  document.getElementById('targetCompromisedText').innerText = `${targetCompromised} People`;

  // ApexCharts Configuration
  var successOptions = {
    series: [QRViewed, linksClicked, targetCompromised],
    chart: {
      type: 'donut',
      height: '100%'
    },
    labels: ['QR Viewed', 'Links Clicked', 'Target Compromised'],
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
              formatter: () => successRate + '%'
            },
            total: {
              show: true,
              label: 'Success Rate',
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: 'normal',
              formatter: () => '' // Only show label above percentage
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
          return val + ' People';
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
    'Sent QR',
    'QR Not Opened',
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
      labels: ['QR Opened Not Reported', 'QR Opened & Reported', 'QR Not Opened & Reported'],
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