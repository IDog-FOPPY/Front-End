// 비문 탐색 결과 페이지 - 실패

"use client";


import { useState, useEffect, ChangeEvent } from 'react';

import Link from 'next/link'
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import { login } from '@src/logics/axios';


export default function LoginPage() {

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onComplete = () => {
    if (id && pw) {
      login({
        id: id,
        pw: pw,
      })
    }
  }



  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />

        <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} className={styles.loginBox} />
        <input type="text" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} className={styles.loginBox} />
        <Typo color="#606060" variant="caption" style={{ marginLeft: "auto" }}>
          비회원으로 포마이펫 이용하기
        </Typo>

        <div className={styles.loginBtn} onClick={onComplete}>
          <Typo color="white" variant="t3">
            로그인하기
          </Typo>
        </div>

        <Typo color="#606060" variant="t3" style={{ marginRight: "auto" }}>
          회원가입
        </Typo>
        <Typo color="#606060" variant="t3" style={{ marginRight: "auto" }}>
          아이디 찾기 / 비밀번호 찾기
        </Typo>

      </div>




    </>

  )
}