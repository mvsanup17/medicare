# from flask import Flask, request, jsonify
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from flask_cors import CORS
# from flask_pymongo import PyMongo
# from flask_mail import Mail, Message
# import random
# import string
# from datetime import datetime, timedelta
# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import MultiLabelBinarizer
# from deep_translator import GoogleTranslator
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.feature_extraction.text import TfidfVectorizer
# import os  # Add this line at the beginning
# import speech_recognition as sr
# from sklearn.preprocessing import LabelEncoder
# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer
# from fuzzywuzzy import process
# import re
# import pickle
# import joblib
# import difflib
# import json
# from googletrans import Translator
# import nltk
# import warnings

from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_mail import Mail, Message
import random
import string
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
from fuzzywuzzy import process
import warnings


# Suppress Levenshtein warning
warnings.filterwarnings("ignore", category=UserWarning)



app = Flask(__name__)

# Configurations
app.config["JWT_SECRET_KEY"] = "your_secret_key_here"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["MONGO_URI"] = "mongodb+srv://iamvsanup:3raLvtJYwOZ0FTVG@driveready.0udnccc.mongodb.net/flaskDB?retryWrites=true&w=majority"
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "iamvsanup@gmail.com"  
app.config["MAIL_PASSWORD"] = "qind hkxy dzbi czqm"  


bcrypt = Bcrypt(app)
jwt = JWTManager(app)
mongo = PyMongo(app)
mail = Mail(app)
CORS(app)

db = mongo.db  
users_collection = db["medicalusers"]

@app.route('/signup', methods=["POST"])
def signup():
    data = request.json
    name = data["name"]
    email = data["email"]
    password = data["password"]

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"name": name, "email": email, "password": hashed_password})

    return jsonify({"message": "Signup successful"}), 200

@app.route('/login', methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    user = users_collection.find_one({"email": email})

    if user and bcrypt.check_password_hash(user["password"], password):  # Correct hash comparison
        access_token = create_access_token(identity=email)  # Store only email in JWT identity
        return jsonify({"message": "Login Successful", "token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        email = get_jwt_identity()  # Retrieve email stored in JWT token
        user = users_collection.find_one({"email": email}, {"_id": 0, "password": 0})  # Exclude _id & password

        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify(user), 200

    except Exception as e:
        return jsonify({"error": "Failed to fetch profile", "details": str(e)}), 500


@app.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        email = get_jwt_identity()
        data = request.json

        if not data or "name" not in data:
            return jsonify({"error": "Invalid request, name is required"}), 400

        update_data = {"name": data["name"]}

        if "password" in data and data["password"]:  # Only update password if provided
            update_data["password"] = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

        result = users_collection.update_one({"email": email}, {"$set": update_data})

        if result.matched_count == 0:
            return jsonify({"message": "User not found"}), 404

        return jsonify({"message": "Profile updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": "Failed to update profile", "details": str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    users = list(users_collection.find({}, {"_id": 0, "name": 1, "email": 1}))  # Exclude _id field
    return jsonify(users)

# Function to generate a random reset token
def generate_token(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Email not found"}), 404

    reset_token = generate_token()
    expiration_time = datetime.utcnow() + timedelta(minutes=15)

    users_collection.update_one({"email": email}, {"$set": {"reset_token": reset_token, "reset_token_expiry": expiration_time}})

    msg = Message("Password Reset Request",
                  sender=app.config["MAIL_USERNAME"],
                  recipients=[email])
    msg.body = f"Use this code to reset your password: {reset_token}. It expires in 15 minutes."
    mail.send(msg)

    return jsonify({"message": "Reset code sent to email"}), 200

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get("email")
    reset_token = data.get("reset_token")
    new_password = data.get("new_password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "Invalid email"}), 400

    if user.get("reset_token") != reset_token:
        return jsonify({"error": "Invalid or expired token"}), 400

    if datetime.utcnow() > user.get("reset_token_expiry"):
        return jsonify({"error": "Token has expired"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    users_collection.update_one({"email": email}, {"$set": {"password": hashed_password}, "$unset": {"reset_token": "", "reset_token_expiry": ""}})

    return jsonify({"message": "Password has been reset successfully"}), 200


try:
    df = pd.read_csv("updated_health_data_v2.csv")
except FileNotFoundError:
    print("Dataset not found!")
    df = None

# Preprocess and train model
if df is not None and "Symptoms" in df.columns:
    df["Processed_Symptoms"] = df["Symptoms"].astype(str).str.lower()
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(df["Processed_Symptoms"])
    y = df["Disease"]

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)

    # Save for future use
    with open("random_forest_model.pkl", "wb") as model_file:
        pickle.dump(model, model_file)
    with open("vectorizer.pkl", "wb") as vec_file:
        pickle.dump(vectorizer, vec_file)
else:
    model = None
    vectorizer = None


# Voice input via Raspberry Pi (mic)
# def get_voice_input():
#     recognizer = sr.Recognizer()
#     with sr.Microphone() as source:
#         print("Listening for symptoms...")
#         audio = recognizer.listen(source)
#     try:
#         return recognizer.recognize_google(audio)
#     except sr.UnknownValueError:
#         return "Could not understand audio"
#     except sr.RequestError:
#         return "Speech recognition service is down"


# Find closest symptom match
def find_closest_symptom(user_symptoms):
    if df is None:
        return None
    all_symptoms = df["Processed_Symptoms"].tolist()
    best_match, score = process.extractOne(user_symptoms, all_symptoms)
    return best_match if score > 70 else None


# Flask API to predict disease
@app.route("/predict", methods=["POST"])
def predict():
    if model is None or df is None or vectorizer is None:
        return jsonify({"error": "Model or dataset not found!"}), 500

    data = request.json
    if "symptoms" not in data:
        return jsonify({"error": "Symptoms field is required"}), 400

    user_symptoms = data["symptoms"].lower()
    matched_symptom = find_closest_symptom(user_symptoms)

    # Serious diseases check
    serious_diseases = ["cancer", "hiv", "aids", "tb", "tuberculosis", "alzheimer’s disease"]
    
    for term in serious_diseases:
        if term in user_symptoms:
            return jsonify({
                "warning": "This is a severe case. Please consult a doctor immediately."
            }), 200

    if matched_symptom:
        vectorized_input = vectorizer.transform([matched_symptom])
        predicted_disease = model.predict(vectorized_input)[0]

        # Serious disease based on prediction
        if predicted_disease.lower() in serious_diseases:
            return jsonify({
                "warning": "This is a severe case. Please consult a doctor immediately."
            }), 200

        disease_info = df[df["Disease"] == predicted_disease]
        if disease_info.empty:
            return jsonify({"warning": "Disease details not found. Please consult a doctor."}), 200

        disease_row = disease_info.iloc[0]

        response = {
            "Disease": predicted_disease,
            "Medication": disease_row.get("Medication", "N/A"),
            "Best Doctor": disease_row.get("Best Doctor in India", "N/A"),
        }

        # Add diet plan only if present
        if pd.notna(disease_row.get("Diet Plan", None)):
            response["Diet Plan"] = disease_row["Diet Plan"]

        return jsonify(response)
    else:
        return jsonify({
            "warning": "Symptoms not found. Please check the symptoms entered."
        }), 400


# Optional voice route (for Raspberry Pi testing)
# @app.route("/voice-input", methods=["GET"])
# def voice_input():
#     text = get_voice_input()
#     return jsonify({"voice_symptoms": text})

if __name__ == "__main__":
    app.run(debug=True)
