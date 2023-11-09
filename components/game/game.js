import { warning } from "../../scripts/utils/warning.js";
import { makeNumber } from "../../scripts/utils/makeNumber.js";
import { checkEven } from "../../scripts/utils/checkEven.js";
import { results } from "../results/results.js";
import { isNew } from "../../scripts/utils/isNew.js";

export const game = () => {
  NUM = makeNumber();
  console.log(NUM)

  document.body.innerHTML = `
    <h1>Угадай число</h1>
    <input type="number" id="number-guess" />
    <button id="button-guess">Подтвердить</button>
    <div id="warning"></div>
    <div id="info"></div>
    `;

  // Логика основной части программы (Самой игры)

  // Отслеживаем инпут числа
  document.querySelector("#number-guess").addEventListener("input", (e) => {
    GUESSED = Number(e.target.value);
  });

  // Подтверждаем ввод, сравниваем с загаданным числом
  document.querySelector("#button-guess").addEventListener("click", (e) => {
    e.preventDefault();

    // 2.2.	Если пользователь введет число за пределами диапазона
    // (например, меньше 1 или больше 100), необходимо выводить предупреждение.
    if (GUESSED < 1 || GUESSED > MAX_NUM) {
      document.querySelector(
        "#warning"
      ).textContent = `Вы ввели число вне диапазона [1 ... ${MAX_NUM}]`;
      return;
    }

    if (!isNew()) {
      document.querySelector("#warning").textContent =
        "Вы ввели то же самое число дважды";
      return;
    }

    // Если число валидное, то увеличиваем счётчик попыток
    ATTEMPT_COUNT++;

    // Если не угадал
    if (GUESSED !== NUM) {
      // 1.3.	После каждой попытки компьютер должен сообщать,
      // было ли загаданное число больше или меньше предложенного.
      warning(GUESSED, NUM);
      // 2.1.	Каждые три неудачные попытки пользователь получает
      // подсказку о том, является ли число четным или нечетным.
      if (ATTEMPT_COUNT % 3 === 0) {
        document.querySelector("#info").textContent = `${checkEven(NUM)}`;

        // Убираем подсказку после 4с
        setTimeout(() => {
          document.querySelector("#info").textContent = "";
        }, 4000);
      }
    }
    // Если пользователь угадал рендерим компонент результатов
    else {
      results();
    }
  });
};
