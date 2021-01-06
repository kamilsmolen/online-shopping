import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Option } from '../../types/items';
import styles from './Details.module.css';
import { OptionDetails } from './OptionDetails';
import { selectIsDetailsView, selectItem, selectSelectedItem } from './shopSlice';

export function Details() {
  const item = useSelector(selectSelectedItem);

  const isDetailsView = useSelector(selectIsDetailsView);

  const dispatch = useDispatch();

  const handleReturnClick = () => {
    dispatch(selectItem(undefined));
  };

  const renderOptions = (options: Option[]) => {
    return (
      <div>
        {options.map((option, key) => (
          <div key={key}>
            <OptionDetails option={option} item={item} optionId={key} />
          </div>
        ))}
      </div>
    );
  };

  return item && isDetailsView ? (
    <div className={styles.detailsView}>
      <div className={styles.header}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.brand}>by {item.brand}</div>
      </div>
      <div className={styles.otherDetails}>
        <div>price: $ {item.price}</div>
        <div>weight: {item.weight} kg</div>
      </div>
      <div>
        <div className={styles.optionsTitle}>Options:</div>
        {renderOptions(item.options)}
      </div>
      <div onClick={handleReturnClick} className={styles.return}>
        Return
      </div>
    </div>
  ) : null;
}
