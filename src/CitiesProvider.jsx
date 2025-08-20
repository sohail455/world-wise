import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: false
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false }
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload], isLoading: false, currentCity: action.payload }
    case "city/deleted":
      return { ...state, cities: state.cities.filter(city => city.id !== action.payload), isLoading: false, currentCity: {} }
    case "city/current":
      return { ...state, currentCity: action.payload, isLoading: false }
    case "default":
      alert("Undefined Action");
      return state;
  }
}


function CitiesProvider({ children }) {
  const ORIGINAL_URL = "http://localhost:8000";
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(reducer, initialState)


  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${ORIGINAL_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data })
      } catch {
        alert("error in geting Data");
      }
    }
    getCities();
  }, []);

  async function SetNewCity(newCity) {
    dispatch({ type: "loading" })
    try {

      const res = await fetch(`${ORIGINAL_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json"
        }

      });
      const data = await res.json()
      dispatch({ type: "city/created", payload: data })
    } catch {
      alert("error in geting Data");
    }
  }

  async function deleteCity(CityID) {
    dispatch({ type: "loading" })
    try {

      const res = await fetch(`${ORIGINAL_URL}/cities/${CityID}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }

      });


      dispatch({ type: "city/deleted", payload: CityID })

    } catch {
      alert("error in Deleting Data");
    }
  }

  async function getCity(id) {
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${ORIGINAL_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/current", payload: data });
    } catch {
      alert("Error in Getting Data");
    }
  }


  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        ORIGINAL_URL,
        currentCity,
        deleteCity,
        getCity,
        SetNewCity
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
