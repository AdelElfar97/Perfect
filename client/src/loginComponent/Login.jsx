import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // User Login info

  useEffect(() => {
    if (isSubmitted) {
      navigate("/home");
    }
  }, [isSubmitted]);



  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/login",
        data: {
          username: username,
          password: password,
        },
      });
      let data = res.data;
      localStorage.setItem("username",username)
      localStorage.setItem("token",data.accessToken)
      navigate("/home");
      return data;
    } catch (err) {
      setErrorMessages("wrong credentials")
      if (!err?.response) {
        
        console.log("ERROR");
      }
      
      return err.response;
    }
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
        

        <div style={{ textAlign:"center" }}>
          <span style={{ color:"red", }}>{errorMessages}</span>
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
