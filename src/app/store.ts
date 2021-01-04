import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
