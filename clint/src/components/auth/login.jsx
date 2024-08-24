import React, { useState, useEffect } from "react";
import "../../css/authtication.css";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const apiFrontUrl = import.meta.env.VITE_API_FRONT_URL;
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${apiUrl}`,
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      localStorage.setItem("email", data.email);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      //    Handle network or other errors
    }
  };

  return (
    <>
      <div className="auth_background">
        <div className="auth_body">
          <div className="auth_card">
            <h2>Login Form</h2>

            <div className="login_register">
              <a
                href={`${apiFrontUrl}/login`}
                id="active"
                className="login"
                rel="noopener noreferrer"
              >
                Login
              </a>
              <a
                href={`${apiFrontUrl}/register`}
                id="notactive"
                className="register"
                rel="noopener noreferrer"
              >
                Signup
              </a>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="login_btn">
                Login
              </button>
            </form>

            <div className="footer_card">
              <p>Not a SRM student?</p>
              <a href="#">Signup now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
