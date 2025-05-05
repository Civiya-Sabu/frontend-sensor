import React from 'react';
import styles from './SystemHealth.module.css';

const SystemHealth = () => {
  return (
    <div className={styles.health}>
      <h2>System Health</h2>
      <div className={styles.circle}>
        <p>85%</p>
      </div>
      <p>Uptime: 99.9%</p>
    </div>
  );
};

export default SystemHealth;
