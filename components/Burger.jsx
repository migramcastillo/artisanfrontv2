import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Burger.module.css";

const Burger = (props) => {
  return (
    <aside className={styles.Burger}>
      <Link href="/">
        <a className={styles.Option}>
          <FontAwesomeIcon icon="home" />
          <span className={styles.Span}>Home</span>
        </a>
      </Link>
      <Link href="/articulos">
        <a className={styles.Option}>
          <FontAwesomeIcon icon="book" />
          <span className={styles.Span}>Artículos</span>
        </a>
      </Link>
      <Link href="/cursos">
        <a className={styles.Option}>
          <FontAwesomeIcon icon="graduation-cap" />
          <span className={styles.Span}>Cursos</span>
        </a>
      </Link>
    </aside>
  );
};

export default Burger;
