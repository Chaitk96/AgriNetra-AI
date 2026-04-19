import torch
import torchvision
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms

# Transform
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor()
])

# Load dataset
train_data = datasets.ImageFolder("datasets", transform=transform)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=32, shuffle=True)

# Load pretrained MobileNetV2
model = torchvision.models.mobilenet_v2(weights="DEFAULT")
model.classifier[1] = nn.Linear(model.last_channel, len(train_data.classes))

optimizer = optim.Adam(model.parameters(), lr=0.001)
loss_fn = nn.CrossEntropyLoss()

print("Training started...")

for epoch in range(2):   # small test training
    for images, labels in train_loader:
        preds = model(images)
        loss = loss_fn(preds, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

print("Training complete!")

# Save properly
torch.save({
    "model_state": model.state_dict(),
    "classes": train_data.classes
}, "plant_model.pth")

print("Model saved successfully!")