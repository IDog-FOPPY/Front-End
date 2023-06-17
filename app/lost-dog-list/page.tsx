// 유기견 게시판 페이지
"use client";

import { useState, useEffect } from 'react';
import Typo from '@components/core/Typo';
import styles from './styles.module.scss';
import dogEx from '@assets/png/dog-example.png';
import { DogInfo } from '@src/types/dogInfo';
import Image, { StaticImageData } from 'next/image';
import AddressDropdown from '@src/components/modules/AddressDropdown';
import DropdownIcon from '@assets/svg/register/dropdown.svg';


import "dayjs/locale/ko";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ko_KR";
import { DatePicker } from "antd";
const dateFormat = "MM/DD";



const DogList: DogInfo[] = [
  { id: 1, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
  { id: 2, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
  { id: 3, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
  { id: 4, img: dogEx, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" },
]
interface DogCardProps {
  dog: DogInfo;
}

const DogCard = (props: DogCardProps) => {
  const { dog } = props;

  return (
    <div className={styles.dogCard}>
      <Image alt="dog-image" src={dog.img} className={styles.dogImg} />
      <div className={styles.contentSection}>
        <div className={styles.contentLeft}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >실종 지역</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>주소주소주소</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 날짜</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.lostDate}</Typo>
          </div>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD">실종 시간</Typo>
            <Typo variant="footnote" color="black" className={styles.content}>{dog.lostTime}</Typo>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.contentEl}>
            <Typo variant="footnote" color="#0074DD" >특징</Typo>
            <Typo variant="footnote" color="black" className={styles.content} style={{ whiteSpace: 'normal' }}>{dog.lostFeat}</Typo>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function LostDogList() {
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [breed, setBreed] = useState("");
  const [missDate, setMissDate] = useState<Dayjs>();
  // console.log("day", missDate?.format("YYYY-MM-DD"))
  const [isAddrOpen, setIsAddrOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);
  const breedEl = [
    "골든 리트리버",
    "닥스훈트",
    "달마시안",
    "도베르만 핀셔",
    "래브라도 리트리버",
    "말티즈",
    "말티푸",
    "미니어처 슈나우저",
    "미니어처 푸들",
    "미니어처 핀셔",
    "믹스견",
    "베들링턴 테리어",
    "보더콜리",
    "보스턴 테리어",
    "비글",
    "비숑 프리제",
    "사모예드",
    "셰틀랜드 쉽독",
    "스탠더드 푸들",
    "스피츠",
    "시바 이누",
    "시베리안 허스키",
    "시츄",
    "아메리칸 코카 스파니엘",
    "아프간하운드",
    "요크셔 테리어",
    "웰시 코기",
    "이탈리안 그레이하운드",
    "제페니스 스피츠",
    "진돗개",
    "차우차우",
    "치와와",
    "코커 스패니얼",
    "토이 푸들",
    "파피용",
    "퍼그",
    "페키니즈",
    "펨브록 웰시코기",
    "포메라니안",
    "푸들",
    "풍산개",
    "프렌치 불도그",
    "직접 입력",
  ];

  const addrTextReturn = (text1: string, text2: string) => {
    setAddr1(text1);
    setAddr2(text2);
  };

  useEffect(() => {
    setIsAddrOpen(false);
  }, [addr2]);

  const BreedDropdown = () => {
    if (isBreedOpen === true)
      return (
        <div className={styles.dropdown}>
          {breedEl.map((e) => {
            return (
              <div
                className={styles.dropdownEl}
                onClick={() => {
                  setIsBreedOpen(false);
                  setBreed(e);
                }}
                key={e}
              >
                <Typo color="black" variant="caption">
                  {e}
                </Typo>
              </div>
            );
          })}
        </div>
      );
    else return <div></div>;
  };




  return (
    <div className={styles.pageLayout}>
      <Typo variant="t2" bold color="black">가족을 찾고있어요</Typo>
      <div>
        <div className={styles.sortDogWrapper}>

          <div className={styles.sortDog} onClick={() => { setIsAddrOpen(true); }}>
            <Typo variant="caption" color="#606060" className={styles.content} >
              {addr2 === '' ? '전체 지역' : addr2}
            </Typo>
            <DropdownIcon className={styles.dropdownIcon} />
          </div>

          <div >
            <DatePicker
              locale={locale}
              placeholder="전체 날짜"
              format={dateFormat}
              className={styles.antPickerStyle}
              onChange={(date) => date && setMissDate(date)}
            />
          </div>

          <div>
            <div className={styles.sortDog} onClick={() => setIsBreedOpen(true)}>
              <Typo variant="caption" color="#606060" className={styles.content}>
                {breed === '' ? '전체 견종' : breed}
              </Typo>
              <DropdownIcon className={styles.dropdownIcon} />
            </div>
            <BreedDropdown />
          </div>

          <div>
            <Typo variant="caption" color="white" className={styles.searchBox}>
              조회
            </Typo>
          </div>

        </div>
        {
          isAddrOpen ?
            <AddressDropdown pageTitle="lostDogPage" addrTextReturn={addrTextReturn} />
            : null
        }


      </div>
      <div className={styles.dogList}>
        {DogList.map((dog: DogInfo) => {
          return <DogCard dog={dog} key={dog.id} />
        })}
      </div>
    </div>
  )
}