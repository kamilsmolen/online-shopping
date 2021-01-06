import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faMinusCircle, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../types/cartItems';
import { addItemToStorage, removeItemFromStorage, selectAllItems } from '../shop/shopSlice';
import styles from './Cart.module.css';
import {
    addToCart, removeFromCart, removeItem, selectCartItems, selectTotalOptionQty
} from './cartSlice';
import { createUniqueOptionId } from './cartUtils';

export function Cart() {
  const storageItems = useSelector(selectAllItems);

  const totalOptionQty = useSelector(selectTotalOptionQty);

  const cartItems = useSelector(selectCartItems);

  const cartItemsSortedArray = Object.values(cartItems).sort(
    (a, b) => b.id - a.id
  );

  const isIncreaseEnabled = (cartItem: CartItem) =>
    totalOptionQty[createUniqueOptionId(cartItem)] <
    storageItems[cartItem.id].options[cartItem.optionId].quantity;

  const isDecreaseEnabled = (cartItem: CartItem) =>
    totalOptionQty[createUniqueOptionId(cartItem)] > 0;

  const dispatch = useDispatch();

  const handleIncrease = (cartItem: CartItem) => {
    if (!isIncreaseEnabled) return;

    dispatch(
      removeItemFromStorage({
        id: cartItem.id,
        option: cartItem.optionId,
        quantity: 1,
      })
    );

    dispatch(addToCart({ ...cartItem, quantity: 1 }));
  };

  const handleDecrease = (cartItem: CartItem) => {
    if (!isDecreaseEnabled) return;

    dispatch(
      addItemToStorage({
        id: cartItem.id,
        option: cartItem.optionId,
        quantity: 1,
      })
    );

    dispatch(removeFromCart({ ...cartItem, quantity: 1 }));
  };

  const handleRemove = (cartItem: CartItem) => {
    dispatch(
      addItemToStorage({
        id: cartItem.id,
        option: cartItem.optionId,
        quantity: cartItem.quantity,
      })
    );

    dispatch(removeFromCart({ ...cartItem, quantity: cartItem.quantity }));
    dispatch(removeItem({ ...cartItem }));
  };

  return (
    <div className={styles.cart}>
      {cartItemsSortedArray.map((item) => (
        <div className={styles.cartItem} onClick={() => handleRemove(item)}>
          <div className={styles.removeSection}>
            <div>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.itemDetails}>
            <div>{`price: $ ${item.price}`}</div>
            <div>{`weight: ${item.weight} kg`}</div>
            <div>{`color: ${item.color}`}</div>
            <div>{item.power && `power: ${item.power} W`}</div>
            <div>{item.storage && `storage: ${item.storage} GB`}</div>
          </div>
          <div className={styles.qtySection}>
            <FontAwesomeIcon
              className={
                isDecreaseEnabled(item)
                  ? styles.qtySectionIcon
                  : styles.qtySectionIconDisabled
              }
              icon={faMinusCircle}
              onClick={() => handleDecrease(item)}
            />

            <div>{item.quantity}</div>
            <FontAwesomeIcon
              className={
                isIncreaseEnabled(item)
                  ? styles.qtySectionIcon
                  : styles.qtySectionIconDisabled
              }
              icon={faPlusCircle}
              onClick={() => handleIncrease(item)}
            />
          </div>
        </div>
      ))}
      <div className={styles.return}>Return</div>
    </div>
  );
}
