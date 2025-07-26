import styles from "./NormalMode.module.css";
import GameSettings from "./components/GameSettings/GameSettings";
import Info from "./components/Info/Info";
import Text from "./components/Text/Text";
import reload from "../../images/reload.svg";
import StatScreen from "./components/StatsScreen/StatScreen";
import { useGameState } from "./contexts/StateContext";

function NormalMode() {
  const { dispatch, state } = useGameState();
  return (
    <div className={styles.game_container}>
      {state.gameStatus === "gameOver" ? (
        <StatScreen />
      ) : (
        <>
          <GameSettings />
          <div className={styles.text_container}>
            <Info />
            <Text />
          </div>
          <button
            className={`${styles.btn} ${styles.reload}`}
            onClick={() => {
              dispatch({ type: "restart" });
              dispatch({ type: "setGameRunning", payload: false });
            }}
          >
            <img src={reload} alt="reload" />
            {state.gameStatus === "gameOn" ? "Restart" : "Regenerate"}
          </button>
        </>
      )}
    </div>
  );
}

export default NormalMode;
