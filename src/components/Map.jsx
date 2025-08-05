import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
export default function Map() {
  const [searchUrl, setSearchUrl] = useSearchParams("");
  const lat = searchUrl.get("lat");
  const lng = searchUrl.get("lng");
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h2>{lat}</h2>
      <h2>{lng}</h2>
      <button onClick={() => setSearchUrl(`lat=${255}&lng=${244}`)}>
        Change Position
      </button>
    </div>
  );
}
