import torch
import torchvision.models as models
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import io

# Load checkpoint
checkpoint = torch.load("plant_model.pth", map_location="cpu")

CLASSES = checkpoint["classes"]

# Recreate model architecture
model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Linear(model.last_channel, len(CLASSES))

# Load weights
model.load_state_dict(checkpoint["model_state"])
model.eval()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
])

def predict(image_bytes):

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image)
        probs = torch.softmax(outputs, dim=1)

        confidence, predicted = torch.max(probs, 1)

    label = CLASSES[predicted.item()]
    confidence = round(confidence.item()*100, 2)

    return label, confidence