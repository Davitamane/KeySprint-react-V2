import { useGameState } from "../../contexts/StateContext";
import styles from "./GameSettings.module.css";

function GameSettings() {
  const { state, dispatch, time } = useGameState();
  return (
    <div className={styles.settings_container}>
      {state.gameStatus === "initial" && (
        <>
          <button
            className={`${styles.btn} ${state.punctuation ? "active" : ""}`}
            onClick={() => dispatch({ type: "punctuation" })}
          >
            Punctuation
          </button>
          <button
            className={`${styles.btn} ${
              state.stringLength === 10 ? "active" : ""
            }`}
            onClick={() => dispatch({ type: "changeLength", payload: 10 })}
          >
            10 words
          </button>
          <button
            className={`${styles.btn} ${
              state.stringLength === 25 ? "active" : ""
            }`}
            onClick={() => dispatch({ type: "changeLength", payload: 25 })}
          >
            25 words
          </button>
          <button
            className={`${styles.btn} ${
              state.stringLength === 50 ? "active" : ""
            }`}
            onClick={() => dispatch({ type: "changeLength", payload: 50 })}
          >
            50 words
          </button>
        </>
      )}
      {state.gameStatus === "gameOn" && (
        <>
          <div className={styles.game_info}>
            Time: <span className={styles.yello}>{time}s</span>
          </div>
        </>
      )}
    </div>
  );
}

export default GameSettings;
