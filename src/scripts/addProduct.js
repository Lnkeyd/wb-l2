import { addProduct } from "../store/actions.js";

const addButton = document.querySelector(".current-add-product");
const submitForm = document.querySelector(".modal-form");
const cancel = document.querySelector(".modal-cancel");
const titleErrEL = document.querySelector(".modal-title-error");
const calErrEL = document.querySelector(".modal-cal-error");

const inputTitle = document.querySelector(".modal-input-title");
const inputCal = document.querySelector(".modal-input-cal");

const product = {
  name: "",
  calorie: 0,
};

inputCal.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
  product.calorie = Number(e.target.value);
});

inputTitle.addEventListener("input", (e) => {
  product.name = e.target.value;
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.remove("modal-active");
});

function isValid(obj) {
  let flag = true;
  if (!obj.name) {
    titleErrEL.textContent = "Укажите название";
    flag = false;
  } else {
    //   Обнуляем ошибки если всё валидно
    titleErrEL.textContent = "";
  }

  if (obj.calorie <= 0) {
    calErrEL.textContent = "Укажите калории";
    flag = false;
  } else {
    //   Обнуляем ошибки если всё валидно
    calErrEL.textContent = "";
  }

  return flag;
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.add("modal-active");
});

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isValid(product)) return;

  addProduct(product);
  
  document.body.classList.remove("modal-active");
  
  inputTitle.value = "";
  inputCal.value = "";
});
