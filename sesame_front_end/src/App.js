import React, { useEffect, useState, useContext } from "react";
import { store } from "./stateManagement/store";
import { activeChatAction, userDetailAction } from "./stateManagement/actions";
import {sendTestSocket} from "./socketService";

const SimpleMessage = (props) => {
  const [name, setName] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { dispatch } = useContext(store);

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch({ type: userDetailAction, payload: name });
    setShowMessage(true);
  };

  return (
    <>
      {!showMessage ? (
        <div>
          <h3>Hello there, Please Enter your name</h3>
          <form onSubmit={onsubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">submit</button>
          </form>
        </div>
      ) : (
        <MessageInterface />
      )}
    </>
  );
};

const MessageInterface = (props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState("");
  const {
    state: { userDetail, activeChat },
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (name !== userDetail) {
      setName(userDetail);
    }
    if (activeChat) {
      // If someone send message to this user
      // activeChat will be changed to the message
      // We set activeChat to null again
      setMessages([...messages, activeChat]);
      dispatch({ type: activeChatAction, payload: null });
    }
  }, [userDetail, activeChat]);

  const submit = (e) => {
    e.preventDefault();
    let data = {
      sender: name,
      receiver,
      message,
    };
    setMessages([...messages, data]);
    sendTestSocket(data);
  };

  return (
    <div>
      <h2>Hello {name}</h2>
      <form onSubmit={submit}>
        <input
          value={receiver}
          placeholder="Receiver"
          onChange={(e) => setReceiver(e.target.value)}
        />
        <br />
        <textarea
          placeholder="start typing message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">send</button>
      </form>

      {messages.length === 0 ? (
        <div>No message yet</div>
      ) : (
        messages.map((item, index) => {
          return (
            <div key={index}>
              <b>{item.message}</b>
              <br />
              <small>{item.sender}</small>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SimpleMessage;