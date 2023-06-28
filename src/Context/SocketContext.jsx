import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const apiEndpoint = import.meta.env.VITE_API_URL;

export function SocketProvider({ jwt, user, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!jwt && !user) return;
    const newSocket = io("http://localhost:3003", { query: { jwt } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [jwt]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
