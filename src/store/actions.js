import { listenToDelete } from "../scripts/removeProduct.js";
import { uuid } from "../utils/uuid.js";
import { dispatch } from "./store.js";

export const addProduct = (obj) => {
  const product = { ...obj, id: uuid() };
  dispatch("addProduct", product);
  renderProducts()
  listenToDelete()
  updateCanvas()
  setTimeout(() => checkAlert(), 400)
};

export const removeProduct = (id) => {
  dispatch("removeProduct", id);
  // TODO: тут и везде сделать апдейт UI
  // В том числе и графика
  renderProducts()
  listenToDelete()
  updateCanvas()
};

export const removeAllProducts = () => {
  dispatch("removeAllProducts")

  renderProducts()
}

export const modifyGoal = (target) => {
  dispatch("modifyGoal", target);
  checkAlert()
};
