const sessionStart = Date.now();

function copyFooterAddr(addr, el) {
  navigator.clipboard.writeText(addr).then(() => {
    const notify = document.getElementById("footer-notify");
    notify.style.display = "block";
    setTimeout(() => {
      notify.style.display = "none";
    }, 1000);
  });
}

function initTerminal() {
  const clockElement = document.getElementById("clock");
  const cursorElement = document.getElementById("cursor");

  function getUptime() {
    const secondsElapsed = Math.floor((Date.now() - sessionStart) / 1000);
    if (secondsElapsed < 60) return `${secondsElapsed}s`;

    const mins = Math.floor(secondsElapsed / 60);
    const secs = secondsElapsed % 60;
    if (mins < 60) return `${mins}m ${secs}s`;

    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m`;
  }

  function getCPULoad() {
    return (Math.random() * (10.0 - 1.0) + 1.0).toFixed(1);
  }

  function updateSystemLine() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-GB", {
      timeZone: "Europe/Minsk",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const uptime = getUptime();
    const cpu = getCPULoad();

    clockElement.innerText = `${timeStr} (MSK) | UPTIME: ${uptime} | CPU: ${cpu}% | ecl1ps.sh`;
  }

  function blinkCursor() {
    if (cursorElement) {
      cursorElement.style.visibility =
        cursorElement.style.visibility === "hidden" ? "visible" : "hidden";
    }
  }

  setInterval(updateSystemLine, 1000);
  setInterval(blinkCursor, 550);
  updateSystemLine();
}

document.addEventListener("DOMContentLoaded", initTerminal);

let isPrintingStarted = false;

document.addEventListener("DOMContentLoaded", () => {
  if (isPrintingStarted) return;
  isPrintingStarted = true;

  const skills = [
    { name: "NODE.JS", target: 97 },
    { name: "MONGO_DB", target: 89 },
    { name: "TELEGRAM_API", target: 88 },
    { name: "EXPRESS", target: 56 },
    { name: "TYPESCRIPT", target: 49 },
  ];

  const container = document.getElementById("hack-stack");
  if (!container) return;

  const MAX_BAR_WIDTH = 20;

  async function printFullStack() {
    await printLine("> LOADING SYSTEM_CORE::COMPETENCIES...", 500);
    await printLine("[ OK ] Database connection: STABLE", 300);

    for (const skill of skills) {
      await printSkillBar(skill);
    }

    await printLine("", 100);
    await printLine("[ OK ] ALL MODULES LOADED SUCCESSFULLY.", 500);
  }

  function printLine(text, delay) {
    return new Promise((resolve) => {
      const p = document.createElement("p");
      if (text.startsWith("[ ")) {
        const endTag = text.indexOf(" ]") + 2;
        p.innerHTML = `<span style="color: #555">${text.substring(0, endTag)}</span>${text.substring(endTag)}`;
      } else {
        p.textContent = text;
      }
      container.appendChild(p);
      setTimeout(resolve, delay);
    });
  }

  async function printSkillBar(skill) {
    const p = document.createElement("p");
    container.appendChild(p);

    const width = window.innerWidth;
    let BAR_SIZE = 20; // Десктоп
    let paddingValue = 18;

    if (width < 600) {
      BAR_SIZE = 12; // Обычные мобилки
      paddingValue = 10;
    }

    if (width <= 320) {
      BAR_SIZE = 8; // Экстремально узкие экраны (iPhone SE и т.д.)
      paddingValue = 8;
    }
    const paddedName = skill.name.padEnd(paddingValue, " ");

    for (let percent = 0; percent <= skill.target; percent++) {
      const filledCount = Math.floor((percent / 100) * BAR_SIZE);
      const emptyCount = BAR_SIZE - filledCount;

      const filled = "#".repeat(filledCount);
      const empty = "-".repeat(emptyCount);
      const percentText = String(percent).padStart(3, " ");

      p.innerHTML = `${paddedName} <span class="scale-tag">[${filled}${empty}]</span> ${percentText}%`;
      await new Promise((r) => setTimeout(r, 15));
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  setTimeout(printFullStack, 1000);
});

// Управление модальным окном
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-terminal-btn");
  const modal = document.getElementById("close-modal");
  const sorryBtn = document.getElementById("sorry-btn");

  if (closeBtn && modal && sorryBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });

    sorryBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }
});
