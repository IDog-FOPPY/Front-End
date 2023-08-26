"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getChatting } from "@src/logics/axios";
import { postNewChatting } from "@src/logics/axios";
import Chatting from "@src/screens/chatting";

export default function ChattingPage() {
  const state = useSearchParams().get("state");
  const id = parseInt(useSearchParams().get("id") || "{}");
  const uid = parseInt(localStorage.getItem("foppy_user_uid") || "{}");

  // console.log("state, id, uid", state, id, uid);

  const [senderId, setSenderId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);



  useEffect(() => {
    try {

      const getData = async () => {
        if (state === "old") {
          const chatting = await getChatting(id);
          console.log("res", chatting);
          if (chatting[0].senderId === uid) {
            setSenderId(uid);
            setReceiverId(chatting[0].receiverId);
          } else if (chatting[0].receiverId === uid) {
            setSenderId(uid);
            setReceiverId(chatting[0].senderId);
          }
          else console.log("err");

        } else if (state === "new") {
          if (uid && id) {
            console.log("새채팅생성");
            const chatting = await postNewChatting({
              userId: uid,
              dogId: id,
            });
            console.log("res", chatting);
            setSenderId(chatting.data.senderId);
            setReceiverId(chatting.data.receiverId);
          }
        }
      };
      getData();


    } catch (err) {
      console.log(err);
    }
  }, []);


  return <Chatting senderId={senderId} receiverId={receiverId} />;
}
