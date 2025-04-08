import React, { useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import Navbar from "../navbar/navbar.jsx";
import "./home.css";
import heart from "../images/heart.webp";
import aihealth from "../images/ai.jpg";
import hospital from "../images/hospital.webp";
import Footer from "../footer/footer.jsx";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <br /><br />
      <div className="bg-img">
        <div className="container d-flex align-items-center justify-content-center text-center">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="text-center text-adjust">Welcome to</h1>
              <h2 className="text-center text-adjust">Medicare - Treat Yourself</h2>
              <p>
                Check your Health Condition 
                <span><Link to="/diagnosis" className="text-link"> Diagnosis</Link></span>
              </p>
            </div>
            <div className="col-lg-6">
              <img src={heart} className="img-fluid heart-img" alt="heart" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-col">
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img src={aihealth} className="img-fluid img-css" alt="img" />
            </div>
            <div className="col-lg-8">
              <h2 className="text-dec">AI in Health Care</h2>
              <br />
              <p>
                Artificial Intelligence (AI) has emerged as a transformative force in healthcare, offering unprecedented opportunities 
                to improve patient care, streamline operations, and advance medical research. By leveraging machine learning,
                natural language processing, and data analytics, AI is reshaping how healthcare providers diagnose, treat, 
                and prevent diseases. One of the most significant contributions of AI in healthcare
                is its ability to analyze vast amounts of data to provide accurate and timely diagnoses. 
              </p>
            </div>
          </div>
        </div>
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="text-dec">Enhanced Diagnostics and Precision Medicine</h2>
              <br />
              <p>
                AI-powered systems can examine medical imaging, such as X-rays, MRIs, and CT scans, 
                with remarkable precision, often matching or surpassing human radiologists. Moreover, 
                AI algorithms are facilitating the rise of precision medicine by tailoring treatment 
                plans based on an individual's genetic makeup, lifestyle, and medical history. 
                AI is also transforming the administrative side of healthcare. Automated systems are handling tasks
                like appointment scheduling, billing, and medical coding, reducing errors 
                and freeing up valuable time for healthcare professionals. 
              </p>
            </div>
            <div className="col-lg-4">
              <img src={hospital} className="img-fluid img-css" alt="img" />
            </div>
          </div>
        </div>
        <br /><br />
      </div>
      <Footer/>
    </div>

  );
}

export default Home;
