import joblib
import pandas as pd
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import os

# Define file paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FERTILIZER_MODEL_PATH = os.path.join(BASE_DIR, 'fertilizer_model.joblib')
FERTILIZER_FEATURES_PATH = os.path.join(BASE_DIR, 'fertilizer_features.joblib')
DISEASE_MODEL_PATH = os.path.join(BASE_DIR, 'disease_model.keras')

# Load Fertilizer Model
try:
    fertilizer_model = joblib.load(FERTILIZER_MODEL_PATH)
    fertilizer_features = joblib.load(FERTILIZER_FEATURES_PATH)
except FileNotFoundError:
    print("Warning: Fertilizer model or features not found. Please run train_fertilizer_model.py first.")
    fertilizer_model = None
    fertilizer_features = None

# Load Disease Model
try:
    disease_model = tf.keras.models.load_model(DISEASE_MODEL_PATH)
except OSError:
    print("Warning: Disease model not found. Please run train_disease_model.py first.")
    disease_model = None

# Disease labels mapping (Dummy mapping based on our training script)
disease_labels = {
    0: {"name": "Nitrogen Deficiency", "treatment": "Apply urea or nitrogen-rich organic compost."},
    1: {"name": "Late Blight", "treatment": "Apply copper-based fungicide and ensure good drainage."},
    2: {"name": "Healthy", "treatment": "Crop is healthy. Continue regular maintenance."},
    3: {"name": "Phosphorus Deficiency", "treatment": "Add bone meal or rock phosphate."}
}

def predict_fertilizer(n, p, k, temperature, humidity, ph, rainfall, crop):
    if not fertilizer_model or not fertilizer_features:
        return "Model not trained", "Please train the model first."

    # Create input DataFrame
    input_data = pd.DataFrame({
        'N': [n],
        'P': [p],
        'K': [k],
        'temperature': [temperature],
        'humidity': [humidity],
        'ph': [ph],
        'rainfall': [rainfall],
        'crop': [crop]
    })
    
    # One-hot encode the crop
    input_data = pd.get_dummies(input_data, columns=['crop'])
    
    # Align features with the training data
    input_data = input_data.reindex(columns=fertilizer_features, fill_value=0)
    
    # Predict
    prediction = fertilizer_model.predict(input_data)[0]
    
    # Simple rule for reasoning
    if prediction == 'Urea':
        reason = "High nitrogen requirement for your crop stage based on soil data."
    elif prediction == 'DAP':
        reason = "To boost root development and improve phosphorus levels."
    elif prediction == 'MOP':
        reason = "To improve disease resistance and water retention."
    else:
        reason = "Balanced nutrient supply based on current NPK levels."
        
    return prediction, reason

def predict_disease(image_bytes):
    if not disease_model:
        return {"name": "Model not trained", "confidence": 0.0, "treatment": "Please train the disease model first."}
        
    # Preprocess image
    try:
        img = Image.open(io.BytesIO(image_bytes))
        img = img.resize((128, 128)) # Match dummy model input size
        img_array = np.array(img) / 255.0
        if len(img_array.shape) == 2:
            img_array = np.stack((img_array,)*3, axis=-1)
        elif img_array.shape[2] == 4:
            img_array = img_array[:,:,:3]
        img_array = np.expand_dims(img_array, axis=0) # Add batch dimension
        
        # Predict
        predictions = disease_model.predict(img_array)
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])
        
        result = disease_labels.get(class_idx, disease_labels[2])
        result["confidence"] = confidence
        return result
    except Exception as e:
        print(f"Error processing image: {e}")
        return {"name": "Error processing image", "confidence": 0.0, "treatment": str(e)}
