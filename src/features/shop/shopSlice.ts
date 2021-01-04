import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { Item } from "../../types/items";

interface ShopState {
  items: Item[];
  selectedItemId?: string;
}

const initialState: ShopState = {
  items: [],
  selectedItemId: undefined,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string | undefined>) => {
      state.selectedItemId = action.payload;
    },
    addItem: (state, action: PayloadAction<{ id: string; option: number }>) => {
      //change item quantity
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; option: number }>
    ) => {
      //change item quantity
    },
  },
});

export const { selectItem, addItem, removeItem } = shopSlice.actions;

export const selectAllItems = (state: RootState) => state.shop.items;

export const selectSelectedItem = (state: RootState) =>
  state.shop.items.find((item) => item.id === state.shop.selectedItemId);

export default shopSlice.reducer;
