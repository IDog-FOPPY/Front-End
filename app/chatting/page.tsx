"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getChatting } from "@src/logics/axios";
import { postNewChatting } from "@src/logics/axios";
import Chatting from "@src/screens/chatting";


interface Chatting {
  roomId: number;
  senderId: number;
  receiverId: number;
  senderProfileImg: string;
  receiverProfileImg: string;
  senderNickname: string;
  receiverNickname: string;
  existingChat: object[];
}

interface ChattingProps {
  chatting: Chatting;
}

export default function ChattingPage(props: ChattingProps) {



  const state = useSearchParams().get("state");
  const id = parseInt(useSearchParams().get("id") || "{}");
  const uid = parseInt(localStorage.getItem("foppy_user_uid") || "{}");

  // console.log("state, id, uid", state, id, uid);

  const [senderId, setSenderId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [senderProfileImg, setSenderProfileImg] = useState("");
  const [receiverProfileImg, setReceiverProfileImg] = useState("");
  const [senderNickname, setSenderNickname] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [existingChat, setExistingChat] = useState<Object[]>([]);





  useEffect(() => {

    try {
      const getData = async () => {
        if (state === "old") {
          const chatting = await getChatting(id);
          console.log("res", chatting);
          setRoomId(id);
          setSenderId(uid);
          setExistingChat(chatting.chatMessages);
          if (chatting.member1Id === uid) {
            setSenderProfileImg(chatting.member1ProfileImgUrl);
            setSenderNickname(chatting.member1NickName);

            setReceiverId(chatting.member2Id);
            setReceiverProfileImg(chatting.member2ProfileImgUrl);
            setReceiverNickname(chatting.member2NickName);


          } else if (chatting.member2Id === uid) {
            setSenderProfileImg(chatting.member2ProfileImgUrl);
            setSenderNickname(chatting.member2NickName);

            setReceiverId(chatting.member1Id);
            setReceiverProfileImg(chatting.member1ProfileImgUrl);
            setReceiverNickname(chatting.member1NickName);


          }
          else console.log("err");

        } else if (state === "new") {
          if (uid && id) {
            console.log("새채팅생성");
            const chatting = await postNewChatting({
              userId: uid,
              dogId: id,
            });
            console.log("새채팅생성 res", chatting);
            setSenderId(chatting.data.senderId);
            setReceiverId(chatting.data.receiverId);
            setRoomId(chatting.data.roomId);

            // setSenderNickname(chatting.member2NickName);

            // setReceiverNickname(chatting.member2NickName);

          }
        }
      };
      getData();


    } catch (err) {
      console.log(err);
    }

  }, []);




  return <Chatting roomId={roomId} senderId={senderId} receiverId={receiverId} senderProfileImg={senderProfileImg} receiverProfileImg={receiverProfileImg} senderNickname={senderNickname} receiverNickname={receiverNickname} existingChat={existingChat} />;
}
