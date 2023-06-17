// 유기견 게시판 페이지
"use client";

import { useEffect, useState } from 'react';
import Typo from '@components/core/Typo';
import { getStrayDogs } from '@src/logics/axios';
import { DogInfo } from '@src/types/dogInfo';
import styles from './styles.module.scss';

interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      {/* 백에서 img 구현 안되 임시 div로 대체 */}
      {/* <div className={styles.dogImg} style={{ backgroundImage: `url(${dog.image})` }} /> */}
      <div className={styles.dogImg} />
      <div className={styles.contentSection}>
        <div className={styles.contentLeft}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >실종 지역</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.missCity + ' ' + dog.missGu + ' ' + dog.missDong}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 날짜</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.missDate}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 시간</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.missTime}</Typo>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >특징</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.etc}</Typo>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function LostDogList() {

  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setDogs(await getStrayDogs());
    };
    getData();
  },[]);

  // useEffect(() => {
  //   console.log('dogs',dogs)
  // },[dogs])


  return (
    <div className={styles.pageLayout}>
      <Typo variant="t2" bold color="black">가족을 찾고있어요</Typo>
      <div className={styles.dogList}>
        {dogs.map((dog: DogInfo) => {
          return <DogCard dog={dog} key={dog.petId} />
        })}
      </div>
    </div>
  )
}