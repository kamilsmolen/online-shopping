import React, { useState } from 'react';

import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Option } from '../../types/items';
import styles from './OptionDetails.module.css';

interface OptionDetailsProps {
  option: Option;
  key: number | string;
  available?: boolean;
}

export function OptionDetails(props: OptionDetailsProps) {
  const [showAdded, setShowAdded] = useState<boolean>(false);

  const isItemAvailable = props.available && props.option.quantity > 0;

  const handleAddingToCart = () => {
    if (!isItemAvailable) return;
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  const renderMultiChoice = (values: (string | number)[]) => (
    <div>
      <select>
        {values.map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );

  const renderColour = () => (
    <div>
      <div className={styles.label}>colour:</div>
      <div>
        {Array.isArray(props.option.color)
          ? renderMultiChoice(props.option.color)
          : props.option.color}
      </div>
    </div>
  );

  const renderStorage = () =>
    props.option.storage && (
      <div>
        <div className={styles.label}>storage:</div>
        {renderMultiChoice(props.option.storage)}
      </div>
    );

  const renderPower = () =>
    props.option.power && (
      <div>
        <div className={styles.label}>power:</div>
        {renderMultiChoice(props.option.power)}
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
    <div className={styles.option} key={props.key}>
      {renderColour()}
      {renderStorage()}
      {renderPower()}
      {renderQty()}
      {renderCartSection()}
    </div>
  );
}
