// 유기견 게시판 페이지

import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import ArrowRight from '@assets/svg/arrow-right.svg';
import Bullhorn from '@assets/svg/bullhorn.svg';
import dogEx from '@assets/png/dog-example.png';
import Link from 'next/link'


const DogList: Dog[] = [
  { image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30' },
  { image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30' },
  { image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30' },
  { image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30' },
  { image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30' },
]

interface Dog {
  image: string;
  location: string;
  time: string;
}

interface DogCardProps {
  dog: Dog;
}



const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <div className={styles.dogImg} style={{ backgroundImage: `url(${dog.image})` }} />
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD">실종 지역</Typo>
        <Typo variant="footnote" color="black">{dog.location}</Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD">실종 시점</Typo>
        <Typo variant="footnote" color="black">{dog.time}</Typo>
      </div>
    </div>
  )
}

export default function Lost() {
  return (
    <div className={styles.sectionLayout}>
      <Link href="/lost-dog-list">
        <div className={styles.titleSection}>
          <Bullhorn className={styles.bullhorn} />
          <div className={styles.underline}>
            <Typo variant="t3" color="#0074DD" bold className={styles.title}>
              <>
                가족
                <Typo variant="t3" color="black" style={{ display: 'inline' }}>
                  을 찾고있어요
                </Typo>
              </>
            </Typo>
            <ArrowRight />
          </div>
        </div>
      </Link>

      <div className={styles.dogList}>
        {DogList.map((dog: Dog) => {
          return <DogCard dog={dog} key={dog.image} />
        })}
      </div>
    </div>
  )
}