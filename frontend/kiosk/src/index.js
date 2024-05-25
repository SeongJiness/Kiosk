import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.js";
import CheckoutPage from "./MainMenu/Payment/Checkout.js";
import { SuccessPage } from "./MainMenu/Payment/Success.js";
import FailPage from "./MainMenu/Payment/Fail.js";
import reportWebVitals from "./reportWebVitals.js";
import Menu from "./MainMenu/MenuList/Menu.js"; // Adjust the import based on your file structure

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/sandbox/success" element={<SuccessPage />} />
        <Route path="/sandobx/fail" element={<FailPage />} />
        <Route path="/menu" element={<Menu />} /> {/* Add this route */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
