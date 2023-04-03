import PageFooter from "../PageFooter";
import PageHeader from "../PageHeader";
import styles from "./styles.module.scss";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
  const { children } = props;

  return (
    <div className={styles.root} id="root-el">
      <PageHeader />
      {children}
      <PageFooter />
    </div>
  )
}