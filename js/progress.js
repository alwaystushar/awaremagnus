function lightenColor(hex, percent) {
  const n = Math.max(0, Math.min(100, percent));
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.min(255, Math.floor(r + (255 - r) * n / 100));
  const lg = Math.min(255, Math.floor(g + (255 - g) * n / 100));
  const lb = Math.min(255, Math.floor(b + (255 - b) * n / 100));
  return `rgb(${lr}, ${lg}, ${lb})`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.leadchart').forEach((el) => {
    const percent = parseInt(el.getAttribute('value'), 10) || 0;

    const color1 = el.getAttribute('color') || '#57ABE6';
    const color2 = el.getAttribute('color2');

    const trackBg = color2 ? lightenColor('#999999', 60) : lightenColor(color1, 60);

    const width = el.clientWidth || 150;
    const height = el.clientHeight || 150;

    // NEW → textSize support
    const textSize = el.getAttribute("textSize") || "18px";

    const options = {
      chart: {
        type: 'radialBar',
        width,
        height,
        sparkline: { enabled: true },
        animations: { enabled: true, speed: 1000 },
        toolbar: { show: false }
      },

      series: [percent],

      colors: color2 ? [color1, color2] : [color1],

      tooltip: {
        enabled: true,
        followCursor: true,
        theme: 'dark',
        y: { formatter: (val) => `${Math.round(val)}%` }
      },

      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 270,
          hollow: { size: '78%' },

          track: {
            background: trackBg,
            strokeWidth: '97%',
            margin: 0
          },

          dataLabels: {
            name: { show: false },
            value: {
              show: true,
              fontSize: textSize,      // 👈 dynamic font size here
              fontWeight: 300,
              offsetY: 3,
              formatter: (val) => Math.round(val).toString()
            }
          }
        }
      },

      stroke: { lineCap: 'round' },
      labels: ['']
    };

    el.innerHTML = '';
    const chart = new ApexCharts(el, options);
    chart.render();

    // updater
    el.updateProgress = (nextPercent, nextColor1, nextColor2, nextTextSize) => {
      if (typeof nextPercent === 'number')
        chart.updateSeries([nextPercent]);

      chart.updateOptions({
        colors: nextColor2 
          ? [nextColor1, nextColor2]
          : [nextColor1],

        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                fontSize: nextTextSize || textSize
              }
            },
            track: {
              background: lightenColor(nextColor1 || color1, 60)
            }
          }
        }
      });
    };
  });
});
