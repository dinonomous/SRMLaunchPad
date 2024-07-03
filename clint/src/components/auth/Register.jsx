import React, { useState, useEffect, useCallback } from "react";
import "../../css/authtication.css";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const apiFrontUrl = import.meta.env.VITE_API_FRONT_URL;
import _ from "lodash";

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const checkEmailExists = useCallback(
    _.debounce(async (email) => {
      const response = await fetch(`${apiUrl}/authentication/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setEmailExists(data.exists);
    }, 300),
    []
  );

  useEffect(() => {
    if (email) {
      checkEmailExists(email);
    }
  }, [email, checkEmailExists]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${apiUrl}/authentication/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    navigate("/");

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
                className="login"
                id="notactive"
                rel="noopener noreferrer"
              >
                Login
              </a>
              <a
                href={`${apiFrontUrl}/register`}
                className="register"
                id="active"
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
              {emailExists && (
                <p style={{ color: "red" }}>user alredy exists</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={emailExists}
                style={{
                  backgroundColor: emailExists ? "#d3d3d3" : "white",
                  cursor: emailExists ? "not-allowed" : "auto",
                }}
              />
              <button
                type="submit"
                className="login_btn"
                disabled={emailExists}
                style={{
                  backgroundColor: emailExists ? "#d3d3d3" : "",
                  cursor: emailExists ? "not-allowed" : "pointer",
                }}
              >
                Register
              </button>
            </form>

            <div className="footer_card">
              <p>have an account ?</p>
              <a href="#">Login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
