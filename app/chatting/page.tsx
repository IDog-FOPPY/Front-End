"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getChatting } from "@src/logics/axios";

import Link from 'next/link'
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';


export default function ChattingPage() {
  const state = useSearchParams().get("state");
  const id = useSearchParams().get("id");
  const [chatting, setChatting] = useState([]);

  //접속경로 : chatting-list
  if (state === "old") {
    console.log("기존채팅방get 방ID는", id);
    useEffect(() => {
      const getData = async () => {

        setChatting(await getChatting(id));
      };
      getData();
    }, []);
  }

  //접속경로 : main(Lost), lost-dog-list, noseid-match-success
  else if (state === "new") {
    console.log("새채팅방post 개ID는", id);
  }
  else console.log("err");



  return (
    <>


//chattingRoom

    </>

  )
}