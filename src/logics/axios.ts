import { DogInfo } from "@src/types/dogInfo";
import Axios from "axios";

export const axios = Axios.create({
  // baseURL: 'https://foppy.shop/api',
  baseURL: 'http://54.152.250.167:8080/api',
  timeout: 30000,
  headers: {
    // "Content-Language": "utf-8",
    // "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY4NzA4NDI1MiwiZXhwIjoxNjg3MTcwNjUyfQ._Eg7OZnI92VgWOaVEJnify-lxG5OiJor0Gh5cXviJl0",
  },
});

// 로그인 
interface loginProps {
  id: string;
  pw: string;
}
export async function login({ id, pw }: loginProps) {
  console.log("login", id, pw)
  try {
    const res = await axios.post("/v1/member/login", {
      params: {
        username: id,
        password: pw,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 회원가입 
interface joinProps {
  id: string;
  pw: string;
}
export async function join({ id, pw }: joinProps) {
  try {
    const res = await axios.post("/v1/member/join", {
      params: {
        username: id,
        password: pw,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 전체 반려견 조회
export async function getDogs() {
  try {
    const res = await axios.get("PetDogs", {
      params: {},
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 반려견 등록
interface postDogProps {
  petName: string;
  petSex: boolean;
  petBreed: string;
  petOld: number;
  disease?: string;
  neutered: boolean;
  note?: string;
  missed: boolean;
  missCity?: string;
  missGu?: string;
  missDong?: string;
  missDetail?: string;
  etc?: string;
  missTime?: string;
  missDate?: string;
}
export async function postDogs(props: postDogProps) {
  try {
    const res = await axios.post("PetDogs", {
      params: props,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 전체 유기견 조회
export async function getStrayDogs() {
  try {
    const res = await axios.get("StrayDogs", {
      params: {},
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}


