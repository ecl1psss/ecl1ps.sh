const sessionStart = Date.now();

function copyFooterAddr(addr, el) {
  // Копирование в буфер
  navigator.clipboard.writeText(addr).then(() => {
    const notify = document.getElementById("footer-notify");

    // Показываем уведомление
    notify.style.display = "block";

    // Скрываем через секунду (время анимации)
    setTimeout(() => {
      notify.style.display = "none";
    }, 1000);
  });
}

function initTerminal() {
  const clockElement = document.getElementById("clock");
  const cursorElement = document.getElementById("cursor");

  // Функция для форматирования аптайма
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

  // Генерация случайной нагрузки на CPU (для вида)
  function getCPULoad() {
    // Рандом от 1.0% до 5.0%
    return (Math.random() * (10.0 - 1.0) + 1.0).toFixed(1);
  }

  // Обновление всей системной строки
  function updateSystemLine() {
    const now = new Date();

    // Время Минска
    const timeStr = now.toLocaleTimeString("en-GB", {
      timeZone: "Europe/Minsk",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const uptime = getUptime();
    const cpu = getCPULoad();

    // Формируем итоговую строку
    // Используем спец. символы для красоты: 🟢 или просто текст
    clockElement.innerText = `${timeStr} (MSK) | UPTIME: ${uptime} | CPU: ${cpu}% | ecl1ps.sh`;
  }

  // Мигание курсора
  function blinkCursor() {
    cursorElement.style.visibility =
      cursorElement.style.visibility === "hidden" ? "visible" : "hidden";
  }

  // Интервалы
  setInterval(updateSystemLine, 1000);
  setInterval(blinkCursor, 550);

  updateSystemLine(); // Сразу при загрузке
}

document.addEventListener("DOMContentLoaded", initTerminal);

let isPrintingStarted = false;

document.addEventListener("DOMContentLoaded", () => {
  if (isPrintingStarted) return;
  isPrintingStarted = true;

  const skills = [
    { name: "NODE.JS", target: 92 },
    { name: "MONGO_DB", target: 89 },
    { name: "TELEGRAM_API", target: 88 },
    { name: "EXPRESS", target: 56 },
    { name: "TYPESCRIPT", target: 37 },
  ];

  const container = document.getElementById("hack-stack");
  if (!container) return;

  let skillIdx = 0;
  const MAX_BAR_WIDTH = 20; // Общая длина шкалы

  async function printFullStack() {
    // 1. Начальная строка
    await printLine("> LOADING SYSTEM_CORE::COMPETENCIES...", 500);
    await printLine("[ OK ] Database connection: STABLE", 300);

    // 2. Печать шкал
    for (const skill of skills) {
      await printSkillBar(skill);
    }

    // 3. Финальная строка
    await printLine("", 100);
    await printLine("[ OK ] ALL MODULES LOADED SUCCESSFULLY.", 500);
  }

  // Функция для печати обычной строки
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

  // Функция для постепенного заполнения шкалы
  async function printSkillBar(skill) {
    const p = document.createElement("p");
    container.appendChild(p);

    const paddedName = skill.name.padEnd(18, " ");
    const BAR_SIZE = 20; // Количество символов в визуальной шкале [###---]

    // Цикл идет от 0 до целевого процента (target)
    for (let percent = 0; percent <= skill.target; percent++) {
      // Вычисляем, сколько решеток нужно нарисовать для текущего процента
      // (percent / 100) * BAR_SIZE
      const filledCount = Math.floor((percent / 100) * BAR_SIZE);
      const emptyCount = BAR_SIZE - filledCount;

      const filled = "#".repeat(filledCount);
      const empty = "-".repeat(emptyCount);

      // Форматируем строку: Имя [Шкала] Процент%
      // padStart(3) нужен, чтобы цифры не "прыгали" (например, "  5%", " 50%", "100%")
      const percentText = String(percent).padStart(3, " ");

      p.innerHTML = `${paddedName} <span class="scale-tag">[${filled}${empty}]</span> ${percentText}%`;

      // Скорость заполнения (мс). 10-20мс даст очень приятный плавный эффект
      await new Promise((r) => setTimeout(r, 15));
    }

    // Небольшая пауза перед следующей строкой
    await new Promise((r) => setTimeout(r, 150));
  }

  // Запуск процесса
  setTimeout(printFullStack, 1000);
});
