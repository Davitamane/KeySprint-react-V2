import styles from "./Text.module.css";

function Text({ givenText, typedText }) {

  return (
    <div className={styles.game_text}>
      {" "}
      {givenText &&
        givenText.split("").map((letter, i) => {
          let className = "";

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
