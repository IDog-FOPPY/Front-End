import { StaticImageData } from "next/image";

export interface DogInfo {
  id?: number;
  img: StaticImageData;
  // img?:StaticImageData; 이 경우 에러

  name?: string;
  age?: number;
  sex?: string;
  neutered?: boolean;
  breed?: string;
  memo?: string;
  disease?: string;
  reported?: boolean;

  //실종장소Info 저장 방법 논의필요
  //시,구,동 따로? 이어서?
  //이어서 저장할경우 editPage에 뿌릴 때 시구동 분리과정 전처리 필요
  //따로 저장할경우 유기견게시판에 실종장소 넣을때 {구}{동}{상세}으로 변경해야함
  //addr1 시
  //addr2 구
  //addr3 동
  //addr4 상세

  lostDate?: string;
  lostTime?: string;
  lostFeat?: string;

}