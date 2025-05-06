import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatus } from '../../redux/simulatorSlice';
import { useSocket } from '../../context/SocketContext';
import SensorCard from '../SensorCard/SensorCard';
import SystemHealth from '../SystemHealth/SystemHealth';
import Alerts from '../Alerts/Alerts';
import DetailedChart from '../DetailedChart/DetailedChart';
import UserFlow from '../UserFlow/UserFlow';
import styles from './SensorDashboard.module.css';

const SensorDashboard = () => {
  const dispatch = useDispatch();
  const { sensors, loading } = useSelector((state) => state.simulator);
  const { connected, simulatorRunning, startSimulator, stopSimulator } = useSocket();

  useEffect(() => {
    dispatch(fetchStatus());
    const interval = setInterval(() => dispatch(fetchStatus()), 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>SensorHub</h1>
        <div>
          <button onClick={startSimulator} className={styles.start}>Start</button>
          <button onClick={stopSimulator} className={styles.stop}>Stop</button>
          <span className={simulatorRunning ? styles.active : styles.inactive}>
            {simulatorRunning ? "System Running" : "System Stopped"}
          </span>
          <span className={connected ? styles.active : styles.inactive}>
            {connected ? "Socket Connected" : "Socket Disconnected"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <>
          <div className={styles.sensorsGrid}>
            {sensors.map((sensor) => (
              <SensorCard key={sensor.name} sensor={sensor} />
            ))}
          </div>

          <div className={styles.bottomSection}>
            <SystemHealth />
            <Alerts sensors={sensors} />
          </div>
          <div className={styles.userFlowSection}>
            <UserFlow />
          </div>
          <DetailedChart />
        </>
      )}
    </div>
  );
};

export default SensorDashboard;
