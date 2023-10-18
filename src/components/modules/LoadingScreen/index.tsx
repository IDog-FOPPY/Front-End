import Animation from "@src/components/core/Animation";
// import Loading from "@assets/json/loading.json";
import styles from "./styles.module.scss";

export default function LoadingScreen() {
  return (
    <div className={styles.background}>
      <Animation path="json/loading.json" className={styles.loading} />
    </div>
  );
}
