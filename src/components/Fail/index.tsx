import styles from "./index.module.scss";

export const Fail: React.FC = () => {
  const getVisibleHeight = () => {
    if (window.visualViewport) {
      return window.visualViewport.height;
    } else {
      // visualViewport がサポートされていない場合
      return window.innerHeight;
    }
  };
  return (
    <div className={styles.container} style={{ height: getVisibleHeight() }}>
      <h1>ミス！</h1>
      <img
        src="/images/ninja3.svg"
        alt="Ninja"
        className={styles.ninja}
        width={50}
      />
    </div>
  );
};
