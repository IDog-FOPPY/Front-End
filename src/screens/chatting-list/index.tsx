"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getChattingList } from "@src/logics/axios";
import styles from "./styles.module.scss";
import ArrowLeft from "@assets/svg/register/arrow-left.svg";
import PFImg from "@assets/png/profileImg.png";
import Typo from "@components/core/Typo";
import dayjs from "dayjs";

const uid =
  typeof window !== "undefined"
    ? parseInt(localStorage.getItem("foppy_user_uid") || "{}")
    : null;

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

interface ChattingListProps {
  chatting: Chatting;
}

const ChattingList = (props: ChattingListProps) => {
  const { chatting } = props;
  const d = dayjs(chatting.lastMessageCreatedAt);
  const lastDate = d.format("YY/MM/DD");
  const [partnerNickname, setPartnerNickname] = useState("");
  const [partnerProfileImg, setPartnerProfileImg] = useState("");

  useEffect(() => {
    // 상대방 닉네임, 프로필 get
    if (chatting.members[0].id === uid) {
      setPartnerNickname(chatting.members[1].nickName);
      setPartnerProfileImg(
        chatting.members[1].profileImgUrl !== "https://기본프사"
          ? chatting.members[1].profileImgUrl
          : PFImg.src,
      );
    } else {
      setPartnerNickname(chatting.members[0].nickName);
      setPartnerProfileImg(
        chatting.members[0].profileImgUrl !== "https://기본프사"
          ? chatting.members[0].profileImgUrl
          : PFImg.src,
      );
    }
  }, [chatting.members[0].id]);

  return (
    <div className={styles.chattingList}>
      <img
        className={styles.partnerProfileImg}
        alt="dog-image"
        src={partnerProfileImg}
      />
      <div className={styles.chattingInfo}>
        <div className={styles.chattingInfoUpper}>
          <Typo variant="t2" bold color="black">
            {partnerNickname}
          </Typo>
          <Typo variant="caption" color="#d9d9d9">
            {lastDate}
          </Typo>
        </div>
        <div className={styles.chattingInfoBottom}>
          <Typo variant="t2" color="black" className={styles.title}>
            {chatting.lastMessage}
          </Typo>
        </div>
      </div>
    </div>
  );
};

export default function ChattingListPage({ chattings }: { chattings: any }) {
  console.log("-----chattingListProps-----", chattings);

  const router = useRouter();

  return (
    <div className={styles.pageLayout}>
      <div className={styles.header}>
        <div className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        <Typo variant="t2" bold color="black" className={styles.title}>
          채팅
        </Typo>
        <div className={styles.blank}></div>
      </div>

      <div>
        {chattings.map((chat: Chatting) => {
          return (
            <Link
              href={{
                pathname: "/chatting",
                query: {
                  id: chat.roomId,
                  state: "old",
                },
              }}
              // as="/chatting"
              key={chat.roomId}
            >
              <ChattingList chatting={chat} key={chat.roomId} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
