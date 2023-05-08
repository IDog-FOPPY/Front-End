import Typo from '@components/core/Typo';
import styles from './styles.module.scss';
import dogEx from '@assets/png/dog-example.png';


const DogList: Dog[] = [
  { image: dogEx.src, location: '송파구 문정동 장지동주민센터', date: '23/02/26', time: '13:30', feature: '하네스가 분홍색임' },
  { image: dogEx.src, location: '부평구 삼산동 현대아파트 401동 놀이터', date: '23/02/26', time: '13:30', feature: '사람을 보면 물어요' },
  { image: dogEx.src, location: '송파구 방이동', date: '23/02/26', time: '13:30', feature: '하네스가 분홍색임 너무귀여워요 찾아주세요 제발제발제발' },
  { image: dogEx.src, location: '송파구 방이동', date: '23/02/26', time: '13:30', feature: '하네스가 분홍색임' },
  { image: dogEx.src, location: '송파구 방이동 희망어린이공원', date: '23/02/26', time: '13:30', feature: '하네스가 분홍색임' },
]

interface Dog {
  image: string;
  location: string;
  date: string;
  time: string;
  feature: string;
}

interface DogCardProps {
  dog: Dog;
}


const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <div className={styles.dogImg} style={{ backgroundImage: `url(${dog.image})` }} />
      <div className={styles.contentSection}>
        <div className={styles.contentLeft}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >실종 지역</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.location}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 날짜</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.date}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 시간</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.time}</Typo>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >특징</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.feature}</Typo>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function LostDogList() {

  return (
    <div className={styles.sectionLayout}>
      <Typo variant="t2" bold color="black">가족을 찾고있어요</Typo>
      <div className={styles.dogList}>
        {DogList.map((dog: Dog) => {
          return <DogCard dog={dog} key={dog.image} />
        })}
      </div>
    </div>
  )
}