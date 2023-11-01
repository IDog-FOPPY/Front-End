"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Typo from "@components/core/Typo";
import Paw from "@assets/svg/main/paw.svg";
import ArrowRight from "@assets/svg/main/arrow-right.svg";
import { getDogs } from "@src/logics/axios";
import { DogInfo } from "@src/types/dogInfo";
import styles from "./styles.module.scss";

interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  const renderReported = () => {
    if (dog.isMissing === true)
      return (
        <div>
          <Typo variant="footnote" color="white" className={styles.reported}>
            실종신고
          </Typo>
        </div>
      );
    else return;
  };

  const renderNeutered = () => {
    if (dog.neutered === true)
      return (
        <Typo variant="footnote" color="#0074DD" className={styles.neutered}>
          중성화 O
        </Typo>
      );
    else
      return (
        <Typo variant="footnote" color="#0074DD" className={styles.neutered}>
          중성화 X
        </Typo>
      );
  };

  return (
    <div className={styles.dogCard}>
      <img alt="dog-image" src={dog.imgUrl} className={styles.dogImg} />
      <div className={styles.dogInfo}>
        <div className={styles.headerSection}>
          <Typo variant="t1" bold color="black">
            {dog.name}
          </Typo>
          {renderReported()}
        </div>

        <div className={styles.contentSection}>
          <div className={styles.contentLeft}>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">
                출생
              </Typo>
              <Typo variant="footnote" color="black" className={styles.content}>
                {dog.birth}
              </Typo>
            </div>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">
                성별
              </Typo>
              <Typo variant="footnote" color="black" className={styles.content}>
                {dog.sex === "MALE" ? "수컷" : "암컷"}
              </Typo>
              <div>{renderNeutered()}</div>
            </div>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">
                견종
              </Typo>
              <Typo variant="footnote" color="black" className={styles.content}>
                {dog.breed}
              </Typo>
            </div>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">
                메모
              </Typo>
              <Typo
                variant="footnote"
                color="black"
                className={styles.content}
                style={{ whiteSpace: "normal" }}
              >
                {dog.note}
              </Typo>
            </div>
            <div className={styles.contentEl}>
              <Typo variant="footnote" color="#0074DD">
                질병
              </Typo>
              <Typo
                variant="footnote"
                color="black"
                className={styles.content}
                style={{ whiteSpace: "normal" }}
              >
                {dog.disease}
              </Typo>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DogRegister() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setDogs(await getDogs());
    };

    const token = localStorage.getItem("foppy_auth_token");
    if (token) getData();
  }, []);

  return (
    <div className={styles.sectionLayout}>
      <div className={styles.titleSection}>
        <Paw viewBox="0 0 24 24" className={styles.icon} />
        <div className={styles.titleWrapper}>
          <Typo
            variant="t3"
            color="black"
            style={{ display: "inline" }}
            className={styles.title}
          >
            <>
              내{" "}
              <Typo
                variant="t3"
                bold
                color="#0074DD"
                style={{ display: "inline" }}
              >
                반려견
              </Typo>
              을 등록할게요
            </>
          </Typo>
          <ArrowRight />
        </div>
      </div>

      <div className={styles.dogList}>
        {dogs.length > 0 &&
          dogs?.map((el: DogInfo) => {
            return (
              <Link
                href={{
                  pathname: "/edit-my-dog",
                  query: { id: el.id },
                }}
                key={el.id}
              >
                <DogCard dog={el} key={el.id} />
              </Link>
            );
          })}
      </div>

      <Link href="/add-my-dog">
        <div className={styles.addDog}>
          <Typo variant="h2" color="#9F9F9F">
            +
          </Typo>
        </div>
      </Link>
    </div>
  );
}
