import React, { useState, useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import { signup } from "../redux/features/auth/authSlice";
const SignupForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(store => store.auth.error)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser ={
      email, 
      password, 
      userName
    }
    dispatch(signup(newUser));
     setEmail("");
     setPassword("");
     setUserName("");
  };
const isFormValid = email.trim() !== "" && password.trim() !== "";
  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="userName"
        placeholder="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" disable={!isFormValid}>
        Signup
      </button>
    </form>
  );
};
export default SignupForm;
