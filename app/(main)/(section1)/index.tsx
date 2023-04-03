import bgImg from '@assets/png/main/heroBannerBgImg.png';
import Typo from '@components/core/Typo';
import styles from './styles.module.scss';

export default function HeroBanner () {
  return (
    <div className={styles.heroBannerContainer} style={{backgroundImage: `url(${bgImg.src})`}}>
      <Typo variant="h2" color="white">
        <>
          소중한 나의 반려견, 
          <br/> 
          <Typo variant="h2" color="blue">
            비문
          </Typo>
          등록부터 함께해요.
        </>
      </Typo>
    </div>
  )
}