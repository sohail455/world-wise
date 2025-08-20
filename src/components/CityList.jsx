import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../CitiesProvider";

function CityList() {
  //getting cities list and loading state 
  const { cities, isLoading } = useCities();

  //if there is no cities then display a message on <Outlet/>
  if (!cities.length) return <Message message="there are no Cities yet 🤷‍♀️" />;

  //if the value of the isLoaing State is true then display a spinner on <Outlet/>
  if (isLoading) return <Spinner />;

  //if everything is ok then display the cities
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
