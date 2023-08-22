"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

import { getChattingList } from "@src/logics/axios";
import styles from "./styles.module.scss";
import ArrowLeft from '@assets/svg/register/arrow-left.svg';
import PFImg from '@assets/png/profileImg.png';
import Typo from '@components/core/Typo';
import dayjs from "dayjs";

const uid = parseInt(localStorage.getItem('foppy_user_uid') || '{}');

interface Chatting {
  id: number;
  member1Id: number;
  member2Id: number;
  member1NickName: string;
  member2NickName: string;
  member1ProfileImgUrl: string;
  member2ProfileImgUrl: string

  lastMessageCreatedAt: string;
  lastMessage: string;
}

interface ChattingListProps {
  chatting: Chatting;
}

const ChattingList = (props: ChattingListProps) => {
  const { chatting } = props;
  const d = dayjs(chatting.lastMessageCreatedAt);
  const lastDate = d.format("YY/MM/DD");
  const [partnerNickname, setPartnerNickname] = useState('');
  const [partnerProfileImg, setPartnerProfileImg] = useState('');


  useEffect(() => {
    // 상대방 닉네임, 프로필 get
    if (chatting.member1Id === uid) {
      setPartnerNickname(chatting.member2NickName);
      setPartnerProfileImg(chatting.member2ProfileImgUrl !== "https://기본프사" ? chatting.member2ProfileImgUrl : PFImg.src);
    }
    else {
      setPartnerNickname(chatting.member1NickName);
      setPartnerProfileImg(chatting.member1ProfileImgUrl !== "https://기본프사" ? chatting.member1ProfileImgUrl : PFImg.src);
    }
  },[chatting.member1Id]);
  
  return (

    <div className={styles.chattingList}>
      <img
        className={styles.partnerProfileImg}
        alt="dog-image"
        src={partnerProfileImg}
      />
      <div className={styles.chattingInfo}>
        <div className={styles.chattingInfoUpper}>
          <Typo variant="t2" bold color="black" >{partnerNickname}</Typo>
          <Typo variant="caption" color="#d9d9d9" >{lastDate}</Typo>
        </div>
        <div className={styles.chattingInfoBottom}>
          <Typo variant="t2" color="black" className={styles.title}>{chatting.lastMessage}</Typo>
        </div>
      </div>
    </div>
  )
}

export default function ChattingListPage({chattings} : {chattings: any}) {
 
  console.log('chattings', chattings);
 
  const router = useRouter();

  //   const onClick = (id : number) => {
  //     router.push(
  // {
  //   pathname: "/chatting",
  //   query: {
  //     chattingState: "old",
  //     id: id,
  //   },
  // },
  //     );
  //   };

  return (
    <div className={styles.pageLayout}>
      <div className={styles.header}>
        <div className={styles.backBtn}><ArrowLeft /></div>
        <Typo variant="t2" bold color="black" className={styles.title}>채팅</Typo>
        <div className={styles.blank}></div>
      </div>

      <div>
        {chattings.map((chat: Chatting) => {
          return (
            <Link
              href={{
                pathname: "/chatting",
                query: {
                  id: chat.id,
                  state: "old",
                },
              }}
              // as="/chatting"
              key={chat.id}
            >
              <ChattingList
                chatting={chat}
                key={chat.id}
              // onClick={() => onClick(chat.id)}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
