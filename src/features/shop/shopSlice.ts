import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface Option {
  quantity: number;
  power?: number[];
  color: string[] | string;
  storage?: string[];
}

interface Item {
  id: string;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;
  options: Option[];
}

interface GridState {
  items: Item[];
  selectedItemId?: string;
}

const initialState: GridState = {
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

export const { selectItem } = shopSlice.actions;

export const selectAllItems = (state: RootState) => state.shop.items;

export const selectSelectedItem = (state: RootState) =>
  state.shop.items.find((item) => item.id === state.shop.selectedItemId);

export default shopSlice.reducer;
