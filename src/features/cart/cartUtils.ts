import { CartItem } from '../../types/cartItems';

export const createUniqueId = (cartItem: CartItem) =>
  `${cartItem.id}_${cartItem.color}_${cartItem.storage}_${cartItem.power}`;

export const createUniqueOptionId = (cartItem: CartItem) =>
  `${cartItem.id}_${cartItem.optionId}`;
