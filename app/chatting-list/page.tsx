"use client";

import { useEffect, useState } from "react";
import { getChattingList } from "@src/logics/axios";
import styles from "./styles.module.scss";
import ArrowLeft from '@assets/svg/register/arrow-left.svg';
import Typo from '@components/core/Typo';
import dayjs from "dayjs";

let uid = parseInt(localStorage.getItem('foppy_user_uid') || '{}');

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

  // 상대방 닉네임 get
  const matchUser = (id: number) => {
    if (id === uid) {
      return chatting.member2NickName;
    }
    else {
      return chatting.member1NickName;
    }
  }
  const partnerName = matchUser(chatting.member1Id);

  return (

    <div className={styles.chattingList}>
      <img alt="dog-image" src={chatting.member2ProfileImgUrl} className={styles.profileImg} />
      {partnerName}
      {lastDate}
      {chatting.lastMessage}
    </div>


  )



}


export default function ChattingListPage() {
  const [chattings, setChattings] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setChattings(await getChattingList());
    };

    const accessToken = localStorage.getItem("foppy_auth_token");
    if (accessToken) getData();
    console.log('채팅목록', chattings);
  }, []);
  console.log(localStorage.getItem('foppy_user_uid'));


  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn}><ArrowLeft /></div>
          <Typo variant="t2" bold color="black" className={styles.title}>채팅</Typo>
          <div className={styles.blank}></div>
        </div>
      </div>

      <div>

        {chattings.map((chat: Chatting) => {
          return <ChattingList chatting={chat} key={chat.id} />;
        })}

      </div>


    </>
  );
}
