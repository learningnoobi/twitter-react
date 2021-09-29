import React, { useEffect, useState } from "react";
import Second from "../components/Second";
import TweetHeader from "../components/tweetComp/tweetHeader";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Notifications = () => {
  const [msg, setMsg] = useState("");
  const [gotData, setGotData] = useState('')
  const client = new W3CWebSocket("ws://127.0.0.1:8000/ws/home/");
  useEffect(() => {
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      setGotData(data.payload.data)
    };

    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }, []);

  const sendMessage = () => {
   if(msg){
    client.send(
        JSON.stringify({
          command: "like",
          message: msg
        })
      );
   }
  };

  return (
    <Second>
      <TweetHeader headerName="Notfications" />
      <div className="col-lg-8 col-sm-8">
        <input 
        value={msg}
        onChange= {(e)=>setMsg(e.target.value)}
        placeholder="type message" type="text" className="inputTag" />
        <button onClick={sendMessage} className="link-tweet">
          Send Message
        </button>
       <p>
      {gotData}
       </p>
      </div>
    </Second>
  );
};

export default Notifications;
