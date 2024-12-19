import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerService } from "@/services";
import { showToast } from "@/utils/toast";
import './style.css'; // New dedicated stylesheet for register page

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    const input = { fullName, email, password };

    const { status, cls, msg } = await registerService(input);

    showToast(msg, cls);

    if (!status) {
      return;
    }

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Register</h2>
        <p className="register-subtext">
          Welcome! Register to create your account.
        </p>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="input-field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
        <button className="register-btn" type="submit">
          Register
        </button>
        <p className="already-account">
          Already have an account?{" "}
          <Link className="login-link" to="/login">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div className="register-page-wrapper">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
