import { Level } from "../../types/Level";
import styles from "./index.module.scss";

type Props = {
  score: number;
  level: Level;
};

export const Score: React.FC<Props> = ({ score, level }) => {
  const levelText =
    level === "EASY"
      ? "かんたん"
      : level === "NORMAL"
      ? "ふつう"
      : "むずかしい";

  const twitterURL = () => {
    const shareText = `私は${levelText}モードで${score}点獲得しました！`;
    const hash = `#FingerNinja`;
    const shareUrl = "https://figner-ninja.vercel.app";
    return (
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=` +
      encodeURIComponent(shareText + `\r\n` + hash)
    );
  };
  const shareHandler = () => {
    window.open(twitterURL(), "_blank");
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src="/images/ninja1.svg" alt="Ninja" className={styles.ninja} />
        <div className={styles.score}>
          <span>あなたは</span>
          <span>{levelText}モードで</span>
          <span>{score}点獲得しました！</span>
        </div>
      </div>
      <button onClick={shareHandler} className={styles.button}>
        <img src="/images/x.svg" alt="x" className={styles.x} width={10} />
        シェアする
      </button>
    </div>
  );
};
