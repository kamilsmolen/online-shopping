import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeIsCartView, selectTotalQty } from '../cart/cartSlice';
import styles from './ShopList.module.css';
import {
    changeIsDetailsView, changeIsListView, selectAllItems, selectIsListView, selectItem
} from './shopSlice';

export function ShopList() {
  const items = useSelector(selectAllItems);

  const totalCartQty = useSelector(selectTotalQty);

  const isListView = useSelector(selectIsListView);

  const dispatch = useDispatch();

  const handleItemClick = (id: number) => {
    dispatch(selectItem(id));
    dispatch(changeIsListView(false));
    dispatch(changeIsDetailsView(true));
  };

  const handleCheckoutClick = () => {
    dispatch(changeIsCartView(true));
    dispatch(changeIsListView(false));
  };

  return isListView ? (
    <div className={styles.list}>
      {items.map((item) => (
        <div
          className={styles.listItem}
          key={item.id}
          onClick={() => handleItemClick(item.id)}
        >
          <div className={styles.listItemName}>{item.name}</div>{" "}
          <div className={styles.listItemPrice}>$ {item.price}</div>
          <div className={styles.listItemCart}>
            {totalCartQty[item.id] && totalCartQty[item.id] > 0
              ? `${totalCartQty[item.id]} added`
              : ""}
          </div>
        </div>
      ))}
      <div onClick={handleCheckoutClick} className={styles.checkoutButton}>
        Checkout
      </div>
    </div>
  ) : null;
}
