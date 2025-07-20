import styles from "./NormalMode.module.css";
import GameSettings from "./components/GameSettings";

function NormalMode() {
  return (
    <div className={styles.game_container}>
      <GameSettings />
      <div className={styles.text_container}></div>
    </div>
  );
}

export default NormalMode;
