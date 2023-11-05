// 가이드 페이지

import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";
import logo from "@assets/Logo.png";

export default function GuidePage() {
  return (
    <>
      <div
        className={styles.logo}
        style={{ backgroundImage: `url(${logo.src})` }}
      />
      <Typo variant="t1" color="black">
        가이드 페이지 추후구현 예정
      </Typo>
    </>
  );
}
