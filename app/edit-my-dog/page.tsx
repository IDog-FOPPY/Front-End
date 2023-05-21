"use client";

import { useSearchParams } from 'next/navigation';
import dog1 from '@assets/png/main/dog1.png';
import InputDog from '@src/components/modules/InputDog';

export default function EditMyDogPage() {

  // id값에 맞는 개 정보 받아와야함
  const dogId = useSearchParams().get("id");

  //더미데이터
  const dog = { id: 1, img: dog1, name: "코코", reported: true, age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기" }

  return (
    <InputDog pageTitle="반려견 수정하기" dogInfo={dog} />
  )
}