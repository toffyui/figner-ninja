import { Level } from "../types/Level";
import styles from "../styles/Home.module.scss";

type Props = {
  onClick: (mode: Level) => void;
};
export const Home = ({ onClick }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Finger Ninja</div>
      <p className={styles.desc}>フリック入力の速度を計算しよう</p>
      <button onClick={() => onClick("EASY")} className={styles.button2}>
        <div className={styles.gameTitle}>かんたん</div>
        <div className={styles.gameDisc}>
          1分
          <br />
          <span className={styles.star10_rating} data-rate="2"></span>
        </div>
      </button>
      <button onClick={() => onClick("NORMAL")} className={styles.button2}>
        <div className={styles.gameTitle}>ふつう</div>
        <div className={styles.gameDisc}>
          2分
          <br />
          <span className={styles.star10_rating} data-rate="4.5"></span>
        </div>
      </button>
      <button onClick={() => onClick("HARD")} className={styles.button2}>
        <div className={styles.gameTitle}>むずかしい</div>
        <div className={styles.gameDisc}>
          3分
          <br />
          <span className={styles.star10_rating} data-rate="7"></span>
        </div>
      </button>
    </div>
  );
};
