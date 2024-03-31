import React, { useState, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import { signup } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-banh.png";
import "./Login.css"
const SignupForm = (props) => {
  const dispatch = useDispatch();
const initalMessage = useSelector((store) => store.auth.error);
const [message, setMessage] = useState(initalMessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
const handleToggle = props.toggle;
console.log(message)
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser ={
      email, 
      password, 
      userName
    }
    const data = await dispatch(signup(newUser));
     setEmail("");
     setPassword("");
     setUserName("");
     console.log();
     if (data.error) {
       // Login failed, handle the error
       // You can display an error message to the user or perform any other necessary actions
      //  setMessage(data.error);
      console.log(data)
     } else {
      setMessage("Account created successfully");
       // Login successful, navigate to "/home"
      //  navigate("/home");
      console.log(data.payload.success);
     }
    
  };
const isFormValid = email.trim() !== "" && password.trim() !== "";
  return (
    <form className="screen-1" onSubmit={handleSubmit}>
      <h3 style={{ padding: "0", marginTop: "0.5rem" }}>Welcome to</h3>
      <img
        src={logo}
        style={{ height: "auto", width: "100px", marginTop: "-2rem" }}
      />
      {message && <h6 style={{ color: "pink", marginTop: "-1.5rem", marginBottom: 0 }}>{message}</h6>}
      <div className="username">
        <div className="sec-2">
          <ion-icon name="mail-outline" />
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="userName"
            placeholder="Enter your username"
          />
        </div>
      </div>
      <div className="email">
        <div className="sec-2">
          <ion-icon name="mail-outline" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="password">
        {/* <label htmlFor="password">Password</label> */}
        <div className="sec-2">
          <ion-icon name="lock-closed-outline" />
          <input
            type="password"
            name="password"
            placeholder="············"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ion-icon className="show-hide" name="eye-outline" />
        </div>
      </div>

      <button className="signup" type="submit" disabled={!isFormValid}>
        Sign up
      </button>
      <div className="footer">
        <span>Have an account?</span>
        <span onClick={handleToggle}>Log in</span>
      </div>
    </form>
  );
};
export default SignupForm;
