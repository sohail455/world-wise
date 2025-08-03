import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/products";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Products />} />
        <Route path="home" element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
