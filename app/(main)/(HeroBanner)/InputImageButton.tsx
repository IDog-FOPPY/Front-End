"use client";

import { useEffect, useState } from 'react';
// import Link from 'next/link';
import Typo from '@components/core/Typo';
import ArrowRightBlue from '@assets/svg/main/arrow-right-blue.svg';
import Emergency from '@assets/svg/main/emergency.svg';
import styles from './styles.module.scss';

export default function InputImageButton () {
  
  const [img, setImage] = useState();

  useEffect(() => { console.log(img) },[img])
  
  return(
    <div className={styles.lookUpButton}>
      <input type="file" onInput={(e) => setImage(e.target.value)} accept="image/png, image/jpeg, image/jpg" />
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