export interface Option {
  quantity: number;
  power?: number[];
  color: string[] | string;
  storage?: string[];
}

export interface Item {
  id: string;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;
  options: Option[];
}
