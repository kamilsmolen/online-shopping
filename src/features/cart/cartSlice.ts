import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { CartItems, CartItem } from "../../types/cartItems";

interface CartState {
  cartItems: CartItems;
}

const initialState: CartState = {
  cartItems: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      //change item quantity
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      //change item quantity
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
