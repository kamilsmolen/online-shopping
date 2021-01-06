import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { CartItem, CartItems, TotalQty } from "../../types/cartItems";

interface CartState {
  cartItems: CartItems;
  totalQty: TotalQty;
}

const initialState: CartState = {
  cartItems: {},
  totalQty: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;

      const uniqueId = `${cartItem.id}_${cartItem.color}_${cartItem.storage}_${cartItem.power}`;
      const isInCart = state.cartItems[uniqueId];
      const updatedCartItem = isInCart
        ? {
            ...state.cartItems[uniqueId],
            quantity: state.cartItems[uniqueId].quantity + cartItem.quantity,
          }
        : cartItem;

      state.cartItems[uniqueId] = { ...updatedCartItem };
      state.totalQty[cartItem.id] = state.totalQty[cartItem.id]
        ? state.totalQty[cartItem.id] + cartItem.quantity
        : cartItem.quantity;
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      //change item quantity
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectTotalQty = (state: RootState) => state.cart.totalQty;

export default cartSlice.reducer;
