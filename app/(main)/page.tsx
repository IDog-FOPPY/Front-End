import Link from 'next/link'
import HeroBanner from "./(HeroBanner)";
import Lost from "./(Lost)";
import DogRegister from "./(DogRegister)";


export default function MainPage() {
  return (
    <>
      <Link href="/guide" style={{ width: '100%' }}>
        <HeroBanner />
      </Link>
      <DogRegister />
      <Lost />
    </>
  )
}