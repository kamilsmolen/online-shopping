import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTotalQty } from "../cart/cartSlice";
import styles from "./ShopList.module.css";
import { selectAllItems, selectIsListView, selectItem } from "./shopSlice";

export function ShopList() {
  const items = useSelector(selectAllItems);

  const totalCartQty = useSelector(selectTotalQty);

  const isListView = useSelector(selectIsListView);

  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    dispatch(selectItem(id));
  };

  return isListView ? (
    <div className={styles.list}>
      {items.map((item) => (
        <div
          className={styles.listItem}
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <div className={styles.listItemName}>{item.name}</div>{" "}
          <div className={styles.listItemPrice}>$ {item.price}</div>
          <div className={styles.listItemCart}>
            {totalCartQty[item.id] ? `${totalCartQty[item.id]} added` : ""}
          </div>
        </div>
      ))}
    </div>
  ) : null;
}
