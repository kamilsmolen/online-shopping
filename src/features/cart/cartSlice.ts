import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { CartItem, CartItems, TotalOptionQty, TotalQty } from '../../types/cartItems';
import { createUniqueId, createUniqueOptionId } from './cartUtils';

interface CartState {
  cartItems: CartItems;
  totalQty: TotalQty;
  totalOptionQty: TotalOptionQty;
}

const initialState: CartState = {
  cartItems: {},
  totalQty: {},
  totalOptionQty: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;

      const uniqueId = createUniqueId(cartItem);
      const uniqueOptionId = createUniqueOptionId(cartItem);

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
      state.totalOptionQty[uniqueOptionId] = state.totalOptionQty[
        uniqueOptionId
      ]
        ? state.totalOptionQty[uniqueOptionId] + cartItem.quantity
        : cartItem.quantity;
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;

      const uniqueId = createUniqueId(cartItem);

      const uniqueOptionId = createUniqueOptionId(cartItem);

      state.cartItems[uniqueId] = {
        ...state.cartItems[uniqueId],
        quantity: state.cartItems[uniqueId].quantity - cartItem.quantity,
      };

      state.totalQty[cartItem.id] =
        state.totalQty[cartItem.id] - cartItem.quantity;
      state.totalOptionQty[uniqueOptionId] =
        state.totalOptionQty[uniqueOptionId] - cartItem.quantity;
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;

      const uniqueId = createUniqueId(cartItem);

      const { [uniqueId]: ommitedItem, ...newCartItems } = state.cartItems;

      state.cartItems = { ...newCartItems };
    },
  },
});

export const { addToCart, removeFromCart, removeItem } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectTotalQty = (state: RootState) => state.cart.totalQty;

export const selectTotalOptionQty = (state: RootState) =>
  state.cart.totalOptionQty;

export default cartSlice.reducer;
