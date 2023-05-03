"use client";

import bgImg from '@assets/png/main/heroBannerBgImg.png';
import Typo from '@components/core/Typo';
import { useDevice } from 'src/logics/hooks/useDevice';
// import ArrowRight from '@assets/svg/arrow-right-long.svg';
import styles from './styles.module.scss';


export default function HeroBanner() {
  const device = useDevice();
  const reported = 0;
  const finded = 0;

  return (

    <div className={styles.heroBannerContainer} style={{ backgroundImage: `url(${bgImg.src})` }}>

      <div>
        <Typo variant={device === 'mobile' ? "h6" : "h2"} bold color="white">
          <>
            소중한 나의 반려견,
            <br />
            <Typo variant={device === 'mobile' ? "h6" : "h2"} bold color="#0074DD" style={{ display: 'inline' }}>
              비문
            </Typo>
            등록부터 함께해요.
          </>
        </Typo>
        <Typo variant='caption' bold color="#606060" className={styles.footprint}>
          Q. 비문이 뭔가요?
        </Typo>
        {/* <ArrowRight /> */}
      </div>


      <div>
        <Typo variant='t3' color="#5B5B5B">
          <>
            오늘 신고된 강아지{' '}
            <Typo variant="t2" bold color="#0074DD" style={{ display: 'inline' }}>
              {reported.toString()}
            </Typo>
            마리
          </>
        </Typo>
        <Typo variant='t3' color="#5B5B5B">
          <>
            오늘 찾은 강아지{' '}
            <Typo variant="t2" bold color="#0074DD" style={{ display: 'inline' }}>
              {finded.toString()}
            </Typo>
            마리
          </>
        </Typo>
      </div>
    </div>

  )
}