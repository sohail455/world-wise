import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    return (
        <ul className={styles.countryList}>
            {cities.map((city) => (
                <CountryItem country={city} key={city.id} />
            ))}
        </ul>
    );

}

export default CountryList