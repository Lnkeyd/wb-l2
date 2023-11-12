let INITIAL_STATE = {
  target: 0,
  current: 0,
  products: [],
};

let FILTER = "";
// SORTED используется вместо основного массива для манипуляции 
// фильтрами и сортировками и отображении этих выходных данных
let SORTED = [];
let SORT = "";

// Берём стейт из LS или если там ничего нет, то из INITIAL_STATE
let STORE = getFromLS() || JSON.parse(JSON.stringify(INITIAL_STATE));
updateUI(STORE.target, STORE.current);

function getFromLS() {
  const LS = JSON.parse(localStorage.getItem("calc-calories"));
  if (!LS) return null;

  SORTED = JSON.parse(JSON.stringify(LS.products));

  return LS;
}

function pushToLS(obj) {
  localStorage.setItem("calc-calories", JSON.stringify(obj));
}

// Update UI
// Целевые показатели
function updateTarget(value) {
  document.querySelector(".target-value").textContent = `${value} кал`;
}

// Текущие показатели
function updateCurrent(value) {
  document.querySelector(".current-value").textContent = `${value} кал`;
}

// Обновить график
// Справочный ресурс по теме:
// https://www.youtube.com/watch?v=A5ERsm08cf8&ab_channel=BananaCoding
function updateCanvas() {
  const canvas = document.querySelector("#canvas");
  const container = document.querySelector(".canvas-container");
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  const width = (canvas.width = container.offsetWidth);
  const heigth = (canvas.height = container.offsetHeight);

  const ctx = canvas.getContext("2d");

  // Очищаем canvas перед каждым вызовом
  ctx.clearRect(0, 0, width, heigth);

  const data = JSON.parse(JSON.stringify(STORE.products));
  if (!data.length) return;

  const calories = data.map((item) => item.calorie);
  const max = Math.max(...calories);
  // Для скейлинга данных по максимальному значению
  // (чтобы значения выше canvas height влазили в canvas)
  const k = (heigth / max) * 0.9;

  const startValue = heigth - k * data[0].calorie;
  // Скейлинг данных по оси X
  // В зависимости от длины данных
  const distance = width / data.length;

  const startPoint = 0;

  ctx.beginPath();

  ctx.moveTo(startPoint, startValue);

  data.forEach((item, index) => {
    const text = `${item.name}: ${item.calorie} кал`;
    ctx.font = "600 16px Montserrat";

    // Для первого продукта делаем немного другую точку
    // И положение текста
    if (index === 0) {
      ctx.fillRect(0, heigth - k * item.calorie - 5, 10, 10);
      ctx.fillText(text, 0, heigth - k * item.calorie + 25);
      return;
    }

    const newDistance = startPoint + distance * (index + 1);
    // Соединяем линии и рисуем точку
    ctx.lineTo(newDistance, heigth - k * item.calorie);
    ctx.fillRect(newDistance - 5.5, heigth - k * item.calorie - 5, 10, 10);

    ctx.fillText(
      text,
      newDistance - text.length * 9.5,
      heigth - k * item.calorie - 10
    );
  });
  ctx.stroke();
  ctx.closePath();
}

// Рендер продуктов
function renderProducts() {
  let filtered;
  const arr = JSON.parse(JSON.stringify(STORE.products));

  // Назначаем активную сортировку
  if (SORT === "increase") {
    SORTED = arr.sort((a, b) => a.calorie - b.calorie);
  } else if (SORT === "decrease") {
    SORTED = arr.sort((a, b) => b.calorie - a.calorie);
  } else {
    SORTED = arr;
  }

  // Назначаем активный фильтр
  if (FILTER === "") {
    filtered = SORTED;
  } else {
    filtered = SORTED.filter((item) =>
      item.name.toLowerCase().startsWith(FILTER.toLowerCase())
    );
  }

  const productContainer = document.querySelector(".products-items");
  // Зануляем значения перед каждым рендером
  productContainer.innerHTML = "";

  filtered.map((item) => {
    const product = document.createElement("div");
    product.classList.add("products-items-item");
    product.classList.add("container");
    product.id = item.id;

    product.innerHTML = `
            <div class="products-items-item__title">${item.name}</div>
            <div class="products-items-item__value">${item.calorie} кал</div>
            <button class="products-items-item__delete-button">Удалить</button>
        `;

    productContainer.append(product);
  });
}

// Предупреждение при превышении дневного лимита
function checkAlert() {
  if (STORE.current > STORE.target)
    alert('Вы превысили дневной лимит калорий!')
}

// Начальный апдейт при первом запуске приложения
function updateUI(target, current) {
  updateTarget(target);
  updateCurrent(current);
  renderProducts();
  updateCanvas();
}
