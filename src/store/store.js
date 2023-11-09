const STORE = {
  target: 0,
  current: 0,
  products: [
    {
      id: 0,
      name: "",
      calorie: 0,
    },
  ],
};

const dispatch = (type, payload) => {
  reducer(_, { type, payload });
};

const reducer = (state = STORE, action) => {
  switch (action.type) {
    case value:
      break;

    default:
      break;
  }
};
