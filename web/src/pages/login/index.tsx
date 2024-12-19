import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setTokenAndRedirect } from "../common";
import { loginService } from "@/services";
import { showToast } from "@/utils/toast";
import "./style.css"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = { email, password };

    const { status, cls, msg, payload } = await loginService(input);

    showToast(msg, cls);
    if (!status) {
      return;
    }

    setTimeout(() => {
      setTokenAndRedirect(payload);
    }, 2000);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <p className="login-subtext">
          Welcome back! Login to your account to access the dashboard.
        </p>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

        <Link className="forgot-password-link" to="/forget-password">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="login-page-wrapper">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
