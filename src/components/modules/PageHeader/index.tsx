"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Typo from "@components/core/Typo";
import DrawerIcon from "@assets/svg/drawer.svg";
import ChattingIcon from "@assets/svg/main/chatting.svg";
import PencilIcon from "@assets/svg/drawer/pencil.svg";
import FootprintIcon from "@assets/svg/drawer/footprint.svg";
import DogIcon from "@assets/svg/drawer/dog.svg";
import LensIcon from "@assets/svg/drawer/lens.svg";
import CommunityIcon from "@assets/svg/drawer/community.svg";
import CsIcon from "@assets/svg/drawer/cs.svg";
import FaqIcon from "@assets/svg/drawer/faq.svg";
import LogoutIcon from "@assets/svg/drawer/logout.svg";
import { DogInfo } from "@src/types/dogInfo";
import styles from "./styles.module.scss";
import { getDogs, getUser } from "@src/logics/axios";
import Image from "next/image";
import ArrowLeft from "@assets/svg/register/arrow-left.svg";
import Paw from "@assets/svg/main/paw.svg";

import { getChattingList } from "@src/logics/axios";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";

// 현재 모바일 화면 기준
export default function PageHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? "Bearer " + localStorage.getItem("foppy_auth_token")
      : null;
  const [dogs, setDogs] = useState([]);

  const [chattings, setChattings] = useState([]); //기존 room 받아오는 변수
  const [chatMessage, setChatMessage] = useState<ShowChatEl>(); //chatting 받아오는 변수
  const [isAlert, setIsAlert] = useState(false);
  const [senderNickname, setSenderNickname] = useState("");
  console.log(dogs);
  const client: any = useRef({});

  interface Chatting {
    roomId: number;
    lastMessage: string;
    lastMessageCreatedAt: string;
    members: [
      {
        id: number;
        nickName: string;
        profileImgUrl: string;
      },
      {
        id: number;
        nickName: string;
        profileImgUrl: string;
      },
    ];
  }

  interface ShowChatEl {
    senderId?: number;
    content?: string;
    roomId?: number;
  }

  useEffect(() => {
    const getData = async () => {
      setDogs(await getDogs());
      setChattings(await getChattingList());
    };
    if (token) getData();
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  useEffect(() => {
    console.log("chattingList : ", chattings);
    connect(chattings); // 모든 채팅방 subscribe 시작
  }, [chattings]);

  useEffect(() => {
    setIsAlert(true); // chatMessage받으면 alert:true && senderNickname 받아오기
    console.log("ChatMessage", chatMessage);
    const getData = async () => {
      let res = await getUser({ id: chatMessage?.senderId });
      setSenderNickname(res.nickName);
    };
    if (chatMessage) getData();
  }, [chatMessage]);

  useEffect(() => {
    console.log("senderNickname", senderNickname);
    // senderNickname 받아오면 alert 타이머 시작
    let timer = setTimeout(() => {
      setIsAlert(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [chatMessage]);

  const Alert = () => {
    return (
      <>
        <div className={styles.alertBox}>
          {/* {senderNickname}
          {chatMessage?.content} */}
          <div className={styles.sender}>
            <Paw viewBox="0 0 24 24" className={styles.icon} />
            <Typo
              variant="t3"
              bold
              color="#000000"
              className={styles.footprint}
            >
              {senderNickname}
            </Typo>
            <Paw viewBox="0 0 24 24" className={styles.icon} />
          </div>

          <Typo variant="t3" color="#000000" className={styles.footprint}>
            {chatMessage?.content}
          </Typo>
        </div>
      </>
    );
  };

  const connect = (chattings: Chatting[]) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("foppy_auth_token")
        : null;
    console.log("connect 호출, chattings: ", chattings);
    chattings.length > 0 &&
      chattings.map((chat: Chatting) => {
        if (token) {
          console.log("subscribe roomId : ", chat.roomId);
          client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://foppy.shop/ws/chat"),
            connectHeaders: {
              Authorization: token,
            },
            debug: function (str) {
              console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            onConnect: (frame: any) => {
              console.log("frame", frame);
              client.current.subscribe(
                "/sub/room/" + chat.roomId,
                function (result: any) {
                  console.log("알람 res", JSON.parse(result.body));
                  setChatMessage(JSON.parse(result.body));
                },
              );
            },
            onStompError: (frame) => {
              console.error(frame);
            },
          });
        }

        client.current.activate();
      });
  };

  return (
    <>
      {isAlert && chatMessage ? (
        <Link
          href={{
            pathname: "/chatting",
            query: {
              id: chatMessage?.roomId,
              state: "old",
            },
          }}
          // as="/chatting"
          key={chatMessage?.roomId}
        >
          <Alert />
        </Link>
      ) : null}
      <div className={styles.headerContainer}>
        {/* <Link href="/chatting-list"> */}
        <div className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        {token && (
          <ChattingIcon
            className={styles.chattingIcon}
            width="36px"
            height="36px"
            onClick={() => router.push("/chatting-list")}
          />
        )}
        {/* </Link> */}

        <DrawerIcon
          className={styles.drawerIcon}
          viewBox="0 0 20 14"
          width="24px"
          height="24px"
          onClick={() => setOpen(true)}
        />
      </div>
      {open && (
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.closeBtn} onClick={() => setOpen(false)}>
              X
            </span>
          </div>
          <div className={styles.dogListContainer}>
            <div className={styles.dogList}>
              {dogs.map((dog: DogInfo) => {
                return (
                  <div className={styles.dogCard} key={dog?.id}>
                    <div className={styles.dogCircle}>
                      <img
                        alt="dog"
                        src={dog?.imgUrl}
                        className={styles.dogImg}
                      />
                      {/* <Image
                      alt="dog"
                      src={dog?.imgUrl}
                      width={130}
                      height={130}
                    /> */}
                      <PencilIcon className={styles.pencilIcon} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.menuList}>
            <Link href="/" className={styles.menu}>
              <FootprintIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                비문이란?
              </Typo>
            </Link>
            <div className={styles.divider} />
            <Link href="/" className={styles.menu}>
              <DogIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                반려견 등록
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <LensIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                유기견 등록 및 확인
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <CommunityIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                커뮤니티
              </Typo>
            </Link>
            <div className={styles.divider} />
            <Link href="/" className={styles.menu}>
              <CsIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                고객센터
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <FaqIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                자주 묻는 질문
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <LogoutIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                로그아웃
              </Typo>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
