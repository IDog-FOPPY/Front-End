import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import LookUp from "./(LookUp)";
import LostDogList from "./(LostDogList)";


export default function FindPage() {
  return (
    <>
      <LookUp />
      <LostDogList />
    </>
  )
}