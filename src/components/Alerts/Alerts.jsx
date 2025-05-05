import React from 'react';
import styles from './Alerts.module.css';

const Alerts = ({ sensors }) => {
  const alerts = [];

  sensors.forEach(sensor => {
    if (sensor.name === 'pressure' && sensor.currentValue > 1012) {
      alerts.push('High pressure detected!');
    }
    if (sensor.name === 'cpuLoad' && sensor.currentValue > 70) {
      alerts.push('CPU Load Critical!');
    }
  });

  return (
    <div className={styles.alerts}>
      <h2>Active Alerts</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      ) : (
        <p>No active alerts</p>
      )}
    </div>
  );
};

export default Alerts;
