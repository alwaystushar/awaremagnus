function createSemiDonutChart(el, sentValue, openedValue, adminValue, color1, color2, color3) {
  var options = {
    series: [sentValue, openedValue, adminValue], // ✅ now 3 values
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
              formatter: () => 'Unread'
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
              label: 'Remaining',
              fontSize: '14px',
              fontWeight: 'light',
              color: '#000',
              formatter: function (w) {
                let sent = w.globals.series[0];   // sent
                let opened = w.globals.series[1]; // opened
                return sent - opened;             // ✅ still subtraction
              }
            }
          }
        }
      }
    },
    colors: [color1, color2, color3], // ✅ 3 colors
    labels: ['Sent', 'Opened', 'Reported To Admin'], // ✅ changed from "Other" → "Admin"
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
    const admin = parseInt(el.getAttribute('admin'), 10) || 0; // ✅ renamed attribute
    const color1 = el.getAttribute('color1') || '#CFE2FF';
    const color2 = el.getAttribute('color2') || '#4BA6FF';
    const color3 = el.getAttribute('color3') || '#FFB84B';

    createSemiDonutChart(el, sent, opened, admin, color1, color2, color3);
  });
});
