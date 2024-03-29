import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleForm } from "../redux/features/session/sessionSlice";
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm";
const SessionForm = () => {
  const dispatch = useDispatch();
  const isLoginFormActive = useSelector(
    (state) => state.session.isLoginFormActive
  );

  const handleFormToggle = () => {
    dispatch(toggleForm());
  };

  return (
    <div className="session-form">
      {isLoginFormActive ? (
        <LoginForm toggle={handleFormToggle} />
      ) : (
        <SignupForm toggle={handleFormToggle} />
      )}
      <div className="switch-link">
        {/* <a href="#" onClick={handleFormToggle}>
          {isLoginFormActive ? "Switch to Signup" : "Switch to Login"}
        </a> */}
      </div>
    </div>
  );
};

export default SessionForm;
