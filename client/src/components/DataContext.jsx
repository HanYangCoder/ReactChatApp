import React, { createContext, useState, useEffect } from 'react';
import io from "socket.io-client";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [room, setRoom] = useState(null);
  const socket = io.connect("http://localhost:3001");

  const storeUserData = (data) => {
    setUserData(data);
  };

  const storeRoom = (data) => {
    setRoom(data);
  };

  useEffect(() => {
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <DataContext.Provider value={{ userData, storeUserData, socket, room, storeRoom }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
