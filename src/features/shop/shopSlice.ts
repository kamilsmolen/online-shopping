import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { Item } from "../../types/items";

import itemsJSON from "../../data/items.json";

interface ShopState {
  items: Item[];
  selectedItemId?: number;
}

const initialState: ShopState = {
  items: itemsJSON.items,
  selectedItemId: undefined,
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

export default shopSlice.reducer;
