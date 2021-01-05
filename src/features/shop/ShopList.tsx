import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllItems, selectItem } from "./shopSlice";
import styles from "./ShopList.module.css";

export function ShopList() {
  const items = useSelector(selectAllItems);

  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    dispatch(selectItem(id));
  };

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div
          className={styles.listItem}
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <div className={styles.listItemName}>{item.name}</div>{" "}
          <div className={styles.listItemPrice}>$ {item.price}</div>
          <div className={styles.listItemCart}>xx</div>
        </div>
      ))}
    </div>
  );
}
