"use client";

import { useState, useEffect } from "react";
import Typo from "@components/core/Typo";
import DrawerIcon from "@assets/svg/drawer.svg";
import FootprintIcon from "@assets/svg/drawer/footprint.svg";
import DogIcon from "@assets/svg/drawer/dog.svg";
import LensIcon from "@assets/svg/drawer/lens.svg";
import CommunityIcon from "@assets/svg/drawer/community.svg";
import CvIcon from "@assets/svg/drawer/cv.svg";
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
        </div>
      )}
    </>
  );
}
