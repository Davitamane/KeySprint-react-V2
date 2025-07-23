import { useEffect } from "react";
import styles from "./Text.module.css";

function Text({ givenText, typedText, dispatch }) {
  useEffect(() => {
    if (typedText[typedText.length - 1] !== givenText[typedText.length - 1])
      dispatch({ type: "incMistake" });
  }, [givenText, typedText, dispatch]);
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
