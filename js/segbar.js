  window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("segBar");
    const items = container.querySelectorAll("div");
    const level = parseInt(container.dataset.level) || items.length;

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove("opacity-0");

        if (index < level) {
          item.style.opacity = "1";      // active segment
        } else {
          item.style.opacity = "0.1";    // inactive segment
        }

      }, index * 200);
    });
  });