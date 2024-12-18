import { Level } from "../types/Level";
import styles from "../styles/Home.module.scss";

type Props = {
  onClick: (mode: Level) => void;
};
export const Home = ({ onClick }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img
          src="/images/shuriken.svg"
          alt="Shuriken"
          className={styles.shuriken}
          width={50}
        />
        Finger Ninja
        <img
          src="/images/shuriken.svg"
          alt="Shuriken"
          className={styles.shuriken}
          width={50}
        />
      </div>
      <p className={styles.desc}>あなたはフィンガー忍者ですか？</p>
      <button onClick={() => onClick("EASY")} className={styles.button2}>
        <div className={styles.gameTitle}>かんたん</div>
        <div className={styles.gameDisc}>
          30秒
          <br />
          <span className={styles.star10_rating} data-rate="2"></span>
        </div>
      </button>
      <button onClick={() => onClick("NORMAL")} className={styles.button2}>
        <div className={styles.gameTitle}>ふつう</div>
        <div className={styles.gameDisc}>
          60秒
          <br />
          <span className={styles.star10_rating} data-rate="5"></span>
        </div>
      </button>
      <button onClick={() => onClick("HARD")} className={styles.button2}>
        <div className={styles.gameTitle}>むずかしい</div>
        <div className={styles.gameDisc}>
          90秒
          <br />
          <span className={styles.star10_rating} data-rate="10"></span>
        </div>
      </button>
    </div>
  );
};
