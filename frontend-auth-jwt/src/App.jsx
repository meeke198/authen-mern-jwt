import React from "react";
// import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Home from "./components/Home.jsx";
function App() {
  return (
    <>
      <Router>
        {/* <div className="App"> */}
          <Routes>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/home" element={<Home/>} />
          </Routes>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
