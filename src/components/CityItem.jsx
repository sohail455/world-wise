import { Link, useParams } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  console.log(city);
  const { id, position } = city;
  return (
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={styles.cityItem}
    >
      <li>
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <date className={styles.date}>{city.date}</date>
      </li>
    </Link>
  );
}

export default CityItem;
