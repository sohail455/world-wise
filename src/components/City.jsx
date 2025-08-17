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
  const { setCurrentCity, currentCity, ORIGINAL_URL, isLoading, setIsLoading } =
    useCities();

  const { id } = useParams();
  console.log(id);
  useEffect(
    function () {
      async function getCity(id) {
        try {
          setIsLoading(true);
          const res = await fetch(`${ORIGINAL_URL}/cities/${id}`);
          const data = await res.json();
          setCurrentCity(data);
        } catch {
          alert("Error in Getting Data");
        } finally {
          setIsLoading(false);
        }
      }
      getCity(id);
    },
    [id]
  );
  const { cityName, emoji, date, notes } = currentCity;

  const [searchUrl, setSearchUrl] = useSearchParams({});
  const lat = searchUrl.get("lat");
  const lng = searchUrl.get("lng");
  if (isLoading) return <Spinner />;
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
