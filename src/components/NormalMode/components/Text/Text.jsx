import { useEffect } from "react";
import styles from "./Text.module.css";
import { useGameState } from "../../contexts/StateContext";

function Text() {
  const { givenText, typedText, dispatch, loading } = useGameState();

  useEffect(() => {
    const lastIndex = typedText.length - 1;
    if (typedText[lastIndex] !== givenText[lastIndex]) {
      dispatch({ type: "incMistake" });
    }
  }, [typedText, givenText, dispatch, loading]);

  return (
    <div className={styles.game_text}>
      {givenText &&
        givenText.split("").map((letter, i) => {
          let className = styles.idle;

          if (i < typedText.length) {
            if (typedText[i] !== letter) {
              className = styles.wrong;
            } else {
              className = styles.correct;
            }
          }
          return (
            <span key={i} className={`game-text ${className}`}>
              {letter}
            </span>
          );
        })}
    </div>
  );
}

export default Text;
