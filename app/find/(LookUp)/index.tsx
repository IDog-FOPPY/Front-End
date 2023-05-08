import Typo from '@components/core/Typo';
import styles from './styles.module.scss';
import album from '@assets/png/find/AlbumImage.png';
import ArrowRightLong from '@assets/svg/arrow-right-long.svg';

export default function LookUp() {

  return (
    <div className={styles.sectionLayout}>
      <Typo variant="t2" bold color="black">비문 조회하기</Typo>
      <div className={styles.camBox}>
        <div className={styles.album} style={{ backgroundImage: `url(${album.src})` }} />
        <Typo variant="footnote" color="#979696">FOPPY에 등록된 강아지인지 확인할 수 있어요!</Typo>
      </div>
      <div className={styles.camBoxCaption}>
        <Typo variant="footnote" color="#606060" className={styles.caption}>
          <>
            비문 조회 없이 유기견 게시판 가기
            <ArrowRightLong />
          </>
        </Typo>
      </div>
    </div>
  )
}