"use client";

import { ChangeEvent, useEffect, useState } from 'react';
// import Link from 'next/link';
import Typo from '@components/core/Typo';
import ArrowRightBlue from '@assets/svg/main/arrow-right-blue.svg';
import Emergency from '@assets/svg/main/emergency.svg';
import styles from './styles.module.scss';

export default function InputImageButton () {
  
  const [img, setImage] = useState<FileList | null>();

  useEffect(() => { console.log(img) },[img])

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files;
    setImage(file);
  }
  
  return(
    <div className={styles.lookUpButton}>
      <input type="file" onChange={onLoadFile} accept="image/*" />
      <Emergency />
      <div className={styles.textContainer}>
        <Typo bold color='#606060' className={styles.text} >
          유기견을 발견했어요
          <Typo variant='footnote' color='#0074DD' className={styles.textFootnote}>
              비문 조회하러 가기{' '}
              <ArrowRightBlue />
          </Typo>
        </Typo>
      </div>
    </div>
  )
}