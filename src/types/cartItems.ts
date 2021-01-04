export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  weight: number;
  quantity: number;
  power?: string;
  color: string;
  storage?: string;
}
export interface CartItems {
  [key: string]: CartItem;
}
