import React from 'react';
import styles from './SensorCard.module.css';

const SensorCard = ({ sensor }) => {
  const getStatus = (name, value) => {
    if (name === 'pressure' && value > 1012) return 'warning';
    if (name === 'cpuLoad' && value > 70) return 'critical';
    return 'normal';
  };

  const status = getStatus(sensor.name, sensor.currentValue);

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <h3>{sensor.name.toUpperCase()}</h3>
      <p className={styles.value}>{sensor.currentValue} {sensor.unit}</p>
      <span className={styles.status}>{status}</span>
    </div>
  );
};

export default SensorCard;
