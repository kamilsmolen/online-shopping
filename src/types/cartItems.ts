export interface CartItem {
  id: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
  power?: number;
  color: string;
  storage?: string;
  optionId: number;
}
export interface CartItems {
  [key: string]: CartItem;
}

export interface TotalQty {
  [key: string]: number;
}
