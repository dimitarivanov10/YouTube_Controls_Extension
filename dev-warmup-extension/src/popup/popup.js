document.addEventListener("DOMContentLoaded", async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  initializeSpeedControls(activeTab);
  initializeCookieViewer(activeTab);
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

async function initializeCookieViewer(activeTab) {
  const container = document.getElementById("cookie-list");
  const countBadge = document.getElementById("cookie-count");

  if (!activeTab?.url || activeTab.url.startsWith("chrome://")) {
    container.innerText = "Cannot read cookies for system pages.";
    return;
  }

  try {
    const cookies = await cookies.getAll({ url: activeTab.url });
    countBadge.innerText = cookies.length;

    if (cookies.length === 0) {
      container.innerText = "No active cookies found for this domain. ";
      return;
    }
    renderCookieList(container, cookies);
  } catch (error) {
    console.error("[Dev Tools] Error fetching cookies: ", error);
    container.innerText = "Failed to load page cookies. ";
  }
}

function renderCookieList(container, cookies) {
  container.innerHTML = cookies
    .slice(0, 15)
    .map(
      (cookie) =>
        `
      <div class="cookie-item">
        <span class="cookie-name">${escapeHtml(cookie.name)}</span>
        <span class="cookie-value">${escapeHtml(cookie.value)}</span>
      </div>
    `,
    )
    .join("");
}
