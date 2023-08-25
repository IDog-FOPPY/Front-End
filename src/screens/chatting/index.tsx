"use client";

import { useEffect, useState, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./styles.module.scss";
import Typo from "@components/core/Typo";


const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImppaHl1biIsImlhdCI6MTY5Mjk0NzU2MiwiZXhwIjoxNjkyOTUxMTYyfQ.n4AYGOUMg5KYpnNzY8bPiQpKfTT1ajej7HiHCi35yns";
const senderId = 17;  //jihyun
const receiverId = 20;  //mongg
//방아이디 19

export default function ChattingPage() {
  const client: any = useRef({});
  //const client: MutableRefObject<T> = useRef<T>({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      //brokerURL: "/ws/chat", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("/ws/chat"), // proxy를 통한 접속
      connectHeaders: {
        'Authorization': token,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame: any) => {
        console.log("frame", frame);
        client.current.subscribe('/sub/room/19', function (result: any) {
          // show(JSON.parse(result.body));
          console.log("res", JSON.parse(result.body))
        }
        );
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };


  const publish = (message: string) => {
    // if (!client.current.connected) {
    //   return;
    // }

    client.current.publish({
      destination: "/pub/send",
      body: JSON.stringify({ 'content': message, 'senderId': senderId, 'receiverId': receiverId }),
    });

    setMessage("");
  };







  //-------------------------------------------------------------------

  // const client = new StompJs.Client({
  //   //brokerURL: "/ws/chat", // 웹소켓 서버로 직접 접속
  //   webSocketFactory: () => new SockJS("/ws/chat"), // proxy를 통한 접속
  //   connectHeaders: {
  //     'Authorization': token,
  //   },
  //   debug: function (str) {
  //     console.log("debug", str);
  //   },
  //   reconnectDelay: 5000,
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  //   onStompError: (frame) => {
  //     console.error("errer: ", frame);
  //   },
  // });


  // client.onConnect = (frame: any) => {
  //   console.log('frame', frame)
  //   client.subscribe('/sub/room/19', function (result: any) {

  //     // show(JSON.parse(result.body));

  //     console.log("res", JSON.parse(result.body))
  //   });

  // }

  // client.onStompError = function (frame) {
  //   console.log('Broker reported errer: ' + frame.headers['message']);
  //   console.log('Additional details:' + frame.body);
  // }

  // client.activate();

  // const publish = (message: string) => {
  //   if (!client.connected) {
  //     return;
  //   }

  //   client.publish({
  //     destination: "/pub/send",
  //     body: JSON.stringify({ 'content': message, 'senderId': senderId, 'receiverId': receiverId }),
  //   });

  //   setMessage("");
  // };

  //-------------------------------------------------------------------









  return (
    <>
      <div>

        <input type="text" id="content" placeholder="Text" onChange={(e) => setMessage(e.target.value)} />
        <button id="sendMessage" onClick={() => publish(message)}>Send</button>
      </div>;
    </>
  )

}























// ------------------------------------------------


// "use client";

// import { useEffect, useState } from "react";
// import { Stomp, Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import styles from "./styles.module.scss";
// import Typo from "@components/core/Typo";
// //import * as SockJS from 'sockjs-client';

// const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImppaHl1biIsImlhdCI6MTY5Mjg5MzU3NywiZXhwIjoxNjkyODk3MTc3fQ.5hiJFIeRJVedYBwZfSlFa22xDgYCYsU2QsZVzbH_QiU";
// const senderId = 17;  //jihyun
// const receiverId = 20;  //mongg
// //방아이디 19

// export default function ChattingPage() {
//   const [content, setContent] = useState("");


//   // var stompClient = null;
//   var socket = new SockJS('/ws/chat');
//   var stompClient = Stomp.over(socket);


// const header = {'Authorization' : token};

//   stompClient.connect(header, function (frame: any) {
//     console.log("frame", frame);
//     // stompClient.subscribe('/topic/messages', function (result) {
//     stompClient.subscribe('/sub/room/19', function (result: any) {

//       // show(JSON.parse(result.body));

//       console.log("res", JSON.parse(result.body))
//     });
//   });



//   // stompClient.connect({ 'Authorization': token }, function (frame: any) {
//   //   console.log("frame", frame);
//   //   // stompClient.subscribe('/topic/messages', function (result) {
//   //   stompClient.subscribe('/sub/room/19', function (result: any) {

//   //     // show(JSON.parse(result.body));

//   //     console.log("res", JSON.parse(result.body))
//   //   });
//   // });

//   function sendMessage() {

//     stompClient.send("/pub/send", {},
//       JSON.stringify({ 'content': content, 'senderId': senderId, 'receiverId': receiverId }));
//   }




//   return (
//     <>
//       <div>

//         <input type="text" id="content" placeholder="Text" onChange={(e) => setContent(e.target.value)} />
//         <button id="sendMessage" onClick={sendMessage}>Send</button>


//       </div>;
//     </>
//   )

// }

