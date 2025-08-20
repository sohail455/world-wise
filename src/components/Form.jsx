// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "./useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../CitiesProvider";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { SetNewCity, isLoading: isLoadingCities } = useCities()

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoLocationError, setGeoLocationError] = useState("")
  const [emoji, setEmoji] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const { lat, lng } = useUrlPosition()

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
  useEffect(function () {
    async function getCuntery() {
      if (!lat && !lng) return
      try {
        setIsLoading(true)
        setGeoLocationError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        if (!data.city)
          throw new Error("This Seems Not To Be a City, Please Click Somewhere Else 😁")
        console.log(data)
        setCityName(data.city)
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (err) {
        setGeoLocationError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    getCuntery()
  }, [lat, lng])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }
    console.log(newCity)
    await SetNewCity(newCity)
    navigate("/app/cities")
  }


  if (isLoading) return (<Spinner />)
  if (geoLocationError) return <Message message={geoLocationError} />
  if (!lat && !lng) return <Message message={"please start Clicking on The map"} />
  return (
    <form className={`${styles.form} ${isLoadingCities ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker id={"date"} selected={date} onChange={date => setDate(date)} dateFormat={"dd/MM/yyyy"} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"} onclick={e => handleSubmit(e)}>Add</Button>

        <Button
          onclick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type={"back"}
        >
          &larr; Back
        </Button>

      </div>
    </form>
  );
}

export default Form;
