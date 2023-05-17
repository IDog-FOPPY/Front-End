"use client";

import bgImg from '@assets/png/main/heroBannerBgImg.png';
import ArrowRightBlue from '@assets/svg/main/arrow-right-blue.svg';
import Typo from '@components/core/Typo';
import { useDevice } from 'src/logics/hooks/useDevice';
import ArrowRightMiddle from '@assets/svg/main/arrow-right-middle.svg';
import Emergency from '@assets/svg/main/emergency.svg';
import styles from './styles.module.scss';


export default function HeroBanner() {
  const device = useDevice();

  return (
    <div className={styles.heroBannerContainer} style={{ backgroundImage: `url(${bgImg.src})` }}>

      <div>
        <Typo variant={device === 'mobile' ? "h6" : "h2"} bold color="#FFFCF0">
          <>
            소중한 나의 반려견,
            <br />
            <Typo variant={device === 'mobile' ? "h6" : "h2"} bold color="#0074DD" style={{ display: 'inline' }}>
              비문
            </Typo>
            등록부터 함께해요.
          </>
        </Typo>
        <Typo variant='footnote' color="#606060" className={styles.footprint}>
          <>
            Q. 비문이 뭔가요?
            <ArrowRightMiddle />
          </>
        </Typo>

      </div>


      <div className={styles.lookUpButton}>
        <Emergency />
        <div className={styles.textContainer}>
          <Typo bold color='#606060' className={styles.text} >
            <>
              유기견을 발견했어요
              <Typo variant='footnote' color='#0074DD' className={styles.textFootnote}>
                <>
                  비문 조회하러 가기{' '}
                  <ArrowRightBlue />
                </>
              </Typo>
            </>
          </Typo>
        </div>
      </div>


    </div>

  )
}