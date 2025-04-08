import React, { useState } from "react";
import "./forgot.css";
import Titlebar from "../navbar/titlebar.jsx";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error sending reset email.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 forgot-bg">
      <Titlebar/>
      <br /><br />
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center forgot-text mb-3">Forgot Password</h2>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="reset-btn w-100" onClick={handleForgotPassword}>
          Send Reset Code
        </button>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
