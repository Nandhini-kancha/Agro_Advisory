from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time
import os
from dotenv import load_dotenv
import google.generativeai as genai 

# Load custom ML models
try:
    from ml_models import predict_fertilizer, predict_disease
except ImportError:
    print("Warning: Could not import ml_models. Ensure dependencies are installed.")
    def predict_fertilizer(*args): return "Mock Fertilizer", "Models not initialized."
    def predict_disease(*args): return {"name": "Mock Disease", "confidence": 0.0, "treatment": "N/A"}

# Load environment variables
load_dotenv()

app = FastAPI(title="AgroAdviser API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
    # Using gemini-1.5-flash as it is fast and suitable for chat
    chat_model = genai.GenerativeModel('gemini-1.5-flash')
else:
    print("Warning: GEMINI_API_KEY not found in environment variables. Chat will use mock logic.")
    chat_model = None


class ChatMessage(BaseModel):
    message: str
    history: list[dict] = []

class FertilizerRequest(BaseModel):
    N: int
    P: int
    K: int
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    crop: str = "unknown"

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AgroAdviser Backend is running"}

@app.post("/api/scan")
async def scan_disease(file: UploadFile = File(...)):
    # Read image bytes
    image_bytes = await file.read()
    
    # Predict using the TensorFlow model
    result = predict_disease(image_bytes)
    
    # Generate mock improvement graph data based on the disease confidence (as projection needs to be sent)
    if result.get("name") == "Healthy":
        projection = [
            {"name": 'Week 1', "health": 95, "yield": 8000},
            {"name": 'Week 2', "health": 96, "yield": 8200},
            {"name": 'Week 3', "health": 97, "yield": 8500},
            {"name": 'Week 4', "health": 98, "yield": 8800},
        ]
    else:
        projection = [
            {"name": 'Week 1', "health": 40, "yield": 2400},
            {"name": 'Week 2', "health": 60, "yield": 4500},
            {"name": 'Week 3', "health": 80, "yield": 6800},
            {"name": 'Week 4', "health": 90, "yield": 9000},
        ]

    return {
        "filename": file.filename,
        "prediction": result,
        "projection": projection
    }

@app.post("/api/chat")
async def chat_advisor(chat_request: ChatMessage):
    if chat_model:
        try:
            # Build history format expected by Gemini (optional, here we just pass the recent message with context)
            prompt = f"""You are an expert AgroAdviser. You provide agricultural advice, crop disease solutions, and fertilizer recommendations.
User's message: {chat_request.message}
Please provide a helpful, concise response."""
            
            response = chat_model.generate_content(prompt)
            return {"response": response.text, "sender": "bot"}
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return {"response": "Sorry, I am having trouble connecting to my brain right now.", "sender": "bot"}
    else:
        # Fallback to mock logic if no API key
        time.sleep(1)
        msg = chat_request.message.lower()
        if "hello" in msg or "hi" in msg:
            response = "Hello! I'm your AgroAdviser. Where is your farm located and what crop are you currently growing?"
        elif "located" in msg or "texas" in msg or "india" in msg or "farm" in msg:
            response = "Great. What kind of soil do you have? (e.g., sandy, clay, loamy) and are you noticing any issues like yellowing leaves?"
        elif "sandy" in msg or "clay" in msg or "loam" in msg:
            response = "Based on your region and soil type, I recommend a balanced 10-10-10 NPK fertilizer. Would you like a detailed application schedule?"
        elif "yellow" in msg or "leaves" in msg:
            response = "Yellowing leaves often indicate a nitrogen deficiency. I suggest applying a nitrogen-rich fertilizer or compost. How large is your farming area?"
        elif "yes" in msg or "schedule" in msg:
            response = "Awesome! I recommend applying 50kg per hectare right before planting, and then a top dressing of 25kg per hectare 3 weeks later. Good luck!"
        else:
            response = "I see. Could you tell me a bit more about the specific crops you are growing or any visual symptoms on the plants? (Note: Add GEMINI_API_KEY to .env for AI responses)"
            
        return {"response": response, "sender": "bot"}

@app.post("/api/recommend-fertilizer")
async def recommend_fertilizer(req: FertilizerRequest):
    # Call the ML model
    prediction, reason = predict_fertilizer(
        req.N, req.P, req.K, req.temperature, req.humidity, req.ph, req.rainfall, req.crop
    )
    
    return {
        "status": "success",
        "input_params": req.model_dump(),
        "recommendation": prediction,
        "reason": reason
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
