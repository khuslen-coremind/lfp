import io from "socket.io-client";
import { SOCKET_URL } from "./constants/request";
import { createContext } from "react";
export const socket = io(SOCKET_URL);
export const SocketContext = createContext(socket);
