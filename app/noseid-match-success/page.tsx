"use client";

// 비문 탐색 결과 페이지 - 성공
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import { getMyDog } from '@src/logics/axios';
import { DogInfo } from '@src/types/dogInfo';
import styles from './styles.module.scss';
import Link from "next/link";


// dogId 쿼리에 담기위한 변수
var id = 0;


interface DogCardProps {
  dog: DogInfo;
}

function DogCard(props: DogCardProps) {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      {dog.imgUrlList && dog.imgUrlList.length > 0 && <img className={styles.dogImg} src={dog.imgUrlList[0]} />}
      {/* <div className={styles.dogImg} style={{ backgroundImage: `url(${dog.img.src})` }} /> */}
      {/* <div className={styles.dogImg} /> */}
      <div className={styles.contentSection}>
        <div className={styles.contentLeft}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >실종 지역</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.missingCity + ' ' + dog.missingGu + ' ' + dog.missingDong}</Typo>
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

export default function NoseIdMatchSuccessPage() {

  const [dogs, setDogs] = useState<DogInfo[]>();
  const petId = typeof window !== 'undefined' ? useSearchParams().get("petId")?.split(',') : null;

  useEffect(() => {
    if (petId && petId.length > 0) {


      // map 사용할경우 순서보장 안됨

      // const getDogs = () => {
      //   const temp: DogInfo[] = [];
      //   petId.map(async (v) => {
      //     if (v.length > 0) {
      //       const appendDog = await getMyDog({ petId: parseInt(v) });

      //       temp.push(appendDog);
      //       console.log("v ==> ", v, "temp ==> ", temp);
      //     }
      //     setDogs(temp);
      //   });

      // }



      // for문 사용하면 속도는 느리지만 순서보장됨
      const getDogs = async () => {
        const temp: DogInfo[] = [];


        for (let i = 0; i < petId.length; i++) {
          const appendDog = await getMyDog({ petId: parseInt(petId[i]) });
          temp.push(appendDog);
          setDogs(temp);
        }
      }


      getDogs();
    }
  }, [])

  useEffect(() => {
    console.log('dogs', dogs)
    console.log('petId', petId);
  }, [dogs])



  return (
    <div className={styles.pageLayout}>
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

      {dogs?.map(dog => {


        console.log("petId[" + id + "]", petId ? petId[id] : null);
        console.log("map횟수", id);
        id++;



        return (


          <Link
            href={{
              pathname: "/chatting",
              query: {
                id: petId ? petId[id - 1] : null,
                state: "new",
              },
            }}
          //key={el.id}
          >
            <DogCard dog={dog} key={dog.name} />
          </Link>
        )

      }
      )}
    </div>
  )
}