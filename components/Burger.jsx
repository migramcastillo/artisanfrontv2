import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Burger.css";

const Burger = props => {
  return (
    <aside className="burger">
      <a href="/en/" className="option">
        <FontAwesomeIcon icon="info" />
        <span>About</span>
      </a>
      <a href="/en/" className="option">
        <FontAwesomeIcon icon="book" />
        <span>Articles</span>
      </a>
      <a href="/en/" className="option">
        <FontAwesomeIcon icon="home" />
        <span>Home</span>
      </a>
      <a href="/en/" className="option">
        <FontAwesomeIcon icon="graduation-cap" />
        <span>Courses</span>
      </a>
      <a href="/en/" className="option">
        <FontAwesomeIcon icon="language" />
        <span>English</span>
      </a>
    </aside>
  );
};

export default Burger;
