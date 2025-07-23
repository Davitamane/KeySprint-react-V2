import styles from "./NormalMode.module.css";
import GameSettings from "./components/GameSettings/GameSettings";
import Info from "./components/Info/Info";
import Text from "./components/Text/Text";
import reload from "../../images/reload.svg";
import { useEffect, useReducer } from "react";
import StatScreen from "./components/StatsScreen/StatScreen";

const initialState = {
  gameStatus: "initial",
  givenText: " failed to get data from api",
  typedText: "",
  stringLength: 10,
  data: [],
  mistakeCount: 0,
  time: 0,
  punctuation: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "gameOn":
      return { ...state, gameStatus: "gameOn" };

    case "onDelete":
      return { ...state, typedText: state.typedText.slice(0, -1) };

    case "keyPressed":
      return { ...state, typedText: action.payload };

    case "gameOver":
      return { ...state, gameStatus: "gameOver" };

    case "restart": {
      const currArray = state.data?.[`${state.stringLength}_words`];
      const random = Math.floor(Math.random() * currArray.length);
      return {
        ...initialState,
        stringLength: state.stringLength,
        data: state.data,
        givenText: currArray[random] || initialState.givenText,
      };
    }

    case "getData":
      return { ...state, data: action.payload };

    case "punctuation": {
      
      const cleaned = state.givenText.replace(/[^\w\s]|_/g, "");
      return { ...state, givenText: cleaned, punctuation: !state.punctuation };
    }

    case "incMistake":
      return { ...state, mistakeCount: state.mistakeCount + 1 };

    case "changeLength": {
      const random = Math.floor(Math.random() * 10);
      const currArray = state.data[`${action.payload}_words`];

      return {
        ...state,
        stringLength: action.payload,
        givenText: currArray[random],
      };
    }
    case "increment_time":
      return {
        ...state,
        time: state.time + 1,
      };

    default:
      return state;
  }
}

function NormalMode({ setGameRunning }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:9000/sentences");
      const data = await res.json();
      dispatch({ type: "getData", payload: data });
      const currArray = data["10_words"];
      const random = Math.floor(Math.random() * currArray.length);
      const randomText = currArray[random];

      dispatch({
        type: "keyPressed",
      });
      dispatch({
        type: "restart",
        payload: { givenText: randomText },
      });
    }
    fetchData();
  }, []);

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
    if (
      state.givenText.length === state.typedText.length &&
      state.gameStatus !== "gameOver"
    ) {
      dispatch({ type: "gameOver" });
      setGameRunning(false);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, setGameRunning]);

  useEffect(() => {
    if (!(state.gameStatus === "gameOn")) return;

    const timer = setInterval(() => {
      dispatch({ type: "increment_time" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameStatus]);

  return (
    <div className={styles.game_container}>
      {state.gameStatus === "gameOver" ? (
        <StatScreen
          dispatch={dispatch}
          mistakeCount={state.mistakeCount}
          time={state.time}
        />
      ) : (
        <>
          <GameSettings state={state} dispatch={dispatch} time={state.time} />
          <div className={styles.text_container}>
            <Info state={state} />
            <Text
              givenText={state.givenText}
              typedText={state.typedText}
              dispatch={dispatch}
            />
          </div>
          <button
            className={`${styles.btn} ${styles.reload}`}
            onClick={() => {
              dispatch({ type: "restart" });
              setGameRunning(false);
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
