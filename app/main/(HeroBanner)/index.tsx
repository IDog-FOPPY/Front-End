"use client";

import Link from "next/link";
import { useDevice } from "@src/logics/hooks/useDevice";
import Typo from "@components/core/Typo";
import bgImg from "@assets/png/main/heroBannerBgImg.png";
import ArrowRightMiddle from "@assets/svg/main/arrow-right-middle.svg";
import InputImageButton from "./InputImageButton";
import styles from "./styles.module.scss";

export default function HeroBanner() {
  const device = useDevice();

  return (
    <div
      className={styles.heroBannerContainer}
      style={{ backgroundImage: `url(${bgImg.src})` }}
    >
      <Link href="/guide" style={{ width: "100%" }}>
        <div>
          <Typo
            variant={device === "mobile" ? "h6" : "h2"}
            bold
            color="#FFFCF0"
          >
            소중한 나의 반려견,
            <br />
            <Typo
              variant={device === "mobile" ? "h6" : "h2"}
              bold
              color="#0074DD"
              style={{ display: "inline" }}
            >
              비문
            </Typo>
            등록부터 함께해요.
          </Typo>
          <Typo variant="footnote" color="#606060" className={styles.footprint}>
            Q. 비문이 뭔가요?
            <ArrowRightMiddle />
          </Typo>
        </div>
      </Link>
      <InputImageButton />
    </div>
  );
}
