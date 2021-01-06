import { CartItem } from '../../types/cartItems';

export const createUniqueId = (cartItem: CartItem) =>
  `${cartItem.id}_${cartItem.color}_${cartItem.storage}_${cartItem.power}`;

export const createUniqueOptionId = (cartItem: CartItem) =>
  `${cartItem.id}_${cartItem.optionId}`;

export const countTotalPrice = (cartItemsArray: CartItem[]) =>
  cartItemsArray
    .reduce((a, b) => a + Number(b.quantity) * Number(b.price), 0)
    .toFixed(2);

export const countTotalWeight = (cartItemsArray: CartItem[]) =>
  cartItemsArray
    .reduce((a, b) => a + Number(b.quantity) * Number(b.weight), 0)
    .toFixed(2);
