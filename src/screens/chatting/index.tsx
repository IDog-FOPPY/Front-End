"use client";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";
import PFImg from '@assets/png/profileImg.png';
import dayjs from 'dayjs';
import ArrowLeft from '@assets/svg/register/arrow-left.svg';
import Send from '@assets/svg/messageSend.svg';
import { useRouter } from "next/navigation";

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
  createdAt: string;
  showImg: boolean;

}

export interface ShowChatEl {
  senderId: number;
  content: string;
  roomId: number;
}


const ShowChatting = (props: ShowChattingProps) => {
  const { content, receiverProfileImg, receiverNickname, senderId, createdAt, showImg } = props;
  const myId = localStorage.getItem("foppy_user_uid");


  return (
    <div className={styles.chattingList}>

      {myId && senderId === parseInt(myId) ?
        <div className={styles.senderSection}>

          <Typo variant="t2" color="white" className={styles.messageBox}>{content}</Typo>
          <Typo variant="t3" color="#d9d9d9" >{createdAt}</Typo>



        </div>
        :
        <div className={styles.receiverSection}>
          {showImg ?
            <img
              className={styles.profileImg}
              alt="dog-image"
              src={receiverProfileImg !== "https://기본프사" ? receiverProfileImg : PFImg.src}
            />
            :
            <div className={styles.blank} />
          }
          <Typo variant="t2" color="black" className={styles.messageBox}>{content}</Typo>
          <Typo variant="t3" color="#d9d9d9">{createdAt}</Typo>

        </div>
      }


    </div>
  )
}

export default function ChattingPage(props: Chatting) {

  const { roomId, receiverProfileImg, receiverNickname, existingChat } = props;
  const myId = localStorage.getItem("foppy_user_uid");
  const router = useRouter();


  // ------------------------------------------------------------

  const client: any = useRef({});


  //내가 보낸 메세지
  const [message, setMessage] = useState("");


  //res로 오는 메세지 받는 변수
  const [chatMessage, setChatMessage] = useState<ShowChatEl>({ content: "", roomId: 0, senderId: 0 });
  const [chatMessageList, setChatMessageList] = useState<ShowChatEl[]>([]);

  const sendSectionRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (sendSectionRef.current) {
      sendSectionRef.current.scrollTop = sendSectionRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    console.log("ChatMEssage", chatMessage);
    chatMessage.roomId === 0 ? null :
      setChatMessageList([...chatMessageList, chatMessage]);
  }, [chatMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessageList]);


  useEffect(() => {
    console.log("roomId", roomId);
    connect();
    scrollToBottom();
    return () => disconnect();
  }, [roomId]);
  const connect = () => {


    //console.log(id);
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("http://54.180.156.211:8080/ws/chat"),
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
          console.log("채팅 res", JSON.parse(result.body));
          setChatMessage(JSON.parse(result.body));
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
      body: JSON.stringify({ 'roomId': roomId, 'content': message, 'senderId': myId }),
    });
  };

  // ------------------------------------------------------------





  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn} onClick={() => router.back()}><ArrowLeft /></div>
          <Typo variant="t2" bold color="black" className={styles.title}>{receiverNickname}</Typo>
          <div className={styles.blank}></div>
        </div>

        <div ref={sendSectionRef} className={styles.showSection}>

          <>
            {existingChat.map((el: ChatEl, index: number) => {
              return (
                <ShowChatting
                  content={el.content}
                  receiverProfileImg={receiverProfileImg}
                  receiverNickname={receiverNickname}
                  key={el.messageId}
                  senderId={el.senderId}
                  createdAt={dayjs(el.createdAt).format("HH:mm")}
                  showImg={index === 0 || index > 0 && el.senderId !== existingChat[index - 1].senderId}
                />
              );
            })}

            {chatMessageList.map((el: ShowChatEl, index: number) => {
              return (
                <>
                  <ShowChatting
                    content={el.content}
                    receiverProfileImg={receiverProfileImg}
                    receiverNickname={receiverNickname}
                    key={el.content}
                    senderId={el.senderId}
                    createdAt={dayjs().format("HH:mm")}
                    showImg={index === 0 || index > 0 && el.senderId !== chatMessageList[index - 1].senderId}
                  />
                </>
              );
            })}
          </>
        </div>
        <div className={styles.sendSection}>
          <input
            type="text"
            id="content"
            placeholder="메세지 보내기"
            className={styles.sendBox}
            //defaultValue={message}
            onChange={(e) => { setMessage(e.target.value); }}
          />
          <div
            className={styles.sendBtn}
            onClick={() => {
              publish(message);
              const inputEl = document.getElementById('content');
              if (inputEl) (inputEl as HTMLInputElement).value = "";
            }}
          >
            <Send />
          </div>
        </div>
      </div>
    </>
  )

}




