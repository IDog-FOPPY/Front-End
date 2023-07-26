"use client";

// 비문 탐색 결과 페이지 - 성공
import { useEffect, useState } from 'react';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import styles from './styles.module.scss';
import { useSearchParams } from 'next/navigation';
import { getMyDog } from '@src/logics/axios';
import { DogInfo } from '@src/types/dogInfo';

import dummy1 from './dummy1.jpg';
import dummy2 from './dummy2.jpg';
import dummy3 from './dummy3.jpg';


// import DogCard from 'app/lost-dog-list/DogCard';

interface DogCardProps {
  dog: DogInfo;
}

function DogCard (props: DogCardProps) {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <div className={styles.dogImg} style={{ backgroundImage: `url(${dog.img.src})` }} />
      {/* <div className={styles.dogImg} /> */}
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

export default function NoseIdMatchSuccessPage () {
  const dogs = [
    {petId: 1, img: dummy1, missCity: '서울특별시', missGu: '동작구', missDong: '상도동', missDate: '2023/06/17', missTime: "23:00" },
    {petId: 2, img: dummy2, missCity: '서울특별시', missGu: '동작구', missDong: '상도동', missDate: '2023/06/17', missTime: "23:00" },
    {petId: 3, img: dummy3, missCity: '서울특별시', missGu: '동작구', missDong: '상도동', missDate: '2023/06/17', missTime: "23:00" },
  ]
  // const [dogs, setDogs] = useState<DogInfo[]>();
  const petId = useSearchParams().get("petId")?.split(',');

  // useEffect(() => {
  //   console.log('petID',petId)
  //   if (petId) {
  //     const getDogs = () => {
  //       petId.map(async (v) => {
  //         const appendDog = await getMyDog({ petId: parseInt(v) });
  //         console.log('appendDog',appendDog)
  //         setDogs(prev => {
  //           if(prev) return [...prev, appendDog];
  //           else return [appendDog];
  //         });
  //       })
  //     }
  //     getDogs();
  //   }
  // }, [])

  return (
    <div>
      <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />
      <Typo variant="h6" color="black" bold className={styles.title}>
        비문이 유사한 강아지를 찾았어요!
      </Typo>
      <Typo variant="caption" color="#606060" className={styles.subTitle}>
        강아지를 선택하면 주인과의 채팅창으로 연결돼요
      </Typo>
      <Typo variant="caption" color="#606060" className={styles.subTitle} style={{ textDecoration: "underline" }}>
        비문 유사도가 높은 순서대로 정렬되어 있어요
      </Typo>
      {dogs?.map(dog => <DogCard dog={dog} key={dog.petId} />)}
    </div>
  )
}