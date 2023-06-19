"use client";


import { useEffect, useState } from 'react';
import { getMyDog } from '@src/logics/axios';
import { useSearchParams } from 'next/navigation';
import dog1 from '@assets/png/main/dog1.png';
import InputDog from '@src/components/modules/InputDog';

export default function EditMyDogPage() {

  // id값에 맞는 개 정보 받아와야함
  const petId = useSearchParams().get("id");
  console.log("개아이디", petId);

  //더미데이터
  // const dog = { id: 1, img: dog1, name: "코코", age: 4, sex: "남아", neutered: true, breed: "웰시코기", memo: " 메모  22년 10월에 건강검진 완료", disease: "견과류 알레르기", reported: true, lostDate: "23/05/25", lostTime: "21:20", lostFeat: "제발찾아주세요" }



  const [dog, setDog] = useState({});

  useEffect(() => {
    const getData = async () => {
      petId && setDog(await getMyDog({ petId: parseInt(petId) }));
    };
    getData();
  }, []);

  useEffect(() => {
    console.log('dog', dog);
  }, [dog])


  return (
    <InputDog pageTitle="반려견 수정하기" dogInfo={dog} />
  )
}