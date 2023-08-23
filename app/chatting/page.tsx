"use client";

import { useSearchParams } from "next/navigation";
import { getChatting } from "@src/logics/axios";
import { postNewChatting } from "@src/logics/axios";
import Chatting from "@src/screens/chatting";

export default async function ChattingPage() {
  const state = useSearchParams().get("state");
  const id = parseInt(useSearchParams().get("id") || "{}");
  // token, uid -> swr 사용하는 방식으로 수정 예정
  const uid = parseInt(localStorage.getItem("foppy_user_uid") || "{}");
  //const [chatting, setChatting] = useState([]);

  try {
    if (state === "old") {
      const chatting = await getChatting(id);
    } else if (state === "new") {
      if (uid && id) {
        const chatting = await postNewChatting({
          userId: uid,
          dogId: id,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  return <Chatting />;
}
