"use client";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRouter } from 'next/navigation';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import { login, getChattingList } from '@src/logics/axios';
import LoginFailedPopup from './LoginFailedPopup';
import styles from './styles.module.scss';

export default function LoginPage() {

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const [isSplash, setIsSplash] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => { setIsSplash(false) }, 3000);
    return () => { clearTimeout(timer) }
  }, [isSplash])


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
    const cookies = typeof window !== 'undefined' ? document.cookie.split(";") : null;
    if (cookies !== null) {
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        typeof window !== 'undefined' ? document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT" : null;
      }
    }

  }


  // 로그인 할 때마다 모든 채팅방에 subscribe 
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
    ]
  }
  const [chattings, setChattings] = useState([]);
  const client: any = useRef({});
  useEffect(() => {
    console.log("chattingList : ", chattings);
    connect(chattings);
  }, [chattings])

  const connect = (chattings: Chatting[]) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("foppy_auth_token") : null;
    console.log("connect 호출, chattings: ", chattings);

    chattings.map((chat: Chatting) => {
      if (token) {
        console.log("subscribe roomId : ", chat.roomId);
        client.current = new StompJs.Client({
          webSocketFactory: () => new SockJS("http://3.36.63.57:8080/ws/chat"),
          connectHeaders: {
            'Authorization': token,
          },
          debug: function (str) {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,

          onConnect: (frame: any) => {
            console.log("frame", frame);
            client.current.subscribe('/sub/room/' + chat.roomId);
          },
          onStompError: (frame) => {
            console.error(frame);
          },
        });
      }

      client.current.activate();
    })

  };




  const onComplete = async () => {
    if (id && pw) {
      const res = await login({
        email: id,
        password: pw,
      })
      console.log('res', res);
      console.log('res.data.token', res.data.accessToken);
      if (res?.data.accessToken) {
        typeof window !== 'undefined' ? localStorage.setItem('foppy_auth_token', res.data?.accessToken) : null;
        typeof window !== 'undefined' ? localStorage.setItem('foppy_user_uid', res.data?.userId) : null;
        setChattings(await getChattingList());
        router.push('/main');
      } else {
        console.log('error!');
        setIsPopupOpen(true);
      }

    }
  }


  return (
    <>
      <div className={styles.pageLayout}>
        {
          isSplash ?
            <div className={styles.splashLogo} style={{ backgroundImage: `url(${logo.src})` }} />
            :
            <>
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

              <Typo color="#606060" variant="t3" style={{ marginRight: "auto" }} onClick={() => router.push('/signup')}>
                회원가입
              </Typo>
              <Typo color="#606060" variant="t3" style={{ marginRight: "auto" }}>
                아이디 찾기 / 비밀번호 찾기
              </Typo>

              {isPopupOpen && <LoginFailedPopup onClick={() => setIsPopupOpen(false)} />}
            </>
        }
      </div>
    </>
  )
}