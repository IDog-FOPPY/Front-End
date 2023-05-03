import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import LookUp from "./(LookUp)";
import DogList from "./(DogList)";


export default function FindPage() {
  return (
    <>
      <LookUp />
      <DogList />
    </>
  )
}