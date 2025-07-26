import styles from "./StatScreen.module.css";
import reload from "../../../../images/reload.svg";
import { useGameState } from "../../contexts/StateContext";

function StatScreen() {
  const { dispatch, mistakeCount, time } = useGameState();
  return (
    <div className={styles.game_container}>
      <h2>Congratulations! blah blah blah idk what to say here</h2>
      <div className={styles.settings_container}>
        <div className={styles.game_info}>
          Time: <span className={styles.yello}>{time}s</span>
        </div>
        <div className={styles.game_info}>
          Mistakes: <span className={styles.yello}>{mistakeCount}</span>
        </div>
        <div className={styles.game_info}>
          WPM: <span className={styles.yello}>72</span>
        </div>
      </div>
      <button
        className={`${styles.btn} ${styles.reload}`}
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        <img src={reload} alt="reload" />
        Try again
      </button>
    </div>
  );
}

export default StatScreen;
