import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (!cities.length) return <Message message="there are no Cities yet 🤷‍♀️" />;
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((arr) => arr.country).includes(cur.country))
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country} />
      ))}
    </ul>
  );
}

export default CountryList;
