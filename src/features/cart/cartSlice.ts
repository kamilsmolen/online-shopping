import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { CartItem, CartItems, TotalQty } from '../../types/cartItems';
import { createUniqueId, createUniqueOptionId } from './cartUtils';

interface CartState {
  cartItems: CartItems;
  totalQty: TotalQty;
  isCartView: boolean;
}

const initialState: CartState = {
  cartItems: {},
  totalQty: {},
  isCartView: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;

      const uniqueId = createUniqueId(cartItem);

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
      const cartItem = action.payload;

      const uniqueId = createUniqueId(cartItem);

      state.cartItems[uniqueId] = {
        ...state.cartItems[uniqueId],
        quantity: state.cartItems[uniqueId].quantity - cartItem.quantity,
      };

      state.totalQty[cartItem.id] =
        state.totalQty[cartItem.id] - cartItem.quantity;
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;

      const uniqueId = createUniqueId(cartItem);

      const { [uniqueId]: ommitedItem, ...newCartItems } = state.cartItems;

      state.cartItems = { ...newCartItems };
    },
    changeIsCartView: (state, action: PayloadAction<boolean>) => {
      state.isCartView = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeItem,
  changeIsCartView,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectTotalQty = (state: RootState) => state.cart.totalQty;

export const selectIsCartView = (state: RootState) => state.cart.isCartView;

export default cartSlice.reducer;
