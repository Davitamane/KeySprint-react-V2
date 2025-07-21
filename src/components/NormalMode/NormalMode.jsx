import styles from "./NormalMode.module.css";
import GameSettings from "./components/GameSettings/GameSettings";
import Info from "./components/Info/Info";
import Text from "./components/Text/Text";
import reload from "../../images/reload.svg";
import { useEffect, useReducer } from "react";

const initialState = {
  gameStatus: "initial",
  givenText:
    "She used to hate the rain, but today she danced in it, spinning under the gray clouds, soaked and smiling, because after everything she had been through, she realized the storm didn't mean she was drowning - it meant she had survived, and the water no longer held power over her.",
  typedText: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "gameOn":
      return { ...state, gameStatus: "gameOn" };

    case "onDelete":
      return { ...state, typedText: state.typedText.slice(0, -1) };

    case "keyPressed":
      return { ...state, typedText: action.payload };

    default:
      return state;
  }
}

function NormalMode({ setGameRunning }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== state.givenText[0] && state.typedText.length === 0) return;

      if (e.key === "Backspace") {
        dispatch({ type: "onDelete" });
        return;
      } else {
        if (e.key.length > 1) return;

        dispatch({ type: "keyPressed", payload: state.typedText + e.key });

        if (state.gameStatus === "initial") {
          dispatch({ type: "gameOn" });
          setGameRunning(true);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  return (
    <div className={styles.game_container}>
      <GameSettings state={state} />
      <div className={styles.text_container}>
        <Info state={state} />
        <Text givenText={state.givenText} typedText={state.typedText} />
      </div>
      <button className={`${styles.btn} ${styles.reload}`}>
        <img src={reload} alt="reload" />
        {state.gameStatus === "gameOn" ? "Restart" : "Regenerate"}
      </button>
    </div>
  );
}

export default NormalMode;
