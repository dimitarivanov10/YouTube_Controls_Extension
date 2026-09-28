# Dev Warmup Tools — Chrome Extension (MV3)

A lightweight, modular Manifest V3 Chrome Extension featuring a custom **YouTube Speed Controller** with keybindings and on-screen toast notifications, along with an **Active Tab Cookie Inspector**.

---

## 🚀 Features

- **YouTube Playback Control:**
  - Presets in the popup UI (`1.0x`, `1.25x`, `1.5x`, `2.0x`, `3.0x`).
  - Native page hotkeys (`Shift` + `ArrowRight` / `Shift` + `ArrowLeft`) to incrementally adjust playback speed by `0.25x`.
  - Non-intrusive dark mode toast notification overlay on top of the YouTube video player.
- **Active Tab Cookie Viewer:**
  - Inspects active cookies for current standard domain tabs (`https://`).
  - Displays total cookie count badge and formatted key-value snippets.
  - Built-in URL guards to protect against internal system pages (`chrome://`, `edge://`).

---

## 🛠️ Tech Stack

- **Manifest Version:** Manifest V3
- **Languages:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Chrome Extension APIs:** `chrome.tabs`, `chrome.scripting`, `chrome.cookies`

---

## 📁 Project Structure

```text
dev-warmup-extension/
├── .github/                  # CI / Playwright workflows
├── icons/                    # Extension action icons (16px, 48px, 128px)
├── src/
│   ├── popup/
│   │   ├── popup.html       # Extension popup structure
│   │   ├── popup.css        # Dark mode popup UI styles
│   │   └── popup.js         # Cookie inspector & speed presets logic
│   └── scripts/
│       └── content.js       # YouTube keyboard listener & toast overlay logic
├── .gitignore
├── LICENSE
├── manifest.json            # Extension configuration & permissions
└── README.md
```

---

## 📖 Installation & Usage Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dev-warmup-extension.git
```

### 2. Load the Unpacked Extension in Chrome

1. Open Google Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click the **Load unpacked** button in the top-left corner.
4. Navigate into your cloned project directory and select the `dev-warmup-extension` folder (the folder containing `manifest.json`).

---

## 🎮 How to Use

### Speed Controls on YouTube

1. Open any video on [YouTube](https://www.youtube.com).
2. Use keyboard shortcuts directly on the video page:
   - `Shift` + `Right Arrow`: Increase playback speed (+0.25x).
   - `Shift` + `Left Arrow`: Decrease playback speed (-0.25x).
3. Alternatively, click the **Dev Warmup Tools** icon in your browser toolbar to select speed presets.

### Cookie Inspector

1. Open any standard website (e.g., `github.com`, `google.com`).
2. Click the extension icon in the Chrome toolbar.
3. Scroll down in the popup to view total active cookies and key-value pairs for the current page.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
