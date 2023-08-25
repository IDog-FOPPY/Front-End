"use client";

import { useSearchParams } from "next/navigation";
import { getChatting } from "@src/logics/axios";
import { postNewChatting } from "@src/logics/axios";
import Chatting from "@src/screens/chatting";

export default function ChattingPage() {
  const state = useSearchParams().get("state");
  const id = parseInt(useSearchParams().get("id") || "{}");
  // token, uid -> swr 사용하는 방식으로 수정 예정
  const uid = 14;
  // const uid = parseInt(localStorage.getItem("foppy_user_uid") || "{}");
  //const [chatting, setChatting] = useState([]);

  console.log(state, id, uid);






  try {
    // if (state === "old") {
    //   const chatting = async () => await getChatting(id);
    // } else if (state === "new") {
    //   if (uid && id) {
    //     console.log("새채팅생성");
    //     const chatting = async () =>
    //       await postNewChatting({
    //         userId: uid,
    //         dogId: id,
    //       });
    //     console.log("res", chatting);
    //   }
    // }


    const getData = async () => {
      if (state === "old") {
        const chatting = await getChatting(id);
      } else if (state === "new") {
        if (uid && id) {
          console.log("새채팅생성");
          const chatting = await postNewChatting({
            userId: uid,
            dogId: id,
          });
          console.log("res", chatting);
        }
      }
    };
    getData();


  } catch (err) {
    console.log(err);
  }

  return <Chatting />;
}
