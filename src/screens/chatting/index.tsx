"use client";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";

const token = "Bearer " + localStorage.getItem("foppy_auth_token");
// const senderId = parseInt(localStorage.getItem('foppy_user_uid') || '{}'); //jihyun
// const receiverId = 20;  //mongg
// //방아이디 19



export default function ChattingPage(props: { senderId: number, receiverId: number }) {
  const { senderId, receiverId } = props;
  console.log("senderId, receiverId", senderId, receiverId);
  const client: any = useRef({});
  //const client: MutableRefObject<T> = useRef<T>({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      //brokerURL: "/ws/chat", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("http://13.125.180.85:8080/ws/chat"), // proxy를 통한 접속
      connectHeaders: {
        'Authorization': token,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame: any) => {
        console.log("frame", frame);
        client.current.subscribe('/sub/room/19', function (result: any) {
          // show(JSON.parse(result.body));
          console.log("res", JSON.parse(result.body))
        }
        );
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };


  const publish = (message: string) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/send",
      body: JSON.stringify({ 'content': message, 'senderId': senderId, 'receiverId': receiverId }),
    });

    setMessage("");
  };



  return (
    <>
      <div>

        <input type="text" id="content" placeholder="Text" onChange={(e) => setMessage(e.target.value)} />
        <button id="sendMessage" onClick={() => publish(message)}>Send</button>
      </div>;
    </>
  )

}




