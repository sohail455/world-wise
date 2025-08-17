import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const ORIGINAL_URL = "http://localhost:8000";
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${ORIGINAL_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error in geting Data");
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        ORIGINAL_URL,
        setCurrentCity,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context is used outside the prvider");
  return context;
}

export { CitiesProvider, useCities };
