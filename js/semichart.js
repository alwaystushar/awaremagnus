function createSemiDonutChart(el, sentValue, openedValue, adminValue, color1, color2, color3) {

  // Read size from element (Tailwind width/height)
  const chartWidth  = el.clientWidth  || 300;   // default width
  const chartHeight = el.clientHeight || 320;   // default height

  var options = {
    series: [sentValue, openedValue, adminValue],

    chart: {
      type: 'donut',
      width: chartWidth,
      height: chartHeight,
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
              fontSize: '11px',
              color: '#000',
              formatter: () => 'Unread'
            },
            value: {
              offsetY: -20,
              fontSize: '14px',
              fontWeight: 'medium',
              color: '#000',
              show: true
            },
            total: {
              show: true,
              label: 'Remaining',
              fontSize: '10px',
              fontWeight: 'light',
              color: '#000',
              formatter: function (w) {
                const sent = w.globals.series[0];
                const opened = w.globals.series[1];
                return sent - opened;
              }
            }
          }
        }
      }
    },

    colors: [color1, color2, color3],
    labels: ['Sent', 'Opened', 'Reported To Admin'],

    legend: {
      show: true,
      fontSize: '10px',
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: -70,
      itemMargin: {
        horizontal: 8,
        vertical: 2
      },
      formatter: function (val, opts) {
        return val + " " + opts.w.globals.series[opts.seriesIndex];
      }
    },

    dataLabels: { enabled: false },

    stroke: {
      width: 2,
      lineCap: 'round'
    }
  };

  var chart = new ApexCharts(el, options);
  chart.render();
}

// Auto generate charts
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.semichart').forEach((el) => {

    const sent   = parseInt(el.getAttribute('sent'))   || 0;
    const opened = parseInt(el.getAttribute('opened')) || 0;
    const admin  = parseInt(el.getAttribute('admin'))  || 0;

    const color1 = el.getAttribute('color1') || '#CFE2FF';
    const color2 = el.getAttribute('color2') || '#4BA6FF';
    const color3 = el.getAttribute('color3') || '#FFB84B';

    createSemiDonutChart(el, sent, opened, admin, color1, color2, color3);
  });
});
