from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from app.model import predict
from app.treatment import TREATMENTS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):

    image_bytes = await file.read()

    label, confidence = predict(image_bytes)

    return {
        "crop_disease": label,
        "confidence": confidence,
        "treatment": TREATMENTS.get(label,"Treatment unavailable")
    }

@app.get("/")
def home():
    return {"message": "Agri AI Backend Running ✅"}