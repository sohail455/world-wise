import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
function App() {
  const ORGIGINAL_URL = "http://localhost:8000";
  const [cities, setCities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${ORGIGINAL_URL}/cities`);
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="counteries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
