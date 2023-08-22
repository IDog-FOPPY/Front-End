import { getChattingList } from '@src/logics/axios';
import ChattingList from '@src/screens/chatting-list';

export default async function ChattingListPage () {
  const chattings = await getChattingList();

  return <ChattingList chattings={chattings} />;
}