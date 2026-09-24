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
})();
