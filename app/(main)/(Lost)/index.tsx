// 유기견 게시판 페이지

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image';
import Typo from '@components/core/Typo';
import ArrowRight from '@assets/svg/main/arrow-right.svg';
import Bullhorn from '@assets/svg/main/bullhorn.svg';
import dogEx from '@assets/png/dog-example.png';
import styles from './styles.module.scss';
import { DogInfo } from '@src/types/dogInfo';


const DogList: DogInfo[] = [
  { id: 0, img: dogEx, lostDate: '23/02/26', lostTime: '13:30' },
  { id: 1, img: dogEx, lostDate: '23/02/26', lostTime: '13:30' },
  { id: 2, img: dogEx, lostDate: '23/02/26', lostTime: '13:30' },
  { id: 3, img: dogEx, lostDate: '23/02/26', lostTime: '13:30' },
  { id: 4, img: dogEx, lostDate: '23/02/26', lostTime: '13:30' },
  { id: 5, img: dogEx, lostDate: '23/02/26', lostTime: '13:30' },
]


interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <Image alt="dog-image" src={dog.img} className={styles.dogImg} />
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD" style={{ marginRight: '10px' }}>실종 지역</Typo>
        <Typo variant="footnote" color="black">주소주소주소</Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD" style={{ marginRight: '10px' }}>실종 날짜</Typo>
        <Typo variant="footnote" color="black">{dog.lostDate}</Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo variant="footnote" color="#0074DD" style={{ marginRight: '10px' }}>실종 시각</Typo>
        <Typo variant="footnote" color="black">{dog.lostTime}</Typo>
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
          {DogList.map((dog: DogInfo) => {
            return <DogCard dog={dog} key={dog.id} />
          })}
        </div>
      </div>
    </div>
  )
}