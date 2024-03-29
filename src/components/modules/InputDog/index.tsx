"use client";

import { useState, useEffect, ChangeEvent } from "react";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import locale from "antd/es/date-picker/locale/ko_KR";
import { TimePicker } from "antd";
import { DatePicker } from "antd";
import Typo from "@components/core/Typo";
import { DogInfo } from "@src/types/dogInfo";
import ArrowLeft from "@assets/svg/register/arrow-left.svg";
import Album from "@assets/svg/register/album.svg";
import DropdownIcon from "@assets/svg/register/dropdown.svg";
import PawIcon from "@assets/svg/register/paw.svg";
import Image, { StaticImageData } from "next/image";
import AddressDropdown from "@src/components/modules/AddressDropdown";
// import { postDogs } from '@src/logics/axios';
import { createDog, updateDog } from "@src/logics/axios";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

const timeFormat = "HH:mm";
const dateFormat = "YYYY-MM-DD";

interface InputDogdogInfo {
  pageTitle: string;
  dogInfo?: DogInfo;
  petId?: string | null;
}
export default function InputDog(props: InputDogdogInfo) {
  const router = useRouter();
  const { pageTitle, dogInfo, petId } = props;
  // const ageEl = [...Array(21)];
  const sexEl = ["남아", "여아"];
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
  const [isSexOpen, setIsSexOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);
  const [name, setName] = useState<string>();
  const [birth, setBirth] = useState<string>();
  const [sex, setSex] = useState<string>();
  const [neutered, setNeutered] = useState(dogInfo?.neutered);
  const [breed, setBreed] = useState<string>();
  const [note, setNote] = useState<string>();
  const [disease, setDisease] = useState<string>();
  const [isMissing, setIsMissing] = useState(dogInfo?.isMissing);
  //const [img, setImage] = useState<File[]>([]);
  const [imgUrlList, setImgUrlList] = useState<File[]>([]);
  const [imgNum, setImgNum] = useState(0);
  const [addr1, setAddr1] = useState<string>();
  const [addr2, setAddr2] = useState<string>();
  const [addr3, setAddr3] = useState<string>();
  const [addr4, setAddr4] = useState<string>();
  const [missDate, setMissDate] = useState(dogInfo?.missDate);
  const [missTime, setMissTime] = useState(dogInfo?.missTime);
  const [etc, setEtc] = useState(dogInfo?.etc);

  useEffect(() => {
    if (imgUrlList) setImgNum(imgUrlList.length);
  }, [imgUrlList]);

  useEffect(() => {
    setSex(dogInfo?.sex === "FEMALE" ? "여아" : "남아");
    setName(dogInfo?.name);
    setBreed(dogInfo?.breed);
    setBirth(dogInfo?.birth);
    setDisease(dogInfo?.disease);
    setNote(dogInfo?.note);
    setIsMissing(dogInfo?.isMissing === true ? true : false);
    setAddr1(dogInfo?.missingCity);
    setAddr2(dogInfo?.missingGu);
    setAddr3(dogInfo?.missingDong);
    setAddr4(dogInfo?.missingDetailedLocation);

    // setImgUrlList(dogInfo?.imgUrlList);
  }, [dogInfo]);

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (imgNum < 10) {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        let temp: File[] = imgUrlList;
        setImgUrlList([...temp, ...files]);
      }
    } else alert("사진 업로드는 10장까지 가능해요!");
  };

  const onComplete = async () => {
    console.log(name, sex, breed, birth, neutered, isMissing);
    if (name && birth && sex && breed && pageTitle === "반려견 등록하기") {
      const res = await createDog({
        request: {
          name: name,
          birth: birth,
          sex: sex === "여아" ? "FEMALE" : "MALE",
          breed: breed,
          note: note || "",
          disease: disease || "",
          neutered: neutered === true ? true : false,
        },
        file: imgUrlList,
      });
      router.push("/main");
    } else if (pageTitle === "반려견 수정하기") {
      const res = await updateDog(petId, {
        name: name,
        birth: birth,
        sex: sex === "여아" ? "FEMALE" : "MALE",
        breed: breed,
        note: note,
        disease: disease,
        neutered: neutered === true ? true : false,

        isMissing: isMissing,
        missingCity: addr1,
        missingGu: addr2,
        missingDong: addr3,
        missingDetailedLocation: addr4,
        missDate: missDate,
        missTime: missTime,
        etc: etc,
      });
      router.push("/main");

      console.log(
        "반려견 수정 성공",
        {
          name: name,
          birth: birth,
          sex: sex === "여아" ? "FEMALE" : "MALE",
          breed: breed,
          note: note,
          disease: disease,
          neutered: neutered,

          isMissing: isMissing,
          missingCity: addr1,
          missingGu: addr2,
          missingDong: addr3,
          missingDetailedLocation: addr4,
          missDate: missDate,
          missTime: missTime,
          etc: etc,
        },
        res,
      );
    } else console.log("error");
  };

  const addrTextReturnThree = (str1: string, str2: string, str3: string) => {
    setAddr1(str1);
    setAddr2(str2);
    setAddr3(str3);
  };

  const removeImage = (index: number) => {
    const temp = imgUrlList.filter((v, i) => i != index);
    setImgUrlList(temp);
  };

  const onParseDate = (e: any) => {
    const parseDate = (value: number) => {
      if (value >= 10) {
        return value;
      } else return `0${value}`;
    };
    const year = e.year();
    const month = parseDate(e.month() + 1);
    const day = parseDate(e.date());
    const date = year + "-" + month + "-" + day;
    console.log(date);
    //console.log('birth', birth)
    return date;
  };

  const onParseTime = (e: any) => {
    const parseDate = (value: number) => {
      if (value >= 10) {
        return value;
      } else return `0${value}`;
    };
    const hour = parseDate(e.hour());
    const minute = parseDate(e.minute());
    const time = hour + ":" + minute;
    return time;
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
    isMissing ? setIsMissing(false) : setIsMissing(true);
  };

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.header}>
          <div className={styles.backBtn} onClick={() => router.back()}>
            <ArrowLeft />
          </div>
          <Typo variant="t2" bold color="black">
            {pageTitle}
          </Typo>
          <Typo
            variant="t2"
            color="#0074DD"
            className={styles.completeBtn}
            onClick={onComplete}
          >
            완료
          </Typo>
          {/* <Typo variant="t2" color="#0074DD" className={styles.completeBtn} onClick={() => { onComplete(); }}>완료</Typo> */}
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
              {pageTitle !== "반려견 수정하기" && (
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
              )}
              <div className={styles.imageBoxWrapper}>
                {pageTitle === "반려견 수정하기"
                  ? dogInfo?.imgUrlList?.map((img: string) => {
                      return (
                        <div className={styles.imageBox} key={img}>
                          <img src={img} className={styles.image} />
                        </div>
                      );
                    })
                  : imgUrlList?.map((imageItem, index) => {
                      const url = URL.createObjectURL(imageItem);
                      console.log("url", url);
                      console.log("imgUrlList", imgUrlList);
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

                {/* {imgList?.map((imageItem, index) => {
                  //const url = URL.createObjectURL(imageItem);
                  //console.log('url', url);
                  return (
                    <div className={styles.imageBox} key={imageItem}>
                      <div
                        style={{ backgroundImage: `url(${imageItem})` }}
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
                })} */}
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
              placeholder="반려견의 이름(별명)을 등록해주세요"
              defaultValue={dogInfo?.name}
              onChange={(e) => setName(e.target.value)}
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
              생년월일
            </Typo>
            <DatePicker
              locale={locale}
              placeholder={dogInfo?.birth}
              format={dateFormat}
              className={styles.antPickerStyle}
              // defaultValue={dayjs(dogInfo?.birth, dateFormat)}
              onChange={(e) => {
                setBirth(onParseDate(e));
              }}
            />
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
                  onChange={(e) => setNeutered(e.target.checked)}
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
                  placeholder="직접 입력"
                  className={styles.breedInput}
                  onChange={(e) => setBreed(e.target.value)}
                  defaultValue={dogInfo?.disease}
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
              placeholder="반려견에 대한 기록을 남겨두세요 (03.08 심장사상충 접종완료 등)"
              defaultValue={dogInfo?.note}
              className={styles.memoBox}
              onChange={(e) => setNote(e.target.value)}
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
              placeholder="반려견에 대한 질병을 남겨두세요 (견과류 알레르기 등)"
              defaultValue={dogInfo?.disease}
              className={styles.diseaseBox}
              onChange={(e) => setDisease(e.target.value)}
            />
          </div>

          <div className={styles.contentEl}>
            <label className={styles.reportedCheck}>
              <input
                type="checkbox"
                name="reported"
                className={styles.customCheckBox}
                defaultChecked={isMissing}
                onClick={() => setReportedHandler()}
              />
              <Typo color="red" variant="t3" className={styles.text}>
                실종 신고하기
              </Typo>
            </label>
            {isMissing ? (
              <>
                <div className={styles.reportedSection}>
                  <div className={styles.reportedContentEl}>
                    <div className={styles.reportedContentTitle}>
                      <PawIcon />
                      <Typo variant="caption" color="#606060">
                        실종 장소
                      </Typo>
                    </div>
                    <AddressDropdown
                      pageTitle="inputDog"
                      addrTextReturnThree={addrTextReturnThree}
                      address1={addr1}
                      address2={addr2}
                      address3={addr3}
                    />
                  </div>
                  <div className={styles.reportedContentEl}>
                    <div className={styles.reportedContentTitle} />
                    <input
                      type="text"
                      placeholder="상세 주소를 입력해주세요"
                      onChange={(e) => setAddr4(e.target.value)}
                      className={styles.addrDetailBox}
                      defaultValue={dogInfo?.missingDetailedLocation}
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
                      defaultValue={dayjs(dogInfo?.missDate, dateFormat)}
                      onChange={(e) => {
                        setMissDate(onParseDate(e));
                      }}
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
                      defaultValue={dayjs(dogInfo?.missTime, timeFormat)}
                      onChange={(e) => {
                        setMissTime(onParseTime(e));
                      }}
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
                      defaultValue={dogInfo?.etc}
                      onChange={(e) => setEtc(e.target.value)}
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
