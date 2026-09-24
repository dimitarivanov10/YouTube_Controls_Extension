(function () {
  console.log(`[Dev Tools] Content script injected on YouTube. `);

  document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const isEditingText =
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.isContendEditable;

    if (isEditingText) return;

    const video = document.querySelector("video");
    if (!video) return;

    if (event.shiftKey && event.key === ">") {
      video.playbackRate = Math.min(video.playbackRate + 0.25, 16.0);
    }

    if (event.shiftKey && event.key === "<") {
      video.playbackRate = Math.max(video.playbackRate - 0.25, 16.0);
    }
  });

  function showSpeedToast(currentSpeed) {
    let toast = document.getElementById("dev-tools-speed-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "dev-tools-speed-toast";
      toast.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 8px 14px;
        border-radius: 6px;
        font-family: sans-serif;
        font-size: 14px;
        font-weight: bold;
        z-index: 9999;
        pointer-events: none;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.innerText = `Speed: ${currentSpeed.toFixed(2)}x`;
    toast.style.opacity = "1";
  }
})();
