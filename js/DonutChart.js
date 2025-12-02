function generateDonutFromDiv(divId) {

    const el = document.getElementById(divId);
    if (!el) return;

    let values = [];
    let colors = [];

    // Extract values and colors dynamically
    for (let attr of el.attributes) {
        if (attr.name.startsWith("value")) values.push(Number(attr.value));
        if (attr.name.startsWith("color")) colors.push(attr.value);
    }

    // Extract center label
    let centerLabel = el.getAttribute("centerlabel") || "Total";

    // Auto labels
    let labels = values.map((_, i) => "Data " + (i + 1));

    const options = {
        series: values,
        labels: labels,
        colors: colors,
        chart: { type: "donut" },
        legend: { show: false },
        stroke: { width: 0 },
        dataLabels: { enabled: false },
        plotOptions: {
            pie: {
                donut: {
                    size: "75%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "14px",
                            color: "#6B7280",
                            formatter: () => centerLabel
                        },
                        value: {
                            show: true,
                            fontSize: "18px",
                            fontWeight: 600,
                            formatter: () => values.reduce((a, b) => a + b, 0)
                        }
                    }
                }
            }
        }
    };

    const chart = new ApexCharts(el, options);
    chart.render();
}

// Auto-init all donut charts with ID starting "DonutChart"
function initAllDonuts() {
    document.querySelectorAll("div[id^='DonutChart']").forEach(div => {
        generateDonutFromDiv(div.id);
    });
}

document.addEventListener("DOMContentLoaded", initAllDonuts);