import Axios from "axios";

export const axios = typeof window !== 'undefined' ? Axios.create({
  baseURL: "http://54.180.156.211:8080/api",
  // timeout: 30000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("foppy_auth_token"),
    // chat1
    // Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNoYXQxIiwiaWF0IjoxNjkyNzE1MjQwLCJleHAiOjE2OTI3MTg4NDB9.4SJpIOpfU7dMUINpMm-Pi1bFTTdjuVctlQeVtAxga0Y"
    // chat2
    // Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImppaHl1biIsImlhdCI6MTY5Mjk0NzU2MiwiZXhwIjoxNjkyOTUxMTYyfQ.n4AYGOUMg5KYpnNzY8bPiQpKfTT1ajej7HiHCi35yns"
  },
}) : null;

// import Axios from "axios";

// let token = localStorage.getItem("foppy_auth_token");
// let uid = localStorage.getItem("foppy_user_uid");
// let authorization = undefined;
// let authWithFormData = undefined;

// if (token) {
//   //token = 'Bearer ' + token;
//   console.log("token", token);
//   authorization = { Authorization: token };
//   authWithFormData = {
//     Authorization: token,
//     "Content-Type": "multipart/form-data",
//   };
// }

// export const axios = Axios.create({
//   baseURL: "http://3.38.247.212:8080/api",
//   // timeout: 30000,
//   headers: authorization,
// });

// export const axiosFormData = Axios.create({
//   baseURL: "http://3.38.247.212:8080/api",
//   // timeout: 30000,
//   headers: authWithFormData,
// });







// 로그인
interface loginProps {
  email: string;
  password: string;
}

export async function login(props: loginProps) {
  try {
    const res = await axios?.post("/user/login", props);
    console.log("login");
    return res?.data;
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
export async function signup(props: signupProps) {
  // try {
  //   console.log("회원가입 props", props)
  //   const res = await axios.post("/user/signup", props);
  //   console.log("signup");
  //   return res.data;
  // } catch (err) {
  //   console.log(err);
  //   return {};
  // }
  const res = await axios?.post("/user/signup", props);
  return res?.data;
}

// 내 반려견 조회
export async function getDogs() {
  try {
    const res = await axios?.get(`/dog`, {});
    return res?.data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 반려견 등록
interface createDogProps {
  request: {
    [index: string]: any;
    name: string;
    birth: string;
    sex: string;
    breed: string;
    note: string;
    disease: string;
    neutered: boolean;
  };
  file: File[];
}
export async function createDog(props: createDogProps) {
  const request = props.request;
  const requestString = JSON.stringify(request);
  const formRequest = new FormData();

  formRequest.append(
    "request",
    new Blob([requestString], { type: "application/json" })
  );
  for (let i = 0; i < props.file.length; i++) {
    formRequest.append("file", props.file[i]);
  }

  try {
    const res = await axios?.post(`/dog/create`, formRequest);
    console.log("등록성공", res);
    return res?.data;
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
    const res = await axios?.patch(`/dog/${petId}`, props);
    console.log("수정성공", res);
    return res?.data;
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
    const res = await axios?.get(`/dog/${petId}`, {
      params: {},
    });
    return res?.data.data;
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
  const { missingGu, startDate, breed } = props;
  try {
    if (missingGu !== undefined) {
      if (startDate !== undefined) {
        if (breed !== undefined) {  // missingGu & startDate & breed
          const res = await axios?.get(`/dog/missing?page=0&size=10&missingGu=${missingGu}&startDate=${startDate}&breed=${breed}`);
          return res?.data.data.content;
        }
        else { //missingGu & startDate
          const res = await axios?.get(`/dog/missing?page=0&size=10&missingGu=${missingGu}&startDate=${startDate}`);
          return res?.data.data.content;
        }
      }
      else {
        if (breed !== undefined) {  //missingGu & breed
          const res = await axios?.get(`/dog/missing?page=0&size=10&missingGu=${missingGu}&breed=${breed}`);
          return res?.data.data.content;
        }
        else { //missingGu
          const res = await axios?.get(`/dog/missing?page=0&size=10&missingGu=${missingGu}`);
          return res?.data.data.content;
        }
      }
    }

    else if (startDate !== undefined) {
      if (breed !== undefined) { //startDate & breed
        const res = await axios?.get(`/dog/missing?page=0&size=10&startDate=${startDate}&breed=${breed}`);
        return res?.data.data.content;
      }
      else { //startDate
        const res = await axios?.get(`/dog/missing?page=0&size=10&startDate=${startDate}`);
        return res?.data.data.content;
      }
    }

    else if (breed !== undefined) {  //breed
      const res = await axios?.get(`/dog/missing?page=0&size=10&breed=${breed}`);
      return res?.data.data.content;
    }
    else {
      const res = await axios?.get(`/dog/missing?page=0&size=10`);
      return res?.data.data.content;
    }

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
    const res = await axios?.post("/stray", formData);
    console.log("res", res);
    return res?.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 채팅방 목록 조회
export async function getChattingList() {
  try {
    const res = await axios?.get(`/chat/rooms`, {});
    console.log("채팅목록", res);
    return res?.data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// 채팅방 상세정보 조회
export async function getChatting(id: number) {
  try {
    const res = await axios?.get(`/chat/room/${id}`);
    console.log("조회성공", res?.data.data.chatMessages);
    return res?.data.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

//채팅방 생성
interface newChattingProps {
  dogId: number;
}
export async function postNewChatting(props: newChattingProps) {
  try {
    const res = await axios?.post("/chat/room", props);
    console.log("채팅방 생성 성공", res);
    return res?.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}



