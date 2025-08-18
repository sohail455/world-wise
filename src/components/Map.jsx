import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../CitiesProvider";
import { useGeolocation } from "./GetGeoLocation";
import Button from "./Button";
export default function Map() {
  const { cities } = useCities();

  const [searchParams, setSearcParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: isLoadingGeoLocaion,
    position: positionGeoLocation,
    getPosition,
  } = useGeolocation();

  const [position, setPosition] = useState([30.0939556, 31.2187071]);

  useEffect(
    function () {
      if (lat && lng) setPosition([parseFloat(lat), parseFloat(lng)]);
    },
    [lat, lng]
  );

  useEffect(() => {
    if (positionGeoLocation) {
      setPosition([positionGeoLocation.lat, positionGeoLocation.lng]);
    }
  }, [positionGeoLocation]);

  return (
    <div className={styles.mapContainer}>
      {!positionGeoLocation && (
        <Button type={"position"} onclick={getPosition}>
          {isLoadingGeoLocaion ? "Loading......" : "Use Your Currennt Position"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
