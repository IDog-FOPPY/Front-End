// 비문 탐색 결과 페이지 - 성공

import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';

export default function NoseIdMatchSuccessPage() {


  return (
    <>
      <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />
      <Typo variant="h6" color="black" bold className={styles.title}>
        비문이 일치하는 강아지를 찾았어요!
      </Typo>
      <Typo variant="caption" color="#606060" className={styles.subTitle}>
        강아지를 선택하면 주인과의 채팅창으로 연결돼요
      </Typo>

    </>

  )
}