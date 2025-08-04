import styles from "./CityItem.module.css";

function CityItem({ city }) {
  console.log(city);
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{city.emoji}</span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <date className={styles.date}>{city.date}</date>
    </li>
  );
}

export default CityItem;
