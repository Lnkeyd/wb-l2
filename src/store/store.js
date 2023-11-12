export const dispatch = (type, payload) => {
  const newState = reducer(STORE, { type, payload });

  STORE = { ...newState };
  pushToLS(STORE);
};

const reducer = (state = STORE, action) => {
  let arr = state.products;
  let current;

  switch (action.type) {
    case "modifyGoal":
      return { ...state, target: action.payload };
    case "addProduct":
      current = state.current + action.payload.calorie;
      updateCurrent(current);
      return {
        ...state,
        current,
        products: [...arr, action.payload],
      };
    case "removeProduct":
      // находим нужный элемент
      const item = arr.find((item) => item.id === action.payload);
      if (!item) return console.error("Нет такого продукта");

      current = state.current - item.calorie;
      arr = arr.filter((item) => item.id !== action.payload);

      updateCurrent(current);
      return {
        ...state,
        current,
        products: [...arr],
      };
    case "removeAllProducts":
      updateCurrent(0);
      return {
        ...state,
        current: 0,
        products: [],
      };
    default:
      return state;
  }
};
