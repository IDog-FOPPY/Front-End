// 비문 탐색 결과 페이지 - 실패

import Link from 'next/link'
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import Sadface from '@assets/svg/noseMatch/sadface.svg';
import Arrow from '@assets/svg/noseMatch/arrow.svg';

export default function CannotFindNosePage() {

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />
        <Typo variant="h6" color="black" bold className={styles.title}>
          비문이 인식되지 않아요
          <Sadface style={{ marginLeft: "3px" }} />
        </Typo>
        <Typo variant="t1" color="black" bold >
          코를 중심에 두고 얼굴이 나오게 촬영해주세요
        </Typo>
        <Link href={{ pathname: '/lost-dog-list' }}>
          <Typo variant="t2" color="#606060" className={styles.subTitle}>
            비문 조회 다시하기
          </Typo>
          <Arrow />
        </Link>
      </div>
    </>

  )
}