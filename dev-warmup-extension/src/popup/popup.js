document.addEventListener("DOMContentLoaded", async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  initializeSpeedControls(activeTab);
});

function initializeSpeedControls(activeTab) {
  const speedButtons = document.querySelectorAll("button[data-speed]");

  speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetSpeed = parseFloat(button.getAttribute('data-speed'));
    });
  });
}