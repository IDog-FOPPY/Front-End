import { StaticImageData } from "next/image";

export interface DogInfo {
  img?: StaticImageData;
  petName?: string;
  petSex?: boolean; // (true 여자 false 남자)
  petBreed?: string;
  birth?: string;
  disease?: string;
  neutered?: boolean;
  note?: string;

  isMissing?: {
    missCity?: string;
    missGu?: string;
    missDong?: string;
    missDetail?: string;
    missTime?: string;
    missDate?: string;
    etc?: string;
  }



  // img?: StaticImageData; // 백 미구현 상태

}