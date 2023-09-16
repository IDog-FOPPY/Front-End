"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import styles from "./styles.module.scss";
import { signup } from '@src/logics/axios';

export default function SignupPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [chkPw, setChkPw] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [chk, setChk] = useState(true);
  const router = useRouter();


  const onComplete = async () => {
    try {
      if (chk && id && pw) {
        const res = await signup({
          email: id,
          password: pw,
          nickName: name,
          phone: phone
        })
        router.push('/');

        console.log('res', res);
      }
    } catch (err) {
      console.log("signup err", err);
    }

  }


  // const onComplete = async () => {
  //   if (chk && id && pw) {
  //     const res = await signup({
  //       email: id,
  //       password: pw,
  //       nickName: name,
  //       phone: phone
  //     })
  //     router.push('/login');

  //     console.log('res', res);
  //   }
  // }

  useEffect(() => {
    pw === chkPw ? setChk(true) : setChk(false);

  }, [pw, chkPw]);


  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />
        <div className={styles.signupBox}>
          <Typo color="#9F9F9F" variant="t3" className={styles.signupItemTitle}>아이디</Typo>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} className={styles.inputBox} />
        </div>
        <div className={styles.signupBox}>
          <Typo color="#9F9F9F" variant="t3" className={styles.signupItemTitle}>비밀번호</Typo>
          <input type="text" value={pw} onChange={(e) => setPw(e.target.value)} className={styles.inputBox} />
        </div>
        <div className={styles.signupBox}>
          <Typo color="#9F9F9F" variant="t3" className={styles.signupItemTitle} style={{ display: "inline" }}>비밀번호 확인</Typo>
          {chk ?
            <Typo color="#0074DD" bold variant="caption" className={styles.pwChk}> 확인 완료! </Typo>
            :
            <Typo color="red" bold variant="caption" className={styles.pwChk}> 비밀번호가 일치하지 않습니다! </Typo>
          }
          <input type="text" value={chkPw} onChange={(e) => setChkPw(e.target.value)} className={styles.inputBox} />
        </div>
        <div className={styles.signupBox}>
          <Typo color="#9F9F9F" variant="t3" className={styles.signupItemTitle}>이름</Typo>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.inputBox} />
        </div>
        <div className={styles.signupBox}>
          <Typo color="#9F9F9F" variant="t3" className={styles.signupItemTitle}>휴대폰 번호</Typo>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.inputBox} />
        </div>

        <div className={styles.signupBtn} onClick={onComplete}>
          <Typo color="white" variant="t3">
            가입하기
          </Typo>
        </div>
      </div>
    </>

  )
}
