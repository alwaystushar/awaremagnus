const timelineData = [
  {
    title: "Achievement Unlocked!",
    badge: "Perfect Score",
    rarity: null,
    xp: 200,
    desc: "Get 100% on a course final exam",
    date: "19 July, 2025 - 8:00 PM",
    status: "Completed",
    completed: true
  },
  {
    title: "Achievement Unlocked!",
    badge: "Perfect Score",
    rarity: "Common",
    xp: 200,
    quiz: "93% Quiz Score",
    duration: "60 minutes",
    desc: "Get 100% on a course final exam",
    date: "19 July, 2025 - 8:00 PM",
    completed: true
  },
  {
    title: "Achievement Unlocked!",
    badge: "Perfect Score",
    rarity: "Common",
    xp: 200,
    quiz: "93% Quiz Score",
    duration: "60 minutes",
    desc: "Get 100% on a course final exam",
    date: "19 July, 2025 - 8:00 PM",
    completed: true
  },
  {
    title: "Achievement",
    xp: 200,
    desc: "Get 100% on a course final exam",
    date: "19 July, 2025 - 8:00 PM",
    completed: false
  }
];

const timeline = document.getElementById("timeline");

timelineData.forEach((item, index) => {
  timeline.innerHTML += `
    <div class="relative">

      <!-- Line -->
      ${index !== timelineData.length - 1 ? `
        <span class="absolute left-[-19px] top-6 h-full w-[1.5px] ${
          item.completed ? "bg-emerald-400" : "bg-gray-200"
        }"></span>
      ` : ""}

      <!-- Dot -->
      <span class="absolute left-[-28px] top-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
        item.completed ? "bg-emerald-500 text-white" : "bg-sky-500"
      }">
        ${item.completed ? "✓" : ""}
      </span>

      <!-- Card -->
      <div class="border rounded-xl p-3 ${
        !item.completed ? "border-sky-400" : "border-gray-200"
      }">

        <!-- Top -->
        <div class="flex justify-between items-start mb-1.5">
          <div class="flex items-center gap-1.5 flex-wrap">
            <h3 class="font-medium text-xs">${item.title}</h3>

            ${item.rarity ? `
              <span class="px-2 py-0.5 text-[10px] rounded-full ${
                item.rarity === "Common"
                  ? "bg-sky-100 text-sky-600"
                  : "bg-orange-100 text-orange-600"
              }">
                ${item.rarity}
              </span>
            ` : ""}
          </div>

          <span class="text-[10px] text-gray-400">
            📅 ${item.date}
          </span>
        </div>

        <!-- Badge -->
        ${item.badge ? `
          <span class="inline-block mb-1.5 px-2.5 py-0.5 text-[10px] rounded-full border border-emerald-400 text-emerald-500">
            ${item.badge}
          </span>
        ` : ""}

        <!-- Meta -->
        <div class="flex items-center gap-3 text-[10px] text-gray-500 mb-1 flex-wrap">
          <span class="text-orange-500">⭐ +${item.xp} XP</span>
          ${item.quiz ? `<span>📘 ${item.quiz}</span>` : ""}
          ${item.duration ? `<span>⏱ ${item.duration}</span>` : ""}
        </div>

        <!-- Description -->
        <p class="text-[11px] text-gray-500">${item.desc}</p>

        <!-- Status -->
        ${item.status ? `
          <div class="mt-1.5">
            <span class="px-2.5 py-0.5 text-[10px] rounded-full bg-emerald-100 text-emerald-600">
              ${item.status}
            </span>
          </div>
        ` : ""}

      </div>
    </div>
  `;
});
