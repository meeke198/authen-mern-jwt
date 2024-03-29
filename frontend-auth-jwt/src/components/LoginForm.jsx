import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-banh.png";
import "./Login.css";
const LoginForm = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleToggle = props.toggle;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const data = await dispatch(login(user));
    console.log({data});
    setEmail("");
    setPassword("");
    console.log();
    navigate("/home");
  };
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  return (
    <form className="screen-1" onSubmit={handleSubmit}>
      <h3 style={{ padding: "0" }}>Welcome back to</h3>
      <img
        src={logo}
        style={{ height: "auto", width: "120px", marginTop: "-2rem" }}
      />
      <div className="email">
        <div className="sec-2">
          <ion-icon name="mail-outline" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="password">
        <div className="sec-2">
          <ion-icon name="lock-closed-outline" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pas"
            type="password"
            name="password"
            placeholder="············"
          />
        </div>
      </div>

      <button className="login" type="submit" disabled={!isFormValid}>
        Login
      </button>

      <div className="footer">
        <span>Doesn't have an account?</span>
        <span onClick={handleToggle}>Sign up</span>
      </div>
    </form>
  );
};
export default LoginForm;
