import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Listing from "./components/Listing/Listing";
import Details from "./components/Details/Details";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Listing />} />
          <Route exact path="/details/:name" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
