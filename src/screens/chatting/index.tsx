"use client";

import { useEffect, useState, useRef } from "react";
import StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";

import ArrowLeft from '@assets/svg/register/arrow-left.svg';
import Send from '@assets/svg/messageSend.svg';



const token = "Bearer " + localStorage.getItem("foppy_auth_token");


interface Chatting {
  roomId: number;
  senderId: number;
  receiverId: number;
  senderProfileImg: string;
  receiverProfileImg: string;
  senderNickname: string;
  receiverNickname: string;
  existingChat: object[];
}

interface ShowChatting {
  existingChat: object[];
  receiverId: number;
  receiverProfileImg: string;
}



const ShowChatting = (props: ShowChatting) => {
  const { existingChat, receiverId, receiverProfileImg } = props;
  //console.log(existingChat[0]);


  return (

    <div className={styles.chattingList}>
      ddd
    </div>
  )
}




export default function ChattingPage(props: Chatting) {

  const { roomId, senderId, receiverId, senderProfileImg, receiverProfileImg, senderNickname, receiverNickname, existingChat } = props;

  console.log("chatting props", props);


  // ------------------------------------------------------------

  const client: any = useRef({});

  //상대방이 보낸 메세지 받는 변수
  const [showMessages, setShowMessages] = useState([]);
  //내가 보낸 메세지
  const [message, setMessage] = useState("");
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);
  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("http://13.125.180.85:8080/ws/chat"),
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
        client.current.subscribe('/sub/room/' + roomId, function (result: any) {
          // show(JSON.parse(result.body));
          console.log("채팅 res", JSON.parse(result.body));
          setShowMessages(JSON.parse(result.body));
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



  // ------------------------------------------------------------









  return (
    <>

      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn}><ArrowLeft /></div>
          <Typo variant="t2" bold color="black" className={styles.title}>{receiverNickname}</Typo>
          <div className={styles.blank}></div>
        </div>

        <div className={styles.showSection}>
          <ShowChatting existingChat={existingChat} receiverId={receiverId} receiverProfileImg={receiverProfileImg} />
          {showMessages}
        </div>

        <div className={styles.sendSection}>
          <input
            type="text"
            id="content"
            placeholder="메세지 보내기"
            className={styles.sendBox}
            //defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.sendBtn} onClick={() => publish(message)}><Send /></div>

        </div>

      </div>
    </>
  )

}




