import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [simulatorRunning, setSimulatorRunning] = useState(false);

  useEffect(() => {
    // Create socket connection to backend
    const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:8010';
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    // Set up event listeners
    newSocket.on('connect', () => {
      console.log('Socket connected!');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected!');
      setConnected(false);
    });
    
    newSocket.on('simulator-status', (status) => {
      setSimulatorRunning(status.running);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Convenience methods for controlling the simulator
  const startSimulator = () => {
    if (socket) {
      socket.emit('start-simulator');
    }
  };

  const stopSimulator = () => {
    if (socket) {
      socket.emit('stop-simulator');
    }
  };

  return (
    <SocketContext.Provider 
      value={{ 
        socket, 
        connected, 
        lastUpdate, 
        setLastUpdate, 
        simulatorRunning,
        startSimulator,
        stopSimulator
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};