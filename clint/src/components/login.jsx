import React, { useState } from "react";
import "../css/authtication.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://192.168.0.135:5000/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      localStorage.setItem('token', data.token)

    } catch (error) {
      console.error('Error during login:', error);
      // Handle network or other errors
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
                href="http://192.168.0.135:5173/login"
                id="active"
                className="login"
                rel="noopener noreferrer"
              >
                Login
              </a>
              <a
                href="http://192.168.0.135:5173/register"
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
