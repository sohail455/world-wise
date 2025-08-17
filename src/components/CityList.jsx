import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../CitiesProvider";

function CityList() {
  const { cities, isLoading } = useCities();

  if (!cities.length) return <Message message="there are no Cities yet 🤷‍♀️" />;

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
