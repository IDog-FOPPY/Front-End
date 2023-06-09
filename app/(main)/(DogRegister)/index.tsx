"use client";

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import Paw from '@assets/svg/main/paw.svg';
import dog1 from '@assets/png/main/dog1.png';
import dog2 from '@assets/png/main/dog2.png';
import ArrowRight from '@assets/svg/main/arrow-right.svg';
import { DogInfo } from '@src/types/dogInfo';


const DogList: DogInfo[] = [
  { id: 1, img: dog1, name: "코코", reported: true, age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기" },
  { id: 2, img: dog2, name: "코쿤", reported: false, age: 1, sex: "여아", neutered: false, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "" }
]

interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  const renderReported = () => {
    if (dog.reported === true)
      return (
        <div >
          <Typo variant="footnote" color="white" className={styles.reported} >실종신고</Typo>
        </div>
      )
    else return;
  }

  const renderNeutered = () => {
    if (dog.neutered === true) return (
      <Typo variant="footnote" color="#0074DD" className={styles.neutered} >중성화 O</Typo>
    )
    else return (
      <Typo variant="footnote" color="#0074DD" className={styles.neutered} >중성화 X</Typo>
    )
  }

  return (



    <div className={styles.dogCard}>
      <Image alt="dog-image" src={dog.img} className={styles.dogImg} />
      <div className={styles.dogInfo}>

        <div className={styles.headerSection}>
          <Typo variant="t1" bold color="black">{dog.name}</Typo>
          {renderReported()}
        </div>

        <div className={styles.contentSection}>
          <div className={styles.contentLeft}>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD" >나이</Typo>
              <Typo variant="footnote" color="black" className={styles.content}>
                <>
                  {dog.age}세
                </>
              </Typo>
            </div>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">성별</Typo>
              <Typo variant="footnote" color="black" className={styles.content}>{dog.sex}</Typo>
              <div>
                {renderNeutered()}
              </div>

            </div>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">견종</Typo>
              <Typo variant="footnote" color="black" className={styles.content}>{dog.breed}</Typo>
            </div>
          </div>


          <div className={styles.contentRight}>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD" >메모</Typo>
              <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.memo}</Typo>
            </div>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">질병</Typo>
              <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.disease}</Typo>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}



export default function DogRegister() {


  return (
    <div className={styles.sectionLayout}>

      <div className={styles.titleSection}>
        <Paw viewBox="0 0 24 24" className={styles.icon} />
        <div className={styles.titleWrapper}>
          <Typo variant="t3" color="black" style={{ display: 'inline' }} className={styles.title}>
            <>
              내{' '}
              <Typo variant="t3" bold color="#0074DD" style={{ display: 'inline' }}>반려견</Typo>
              을 등록할게요
            </>
          </Typo>
          <ArrowRight />
        </div>
      </div>

      <div className={styles.dogList}>
        {DogList.map((el: DogInfo) => {
          return (
            <Link href={{
              pathname: '/edit-my-dog',
              query: { id: el.id },
            }}
            >
              <DogCard dog={el} key={el.name} />
            </Link>
          )
        })}
      </div>

      <Link href="/add-my-dog">
        <div className={styles.addDog}>
          <Typo variant="h2" color="#9F9F9F">+</Typo>
        </div>
      </Link>
    </div>
  )
}