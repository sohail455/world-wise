import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import NotFound from "./pages/NotFound";

import { CitiesProvider } from "./CitiesProvider";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to={"cities"} replace />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="form" element={<Form />} />
            <Route path="cities" element={<CityList />} />
            <Route path="counteries" element={<CountryList />} />
            <Route path="form" element={<p>form</p>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
