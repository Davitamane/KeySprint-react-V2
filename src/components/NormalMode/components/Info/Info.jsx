import styles from "./Info.module.css";

function Info({ state }) {
  return (
    <div
      className={`${styles.info} ${
        state.gameStatus === "gameOn" ? styles.hidden : ""
      }`}
    >
      <p className={styles.text}>Basic info:</p>
      <p>
        In KeySprint, type the given text as fast and accurately as you can to
        beat your personal best time. Test your typing skills and aim for top
        speed and precision!
      </p>
    </div>
  );
}

export default Info;
