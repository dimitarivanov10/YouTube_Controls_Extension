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
      const targetSpeed = parseFloat(button.getAttribute("data-speed"));
      applyVideoSpeed(activeTab.id, targetSpeed);
    });
  });
}

function applyVideoSpeed(tabId, speed) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: (playbackRate) => {
      const video = document.querySelector("video");
      if (video) {
        video.playbackRate = playbackRate;
        console.log(`[Dev Tools] Video speed set to ${playbackRate}x`);
      } else {
        alert("No active video element found on this page. ");
      }
    },
    args: [speed],
  });
}
