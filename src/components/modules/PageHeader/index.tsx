"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Typo from "@components/core/Typo";
import DrawerIcon from "@assets/svg/drawer.svg";
import PencilIcon from "@assets/svg/drawer/pencil.svg";
import FootprintIcon from "@assets/svg/drawer/footprint.svg";
import DogIcon from "@assets/svg/drawer/dog.svg";
import LensIcon from "@assets/svg/drawer/lens.svg";
import CommunityIcon from "@assets/svg/drawer/community.svg";
import CsIcon from "@assets/svg/drawer/cs.svg";
import FaqIcon from "@assets/svg/drawer/faq.svg";
import LogoutIcon from "@assets/svg/drawer/logout.svg";
import styles from "./styles.module.scss";

// 현재 모바일 화면 기준
export default function PageHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  return (
    <>
      <div className={styles.headerContainer} onClick={() => setOpen(true)}>
        <DrawerIcon
          className={styles.drawerIcon}
          viewBox="0 0 20 14"
          width="24px"
          height="24px"
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
              {/* dogs.map 필요 */}
              <div className={styles.dogCard}>
                <div className={styles.dogCircle}>
                  <img
                    src="https://s3.ap-northeast-2.amazonaws.com/foppy/dog/f7bacd42-fe40-464d-8acb-ee9ac1a33df2.jpg"
                    className={styles.dogImg}
                  />
                  <PencilIcon className={styles.pencilIcon} />
                </div>
              </div>{" "}
              {/* dogs.map 필요 */}
              <div className={styles.dogCard}>
                <div className={styles.dogCircle}>
                  <img
                    src="https://s3.ap-northeast-2.amazonaws.com/foppy/dog/f7bacd42-fe40-464d-8acb-ee9ac1a33df2.jpg"
                    className={styles.dogImg}
                  />
                  <PencilIcon className={styles.pencilIcon} />
                </div>
              </div>{" "}
              {/* dogs.map 필요 */}
              <div className={styles.dogCard}>
                <div className={styles.dogCircle}>
                  <img
                    src="https://s3.ap-northeast-2.amazonaws.com/foppy/dog/f7bacd42-fe40-464d-8acb-ee9ac1a33df2.jpg"
                    className={styles.dogImg}
                  />
                  <PencilIcon className={styles.pencilIcon} />
                </div>
              </div>
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
