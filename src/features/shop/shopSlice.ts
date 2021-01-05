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
    addItemToStorage: (
      state,
      action: PayloadAction<{ id: number; option: number }>
    ) => {
      //change item quantity
    },
    removeItemFromStorage: (
      state,
      action: PayloadAction<{ id: string; option: number }>
    ) => {
      //change item quantity
    },
  },
});

export const {
  selectItem,
  addItemToStorage,
  removeItemFromStorage,
} = shopSlice.actions;

export const selectAllItems = (state: RootState) => state.shop.items;

export const selectSelectedItem = (state: RootState) =>
  state.shop.items.find((item) => item.id === state.shop.selectedItemId);

export const selectIsListView = (state: RootState) => state.shop.isListView;

export const selectIsDetailsView = (state: RootState) =>
  state.shop.isDetailsView;

export default shopSlice.reducer;
