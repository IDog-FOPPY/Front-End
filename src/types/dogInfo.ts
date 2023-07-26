import { StaticImageData } from "next/image";

export interface DogInfo {
  img?: StaticImageData;
  petId?: number;
  petName?: string; 
  petSex?: boolean; // (true 여자 false 남자)
  petBreed?: string; 
  petOld?: number; 
  disease?: string;
  neutered?: boolean;
  note?: string;

  missed?: boolean;
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