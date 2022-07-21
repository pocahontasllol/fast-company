import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Users from "./app/components/users";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
  </>
);

// ReactDOM.render(<Users />,document.getElementById('root'))

reportWebVitals();

root.render(<App />);
