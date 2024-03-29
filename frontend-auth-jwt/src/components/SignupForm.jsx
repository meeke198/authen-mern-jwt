import React, { useState, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import { signup } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-banh.png";
import "./Login.css"
const SignupForm = (props) => {
  const dispatch = useDispatch();
  const error = useSelector(store => store.auth.error)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
const handleToggle = props.toggle;
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
    navigate("/login");
  };
const isFormValid = email.trim() !== "" && password.trim() !== "";
  return (
    <form className="screen-1">
      <h3 style={{ padding: "0" }}>Welcome to</h3>
      <img
        src={logo}
        style={{ height: "auto", width: "120px", marginTop: "-2rem" }}
      />
      <div className="username">
        {/* <label htmlFor="email">Email Address</label> */}
        <div className="sec-2">
          <ion-icon name="mail-outline" />
          <input
            type="text"
            name="userName"
            placeholder="Enter your username"
          />
        </div>
      </div>
      <div className="email">
        {/* <label htmlFor="email">Email Address</label> */}
        <div className="sec-2">
          <ion-icon name="mail-outline" />
          <input type="email" name="email" placeholder="Enter your email" />
        </div>
      </div>

      <div className="password">
        {/* <label htmlFor="password">Password</label> */}
        <div className="sec-2">
          <ion-icon name="lock-closed-outline" />
          <input type="password" name="password" placeholder="············" />
          <ion-icon className="show-hide" name="eye-outline" />
        </div>
      </div>

      <button className="signup" type="submit" disable={!isFormValid}>
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
