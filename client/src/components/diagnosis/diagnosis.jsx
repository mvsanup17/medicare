import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar.jsx";
import Footer from "../footer/footer.jsx";
import "./diagnosis.css";
import axios from "axios";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [voices, setVoices] = useState([]);

  const languages = {
    en: "English",
    hi: "Hindi",
    te: "Telugu",
    ta: "Tamil",
    kn: "Kannada",
    bn: "Bengali",
    gu: "Gujarati",
    mr: "Marathi",
    ml: "Malayalam",
    es: "Spanish",
    fr: "French",
    de: "German",
  };

  useEffect(() => {
    const updateVoices = () => {
      const synth = window.speechSynthesis;
      setVoices(synth.getVoices());
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { symptoms });
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult(null);
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      setSymptoms(event.results[0][0].transcript);
      setResult(null);
      setTranslatedText("");
    };
  };

  const handleTranslate = async () => {
    if (!result || !selectedLanguage) return;

    const text = `
      Disease: ${result?.Disease || "N/A"}.
      Best Doctor: ${result?.["Best Doctor"] || "N/A"}.
      Medication: ${result?.Medication || "N/A"}.
      ${result?.["Diet Plan"] ? `Diet Plan: ${result["Diet Plan"]}.` : ""}
    `;

    try {
      const response = await axios.post("https://translate.googleapis.com/translate_a/single", null, {
        params: {
          client: "gtx",
          sl: "en",
          tl: selectedLanguage,
          dt: "t",
          q: text,
        },
      });

      const translated = response.data[0].map((t) => t[0]).join("");
      setTranslatedText(translated);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslatedText("Translation failed. Please try again.");
    }
  };

  return (
    <div className="diagnosis-bg">
      <Navbar />
      <br /><br /><br />
      <div className="container mt-5">
        <div className="row">
          {/* Symptoms Input Column */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4 border border-primary">
              <h2 className="text-center text-primary">Health Diagnosis</h2>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter symptoms..."
                  value={symptoms}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                    setResult(null);
                    setTranslatedText("");
                  }}
                  rows={6}
                  style={{ fontSize: "1.2rem" }}
                ></textarea>
              </div>
              <div className="text-center">
                <button className="btn btn-primary me-2" onClick={handlePredict}>Predict</button>
                <button className="btn btn-secondary" onClick={handleVoiceInput}>🎤 Voice Input</button>
              </div>
            </div>
          </div>

          {/* Diagnosis Result and Translation Column */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4 border border-warning">
              <h4 className="text-warning text-center">Diagnosis Result</h4>
              {result ? (
                <>
                  <p><strong>Disease:</strong> {result.Disease}</p>
                  <p><strong>Best Doctor:</strong> {result["Best Doctor"]}</p>
                  <p><strong>Medication:</strong> {result.Medication}</p>
                  {result["Diet Plan"] && <p><strong>Diet Plan:</strong> {result["Diet Plan"]}</p>}
                </>
              ) : (
                <p className="text-center text-muted">Enter symptoms and click Predict</p>
              )}

              {/* Translation Feature */}
              <div className="mt-4">
                <h5 className="text-center text-info">Translate Diagnosis</h5>
                <div className="text-center">
                  <select
                    className="form-select d-inline w-auto"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    {Object.entries(languages).map(([code, lang]) => (
                      <option key={code} value={code}>{lang}</option>
                    ))}
                  </select>
                  <button className="btn btn-primary ms-2" onClick={handleTranslate}>🌍 Translate</button>
                </div>

                {/* Translated Text Display */}
                <div className="mt-3 p-3 border border-light bg-light text-center">
                  <h6 className="text-success">Translated Result</h6>
                  <p>{translatedText || "Translation will appear here."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
      <Footer />
    </div>
  );
}

export default App;



