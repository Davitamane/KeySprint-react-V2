import styles from "./GameSettings.module.css";

function GameSettings({ state }) {
  return (
    <div className={styles.settings_container}>
      {state.gameStatus === "initial" && (
        <>
          <button className={styles.btn}>Punctuation</button>
          <button className={styles.btn}>10 words</button>
          <button className={styles.btn}>25 words</button>
          <button className={styles.btn}>50 words</button>
        </>
      )}
      {state.gameStatus === "gameOn" && (
        <>
          <div className={styles.game_info}>
            Time: <span className="yello">4s</span>
            Time: <span className="yello">4s</span>
          </div>
        </>
      )}
    </div>
  );
}

export default GameSettings;
