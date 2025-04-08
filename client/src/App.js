import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "./components/login/login.jsx";
import Signup from "./components/signup/signup.jsx";
import Home from "./components/home/home.jsx";
import Profile from "./components/profile/profile.jsx";
import Diagnosis from "./components/diagnosis/diagnosis.jsx";
import Admin from "./components/admin/admin.jsx";
import ForgotPassword from "./components/forgot/forgot.jsx";
import ResetPassword from "./components/forgot/reset.jsx";
import Doctors from "./components/doctors/doctors.jsx";


function App() {

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/diagnosis' element={<Diagnosis/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
