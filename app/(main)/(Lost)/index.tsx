// 유기견 게시판 페이지

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image';
import Typo from '@components/core/Typo';
import ArrowRight from '@assets/svg/arrow-right.svg';
import Bullhorn from '@assets/svg/bullhorn.svg';
import dogEx from '@assets/png/dog-example.png';
import styles from './styles.module.scss';

const DogList: Dog[] = [
  { id: 0, image: dogEx, location: '송파구 방이동', time: '23/02/26 13:30' },
  { id: 1, image: dogEx, location: '송파구 방이동', time: '23/02/26 13:30' },
  { id: 2, image: dogEx, location: '송파구 방이동', time: '23/02/26 13:30' },
  { id: 3, image: dogEx, location: '송파구 방이동', time: '23/02/26 13:30' },
  { id: 4, image: dogEx, location: '송파구 방이동', time: '23/02/26 13:30' },
]

interface Dog {
  id: number;
  image: StaticImageData;
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
      <Image alt="dog-image" src={dog.image} className={styles.dogImg} />
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD" style={{marginRight: '10px'}}>실종 지역</Typo>
        <Typo variant="footnote" color="black">{dog.location}</Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD" style={{marginRight: '10px'}}>실종 시점</Typo>
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

      <div className={styles.dogContainer}>
        <div className={styles.dogList}>
          {DogList.map((dog: Dog) => {
            return <DogCard dog={dog} key={dog.id} />
          })}
        </div>
      </div>
    </div>
  )
}