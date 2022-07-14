import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../components/firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [validationState, setValidationState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate();

  const validation = (key, value) => {
    let isvalid = false;
    let result;
    switch (key) {
      case 'name':
        result = /^[a-zA-Z\\s]*$/;
        isvalid = value ? result.test(value) : false;
        break;
      case 'email':
        result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isvalid = value ? result.test(value) : false;
        break;
      case 'password':
        result = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
        isvalid = value ? result.test(value) : false;
        break;

      default:
        break;
    }
    console.log("asdgjvaghscdvhas", isvalid);
    return isvalid;
  }
  const register = () => {
    if (!validation('name', name)) {
      setValidationState({ ...validationState, name: "Please enter valid name" })
    } else {
      if (!validation('email', email))
        setValidationState({ ...validationState, email: "Please enter valid email" })
      else {
        if (!password)
          setValidationState({ ...validationState, password: "Please enter valid passowrd" })
        else {
          if (!confirmPassword)
            setValidationState({ ...validationState, confirmPassword: "Re-enter your password" })
          else {
            if (password !== confirmPassword)
              setValidationState({ ...validationState, confirmPassword: "Password mismatch" })
            else {
              registerWithEmailAndPassword(name, email, password, navigate);
            }
          }
        }
      }
    }
    // // if (!name) alert("Please enter name");
    //   if (!validation(email)) alert("email is invalid")
    // else if (password != confirmPassword) alert("password mismatched")
    // else { registerWithEmailAndPassword(name, email, password, navigate); }
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <div className="register">
      <div className="register__container">
        <input type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setValidationState({ ...validationState, name: "" })
          }}
          placeholder="Full Name"
        />
        <span>{validationState?.name}</span>
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setValidationState({ ...validationState, email: "" })
          }}
          placeholder="E-mail Address"
        />
        <span>{validationState?.email}</span>
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setValidationState({ ...validationState, password: "" })
          }}
          placeholder="Password"
        />
        <span>{validationState?.password}</span>
        <input
          type="password"
          className="register__textBox"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setValidationState({ ...validationState, confirmPassword: "" })
          }}
          placeholder="Confirm Password"
        />
        <span>{validationState?.confirmPassword}</span>
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;