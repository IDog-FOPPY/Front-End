"use client";
import { useEffect, useState } from "react";

import { getChattingList } from "@src/logics/axios";
import ChattingList from "@src/screens/chatting-list";

export default function ChattingListPage() {
  const [chattings, setChattings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setChattings(await getChattingList());
    };
    getData();
  }, []);

  return <ChattingList chattings={chattings} />;
}
