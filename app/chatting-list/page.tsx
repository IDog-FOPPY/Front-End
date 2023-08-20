"use client";

import { useEffect, useState } from "react";
import { getChattingList } from "@src/logics/axios";
import styles from "./styles.module.scss";
import ArrowLeft from '@assets/svg/register/arrow-left.svg';
import Typo from '@components/core/Typo';
export default function ChattingListPage() {

  const [chattings, setChattings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setChattings(await getChattingList());
    };

    const accessToken = localStorage.getItem("foppy_auth_token");
    if (accessToken) getData();
  }, []);


  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn}><ArrowLeft /></div>
          <Typo variant="t2" bold color="black" className={styles.title}>채팅</Typo>
          <div className={styles.blank}></div>
        </div>
      </div>
//chattingList

    </>
  );
}
