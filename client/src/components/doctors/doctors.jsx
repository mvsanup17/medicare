import React from "react";
import Navbar from "../navbar/navbar.jsx";
import heart from "../images/heart.jpg";
import skin from "../images/skin.webp";
import hormone from "../images/hormone.jpg";
import gas from "../images/gas.jpg";
import brain from "../images/brain.jpg";
import child from "../images/child.jpg";
import cancer from "../images/cancer.jpg";
import kidney from "../images/kidney.jpg";
import eyes from "../images/eyes.webp";
import pulmo from "../images/pulmo.jpeg";
import mental from "../images/mental.jpg";
import ortho from "../images/ortho.jpeg";
import "./doctors.css";
import Footer from "../footer/footer.jsx";

function Doctors() {
  const doctorsData = [
    {
      imageData : heart,
      name : "Dr. Balbir Singh",
      education : "MBBS, MD, DM",
      specialist : "Cardiologist",
      location : "Delhi"
    },
    {
      imageData : skin,
      name : "Dr. Shefali Trasi",
      education : " MBBS, MD, Fellowship Dermatology- Israel, Europe",
      specialist : "Dermatologist",
      location : "Mumbai"
    },
    {
      imageData : hormone,
      name : "Dr. Ambrish Mithal",
      education : " MBBS, MD, DM",
      specialist : "Endocrinologist",
      location : "Delhi"
    },
    {
      imageData : gas,
      name : "Dr. Ajay Kumar",
      education : " MBBS",
      specialist : "Gastroenterologist",
      location : "Delhi"
    },
    {
      imageData : brain,
      name : "Dr. Puneet Agarwal",
      education : "MBBS, MD",
      specialist : "Neurology",
      location : "Delhi"
    },
    {
      imageData : child,
      name : "Dr. Anuradha Kapur",
      education : "MBBS, MD",
      specialist : "Obstetrician / Gynecologist ",
      location : "Delhi"
    },
    {
      imageData : cancer,
      name : "Dr. Harit Chaturvedi",
      education : "MBBS, MD",
      specialist : "Oncologist",
      location : "Delhi"
    },
    {
      imageData : kidney,
      name : "Dr. Arun Halankar",
      education : "MBBS, MD",
      specialist : "Nephrologist",
      location : "Mumbai"
    },
    {
      imageData : eyes,
      name : "Dr. Sujal Shah",
      education : "MBBS MS",
      specialist : "Ophthalmologist",
      location : "Mumbai"
    },
    {
      imageData : pulmo,
      name : "Dr. Narasimhan R",
      education : "MBBS, MD, DNB",
      specialist : "Pulmonologist",
      location : "Guragaon"
    },
    {
      imageData : mental,
      name : "Dr. Danish Ahmed",
      education : "MBBS, DPM",
      specialist : "Psychiatry",
      location : "Delhi"
    },
    {
      imageData : ortho,
      name : "Dr. Jayant Arora",
      education : "MBBS, MS, DNB",
      specialist : "Orthopedics",
      location : "Guragaon"
    }
    
  ];

  return (
    <div className="doctors-page">
      <Navbar />
      <br /><br />
      <div className="container mt-5">
        <h2 className="text-center doctors-text">DOCTORS</h2>
        <div className="row justify-content-center mt-4">
          {doctorsData.map((val, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow border-0 p-3">
                <img
                  src={val.imageData}
                  alt="Doctor-Image"
                  className="img-fluid rounded"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <p>
                    <b>Name: </b> {val.name}
                  </p>
                  <p>
                    <b>Education: </b> {val.education}
                  </p>
                  <p>
                    <b>Specialist: </b> {val.specialist}
                  </p>
                  <p>
                    <b>Location: </b> {val.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <Footer/>
    </div>
  );
}

export default Doctors;
