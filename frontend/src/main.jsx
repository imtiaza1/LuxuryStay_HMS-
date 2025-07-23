import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const stripePromise = loadStripe(
  "pk_test_51RfzhDEPxMcB3so3KjmRStXa1yu70Ux0KsZYCsqeG9NyN6lls8LeRStr2OoJiXeHtZqe5LmbIoP9Nsa7PhLutblb009EpPqXpy"
); // 👉 your publishable key here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </StrictMode>
);
