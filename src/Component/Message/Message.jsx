
import React from "react";
import { auth } from "../firebase/firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return null; 
  }

  return (
    <div className="messages-wrapper mt-5">
      <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name ">{message.name}</p>
          <p className="user-message ">{message.text}</p>
      
          {message.image && (
            <img
              src={message.image}
              alt="Attached Image"
              style={{ width: "100px", height: "auto" }} 
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Message;
