# AgroAdviser (Fertilizer Advisory System) 🌱

AgroAdviser is an AI-driven Agricultural Advisory Web Application designed to assist farmers and agricultural workers in making data-driven decisions. By leveraging modern web technologies and Machine Learning, the system provides crop disease diagnosis, customized fertilizer recommendations, and interactive AI-powered farming advice.

## 🚀 Features

*   **Crop Disease Detection:** Upload an image of a crop leaf to identify diseases. Powered by a custom TensorFlow/Keras Convolutional Neural Network (CNN), it provides a confidence score, treatment recommendations, and future health/yield projections.
*   **Fertilizer Recommendation:** Input soil parameters (Nitrogen, Phosphorus, Potassium, pH, temperature, humidity, rainfall) and crop type. A Scikit-Learn machine learning model analyzes the data to recommend the most suitable fertilizer for maximum yield.
*   **AI Chat Advisor:** An integrated intelligent chatbot (powered by Google's Gemini API) provides conversational support to answer specific questions regarding crop management, soil health, and farming best practices.

## 🛠️ Technology Stack

*   **Frontend:** React, Vite, HTML/CSS (Modern, responsive UI with animations)
*   **Backend:** Python, FastAPI (High performance, async RESTful API)
*   **Machine Learning:** TensorFlow/Keras (Image Classification), Scikit-Learn (Structured Data Prediction)
*   **AI Integration:** Google Gemini API

## 📂 Project Structure

```
├── backend/
│   ├── main.py                     # FastAPI server and endpoints
│   ├── ml_models.py                # Machine learning model integration
│   ├── disease_model.keras         # Trained CNN model for disease detection
│   ├── fertilizer_model.joblib     # Trained model for fertilizer recommendation
│   └── requirements.txt            # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   ├── pages/                  # Main application views (Home, Scanner, etc.)
│   │   └── App.jsx                 # Main React application
│   ├── package.json                # Node.js dependencies
│   └── vite.config.js              # Vite configuration
└── README.md
```

## ⚙️ Setup and Installation

To run this project locally, you will need to start both the FastAPI backend and the React frontend.

### 1. Backend Setup

Navigate to the `backend` directory and set up the Python environment:

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```
The backend API will run on `http://localhost:8000`. 
*Note: You may need to create a `.env` file in the backend directory and add your `GEMINI_API_KEY` for the AI Chat Advisor to fully function.*

### 2. Frontend Setup

Open a new terminal window, navigate to the `frontend` directory, and start the React app:

```bash
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```
The frontend will typically run on `http://localhost:5173`. Open this URL in your browser to access the AgroAdviser application!

---
*Built with ❤️ for modern agriculture.*
