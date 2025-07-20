import styles from "./Text.module.css";

const testText =
  "She used to hate the rain, but today she danced in it, spinning under the gray clouds, soaked and smiling, because after everything she had been through, she realized the storm didn't mean she was drowning - it meant she had survived, and the water no longer held power over her.";
const typedText =
  "She used to hate the rain, but today she danced in it, spinning under the gray clouds, soaked and smiling, because after everything she had been through, she realized the storm didn't mean she was drowning - it meant she had survived, and the water no longer held power over her.";

function Text() {
  return (
    <div className={styles.game_text}>
      {" "}
      {testText.split("").map((letter, i) => {
        let className = "";

        if (i < typedText.length) {
          if (typedText[i] !== letter) {
            className = "wrong";
          } else {
            className = "correct";
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
