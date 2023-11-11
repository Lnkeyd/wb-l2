import { listenToDelete } from "../scripts/removeProduct.js";
import { uuid } from "../utils/uuid.js";
import { dispatch } from "./store.js";

export const addProduct = (obj) => {
  const product = { ...obj, id: uuid() };
  dispatch("addProduct", product);
  renderProducts()
  listenToDelete()
};

export const removeProduct = (id) => {
  dispatch("removeProduct", id);
  console.log("HERE")
  // TODO: тут и везде сделать апдейт UI
  // В том числе и графика
  renderProducts()
  listenToDelete()
};

export const removeAllProducts = () => {
  dispatch("removeAllProducts")

  renderProducts()
}

export const modifyGoal = (target) => {
  dispatch("modifyGoal", target);
};
