export const initialState = {
  cart: [],
  total: 0,
};
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.id == action.payload.id,
      );
      if (existingItem) {
        //update
        const updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
        return {
          ...state,
          cart: updatedCart,
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
    }
    case "REMOVE_FROM_CART": {
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    }
    case "INCREASE_QUANTITY": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      const item = state.cart.find((item) => item.id === action.payload.id);
      return {
        ...state,
        cart: updatedCart,
        total: state.total + item.price,
      };
    }
    case "DECREASE_QUANTITY": {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity == 1) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.id !== action.payload.id),
          total: state.total - item.price,
        };
      }
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      return {
        ...state,
        cart: updatedCart,
        total: state.total - item.price,
      };
    }
    case "CLEAR_CART": {
      return initialState;
    }
    default:
      return state;
  }
};
