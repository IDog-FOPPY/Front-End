"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import { login } from '@src/logics/axios';
import LoginFailedPopup from './LoginFailedPopup';
import styles from './styles.module.scss';

export default function LoginPage() {

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    deleteAllCookies();
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        return caches.delete(key);
      }));
    });
    localStorage.removeItem('foppy_auth_token');
    localStorage.removeItem('foppy_user_uid');

  }, [])

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }



  const onComplete = async () => {
    if (id && pw) {
      const res = await login({
        email: id,
        password: pw,
      })
      console.log('res', res);
      console.log('res.data.token', res.data.accessToken);
      if (res?.data.accessToken) {
        localStorage.setItem('foppy_auth_token', res.data?.accessToken);
        localStorage.setItem('foppy_user_uid', res.data?.userId);
        router.push('/');
      } else {
        console.log('error!');
        setIsPopupOpen(true);
      }
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

        {isPopupOpen && <LoginFailedPopup onClick={() => setIsPopupOpen(false)} />}
      </div>
    </>
  )
}