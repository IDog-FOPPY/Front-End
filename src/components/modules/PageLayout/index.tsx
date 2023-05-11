"use client";

import PageFooter from "../PageFooter";
import PageHeader from "../PageHeader";
import styles from "./styles.module.scss";
import { usePathname } from 'next/navigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
  const { children } = props;

  const pathname = usePathname();
  const isCommonLayout = () => {
    if (pathname === '/AddMyDog' || pathname === '/EditMyDog') return false
    else return true
  }

  //공통레이아웃 적용
  if (isCommonLayout() === true)
    return (
      <div className={styles.root} id="root-el">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    )

  //공통레이아웃 적용X
  else return (
    <div>{children}</div>
  )
}