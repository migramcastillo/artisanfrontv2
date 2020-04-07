import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Burger.module.css";

const Burger = (props) => {
  return (
    <aside className={styles.Burger}>
      <a href="/en/" className={styles.Option}>
        <FontAwesomeIcon icon="info" />
        <span className={styles.Span}>About</span>
      </a>
      <a href="/en/" className={styles.Option}>
        <FontAwesomeIcon icon="book" />
        <span className={styles.Span}>Articles</span>
      </a>
      <a href="/en/" className={styles.Option}>
        <FontAwesomeIcon icon="home" />
        <span className={styles.Span}>Home</span>
      </a>
      <a href="/en/" className={styles.Option}>
        <FontAwesomeIcon icon="graduation-cap" />
        <span className={styles.Span}>Courses</span>
      </a>
      <a href="/en/" className={styles.Option}>
        <FontAwesomeIcon icon="language" />
        <span className={styles.Span}>English</span>
      </a>
    </aside>
  );
};

export default Burger;
