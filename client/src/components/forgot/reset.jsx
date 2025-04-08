import React, { useState } from "react";
import "./reset.css";
import Titlebar from "../navbar/titlebar.jsx";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reset_token: resetToken, new_password: newPassword }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="reset-container">
      <Titlebar/>
      <br /><br />
      <div className="reset-box">
        <h2>Reset Password</h2>
        <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Enter reset code" value={resetToken} onChange={(e) => setResetToken(e.target.value)} />
        <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={handleResetPassword}>Reset Password</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
