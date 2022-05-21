import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // User Login info

  useEffect(() => {
    if (isSubmitted) {
      navigate("/home");
    }
  }, [isSubmitted]);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      try {
        let res = await axios({
          method: "post",
          url: "http://localhost:8080/register",
          data: {
            username: username,
            password: password,
            confirmpassword: confirmPassword,
          },
        });
        let data = res.data;
        localStorage.setItem("username")
        navigate("/home");
        return data;
      } catch (err) {
        setErrorMessages("error registering , please try again")
        if (!err?.response) {
          console.log("ERROR");
        }
        return err.response;
      }
    } else {
      setErrorMessages("passwords don't match");
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required onChange={handleUsername} />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            required
            onChange={handlePassword}
          />
          {renderErrorMessage("pass")}
        </div>

        <div className="input-container">
          <label>Confirm Password </label>
          <input
            type="password"
            name="confirmPass"
            onChange={handleConfirmPassword}
            required
          />
          {renderErrorMessage("pass")}
        </div>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>{errorMessages}</span>
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="register-form">
        <div className="title">Register</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
