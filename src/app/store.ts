import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import shopReducer from '../features/shop/shopSlice';

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
