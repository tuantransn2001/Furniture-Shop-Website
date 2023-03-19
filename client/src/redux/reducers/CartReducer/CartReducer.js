import {
  DISPLAY_CART_MODAL,
  SET_CART_LIST,
  SET_DEFAULT_CART_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
} from "~/redux/constants/CartConstants/CartConstants";
import { findIndexByKey } from "~/common/common";
const initialState = {
  cartList: [],
  currentProductDetail: {},
  isCartModalOn: false,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_CART_MODAL: {
      if (action.payload.userAction === "show") {
        state.isCartModalOn = true;
      } else {
        state.isCartModalOn = false;
      }
      return { ...state };
    }
    case SET_CART_LIST: {
      state.cartList = [...state.cartList, ...action.payload.data];

      return { ...state };
    }
    case SET_DEFAULT_CART_ITEM: {
      Object.assign(state.currentProductDetail, action.payload.product);

      return { ...state };
    }
    case UPDATE_ITEM: {
      const foundProductIndex = state.cartList.findIndex(
        (el) => el.cart_item_id === action.payload.updateData.updateItemId
      );

      const updateItem = {
        ...state.cartList[foundProductIndex],
        ...action.payload.updateData.updateItemData,
      };

      state.cartList.splice(foundProductIndex, 1, updateItem);
      state.cartList = [...state.cartList];
      return { ...state };
    }
    case UPDATE_CART_ITEM_QUANTITY: {
      const { id, quantity } = action.payload.cartItemUpdate;

      const targetCartItemUpdateIndex = findIndexByKey(
        "cart_item_id",
        id,
        state.cartList
      );
      state.cartList[targetCartItemUpdateIndex].quantity = quantity;

      state.cartList = [...state.cartList];

      return { ...state };
    }
    case DELETE_ITEM: {
      const id = action.payload.id;

      const targetIndex = state.cartList.findIndex(
        (el) => el.cart_item_id === id
      );

      state.cartList.splice(targetIndex, 1);

      state.cartList = [...state.cartList];
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default CartReducer;

// TODO: CRUD Product , set default on ShoppingBasket first render
