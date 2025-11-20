  document.addEventListener("DOMContentLoaded", () => {
        const chartEl = document.querySelector("#areaChart");

        // Read attributes
        const xAxis = chartEl
          .getAttribute("x-axis")
          .split(",")
          .map((x) => x.trim());
        const yAxis = chartEl
          .getAttribute("y-axis")
          .split(",")
          .map((y) => Number(y.trim()));
        const data = chartEl
          .getAttribute("data")
          .split(",")
          .map((d) => Number(d.trim()));
        const label = chartEl.getAttribute("label") || "Data";

        // Chart config
        const options = {
          chart: {
            type: "area",
            height: 300,
            toolbar: { show: false },
            zoom: { enabled: false },
          },
          stroke: {
            curve: "smooth",
            width: 3,
            colors: ["#4BA6FF"],
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.4,
              opacityTo: 0.05,
              stops: [0, 100],
              colorStops: [
                {
                  offset: 0,
                  color: "#4BA6FF",
                  opacity: 0.4,
                },
                {
                  offset: 100,
                  color: "#CFE2FF",
                  opacity: 0.1,
                },
              ],
            },
          },
          grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 4,
            padding: { left: 10, right: 10 },
          },
          dataLabels: { enabled: false },
          series: [
            {
              name: label,
              data: data,
            },
          ],
          xaxis: {
            categories: xAxis,
            labels: {
              style: {
                colors: "#9CA3AF",
                fontSize: "12px",
              },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            min: Math.min(...yAxis),
            max: Math.max(...yAxis),
            tickAmount: yAxis.length - 1,
            labels: {
              style: { colors: "#9CA3AF", fontSize: "12px" },
            },
          },
          tooltip: {
            theme: "light",
            style: { fontSize: "12px" },
            y: {
              formatter: (val) => `${val} Topics`,
            },
          },
          colors: ["#4BA6FF"],
        };

        const chart = new ApexCharts(chartEl, options);
        chart.render();
      });