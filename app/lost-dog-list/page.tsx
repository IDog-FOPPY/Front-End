// 유기견 게시판 페이지
"use client";

import { useEffect, useState } from 'react';
import Typo from '@components/core/Typo';
import Link from 'next/link'
import { getStrayDogs } from '@src/logics/axios';
import { DogInfo } from '@src/types/dogInfo';
import styles from './styles.module.scss';
import Image, { StaticImageData } from 'next/image';
import AddressDropdown from '@src/components/modules/AddressDropdown';
import DropdownIcon from '@assets/svg/register/dropdown.svg';

import "dayjs/locale/ko";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ko_KR";
import { DatePicker } from "antd";
import DogCard from './DogCard';
const dateFormat = "MM/DD";

export default function LostDogList() {
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [breed, setBreed] = useState("");
  const [missDate, setMissDate] = useState<Dayjs>();
  const [dateFormat, setDateFormat] = useState("");
  const [dogs, setDogs] = useState([]);


  const onComplete = async () => {
    if (missDate === undefined) {
      setDogs(await getStrayDogs({
        breed: breed,
        missingGu: addr2,
        startDate: undefined
      }))
    }
    else {

      setDogs(await getStrayDogs({
        breed: breed,
        missingGu: addr2,
        startDate: missDate.format("YYYY-MM-DD")
      }))

    }
  }

  useEffect(() => {
    const getData = async () => {

      setDogs(await getStrayDogs({}));
    };
    getData();
  }, []);

  useEffect(() => {
    console.log('dogs', dogs)
  }, [dogs])

  const [isAddrOpen, setIsAddrOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);
  const breedEl = [
    "골든리트리버",
    "닥스훈트",
    "달마시안",
    "도베르만핀셔",
    "래브라도리트리버",
    "말티즈",
    "말티푸",
    "미니어처슈나우저",
    "미니어처푸들",
    "미니어처핀셔",
    "믹스견",
    "베들링턴 테리어",
    "보더콜리",
    "보스턴테리어",
    "비글",
    "비숑프리제",
    "사모예드",
    "셰틀랜드쉽독",
    "스탠더드푸들",
    "스피츠",
    "시바이누",
    "시베리안허스키",
    "시츄",
    "아메리칸코카스파니엘",
    "아프간하운드",
    "요크셔테리어",
    "웰시코기",
    "이탈리안그레이하운드",
    "제페니스스피츠",
    "진돗개",
    "차우차우",
    "치와와",
    "코커스패니얼",
    "토이푸들",
    "파피용",
    "퍼그",
    "페키니즈",
    "펨브록웰시코기",
    "포메라니안",
    "푸들",
    "풍산개",
    "프렌치불도그",
    "직접 입력",
  ];

  const addrTextReturnTwo = (text1: string, text2: string) => {
    setAddr1(text1);
    setAddr2(text2);
    console.log("addr2", addr2);
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
            <Typo variant="caption" color="white" className={styles.searchBox} onClick={() => onComplete()} >
              조회
            </Typo>
          </div>

        </div>
        {
          isAddrOpen ?
            <AddressDropdown pageTitle="lostDogPage" addrTextReturnTwo={addrTextReturnTwo} />
            : null
        }
      </div>
      <div className={styles.dogList}>
        {dogs &&
          dogs.map((dog: DogInfo) => {
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

            )
          })}
      </div>
    </div>
  )
}