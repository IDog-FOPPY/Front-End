// 유기견 게시판 페이지

import Typo from '@components/core/Typo';
import styles from './styles.module.scss';
import dogEx from '@assets/png/dog-example.png';
import { DogInfo } from '@src/types/dogInfo';
import Image, { StaticImageData } from 'next/image';



const DogList: DogInfo[] = [
  { id: 1, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
  { id: 2, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
  { id: 3, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
  { id: 4, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
]
interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <Image alt="dog-image" src={dog.img} className={styles.dogImg} />
      <div className={styles.contentSection}>
        <div className={styles.contentLeft}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >실종 지역</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>주소주소주소</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 날짜</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.lostDate}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 시간</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.lostTime}</Typo>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >특징</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.lostFeat}</Typo>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function LostDogList() {

  return (
    <div className={styles.pageLayout}>
      <Typo variant="t2" bold color="black">가족을 찾고있어요</Typo>
      <div className={styles.dogList}>
        {DogList.map((dog: DogInfo) => {
          return <DogCard dog={dog} key={dog.id} />
        })}
      </div>
    </div>
  )
}