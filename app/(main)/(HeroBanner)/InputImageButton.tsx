"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Link from 'next/link';
import Typo from "@components/core/Typo";
import ArrowRightBlue from "@assets/svg/main/arrow-right-blue.svg";
import Emergency from "@assets/svg/main/emergency.svg";
import { postNoseIdent } from "@src/logics/axios";
import styles from "./styles.module.scss";

export default function InputImageButton() {
  const [img, setImage] = useState<FileList | null>();
  const router = useRouter();

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files;
    setImage(file);
  };

  useEffect(() => {
    if (img) {
      const post = async () => {
        const res = await postNoseIdent(img[0]);
        // const res = {dogID:[6,7,6], top_3:[]}; // 임시
        console.log('res', res.data);
        if (res?.data?.length > 0) {
          console.log('success!');
          const dogList = res.data.map((el: any) => {
            return el.dog_id
          });
          router.push(`/noseid-match-success?petId=${dogList}`)
        } else {
          console.log('fail!');
          router.push(`/noseid-match-fail`);
        }
      };
      post();
    }
  }, [img]);

  return (
    <div className={styles.lookUpButton}>
      <input type="file" onChange={onLoadFile} accept="image/*" />
      <Emergency />
      <div className={styles.textContainer}>
        <Typo bold color="#606060" className={styles.text}>
          유기견을 발견했어요
          <Typo
            variant="footnote"
            color="#0074DD"
            className={styles.textFootnote}
            bold
          >
            비문 조회하러 가기 <ArrowRightBlue />
          </Typo>
        </Typo>
      </div>
    </div>
  );
}
