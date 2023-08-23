// 유기견 게시판 페이지
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStrayDogs } from "@src/logics/axios";
import { DogInfo } from "@src/types/dogInfo";
import Typo from "@components/core/Typo";
import ArrowRight from "@assets/svg/main/arrow-right.svg";
import Bullhorn from "@assets/svg/main/bullhorn.svg";
import styles from "./styles.module.scss";

interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <img alt="dog-image" src={dog.imgUrl} className={styles.dogImg} />
      <div className={styles.dogInfo}>
        <Typo
          variant="footnote"
          color="#0074DD"
          style={{ marginRight: "10px" }}
        >
          실종 지역
        </Typo>
        <Typo variant="footnote" color="black">
          {dog.missingCity + " " + dog.missingGu + " " + dog.missingDong}
        </Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo
          variant="footnote"
          color="#0074DD"
          style={{ marginRight: "10px" }}
        >
          실종 시점
        </Typo>
        <Typo variant="footnote" color="black">
          {dog.missDate?.replaceAll("-", "/")}
        </Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo
          variant="footnote"
          color="#0074DD"
          style={{ marginRight: "10px" }}
        >
          실종 시각
        </Typo>
        <Typo variant="footnote" color="black">
          {dog.missTime}
        </Typo>
      </div>
    </div>
  );
};

export default function Lost() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setDogs(await getStrayDogs({}));
    };
    getData();
  }, []);

  return (
    <div className={styles.sectionLayout}>
      <Link href="/lost-dog-list">
        <div className={styles.titleSection}>
          <Bullhorn className={styles.bullhorn} />
          <div className={styles.underline}>
            <Typo variant="t3" color="#0074DD" bold className={styles.title}>
              <>
                가족
                <Typo variant="t3" color="black" style={{ display: "inline" }}>
                  을 찾고있어요
                </Typo>
              </>
            </Typo>
            <ArrowRight />
          </div>
        </div>
      </Link>

      <div className={styles.dogContainer}>
        <div className={styles.dogList}>
          {dogs.map((dog: DogInfo) => {
            return (
              <Link
                href={{
                  pathname: "/chatting",
                  query: {
                    id: dog.id,
                    state: "new",
                  },
                }}
                // as="/chatting"
                key={dog.id}
              >
                <DogCard dog={dog} key={dog.id} />
              </Link>

            );
          })}
        </div>
      </div>
    </div>
  );
}
