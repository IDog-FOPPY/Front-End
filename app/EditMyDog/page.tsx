// 반려견 추가 페이지

import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import ArrowLeft from '@assets/svg/arrow-left.svg';


export default function EditMyDogPage() {
  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn} ><ArrowLeft /></div>
          <Typo variant="t2" bold color="black">반려견 수정하기</Typo>
          <Typo variant="t2" color="#0074DD" className={styles.completeBtn}>완료</Typo>
        </div>
        <div className={styles.contentLayout}>
          // Link 태그로 props 넘겨받아서 데이터 미리 입력된 페이지 출력
        </div>

      </div>
    </>

  )
}