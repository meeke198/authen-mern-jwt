import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-banh.png";
import "./Login.css";

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const handleToggle = props.toggle;
  const navigate = useNavigate();
// console.log(error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { email, password, userName };
    const data = await dispatch(signup(newUser));
    setEmail("");
    setPassword("");
    setUserName("");
    console.log({ data });
    if (data.error) {
      console.log(data.error);
    } else {
      navigate("/login");
      throw alert("Signup successfully")
    }
  };
const errorStyle = {
  color: "red",
  fontWeight: "bold",
  fontSize: "0.55rem",
  margin: "-1rem 1rem",
  padding: 0,
};
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <form className="screen-1" onSubmit={handleSubmit}>
      <h3 style={{ padding: "0", marginTop: "0.5rem" }}>Welcome to</h3>
      <img
        src={logo}
        style={{ height: "auto", width: "100px", marginTop: "-2rem" }}
      />
      {error?.error.message && (
        <p style={{ ...errorStyle }}>{error?.error.message}</p  >
      )}
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
      {error?.error.userName && (
        <p style={{ ...errorStyle }}>{error?.error.userName}</p>
      )}
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
      {error?.error.email && (
        <p style={{ ...errorStyle }}>{error?.error.email}</p>
      )}
      <div className="password">
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
      {error?.error.password && (
        <p style={{ ...errorStyle }}>{error?.error.password}</p>
      )}
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