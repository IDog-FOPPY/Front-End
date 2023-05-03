import styles from './styles.module.scss';
import Typo from '@components/core/Typo';
import logo from '@assets/Logo.png';

export default function GuidePage() {


  return (
    <div className={styles.logo} style={{ backgroundImage: `url(${logo.src})` }} />



  )
}