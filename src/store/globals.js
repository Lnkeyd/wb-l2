let INITIAL_STATE = {
  target: 0,
  current: 0,
  products: [],
};

let FILTER = "";
let SORTED = [];
let SORT = "";
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

  console.log(k);

  const startValue = heigth - k * data[0].calorie;
  const distance = width / data.length;

  const startPoint = 0;

  ctx.beginPath();

  ctx.moveTo(startPoint, startValue);

  data.forEach((item, index) => {
    const text = `${item.name}: ${item.calorie} кал`;
    ctx.font = "600 16px Montserrat";

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

    // const button = document.createElement("button");
    // button.classList.add("products-items-item__delete-button");

    // button.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   const id = item.parentElement.id;
    //   removeProduct(id);
    // });

    productContainer.append(product);
  });
}

function checkAlert() {
  if (STORE.current > STORE.target)
    alert('Вы превысили дневной лимит калорий!')
}

function updateUI(target, current) {
  updateTarget(target);
  updateCurrent(current);
  // updateCanvas(products)
  renderProducts();
  updateCanvas();
}
