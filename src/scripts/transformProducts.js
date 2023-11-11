import { debounce } from "../utils/debounce.js";
import { listenToDelete } from "./removeProduct.js";

const select = document.querySelector("#sort");
select.addEventListener("change", (e) => {
  SORT = e.target.value;
  renderProducts();
  listenToDelete()
});

function handleInput(e) {
  FILTER = e.target.value;
  renderProducts();
  listenToDelete()
}

const input = document.querySelector(".products-filter__input");

input.addEventListener("input", (e) => handleInput(e));
