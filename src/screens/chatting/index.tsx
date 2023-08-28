"use client";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";
import PFImg from '@assets/png/profileImg.png';

import ArrowLeft from '@assets/svg/register/arrow-left.svg';
import Send from '@assets/svg/messageSend.svg';

const token = "Bearer " + localStorage.getItem("foppy_auth_token");

interface Chatting {
  roomId: number;
  receiverProfileImg: string;
  receiverNickname: string;
  existingChat: ChatEl[];
}

export interface ChatEl {
  messageId: number;
  content: string;
  roomId: number;
  senderId: number;
  createdAt: string;
}

interface ShowChattingProps {
  content: string;
  receiverNickname: string;
  receiverProfileImg: string;
  senderId: number;
  showImg: boolean;
}

const ShowChatting = (props: ShowChattingProps) => {
  const { content, receiverProfileImg, receiverNickname, senderId, showImg } = props;
  const myId = localStorage.getItem("foppy_user_uid");

  return (
    <div className={styles.chattingList}>
      {showImg && myId && senderId !== parseInt(myId) &&
        <img
        className={styles.profileImg}
        alt="dog-image"
        src={receiverProfileImg !== "https://기본프사" ? receiverProfileImg : PFImg.src}
        />
      }
      {/* 임시 출력 */}
      {myId && senderId === parseInt(myId) ?
       <Typo variant="t3" color="black">{content}</Typo> 
       : <Typo variant="t3" color="red">{content}</Typo>
      }
    </div>
  )
}

export default function ChattingPage(props: Chatting) {

  // const { roomId, receiverProfileImg, receiverNickname, existingChat } = props;
  const { roomId, receiverProfileImg, receiverNickname } = props;
  const existingChat = [
    {
        "messageId": 1,
        "content": "아녕하셍",
        "roomId": 3,
        "senderId": 13,
        "createdAt": "2023-08-28T12:50:40.724060"
    },
    {
        "messageId": 3,
        "content": "안녕",
        "roomId": 3,
        "senderId": 17,
        "createdAt": "2023-08-28T12:52:08.573627"
    },
    {
        "messageId": 4,
        "content": "머하세요?",
        "roomId": 3,
        "senderId": 13,
        "createdAt": "2023-08-28T12:50:40.724060"
    },
    {
        "messageId": 5,
        "content": "아몬드 먹어요",
        "roomId": 3,
        "senderId": 17,
        "createdAt": "2023-08-28T12:52:08.573627"
    },
    {
        "messageId": 6,
        "content": "맛있어여?",
        "roomId": 3,
        "senderId": 13,
        "createdAt": "2023-08-28T12:50:40.724060"
    },
    {
        "messageId": 7,
        "content": "네^^",
        "roomId": 3,
        "senderId": 17,
        "createdAt": "2023-08-28T12:52:08.573627"
    },
    {
      "messageId": 8,
      "content": "네^^",
      "roomId": 3,
      "senderId": 17,
      "createdAt": "2023-08-28T12:52:08.573627"
    },
    {
        "messageId": 9,
        "content": "단백질 앤 지방",
        "roomId": 3,
        "senderId": 13,
        "createdAt": "2023-08-28T12:50:40.724060"
    },
    {
        "messageId": 10,
        "content": "ㅅㄱ여",
        "roomId": 3,
        "senderId": 13,
        "createdAt": "2023-08-28T12:52:08.573627"
    }
  ];
  const [lastMsg, setLastMsg] = useState<number>();
  //const [id, setId] = useState(roomId);

  // ------------------------------------------------------------

  // const client: any = useRef({});

  // //상대방이 보낸 메세지 받는 변수
  // const [showMessages, setShowMessages] = useState([]);
  // //내가 보낸 메세지
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   console.log("roomId", roomId);
  //   connect();
  //   return () => disconnect();
  // }, [roomId]);
  // const connect = () => {


  //   //console.log(id);
  //   client.current = new StompJs.Client({
  //     webSocketFactory: () => new SockJS("http://54.180.158.62:8080/ws/chat"),
  //     connectHeaders: {
  //       'Authorization': token,
  //     },
  //     debug: function (str) {
  //       console.log(str);
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //     onConnect: (frame: any) => {
  //       console.log("frame", frame);
  //       client.current.subscribe('/sub/room/' + roomId, function (result: any) {
  //         // show(JSON.parse(result.body));
  //         console.log("채팅 res", JSON.parse(result.body));
  //         setShowMessages(JSON.parse(result.body));
  //       }
  //       );
  //     },
  //     onStompError: (frame) => {
  //       console.error(frame);
  //     },
  //   });

  //   client.current.activate();
  // };
  // const disconnect = () => {
  //   client.current.deactivate();
  // };
  // const publish = (message: string) => {
  //   if (!client.current.connected) {
  //     return;
  //   }

  //   client.current.publish({
  //     destination: "/pub/send",
  //     body: JSON.stringify({ 'roomId': roomId, 'content': message }),
  //   });
  //   console.log('roomId', roomId, 'content', message);
  //   setMessage("");
  // };

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
          {existingChat.map((el: ChatEl, index: number) => {
            return (
              <ShowChatting 
                content={el.content} 
                receiverProfileImg={receiverProfileImg} 
                receiverNickname={receiverNickname} 
                key={el.messageId} 
                senderId={el.senderId} 
                showImg={index === 0 || index > 0 && el.senderId !== existingChat[index - 1].senderId}
              />
            );
          })}
          {/* {showMessages} */}
        </div>

        {/* <div className={styles.sendSection}>
          <input
            type="text"
            id="content"
            placeholder="메세지 보내기"
            className={styles.sendBox}
            //defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={styles.sendBtn} onClick={() => publish(message)}><Send /></div>
        </div> */}

      </div>
    </>
  )

}




