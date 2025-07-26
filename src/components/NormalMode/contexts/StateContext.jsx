import { useReducer, useEffect, createContext, useContext } from "react";

const StateContext = createContext();

const initialState = {
  gameStatus: "initial",
  givenText: " failed to get data from api",
  typedText: "",
  stringLength: 10,
  data: [],
  mistakeCount: 0,
  time: 0,
  punctuation: false,
  gameRunning: false,
  loading: true,
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

    case "setLoading":
      return { ...state, loading: action.payload };

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
        punctuation: false,
      };
    }
    case "increment_time":
      return {
        ...state,
        time: state.time + 1,
      };
    case "setGameRunning":
      return { ...state, gameRunning: action.payload };

    default:
      return state;
  }
}

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "setLoading", payload: true });

      const res = await fetch("http://localhost:9000/sentences");
      const data = await res.json();

      dispatch({ type: "getData", payload: data });

      const currArray = data["10_words"];
      const random = Math.floor(Math.random() * currArray.length);
      const randomText = currArray[random];

      dispatch({ type: "restart", payload: { givenText: randomText } });
      dispatch({ type: "setLoading", payload: false });
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
          dispatch({ type: "setGameRunning", payload: true });
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    if (
      state.givenText.length === state.typedText.length &&
      state.gameStatus !== "gameOver"
    ) {
      dispatch({ type: "gameOver" });
      dispatch({ type: "setGameRunning", payload: false });
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  useEffect(() => {
    if (!(state.gameStatus === "gameOn")) return;

    const timer = setInterval(() => {
      dispatch({ type: "increment_time" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.gameStatus]);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
        givenText: state.givenText,
        typedText: state.typedText,
        time: state.time,
        gameRunning: state.gameRunning,
        mistakeCount: state.mistakeCount,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error("nuh uh");

  return context;
}

export { StateProvider, useGameState };
