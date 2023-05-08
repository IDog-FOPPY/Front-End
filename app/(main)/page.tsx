import Link from 'next/link'
import HeroBanner from "./(HeroBanner)";
import Lost from "./(Lost)";
import DogRegister from "./(DogRegister)";


export default function MainPage() {
  return (
    <>
      {/* Link태그 자체가 가지고있는 스타일때매 style속성 안넣으면 width가 주는현상 이게뭘까요 */}
      <Link href="/guide" style={{ width: '100%' }}>
        <HeroBanner />
      </Link>
      <DogRegister />
      <Lost />
    </>
  )
}