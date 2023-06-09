"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Typo from "@components/core/Typo";
import { DogInfo } from "@src/types/dogInfo";
import ArrowLeft from "@assets/svg/register/arrow-left.svg";
import Album from "@assets/svg/register/album.svg";
import DropdownIcon from "@assets/svg/register/dropdown.svg";
import PawIcon from "@assets/svg/register/paw.svg";
import styles from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";
import AddressDropdown from "@src/components/modules/AddressDropdown";

import "dayjs/locale/ko";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
// import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
// import generatePicker from 'antd/es/date-picker/generatePicker'
// const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
import locale from "antd/es/date-picker/locale/ko_KR";
import { TimePicker } from "antd";
import { DatePicker } from "antd";
const timeFormat = "HH:mm";
const dateFormat = "YY/MM/DD";

interface InputDogdogInfo {
  pageTitle: string;
  dogInfo?: DogInfo;
}
export default function InputDog(props: InputDogdogInfo) {
  const { pageTitle, dogInfo } = props;
  const ageEl = [...Array(21)];
  const sexEl = ["남아", "여아"];
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
  const [isSexOpen, setIsSexOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);
  const [age, setAge] = useState(dogInfo?.age);
  const [sex, setSex] = useState(dogInfo?.sex);
  const [breed, setBreed] = useState(dogInfo?.breed);
  const [reported, setReported] = useState(dogInfo?.reported);
  const [img, setImage] = useState<File[]>([]);
  const [imgNum, setImgNum] = useState(0);

  useEffect(() => {
    console.log("img", img);
    if (img) setImgNum(img.length);
  }, [img]);

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (imgNum < 10) {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        let temp: File[] = img;
        setImage([...temp, ...files]);
      }
    } else alert("사진 업로드는 10장까지 가능해요!");
  };

  const removeImage = (index: number) => {
    const temp = img.filter((v, i) => i != index);
    setImage(temp);
  };

  const AgeDropdown = () => {
    if (isAgeOpen === true)
      return (
        <div className={styles.dropdown}>
          {ageEl.map((e, index) => {
            return (
              <div
                className={styles.dropdownEl}
                onClick={() => {
                  setIsAgeOpen(false);
                  setAge(index);
                }}
                key={index}
              >
                <Typo color="black" variant="caption">
                  {index}
                </Typo>
              </div>
            );
          })}
        </div>
      );
    else return <div></div>;
  };

  const SexDropdown = () => {
    if (isSexOpen === true)
      return (
        <div className={styles.dropdown} style={{ height: "auto" }}>
          {sexEl.map((e) => {
            return (
              <div
                className={styles.dropdownEl}
                onClick={() => {
                  setIsSexOpen(false);
                  setSex(e);
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

  const BreedDropdown = () => {
    if (isBreedOpen === true)
      return (
        <div className={styles.dropdown} style={{ width: "150px" }}>
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

  const setReportedHandler = () => {
    reported ? setReported(false) : setReported(true);
  };

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn}>
            <ArrowLeft />
          </div>
          <Typo variant="t2" bold color="black">
            {pageTitle}
          </Typo>
          <Typo variant="t2" color="#0074DD" className={styles.completeBtn}>
            완료
          </Typo>
        </div>
        <div className={styles.contentLayout}>
          <div className={styles.contentEl}>
            <div className={styles.contentTitle}>
              <Typo variant="t3" bold color="black">
                사진 등록
              </Typo>
              <Typo
                variant="footnote"
                color="#606060"
                style={{ marginLeft: "5px" }}
              >
                얼굴과 몸의 정면, 측면이 모두 나오면 좋아요!
              </Typo>
            </div>
            <div className={styles.imageBoxSection}>
              <div className={styles.addImageBox}>
                <input
                  multiple
                  type="file"
                  onChange={onLoadFile}
                  accept="image/*"
                />
                <Album />
                <Typo variant="footnote" color="#606060">
                  <Typo
                    variant="footnote"
                    color="#0074DD"
                    style={{ display: "inline" }}
                  >
                    {imgNum}
                  </Typo>
                  /10
                </Typo>
              </div>
              <div className={styles.imageBoxWrapper}>
                {img?.map((imageItem, index) => {
                  const url = URL.createObjectURL(imageItem);
                  return (
                    <div className={styles.imageBox} key={url}>
                      <div
                        style={{ backgroundImage: `url(${url})` }}
                        className={styles.image}
                      />
                      <div
                        className={styles.removeBtn}
                        onClick={() => removeImage(index)}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.contentEl}>
            <Typo
              variant="t3"
              bold
              color="black"
              className={styles.contentTitle}
            >
              이름
            </Typo>
            <input
              type="text"
              name="dog_name"
              placeholder="반려견의 이름(별명)을 등록해주세요"
              defaultValue={dogInfo?.name}
              className={styles.nameBox}
            />
          </div>
          <div className={styles.contentEl}>
            <Typo
              variant="t3"
              bold
              color="black"
              className={styles.contentTitle}
            >
              나이
            </Typo>
            <div className={styles.ageBoxWrapper}>
              <div>
                <div
                  className={styles.ageBox}
                  onClick={() => setIsAgeOpen(true)}
                >
                  <input type="hidden" name="dog_age" value={age} />
                  <Typo color="black" variant="caption">
                    {age}
                  </Typo>
                  <Typo
                    color="#9F9F9F"
                    variant="caption"
                    className={styles.text}
                  >
                    세
                  </Typo>
                  <DropdownIcon />
                </div>
                <AgeDropdown />
              </div>
            </div>
          </div>

          <div className={styles.contentEl}>
            <Typo
              variant="t3"
              bold
              color="black"
              className={styles.contentTitle}
            >
              성별
            </Typo>
            <div className={styles.sexBoxWrapper}>
              <div>
                <div
                  className={styles.sexBox}
                  onClick={() => setIsSexOpen(true)}
                >
                  <input type="hidden" name="dog_sex" value={sex} />
                  <Typo color="black" variant="caption">
                    {sex}
                  </Typo>
                  <DropdownIcon className={styles.dropdownIcon} />
                </div>
                <SexDropdown />
              </div>
              <label className={styles.neuteredCheck}>
                <input
                  type="checkbox"
                  name="neutered"
                  defaultChecked={dogInfo?.neutered}
                  className={styles.customCheckBox}
                />
                <Typo color="#9F9F9F" variant="caption" className={styles.text}>
                  중성화
                </Typo>
              </label>
            </div>
          </div>

          <div className={styles.contentEl}>
            <Typo
              variant="t3"
              bold
              color="black"
              className={styles.contentTitle}
            >
              견종
            </Typo>
            <div className={styles.breedBoxWrapper}>
              <div>
                <div
                  className={styles.breedBox}
                  onClick={() => setIsBreedOpen(true)}
                >
                  <input type="hidden" name="dog_breed" value={breed} />
                  <Typo color="black" variant="caption">
                    {breed}
                  </Typo>
                  <DropdownIcon className={styles.dropdownIcon} />
                </div>
                <BreedDropdown />
              </div>
              {breed === "직접 입력" ? (
                <input
                  type="text"
                  name="dog_breed"
                  placeholder="직접 입력"
                  className={styles.breedInput}
                />
              ) : null}
            </div>
          </div>

          <div className={styles.contentEl}>
            <Typo
              variant="t3"
              bold
              color="black"
              className={styles.contentTitle}
            >
              메모
            </Typo>
            <textarea
              rows={1}
              name="dog_memo"
              placeholder="반려견에 대한 기록을 남겨두세요 (03.08 심장사상충 접종완료 등)"
              defaultValue={dogInfo?.memo}
              className={styles.memoBox}
            />
          </div>

          <div className={styles.contentEl}>
            <Typo
              variant="t3"
              bold
              color="black"
              className={styles.contentTitle}
            >
              질병
            </Typo>
            <textarea
              name="dog_disease"
              placeholder="반려견에 대한 질병을 남겨두세요 (견과류 알레르기 등)"
              defaultValue={dogInfo?.disease}
              className={styles.diseaseBox}
            />
          </div>

          {/* 실종신고 파트는 input 안넣었어요 장소,날짜,시간을 어케 전달해야 할지 모르겠어서ㅜㅠㅜ */}
          <div className={styles.contentEl}>
            <label className={styles.reportedCheck}>
              <input
                type="checkbox"
                name="reported"
                className={styles.customCheckBox}
                defaultChecked={reported}
                onClick={() => setReportedHandler()}
              />
              <Typo color="red" variant="t3" className={styles.text}>
                실종 신고하기
              </Typo>
            </label>
            {reported === true ? (
              <>
                <div className={styles.reportedSection}>
                  <div className={styles.reportedContentEl}>
                    <div className={styles.reportedContentTitle}>
                      <PawIcon />
                      <Typo variant="caption" color="#606060">
                        실종 장소
                      </Typo>
                    </div>
                    <AddressDropdown addrDogInfo={dogInfo} />
                  </div>
                  <div className={styles.reportedContentEl}>
                    <div className={styles.reportedContentTitle} />
                    <input
                      type="text"
                      name="dog_lostAddr4"
                      placeholder="상세 주소를 입력해주세요"
                      className={styles.addrDetailBox}
                    />
                  </div>

                  <div className={styles.reportedContentEl}>
                    <div className={styles.reportedContentTitle}>
                      <PawIcon />
                      <Typo variant="caption" color="#606060">
                        실종 날짜
                      </Typo>
                    </div>
                    <DatePicker
                      locale={locale}
                      placeholder=""
                      format={dateFormat}
                      className={styles.antPickerStyle}
                      defaultValue={dayjs(dogInfo?.lostDate, dateFormat)}
                    />
                  </div>

                  <div className={styles.reportedContentEl}>
                    <div className={styles.reportedContentTitle}>
                      <PawIcon />
                      <Typo variant="caption" color="#606060">
                        실종 시각
                      </Typo>
                    </div>
                    <TimePicker
                      placeholder=""
                      format={timeFormat}
                      className={styles.antPickerStyle}
                      defaultValue={dayjs(dogInfo?.lostTime, timeFormat)}
                    />
                  </div>
                  <div className={styles.reportedContentEl}>
                    <div>
                      <div className={styles.reportedContentTitle}>
                        <PawIcon />
                        <Typo variant="caption" color="#606060">
                          기타
                        </Typo>
                      </div>
                      <div className={styles.reportedContentTitle}></div>
                    </div>

                    <textarea
                      name="dog_disease"
                      placeholder="전달사항을 남겨주세요( 분홍색 하네스를 착용함 등 )"
                      defaultValue={dogInfo?.lostFeat}
                      className={styles.etcBox}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
