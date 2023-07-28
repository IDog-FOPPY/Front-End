import Axios from "axios";

let token = localStorage.getItem("foppy_auth_token");
let uid = localStorage.getItem("foppy_user_uid");
let authorization = undefined;

if (token) {
  //token = 'Bearer ' + token;
  console.log("token", token);
  authorization = { Authorization: token };
}

export const axios = Axios.create({
  baseURL: "http://3.38.247.212:8080/api",
  // timeout: 30000,
  headers: authorization,
});

// 로그인
interface loginProps {
  email: string;
  password: string;
}

export async function login(props: loginProps) {
  try {
    const res = await axios.post("/user/login", props);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 회원가입
interface signupProps {
  email: string;
  nickName: string;
  password: string;
  phone: string;
}
export async function signup({
  email,
  nickName,
  password,
  phone,
}: signupProps) {
  try {
    const res = await axios.post("/user/signup", {
      params: {
        email,
        nickName,
        password,
        phone,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 내 반려견 조회
export async function getDogs() {
  try {
    const res = await axios.get(`/dog`, {});
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 반려견 등록
interface createDogProps {
  request: {
    name: string;
    birth: string;
    sex: string;
    breed: string;
    note: string;
    disease: string;
    neutered: boolean;
  };
  file: string[];
}
export async function createDog(props: createDogProps) {
  try {
    const res = await axios.post(`/dog/create`, props);
    console.log("등록성공", res);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 반려견 수정
interface updateDogProps {
  name: string | undefined;
  birth: string | undefined;
  sex: string | undefined;
  breed: string | undefined;
  note: string | undefined;
  disease: string | undefined;
  neutered: boolean | undefined;
  isMissing?: boolean;
  missingCity?: string;
  missingGu?: string;
  missingDong?: string;
  missingDetailedLocation?: string;
  missDate?: string;
  missTime?: string;
  etc?: string;
}
export async function updateDog(
  petId: string | null | undefined,
  props: updateDogProps
) {
  try {
    const res = await axios.patch(`/dog/${petId}`, props);
    console.log("수정성공", res);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 반려견 정보 조회
interface getMyDogProps {
  petId: number;
}
export async function getMyDog({ petId }: getMyDogProps) {
  try {
    const res = await axios.get(`/dog/${petId}`, {
      params: {},
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 유기견 조회
interface getStrayDogsProps {
  missingGu?: string;
  missingDong?: string;
  startDate?: string;
  endDate?: string;
  breed?: string;
}

export async function getStrayDogs(props: getStrayDogsProps) {
  try {
    const res = await axios.get("/dog/missing?page=0&size=10", {
      params: props,
    });
    console.log("getStrayDogs", res);
    return res.data.data.content;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 비문 조회 -> 수정 필요
export async function postNoseIdent(img: File) {
  try {
    let formData = new FormData();
    formData.append("file", img);
    const res = await axios.post("StrayDogs/noseIdent", formData);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}
