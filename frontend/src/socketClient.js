// src/socketClient.js
import { io } from "socket.io-client";
import { BASE_URL } from ".";

let socket = null;

/**
 * Establishes (or returns existing) Socket.IO connection.
 * @param {string} userId
 * @returns {import("socket.io-client").Socket}
 */
export function connectSocket(userId) {
  if (socket && socket.connected) return socket;

  socket = io(BASE_URL, {
    transports: ["websocket"], // skip polling if possible
    withCredentials: true,
    auth: { userId }           // pass userId via auth payload
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });
  socket.on("connect_error", (err) => {
    console.warn("Socket connect_error:", err.message);
  });

  return socket;
}

/**
 * Returns the current socket instance (or null if not connected).
 * @returns {import("socket.io-client").Socket|null}
 */
export function getSocket() {
  return socket;
}

/**
 * Disconnects and resets the socket instance.
 */
export function disconnectSocket() {
  if (socket) {
    socket.off();    // remove all listeners
    socket.disconnect();
    socket = null;
  }
}
