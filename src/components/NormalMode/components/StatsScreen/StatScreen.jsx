import styles from "./StatScreen.module.css";
import reload from "../../../../images/reload.svg";

function StatScreen({ dispatch }) {
  return (
    <div className={styles.game_container}>
      <h2>Congratulations! blah blah blah idk what to say here</h2>
      <div className={styles.settings_container}>
        <div className={styles.game_info}>
          Time: <span className={styles.yello}>5s</span>
        </div>
        <div className={styles.game_info}>
          Mistakes: <span className={styles.yello}>4</span>
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
