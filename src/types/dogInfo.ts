import { StaticImageData } from "next/image";

export interface DogInfo {
  //img?: StaticImageData;
  id: number;
  name?: string;
  sex?: string; // (true 여자 false 남자)
  breed?: string;
  birth?: string;
  disease?: string;
  neutered?: boolean;
  note?: string;
  // imgUrlList?: StaticImageData;
  imgUrl: string;

  isMissing?: boolean;
  missingCity?: string;
  missingGu?: string;
  missingDong?: string;
  missingDetailedLocation?: string;
  missTime?: string;
  missDate?: string;
  etc?: string;
}
