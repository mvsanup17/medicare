import pandas as pd
import numpy as np
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
df = pd.read_csv("updated_health_data.csv")  # Ensure this file contains 'Symptoms', 'Disease', etc.

# Text Preprocessing & Vectorization
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["Symptoms"])  # Convert text into numerical features
y = df["Disease"]

# Train/Test Split for Model Evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model with Hyperparameter Tuning
model = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42)
model.fit(X_train, y_train)

# Save Model & Vectorizer
pickle.dump((vectorizer, model, df), open("model.pkl", "wb"))
print("✅ Model training complete & saved!")
