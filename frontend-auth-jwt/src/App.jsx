import React from "react";
// import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
function App() {
  return (
    <>
      <Router>
        {/* <div className="App"> */}
          <Routes>
            <Route path="/" element={<SignupForm />} />
            <Route path="/signin" element={<LoginForm/>} />
          </Routes>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
