import { game } from "../game/game.js";

// Логика компонента, куда переводим пользователя, если он угадал
export const results = () => {
  // 3.	Возможность выбирать диапазон чисел (например, от 1 до 1000).
  // 4.	Счетчик попыток, показывающий, сколько попыток потребовалось пользователю для угадывания.
  // 5.	Возможность начать игру заново без перезагрузки страницы.
  document.body.innerHTML = `
    <h2>Да, это было число ${NUM}, Вы восхитительны!</h2>
    <h3>Диапазон для следующей игры:</h3>
    <div id="range-container">
    <input
      id="new-range"
      type="range"
      min="0"
      max="1000"
      step="10"
      value="${MAX_NUM}"
    />
    <span id="new-range-value">${MAX_NUM}</span>
  </div>
    <div>Количество попыток: ${ATTEMPT_COUNT}</div>
    <button id="new-game">Начать новую игру</button>
    <div id="new-warning"></div>
    `;

  // При изменении диапазона, ресеттим это число в глобальный стейт
  document.querySelector("#new-range").addEventListener("input", (e) => {
    MAX_NUM = Number(e.target.value);
    document.querySelector("#new-range-value").textContent = e.target.value;
  });

  // При клике валидируем на значение больше нуля и начинаем новую игру
  document.querySelector("#new-game").addEventListener("click", (e) => {
    e.preventDefault();
    if (MAX_NUM <= 0) {
      document.querySelector("#new-warning").textContent =
        "Введите значение, отличное от нуля";
      return;
    }

    ATTEMPT_COUNT = 0;
    GUESSED = 0;
    CACHED = GUESSED;
    game();
  });
};
