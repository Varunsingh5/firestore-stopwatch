import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../components/firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationState, setValidationState] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();

  const validation = (key, value) => {
    let isvalid = false;
    let result;
    switch (key) {

      case 'email':
        result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isvalid = value ? result.test(value) : true;
        break;
      case 'password':
        result = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
        isvalid = value ? result.test(value) : true;
        break;

      default:
        break;
    }
    console.log("asdgjvaghscdvhas", isvalid);
    return isvalid;

  }
  const Login = () => {

    if (!email)
      setValidationState({ ...validationState, email: "Please enter valid email" })
    else {
      if (!password)
        setValidationState({ ...validationState, password: "Please enter your Password" })

      else {
        logInWithEmailAndPassword(email, password, navigate);
      }
    }

  };

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setValidationState({ ...validationState, email: "" })
          }}
          placeholder="E-mail Address"
          required
        />
        <span>{validationState?.email}</span>
        <input
          type="password"
          className="login__textBox"
          onChange={(e) => {
            setPassword(e.target.value)
            setValidationState({ ...validationState, password: "" })
          }}
          placeholder="Password"
          required
        />
        <span>{validationState?.password}</span>
        <button className="login__btn"
          onClick={Login}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;