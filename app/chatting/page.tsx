"use client";
import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { getChatting } from "@src/logics/axios";
import { postNewChatting } from "@src/logics/axios";
import Chatting from '@src/screens/chatting';

import Link from 'next/link'
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';


export default function ChattingPage() {
  const state = useSearchParams().get("state");
  const id = parseInt(useSearchParams().get("id") || '{}');
  const uid = parseInt(localStorage.getItem('foppy_user_uid') || '{}');
  console.log("uid", uid);
  //const [chatting, setChatting] = useState([]);


  // if (state === "old") {
  //   console.log("기존채팅방get 방ID는", id);
  //   const chatting = await getChatting(id);
  // }
  // else if (state === "new") {
  //   console.log("새 채팅방 post 개 ID는", id);
  //   if (uid && id) {
  //     await postNewChatting({
  //       userId: uid,
  //       dogId: id,
  //     })
  //   }
  // }
  // else console.log("err");




  useEffect(() => {
    if (state === "old") {
      console.log("기존채팅방get 방ID는", id);
      const chatting = async () => await getChatting(id);
    }
    else if (state === "new") {
      console.log("새 채팅방 post 개 ID는", id);
      if (uid && id) {
        async () => await postNewChatting({
          userId: uid,
          dogId: id,
        })
      }
    }
    else console.log("err");
  }, []);


  // if (state === "old") {
  //   console.log("기존채팅방get 방ID는", id);
  //   useEffect(() => {
  //     const getData = async () => {

  //       setChatting(await getChatting(id));
  //     };
  //     getData();
  //   }, []);
  // }






  return (
    <Chatting />

  )
}