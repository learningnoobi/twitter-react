import React from "react";
import Message from "./Message";
import "../styles/chat.css";

const ChatMessage = () => {
  return (
    
    <Message>
     <div className="div-mid">
     <div className="message-info">
        <h1>You don't have Message Selected .</h1>
        <p className="side-name">
          Choose one from your existing messages, or start a new one.
        </p>
        <button className="link-tweet">New Message</button>
      </div>
     </div>
    </Message>
  );
};

export default ChatMessage;
