import { useEffect } from "react";
import styles from "./City.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../CitiesProvider";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  //consume the context data
  const { currentCity, isLoading, getCity } = useCities();

  //Getting the Country ID from the URL
  const { id } = useParams();
  //Sync Between the Coming ID and the CurrentCity State
  useEffect(() => {
    async function fetchCity() {
      await getCity(id);
    }
    fetchCity();
  }, [id]);
  //Selecting the data from the currentCity State 
  /*  {
      "cityName": xxx,
      "country": xxxx,
      "emoji": xxx,
      "date": xxxxx,
      "notes": xxxxx,
      "position": {
        "lat": xxxx,
        "lng": xxxx
      },
      "id": xxxx
    } */
  const { cityName, emoji, date, notes } = currentCity;

  //the isloading State will be true if currentCity State being Fecthed until  
  // dispatch({ type: "city/current", payload: data }) completed so isLoading return to false 
  // until this happens i will display spinner in <Outlet/> component.
  if (isLoading) return <Spinner />;

  //if isLoading True again the city information with city styling will be displayed on the <Outlet/>.
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
