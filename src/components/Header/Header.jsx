import logo from "../../images/Logo.svg";
// import logoDark from "../images/Logo-darkMode.svg";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" />
      <ul className={styles.ul_container}>
        <li className={styles.btn}>
          <NavLink to="/normal">Normal mode</NavLink>
        </li>
        <li className={styles.btn}>
          <NavLink to="/sprint">Sprint mode</NavLink>
        </li>
      </ul>
      <div>
        <button
          className={styles.btn}
          onClick={() =>
            window.open(
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ"
            )
          }
        >
          About us
        </button>
      </div>
    </header>
  );
}
