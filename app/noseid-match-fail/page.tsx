// 비문 탐색 결과 페이지 - 실패

import Link from 'next/link'
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';
import Sadface from '@assets/svg/noseMatch/sadface.svg';
import Arrow from '@assets/svg/noseMatch/arrow.svg';

export default function NoseIdMatchFailPage() {


  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />
        <Typo variant="t1" color="black" bold className={styles.title}>
          비문이 일치하는 강아지를 찾지 못했어요
          <Sadface style={{ marginLeft: "3px" }} />
        </Typo>

        <Link href={{ pathname: '/lost-dog-list' }}>
          <Typo variant="t2" color="#606060" className={styles.subTitle}>
            유기견 게시판 가기
          </Typo>
          <Arrow />
        </Link>

      </div>



    </>

  )
}