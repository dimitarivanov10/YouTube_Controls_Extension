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

async function initializeCookieViewer() {
  const container = document.getElementById("cookie-list");
  const countBadge = document.getElementById("cookie-count");

  if (!container) return;

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab || !tab.url) {
      container.innerHTML = `<p class="status-message">No active page found.</p>`;
      return;
    }

    if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
      container.innerHTML = `<p class="status-message">Cannot read cookies on internal pages.</p>`;
      if (countBadge) countBadge.innerText = "0";
      return;
    }

    const fetchedCookies = await chrome.cookies.getAll({ url: tab.url });

    if (countBadge) {
      countBadge.innerText = fetchedCookies.length;
    }

    renderCookieList(container, fetchedCookies);
  } catch (error) {
    console.error("[Dev Tools] Error fetching cookies:", error);
    container.innerHTML = `<p class="status-message">Failed to load page cookies.</p>`;
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

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (match) => {
    const escapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escapeMap[match];
  });
}
