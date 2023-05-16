"use client"

import { useState } from 'react';
import DrawerIcon from '@assets/svg/drawer.svg';
import styles from './styles.module.scss';

// 현재 모바일 화면 기준
export default function PageHeader() {
  const [open, setOpen] = useState(false);

  return(
    !open ?
    <div className={styles.headerContainer}>
      <DrawerIcon className={styles.drawerIcon} viewBox="0 0 20 14" width="24px" height="24px" />
    </div>
    : <div className={styles.drawer}>
      </div>
  )
}