"use client";

import { useEffect, useState } from 'react';
import { getMyDog } from '@src/logics/axios';
import { useSearchParams } from 'next/navigation';
import InputDog from '@src/components/modules/InputDog';

export default function EditMyDogPage() {

  // id값에 맞는 개 정보 받아와야함
  const petId = useSearchParams().get("id");
  const [dog, setDog] = useState({});

  useEffect(() => {
    const getData = async () => {
      petId && setDog(await getMyDog({ petId: parseInt(petId) }));
    };
    getData();
  }, []);

  return (
    <InputDog pageTitle="반려견 수정하기" dogInfo={dog} />
  )
}