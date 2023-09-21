import Typo from '@src/components/core/Typo';
import styles from './styles.module.scss';

export default function LoginFailedPopup ({ onClick }:{ onClick: () => void }) {
  return(
    <div className={styles.loginFailedPopupBg} onClick={ onClick }>
      <div className={styles.popup}>
        <Typo variant="caption" bold color="rgba(0, 116, 221, 1)">
          고객님의 정보와 일치하는 계정이 존재하지 않습니다.
        </Typo>
        <Typo variant="caption" color="white" style={{marginTop: 20}} className={styles.searchBtn}>
          아이디 찾기
        </Typo>
        <Typo variant="caption" color="white" className={styles.searchBtn}>
          비밀번호 찾기
        </Typo>
      </div>
    </div>
  )
}