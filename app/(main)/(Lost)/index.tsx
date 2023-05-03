import Typo from '@components/core/Typo';
import ArrowRight from '@assets/svg/arrow-right.svg';
import Bullhorn from '@assets/svg/bullhorn.svg';
import dogEx from '@assets/png/dog-example.png';
import styles from './styles.module.scss';

const DogList: Dog[] = [
  {image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30'},
  {image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30'},
  {image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30'},
  {image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30'},
  {image: dogEx.src, location: '송파구 방이동', time: '23/02/26 13:30'},
]

interface Dog {
  image: string;
  location: string;
  time: string;
}

interface DogCardProps {
  dog: Dog;
}



const DogCard = (props: DogCardProps) => {
  const {dog} = props;

  return (
    <div className={styles.dogCard}>
      <div className={styles.dogImg} style={{backgroundImage: `url(${dog.image})`}} />
      <div className={styles.dogInfo}>
        <Typo variant="caption" color="#0074DD">발견 지역</Typo>
        <Typo variant="caption" color="black">{dog.location}</Typo>
      </div>
      <div className={styles.dogInfo}>
        <Typo variant="caption" color="#0074DD">발견 시점</Typo>
        <Typo variant="caption" color="black">{dog.time}</Typo>
      </div>
    </div>
  )
}

export default function Lost () {
  return (
    <div className={styles.sectionLayout}>
      <div className={styles.title}>
        <Bullhorn className={styles.bullhorn} />
        <div className={styles.underline}>
          <Typo variant="t3" color="#0074DD" bold>
            <>
              유기견
              <Typo variant="t3" color="black" style={{display: 'inline'}}>
                을 발견했어요
              </Typo>
            </>
          </Typo>
          <ArrowRight />
        </div>
      </div>

      <div className={styles.goFootprint}>
        <Typo variant="caption" color="#565656" bold>
          등록된 비문
        </Typo>
        <Typo variant="caption" color="#565656">
          인지 확인해보기
        </Typo>
      </div>

      <div className={styles.dogList}>
        {DogList.map((dog: Dog) => {
          return <DogCard dog={dog} key={dog.image} />
        })}
      </div>
    </div>
  )
}