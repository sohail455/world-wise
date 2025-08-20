import { Link, NavLink, useParams } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../CitiesProvider";
import Button from "./Button";

function CityItem({ city }) {
  //consum data from the context
  const { currentCity, deleteCity } = useCities();
  //city that comming from mapping on cities 
  const { id, position } = city || {};

  function handelDeleteCountry(e) {
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
      <NavLink
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""
          }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{city.date}</time>
        <button className={styles.deleteBtn} onClick={e => handelDeleteCountry(e)}>X</button>
      </NavLink>
    </li>
  );
}

export default CityItem;
