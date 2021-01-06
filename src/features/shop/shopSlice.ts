import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import itemsJSON from '../../data/items.json';
import { Item } from '../../types/items';

interface ShopState {
  items: Item[];
  selectedItemId?: number;
  isListView: boolean;
  isDetailsView: boolean;
}

const initialState: ShopState = {
  items: itemsJSON.items,
  selectedItemId: undefined,
  isListView: true,
  isDetailsView: false,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<number | undefined>) => {
      state.selectedItemId = action.payload;
    },
    removeItemFromStorage: (
      state,
      action: PayloadAction<{ id: number; option: number; quantity: number }>
    ) => {
      state.items = state.items.map((item) => {
        if (item.id !== action.payload.id) return { ...item };
        const returnOptions = item.options.map((option, index) =>
          index === action.payload.option
            ? { ...option, quantity: option.quantity - action.payload.quantity }
            : { ...option }
        );
        return { ...item, options: returnOptions };
      });
    },
    addItemToStorage: (
      state,
      action: PayloadAction<{ id: number; option: number; quantity: number }>
    ) => {
      state.items = state.items.map((item) => {
        if (item.id !== action.payload.id) return { ...item };
        const returnOptions = item.options.map((option, index) =>
          index === action.payload.option
            ? { ...option, quantity: option.quantity + action.payload.quantity }
            : { ...option }
        );
        return { ...item, options: returnOptions };
      });
    },
    changeIsListView: (state, action: PayloadAction<boolean>) => {
      state.isListView = action.payload;
    },
    changeIsDetailsView: (state, action: PayloadAction<boolean>) => {
      state.isDetailsView = action.payload;
    },
  },
});

export const {
  selectItem,
  removeItemFromStorage,
  addItemToStorage,
  changeIsListView,
  changeIsDetailsView,
} = shopSlice.actions;

export const selectAllItems = (state: RootState) => state.shop.items;

export const selectSelectedItem = (state: RootState) =>
  state.shop.items.find((item) => item.id === state.shop.selectedItemId);

export const selectIsListView = (state: RootState) => state.shop.isListView;

export const selectIsDetailsView = (state: RootState) =>
  state.shop.isDetailsView;

export default shopSlice.reducer;
