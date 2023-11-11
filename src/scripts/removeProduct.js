import { removeAllProducts, removeProduct } from "../store/actions.js";

const deleteAll = document.querySelector(".products-header__button");

export function listenToDelete() {
  const deleteBtn = document.querySelectorAll(
    ".products-items-item__delete-button"
  );

  function handleClick(e, item) {
    e.preventDefault();
    const id = item.parentElement.id;
    removeProduct(id);
  }

  // Зануляем предыдущие EventListeners
  Array.from(deleteBtn).forEach((item) =>
    item.removeEventListener("click", (e) => handleClick(e, item))
  );

  //   Записываем новые EventListeners
  Array.from(deleteBtn).forEach((item) => {
    item.addEventListener("click", (e) => handleClick(e, item));
  });
}

listenToDelete();

deleteAll.addEventListener("click", (e) => {
  e.preventDefault();

  removeAllProducts();
});
