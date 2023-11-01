"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getChatting } from "@src/logics/axios";
import { postNewChatting } from "@src/logics/axios";
import Chatting, { ChatEl } from "@src/screens/chatting";

export default function ChattingPage() {
  const state =
    typeof window !== "undefined" ? useSearchParams().get("state") : null;
  const id =
    typeof window !== "undefined"
      ? parseInt(useSearchParams().get("id") || "{}")
      : null;
  const uid =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("foppy_user_uid") || "{}")
      : null;

  const [roomId, setRoomId] = useState(0);
  const [receiverProfileImg, setReceiverProfileImg] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [existingChat, setExistingChat] = useState<ChatEl[]>([]);

  const [didMount, setDidMount] = useState(false);

  var mountCount = 0;
  useEffect(() => {
    console.log("mount: ", mountCount);
    mountCount++;
    setDidMount(true);
    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    console.log("didMount: ", didMount);
    if (didMount) {
      try {
        const getData = async () => {
          if (state === "old" && id) {
            const chatting = await getChatting(id);
            console.log("res", chatting);
            setRoomId(id);
            setExistingChat(chatting.chatMessages);
            if (chatting.members[0].id === uid) {
              setReceiverProfileImg(chatting.members[1].profileImgUrl);
              setReceiverNickname(chatting.members[1].nickName);
            } else if (chatting.members[1].id === uid) {
              setReceiverProfileImg(chatting.members[0].profileImgUrl);
              setReceiverNickname(chatting.members[0].nickName);
            } else console.log("err");
          } else if (state === "new") {
            if (id) {
              console.log("새채팅생성", id);
              const chatting = await postNewChatting({
                dogId: id,
              });
              console.log("새채팅생성 res", chatting);

              setRoomId(chatting.data.roomId);
              setReceiverProfileImg(chatting.data.otherUsers[0].profileImgUrl);
              setReceiverNickname(chatting.data.otherUsers[0].nickName);
            }
          }
        };
        getData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [didMount]);

  // 메시지 전송시 roomId만 필요
  // 화면 출력 위해 receiver nickName, profileImg 필요
  return (
    <Chatting
      roomId={roomId}
      receiverProfileImg={receiverProfileImg}
      receiverNickname={receiverNickname}
      existingChat={existingChat}
    />
  );
}
