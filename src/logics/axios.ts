import Axios from "axios";

let token = localStorage.getItem('foppy_auth_token');
let uid = localStorage.getItem('foppy_user_uid');
let authorization = undefined;

if (token) {
  token = 'Bearer ' + token;
  console.log('token', token);
  authorization = { "Authorization": token };
}

export const axios = Axios.create({
  baseURL: 'http://54.152.250.167:8080/api',
  timeout: 30000,
  headers: authorization,
});

// 로그인 
interface loginProps {
  id: string;
  pw: string;
}
export async function login({ id, pw }: loginProps) {
  try {
    const res = await axios.post("/v1/member/login", {
      username: id,
      password: pw,
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
    // const res = await axios.get(`/v1/member/getPet/${uid}`, {
    const res = await axios.get(`/PetDogs/get`, {
    });
    console.log('res', res)
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
    const res = await axios.post(`/PetDogs/PetDogs/save/${uid}`, props);
    console.log("등록성공", res);
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
    const res = await axios.get(`/PetDogs/getDetail/${petId}`, {
      params: {},
    });
    console.log("개 정보 조회", res);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}


// 전체 유기견 조회
interface strayDogProps {
  breed?: string;
  addr2?: string;
  dateFormat?: string;
}
export async function getStrayDogs({ breed, addr2, dateFormat }: strayDogProps) {
  try {
    const res = await axios.get("StrayDogs", {
      params: {
        petBreed: breed,
        missGu: addr2,
        missDate: dateFormat
      },

    });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

