document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-time]').forEach(block => {
    const startTime = block.querySelector('.start-time');
    const endTime = block.querySelector('.end-time');
    const openStart = block.querySelector('.open-start');
    const openEnd = block.querySelector('.open-end');

    if (!startTime || !endTime) return;

    // Start time change -> adjust end time min & validation
    startTime.addEventListener('change', function () {
      endTime.min = startTime.value;

      if (endTime.value) {
        const start = new Date(startTime.value);
        const end = new Date(endTime.value);

        if (end < start) {
          endTime.value = startTime.value; // Reset if earlier
        }
      }
    });

    // Optional: Open native picker on button click
    if (openStart) {
      openStart.addEventListener('click', () => startTime.showPicker && startTime.showPicker());
    }
    if (openEnd) {
      openEnd.addEventListener('click', () => endTime.showPicker && endTime.showPicker());
    }
  });
});
