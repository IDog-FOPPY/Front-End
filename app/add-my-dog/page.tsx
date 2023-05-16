// 반려견 추가 페이지

import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import ArrowLeft from '@assets/svg/arrow-left.svg';
import Album from '@assets/svg/album.svg';


export default function AddMyDogPage() {
  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn} ><ArrowLeft /></div>
          <Typo variant="t2" bold color="black">반려견 등록하기</Typo>
          <Typo variant="t2" color="#0074DD" className={styles.completeBtn}>완료</Typo>
        </div>
        <div className={styles.contentLayout}>
          <div className={styles.contentEl}>
            <div className={styles.contentTitle}>
              <Typo variant="t3" bold color="black" >사진 등록</Typo>
              <Typo variant="footnote" color="#606060" style={{ marginLeft: '5px' }}>얼굴과 몸의 정면, 측면이 모두 나오면 좋아요!</Typo>
            </div>
            <div className={styles.imageBoxWrapper}>
              <div className={styles.addImageBox}>
                <Album />
                <Typo variant="footnote" color="#606060">
                  <>
                    <Typo variant="footnote" color="#0074DD" style={{ display: 'inline' }}> 0</Typo>   {/* 입력받은 이미지 개수대로 숫자 늘어나야함 */}
                    / 10
                  </>
                </Typo>
              </div>
              {/* <div className={styles.imageBox}>
                선택한 이미지 출력박스
              </div> */}
            </div>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="t3" bold color="black" >이름</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="t3" bold color="black" >나이</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="t3" bold color="black" >성별</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="t3" bold color="black" >견종</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="t3" bold color="black" >메모</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="t3" bold color="black" >질병</Typo>
          </div>

        </div>

      </div>
    </>

  )
}