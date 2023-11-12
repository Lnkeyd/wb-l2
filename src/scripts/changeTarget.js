import { modifyGoal } from "../store/actions.js";

let opened = false;
let newTarget = 0;

const button = document.querySelector(".target-change");
const value = document.querySelector(".target-value");

button.addEventListener("click", (e) => {
  e.preventDefault();

  // Если первый раз клик по кнопке = засеттить новое значение
  if (!opened) {
    const input = document.createElement("input");
    input.type = "text";
    input.style.width = "50px";

    input.addEventListener("input", (e) => {
      newTarget = e.target.value;
    });
    value.textContent = "";
    value.append(input);
  }
  //  Если второй раз клик по кнопке = подтвердить
  else {
    value.innerHTML = `${newTarget} кал`;
    modifyGoal(Number(newTarget));
  }

  opened = !opened;
});
