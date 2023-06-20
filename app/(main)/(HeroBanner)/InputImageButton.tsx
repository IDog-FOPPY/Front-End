"use client";

import { ChangeEvent, useEffect, useState } from 'react';
// import Link from 'next/link';
import Typo from '@components/core/Typo';
import ArrowRightBlue from '@assets/svg/main/arrow-right-blue.svg';
import Emergency from '@assets/svg/main/emergency.svg';
import styles from './styles.module.scss';
import { postNoseIdent } from '@src/logics/axios';
import { useRouter } from 'next/navigation';
export default function InputImageButton () {
  
  const [img, setImage] = useState<FileList | null>();
  const router = useRouter();

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files;
    setImage(file);
  }

  useEffect(() => {
    if (img) {
      const post = async () => {
        // const res = await postNoseIdent(img[0]);
        const res = {dogID:[6,7,6], top_3:[]}; // 임시
        if(res?.dogID.length > 0){
          router.push(`/noseid-match-success?petId=${res.dogID}`);
        }else{

        }
      }
      post();
    }
  },[img])
  
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