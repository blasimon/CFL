import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Import BrowserRouter and Route
import App from "./App";
import { QuickstartProvider } from "./Context";
import reportWebVitals from "./reportWebVitals";
import StudyApp from "./Components/StudyApp"; // Import the new component



ReactDOM.render(
  <React.StrictMode>
    <QuickstartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App/>} /> New Page, Existing Route
          <Route path="/studies/study" element={<StudyApp/>} /> {/* Existing Page, New route */}
        </Routes>
      </Router>
    </QuickstartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
