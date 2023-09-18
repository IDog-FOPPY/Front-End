import { StaticImageData } from "next/image";

export interface DogInfo {
  //img?: StaticImageData;
  id?: number;
  name?: string | undefined;
  sex?: string; // (true 여자 false 남자)
  breed?: string;
  birth?: string;
  disease?: string;
  neutered?: boolean;
  note?: string;

  //이 경우 string이라서 등록페이지에서 사진업로드 불가능
  // imgUrlList?: string[] | undefined;
  imgUrlList?: string[] | undefined;

  imgUrl?: string;

  // 이 경우 등록페이지에서 사진업로드 가능
  // imgUrlList?: File[] | undefined;

  isMissing?: boolean;
  missingCity?: string;
  missingGu?: string;
  missingDong?: string;
  missingDetailedLocation?: string;
  missTime?: string;
  missDate?: string;
  etc?: string;
}
