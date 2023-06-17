import { StaticImageData } from "next/image";

export interface DogInfo {
  // 변수명 수정 필요
  id?: number; // petId
  name?: string; // petName
  sex?: boolean; // petSex (true 여자 false 남자)
  breed?: string; // petBreed
  age?: number; // petOld
  disease?: string;
  neutered?: boolean;
  memo?: string; // note

  reported?: boolean; // missed
  missCity?: string;
  missGu?: string;
  missDong?: string;
  missDetail?: string;
  missTime?: string;
  missDate?: string;
  etc?: string;

  createdDate?: string;

  // img?: StaticImageData; // 백 미구현 상태

}