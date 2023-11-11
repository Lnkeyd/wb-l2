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

function updateCanvas() {}

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

function updateUI(target, current) {
  updateTarget(target);
  updateCurrent(current);
  // updateCanvas(products)
  renderProducts();
}
