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
      const color = el.getAttribute('color') || '#57ABE6';
      const trackBg = lightenColor(color, 60);

const options = {
  chart: {
    type: 'radialBar',
    width: 150,
    height: 150,
    sparkline: { enabled: true },
    animations: { enabled: true, speed: 1000 }
  },
  series: [percent],
  colors: [color],
  tooltip: {
    enabled: true,
    followCursor: true,
    theme: 'dark',                          // optional: dark bubble
    y: { formatter: (val) => `${Math.round(val)}%` }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 270,
      hollow: { size: '78%' },
      track: { background: trackBg, strokeWidth: '97%', margin: 0 },
      dataLabels: {
        name: { show: false },
        value: {
          show: true,
          fontSize: '18px',
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
      el.updateProgress = (nextPercent, nextColor) => {
        if (typeof nextPercent === 'number') chart.updateSeries([nextPercent]);
        if (nextColor) {
          const nextTrack = lightenColor(nextColor, 60);
          chart.updateOptions({
            colors: [nextColor],
            plotOptions: { radialBar: { track: { background: nextTrack } } }
          });
        }
      };
    });
  });