import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar.jsx";
import "../profile/profile.css";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        alert("Failed to fetch user details.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-bg">
      <Navbar />
      <br /><br /><br />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-lg">
              <h2 className="text-center profile-text">Profile Settings</h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={userData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={userData.email} 
                    disabled
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={userData.password} 
                    onChange={handleChange} 
                    placeholder="Enter new password"
                  />
                </div>
                
                <button type="submit" className="w-100 profile-btn">Update Data</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Profile;
