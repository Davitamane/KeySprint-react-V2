import styles from "./NormalMode.module.css";
import GameSettings from "./components/GameSettings/GameSettings";
import Info from "./components/Info/Info";
import Text from "./components/Text/Text";
import reload from "../../images/reload.svg";
import { useEffect, useReducer } from "react";

const initialState = {
  gameStatus: "initial",
};

function reducer(state, action) {
  switch (action.type) {
    case "gameOn":
      return { ...state, gameStatus: "gameOn" };

    default:
      break;
  }
}

function NormalMode({ setGameRunning }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function handleKeyDown() {
      dispatch({ type: "gameOn" });
      setGameRunning(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.game_container}>
      <GameSettings state={state}/>
      <div className={styles.text_container}>
        <Info  state={state}/>
        <Text />
      </div>
      <button className={`${styles.btn} ${styles.reload}`}>
        <img src={reload} alt="reload" />
        {state.gameStatus === "gameOn" ? "Restart" : "Regenerate"}
      </button>
    </div>
  );
}

export default NormalMode;
