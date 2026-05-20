# AgroAdviser (Fertilizer Advisory System) 🌱

AgroAdviser is an AI-driven Agricultural Advisory Web Application designed to assist farmers and agricultural workers in making data-driven decisions. By leveraging modern web technologies and Machine Learning, the system provides crop disease diagnosis, customized fertilizer recommendations, and interactive AI-powered farming advice.

##  Features

*   **Crop Disease Detection:** Upload an image of a crop leaf to identify diseases. Powered by a custom TensorFlow/Keras Convolutional Neural Network (CNN), it provides a confidence score, treatment recommendations, and future health/yield projections.
*   **Fertilizer Recommendation:** Input soil parameters (Nitrogen, Phosphorus, Potassium, pH, temperature, humidity, rainfall) and crop type. A Scikit-Learn machine learning model analyzes the data to recommend the most suitable fertilizer for maximum yield.
*   **AI Chat Advisor:** An integrated intelligent chatbot (powered by Google's Gemini API) provides conversational support to answer specific questions regarding crop management, soil health, and farming best practices.

## Technology Stack

*   **Frontend:** React, Vite, HTML/CSS (Modern, responsive UI with animations)
*   **Backend:** Python, FastAPI (High performance, async RESTful API)
*   **Machine Learning:** TensorFlow/Keras (Image Classification), Scikit-Learn (Structured Data Prediction)
*   **AI Integration:** Google Gemini API
