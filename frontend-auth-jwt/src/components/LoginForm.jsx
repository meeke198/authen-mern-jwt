import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import "./Login.css"
import logo from "../assets/images/logo-banh.png";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
console.log({email});
console.log({password});
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    // console.log("Logging in with:", email, password);
  };

  // return (
    // <form onSubmit={handleSubmit}>
    //   <h2>Login</h2>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button type="submit">Login</button>
    // </form>
    return (
      <div className="screen-1">
        <h3 style={{padding: "0"}}>Welcome to</h3>
        <img src={logo} style={{height: "auto", width: "120px", marginTop: "-2rem"}}/>
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
            <input
              className="pas"
              type="password"
              name="password"
              placeholder="············"
            />
            <ion-icon className="show-hide" name="eye-outline" />
          </div>
        </div>

        <button className="login">Login</button>

        <div className="footer">
          <span>Sign up</span>
          <span>Forgot Password?</span>
        </div>
      </div>
    );
};
export default LoginForm;