import { StaticImageData } from "next/image";

export interface DogInfo {
  id?: number;
  img?: StaticImageData;
  name?: string;
  reported?: boolean;
  age?: number;
  sex?: string;
  neutered?: boolean;
  breed?: string;
  memo?: string;
  disease?: string;
}