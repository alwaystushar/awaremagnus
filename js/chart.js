const baseOptions = {
  chart: {
    type: 'donut',
    width: '360px',
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
      donut: {
        size: '90%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            offsetY: -10,
            formatter: function () {
              return 'Total Campaigns';
            }
          },
          value: {
            show: true,
            fontSize: '20px',
            offsetY: 10,
            formatter: function () {
              return '100%';
            }
          },
          total: {
            show: true
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'solid'
  },
  legend: {
    position: 'right',
    formatter: function (val, opts) {
      let seriesValue = opts.w.globals.series[opts.seriesIndex];
      return `${val}: ${seriesValue}`;
    }
  },
  title: {
    text: ''
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};

// First chart with series, labels, and custom colors
const options1 = {
  ...baseOptions,
  series: [44, 55, 41, 17, 15, 22],
  labels: ['Email', 'SMS', 'USB', 'NFC', 'QR', 'WhatsApp'],
  colors: ['#57ABE6', '#E657AB', '#57E6AB', '#E6AB57', '#AB57E6', '#E65757']
};

// Second chart with same series but different colors
const options2 = {
  ...baseOptions,
  series: [44, 55, 41, 17, 15, 22],
  labels: ['Email', 'SMS', 'USB', 'NFC', 'QR', 'WhatsApp'],
  colors: ['#57ABE6', '#FAA139', '#A3B5C3', '#45D8DD', '#AE62E9', '#47E7C5']
};

const chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
chart1.render();

const chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();




    var options = {
      chart: {
        type: 'bar',
        height: 400,
      },
      series: [{
        name: 'Count',
        data: [27, 11, 28, 17, 34, 9]
      }],
      xaxis: {
        categories: [
          "Email Sent", "Email Open", "Clicked Linked", 
          "Interact Form", "Form Submit", "Attachment Opened"
        ]
      },
      colors: ['#14B8A6', '#6366F1', '#F87171', '#3B82F6', '#FACC15', '#EC4899'],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '45%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true
      }
    };

    var chart = new ApexCharts(document.querySelector("#campaignChart"), options);
    chart.render();




        // Donut Chart
var phishingSegmentsOptions = {
  series: [13, 13, 13, 23, 38],
  chart: { type: 'donut', height: 200 },
  labels: ['Submit Data', 'Open Email', 'Not Open Email', 'Interact Form', 'Sent Email'],
  colors: ['#D6EAF8', '#85C1E9', '#3498DB', '#1A5276', '#2484c7'],

  plotOptions: {
    pie: {
      donut: {
        labels: { show: false } // hide default labels
      }
    }
  },

  dataLabels: {
    enabled: false // hide inside labels
  },

  legend: {
    show: true,
    position: 'right',  // 🚀 moves labels to the right
    fontSize: '14px',
    fontWeight: 400,
    labels: {
      colors: '#2C3E50'
    },
    markers: {
      width: 12,
      height: 12,
      radius: 2
    },
    itemMargin: {
      vertical: 8
    },
        formatter: function (seriesName, opts) {
      const series = opts.w.globals.series;  // get values
      const total = series.reduce((a, b) => a + b, 0);
      const value = series[opts.seriesIndex];
      const percent = ((value / total) * 100).toFixed(0);

      return seriesName + " - " + percent + "%"; // 🚀 Label + Percentage
    }
  
  }
};

new ApexCharts(document.querySelector("#phishingSegmentsChart"), phishingSegmentsOptions).render();


// Pie Chart
var reportingPhishingOptions = {
  series: [23, 31, 46],
  chart: { type: 'pie', height: 200 },
  labels: ['Reported', 'Reported', 'Not Reported'],
  colors: ['#AED6F1', '#5DADE2', '#2874A6'],

  dataLabels: {
    enabled: false, // hide labels inside the pie
    dropShadow: { enabled: false }
  },

  legend: {
    show: true,
    position: 'right', // 🚀 move labels to the right
    fontSize: '14px',
    fontWeight: 400,
    labels: {
      colors: '#2C3E50'
    },
    markers: {
      width: 12,
      height: 12,
      radius: 2
    },
    itemMargin: {
      vertical: 8
    },
    formatter: function (seriesName, opts) {
      const series = opts.w.globals.series;  // get values
      const total = series.reduce((a, b) => a + b, 0);
      const value = series[opts.seriesIndex];
      const percent = ((value / total) * 100).toFixed(0);

      return seriesName + " - " + percent + "%"; // 🚀 Label + Percentage
    }
  }
};

new ApexCharts(document.querySelector("#reportingPhishingChart"), reportingPhishingOptions).render();
