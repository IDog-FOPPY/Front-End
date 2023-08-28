"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Typo from "@components/core/Typo";
import DrawerIcon from "@assets/svg/drawer.svg";
import ChattingIcon from "@assets/svg/main/chatting.svg";

import PencilIcon from "@assets/svg/drawer/pencil.svg";
import FootprintIcon from "@assets/svg/drawer/footprint.svg";
import DogIcon from "@assets/svg/drawer/dog.svg";
import LensIcon from "@assets/svg/drawer/lens.svg";
import CommunityIcon from "@assets/svg/drawer/community.svg";
import CsIcon from "@assets/svg/drawer/cs.svg";
import FaqIcon from "@assets/svg/drawer/faq.svg";
import LogoutIcon from "@assets/svg/drawer/logout.svg";
import styles from "./styles.module.scss";
import { getDogs } from "@src/logics/axios";
import Image from "next/image";
import { DogInfo } from "@src/types/dogInfo";

// 현재 모바일 화면 기준
export default function PageHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("foppy_auth_token");
  const [dogs, setDogs] = useState([]);

  console.log(dogs);

  useEffect(() => {
    const getData = async () => {
      setDogs(await getDogs());
    };

    if (token) getData();
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  return (
    <>
      <div className={styles.headerContainer}>
        {/* <Link href="/chatting-list"> */}
        {token && 
          <ChattingIcon
            className={styles.chattingIcon}
            width="36px"
            height="36px"
            onClick={() => router.push("/chatting-list")}
          />}
        {/* </Link> */}

        <DrawerIcon
          className={styles.drawerIcon}
          viewBox="0 0 20 14"
          width="24px"
          height="24px"
          onClick={() => setOpen(true)}
        />
      </div>
      {open && (
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.closeBtn} onClick={() => setOpen(false)}>
              X
            </span>
          </div>
          <div className={styles.dogListContainer}>
            <div className={styles.dogList}>
              {dogs.map((dog: DogInfo) => {
                return (
                  <div className={styles.dogCard} key={dog?.id}>
                    <div className={styles.dogCircle}>
                      <img
                        alt="dog"
                        src={dog?.imgUrl}
                        className={styles.dogImg}
                      />
                      {/* <Image
                      alt="dog"
                      src={dog?.imgUrl}
                      width={130}
                      height={130}
                    /> */}
                      <PencilIcon className={styles.pencilIcon} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.menuList}>
            <Link href="/" className={styles.menu}>
              <FootprintIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                비문이란?
              </Typo>
            </Link>
            <div className={styles.divider} />
            <Link href="/" className={styles.menu}>
              <DogIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                반려견 등록
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <LensIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                유기견 등록 및 확인
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <CommunityIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                커뮤니티
              </Typo>
            </Link>
            <div className={styles.divider} />
            <Link href="/" className={styles.menu}>
              <CsIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                고객센터
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <FaqIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                자주 묻는 질문
              </Typo>
            </Link>
            <Link href="/" className={styles.menu}>
              <LogoutIcon className={styles.menuIcon} />
              <Typo variant="t3" color="#606060">
                로그아웃
              </Typo>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
