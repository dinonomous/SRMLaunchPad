import React,{ useState } from "react";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "http://192.168.0.135:5000/authentication/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);
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
                className="login"
                id="notactive"
                rel="noopener noreferrer"
              >
                Login
              </a>
              <a
                href="http://192.168.0.135:5173/register"
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="register_btn">
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

export default register;
