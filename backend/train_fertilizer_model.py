import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Generate synthetic dataset
def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    
    # Soil parameters ranges roughly based on typical agricultural data
    N = np.random.randint(0, 140, num_samples)
    P = np.random.randint(5, 145, num_samples)
    K = np.random.randint(5, 205, num_samples)
    temperature = np.random.uniform(8.0, 45.0, num_samples)
    humidity = np.random.uniform(14.0, 100.0, num_samples)
    ph = np.random.uniform(3.5, 9.9, num_samples)
    rainfall = np.random.uniform(20.0, 300.0, num_samples)
    
    # Crops
    crops_list = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
                  'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
                  'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
                  'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']
    crop = np.random.choice(crops_list, num_samples)
    
    # Target Fertilizer
    fertilizers = ['Urea', 'DAP', 'MOP', '10:26:26 NPK', '14:35:14 NPK', '20:20:20 NPK']
    
    # Simple logic to assign fertilizers based on N, P, K levels
    target = []
    for i in range(num_samples):
        if N[i] > 100:
            target.append('Urea')
        elif P[i] > 100:
            target.append('DAP')
        elif K[i] > 100:
            target.append('MOP')
        elif N[i] < 50 and P[i] < 50:
            target.append('10:26:26 NPK')
        else:
            target.append(np.random.choice(fertilizers))
            
    df = pd.DataFrame({
        'N': N,
        'P': P,
        'K': K,
        'temperature': temperature,
        'humidity': humidity,
        'ph': ph,
        'rainfall': rainfall,
        'crop': crop,
        'Fertilizer': target
    })
    
    # Encode crop feature using one-hot encoding
    df = pd.get_dummies(df, columns=['crop'])
    
    return df

print("Generating synthetic data...")
df = generate_synthetic_data()

X = df.drop('Fertilizer', axis=1)
y = df['Fertilizer']

# Save columns for prediction time (to match one-hot encoding shape)
feature_columns = X.columns.tolist()
joblib.dump(feature_columns, 'fertilizer_features.joblib')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Random Forest Classifier...")
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Model trained with accuracy: {acc * 100:.2f}%")

print("Saving model...")
joblib.dump(clf, 'fertilizer_model.joblib')
print("Model saved to fertilizer_model.joblib")
