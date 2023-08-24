"use client";

import { useEffect, useState } from "react";
import { Stomp, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";
//import * as SockJS from 'sockjs-client';

const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImppaHl1biIsImlhdCI6MTY5Mjg5MzU3NywiZXhwIjoxNjkyODk3MTc3fQ.5hiJFIeRJVedYBwZfSlFa22xDgYCYsU2QsZVzbH_QiU";
const senderId = 17;  //jihyun
const receiverId = 20;  //mongg
//방아이디 19

export default function ChattingPage() {
  const [content, setContent] = useState("");


  // var stompClient = null;
  var socket = new SockJS('/ws/chat');
  var stompClient = Stomp.over(socket);




  stompClient.connect({ 'Authorization': token }, function (frame: any) {
    console.log("frame", frame);
    // stompClient.subscribe('/topic/messages', function (result) {
    stompClient.subscribe('/sub/room/19', function (result: any) {

      // show(JSON.parse(result.body));

      console.log("res", JSON.parse(result.body))
    });
  });



  // stompClient.connect({ 'Authorization': token }, function (frame: any) {
  //   console.log("frame", frame);
  //   // stompClient.subscribe('/topic/messages', function (result) {
  //   stompClient.subscribe('/sub/room/19', function (result: any) {

  //     // show(JSON.parse(result.body));

  //     console.log("res", JSON.parse(result.body))
  //   });
  // });

  function sendMessage() {

    stompClient.send("/pub/send", {},
      JSON.stringify({ 'content': content, 'senderId': senderId, 'receiverId': receiverId }));
  }




  return (
    <>
      <div>

        <input type="text" id="content" placeholder="Text" onChange={(e) => setContent(e.target.value)} />
        <button id="sendMessage" onClick={sendMessage}>Send</button>


      </div>;
    </>
  )

}
