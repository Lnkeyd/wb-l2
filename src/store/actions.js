import { listenToDelete } from "../scripts/removeProduct.js";
import { uuid } from "../utils/uuid.js";
import { dispatch } from "./store.js";

// Добавить продукт
export const addProduct = (obj) => {
  const product = { ...obj, id: uuid() };
  dispatch("addProduct", product);
  // тут и везде апдейт UI
  // В том числе и графика
  renderProducts()
  listenToDelete()
  updateCanvas()
  // Даём форме время закрыться
  setTimeout(() => checkAlert(), 400)
};

// Удалить продукт
export const removeProduct = (id) => {
  dispatch("removeProduct", id);

  renderProducts()
  listenToDelete()
  updateCanvas()
};

// Удалить все продукты
export const removeAllProducts = () => {
  dispatch("removeAllProducts")

  renderProducts()
}

// При изменении целевых показателей показываем
// предупреждение, если лимит уже превышен
export const modifyGoal = (target) => {
  dispatch("modifyGoal", target);
  checkAlert()
};
