import Typo from '@components/core/Typo';
import styles from './styles.module.scss';

export default function DogList() {

  return (
    <div className={styles.sectionLayout}>
      <Typo variant="t2" bold color="black">
        가족을 찾고있어요
      </Typo>
    </div>
  )
}