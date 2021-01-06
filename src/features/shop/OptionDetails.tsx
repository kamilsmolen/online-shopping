import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Item, Option } from '../../types/items';
import { addToCart } from '../cart/cartSlice';
import styles from './OptionDetails.module.css';
import { removeItemFromStorage } from './shopSlice';

interface OptionDetailsProps {
  option: Option;
  optionId?: number;
  item?: Item;
}

export function OptionDetails(props: OptionDetailsProps) {
  const [showAdded, setShowAdded] = useState<boolean>(false);

  const [color, setColor] = useState<string>(
    props.option
      ? Array.isArray(props.option.color)
        ? props.option.color[0]
        : props.option.color
      : ""
  );
  const [power, setPower] = useState<number | undefined>(
    props.option && props.option.power ? props.option.power[0] : undefined
  );
  const [storage, setStorage] = useState<string | undefined>(
    props.option && props.option.storage ? props.option.storage[0] : undefined
  );

  const isItemAvailable =
    props.item && props.item.available && props.option.quantity > 0;

  const dispatch = useDispatch();

  const handleAddingToCart = () => {
    if (
      !isItemAvailable ||
      props.item === undefined ||
      props.optionId === undefined
    )
      return;

    dispatch(
      removeItemFromStorage({
        id: props.item.id,
        option: props.optionId,
        quantity: 1,
      })
    );

    dispatch(
      addToCart({
        id: props.item.id,
        name: props.item.name,
        price: Number(props.item.price),
        weight: props.item.weight,
        quantity: 1,
        power: power,
        color: color,
        storage: storage,
        optionId: props.optionId,
      })
    );

    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1000);
  };

  const renderColour = () => (
    <div>
      <div className={styles.label}>colour:</div>
      <div>
        {Array.isArray(props.option.color) ? (
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setColor(e.target.value)
            }
          >
            {props.option.color.map((e) => (
              <option value={e} key={e} onClick={() => setColor(e)}>
                {e}
              </option>
            ))}
          </select>
        ) : (
          props.option.color
        )}
      </div>
    </div>
  );

  const renderStorage = () =>
    props.option.storage && (
      <div>
        <div className={styles.label}>storage:</div>
        {
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setStorage(e.target.value)
            }
          >
            {props.option.storage.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        }
      </div>
    );

  const renderPower = () =>
    props.option.power && (
      <div>
        <div className={styles.label}>power:</div>
        {
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPower(Number(e.target.value))
            }
          >
            {props.option.power.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </select>
        }
      </div>
    );

  const renderQty = () => (
    <div>
      <div className={styles.label}>qty:</div>
      <div>{props.option.quantity}</div>
    </div>
  );

  const renderCartSection = () => (
    <div
      className={isItemAvailable ? styles.addToCart : styles.addToCartDisabled}
      onClick={handleAddingToCart}
    >
      <FontAwesomeIcon icon={faCartPlus} />
      {showAdded && (
        <div className={styles.addedMessage}>
          <FontAwesomeIcon icon={faCheck} /> Added!
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.option}>
      {renderColour()}
      {renderStorage()}
      {renderPower()}
      {renderQty()}
      {renderCartSection()}
    </div>
  );
}
