import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faMinusCircle, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CartItem } from '../../types/cartItems';
import {
    addItemToStorage, changeIsListView, removeItemFromStorage, selectAllItems
} from '../shop/shopSlice';
import styles from './Cart.module.css';
import {
    addToCart, changeIsCartView, removeFromCart, removeItem, selectCartItems, selectIsCartView
} from './cartSlice';
import { countTotalPrice, countTotalWeight } from './cartUtils';

export function Cart() {
  const storageItems = useSelector(selectAllItems);

  const cartItems = useSelector(selectCartItems);

  const isCartView = useSelector(selectIsCartView);

  const cartItemsSortedArray = Object.values(cartItems).sort(
    (a, b) => b.id - a.id
  );

  const isIncreaseEnabled = (cartItem: CartItem) => {
    const storageItem = storageItems.find((item) => item.id === cartItem.id);
    return storageItem && storageItem.options[cartItem.optionId].quantity > 0;
  };

  const isDecreaseEnabled = (cartItem: CartItem) => cartItem.quantity > 1;

  const dispatch = useDispatch();

  const handleIncreaseClick = (cartItem: CartItem) => {
    if (!isIncreaseEnabled(cartItem)) return;

    dispatch(
      removeItemFromStorage({
        id: cartItem.id,
        option: cartItem.optionId,
        quantity: 1,
      })
    );

    dispatch(addToCart({ ...cartItem, quantity: 1 }));
  };

  const handleDecreaseClick = (cartItem: CartItem) => {
    if (!isDecreaseEnabled(cartItem)) return;

    dispatch(
      addItemToStorage({
        id: cartItem.id,
        option: cartItem.optionId,
        quantity: 1,
      })
    );

    dispatch(removeFromCart({ ...cartItem, quantity: 1 }));
  };

  const handleRemoveClick = (cartItem: CartItem) => {
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

  const handleReturnClick = () => {
    dispatch(changeIsCartView(false));
    dispatch(changeIsListView(true));
  };

  const renderInfoSection = (item: CartItem) => (
    <div>
      <div className={styles.itemName}>{item.name}</div>
      <div className={styles.itemDetails}>
        <div>{`price: $ ${item.price}`}</div>
        <div>{`weight: ${item.weight} kg`}</div>
        <div>{`color: ${item.color}`}</div>
        <div>{item.power && `power: ${item.power} W`}</div>
        <div>{item.storage && `storage: ${item.storage} GB`}</div>
      </div>
    </div>
  );

  const renderQtySection = (item: CartItem) => (
    <div className={styles.qtySection}>
      <FontAwesomeIcon
        className={
          isDecreaseEnabled(item)
            ? styles.qtySectionIcon
            : styles.qtySectionIconDisabled
        }
        icon={faMinusCircle}
        onClick={() => handleDecreaseClick(item)}
      />

      <div>{item.quantity}</div>
      <FontAwesomeIcon
        className={
          isIncreaseEnabled(item)
            ? styles.qtySectionIcon
            : styles.qtySectionIconDisabled
        }
        icon={faPlusCircle}
        onClick={() => handleIncreaseClick(item)}
      />
    </div>
  );

  const renderSummarySection = () => (
    <div className={styles.summarySection}>
      <div className={styles.summaryTitle}>{`Total:`}</div>
      <div>{`weight: ${countTotalWeight(cartItemsSortedArray)} kg`}</div>
      <div>{`price: $ ${countTotalPrice(cartItemsSortedArray)}`}</div>
    </div>
  );

  const renderRemoveSection = (item: CartItem) => (
    <div
      onClick={() => handleRemoveClick(item)}
      className={styles.removeSection}
    >
      <div>
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    </div>
  );

  return isCartView ? (
    <div className={styles.cart}>
      {cartItemsSortedArray.map((item, key) => (
        <div className={styles.cartItem} key={key}>
          {renderRemoveSection(item)}
          {renderInfoSection(item)}
          {renderQtySection(item)}
        </div>
      ))}
      {renderSummarySection()}
      <div onClick={handleReturnClick} className={styles.returnButton}>
        Return
      </div>
    </div>
  ) : null;
}
