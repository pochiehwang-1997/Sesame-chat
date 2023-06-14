import React, { useEffect, useContext } from "react";
import openSocket from "socket.io-client";
import { store } from "./stateManagement/store";
import { activeChatAction } from "./stateManagement/actions";

const SOCKET_URL = "http://localhost:9000";
let socket;

const SocketService = () => {
  const {
    state: { userDetail, activeChat },
    dispatch,
  } = useContext(store);

  const setupSocket = () => {
    socket = openSocket(SOCKET_URL);
    socket.on("command", (data) => {
      if (!userDetail) return;
      if (userDetail.id !== data.receiver.id) return;
      dispatch({ type: activeChatAction, payload: data });
    });
  };
  useEffect(setupSocket, [userDetail]);
  return <></>;
};

export default SocketService;

const sendSocket = (data) => {
  socket.emit("command", {
    type: data.type,
    id: data.id,
    content: data.content,
  });
};

export const sendTestSocket = (data) => {
  socket.emit("command", data);
};
