import { Link, useParams } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../CitiesProvider";

function CityItem({ city }) {
  const { currentCity } = useCities();
  const { id, position } = city || {};
  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.cityItem} ${
        currentCity === id ? styles["cityItem--active"] : ""
      }`}
    >
      <li>
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{city.date}</time>
      </li>
    </Link>
  );
}

export default CityItem;
