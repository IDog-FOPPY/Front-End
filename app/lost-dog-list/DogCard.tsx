import Typo from "@src/components/core/Typo";
import { DogInfo } from "@src/types/dogInfo";
import styles from './styles.module.scss';

interface DogCardProps {
  dog: DogInfo;
}

export default function DogCard(props: DogCardProps) {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <img src={dog.imgUrl} className={styles.dogImg} />
      <div className={styles.contentSection}>
        <div className={styles.contentLeft}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >실종 지역</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.missingCity + ' ' + dog.missingGu + ' ' + dog.missingDong}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 날짜</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.missDate}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 시간</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.missTime}</Typo>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >특징</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.etc}</Typo>
          </div>
        </div>
      </div>
    </div>
  )
}