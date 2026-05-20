import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# Generate a small dummy dataset
print("Generating dummy dataset for disease classification...")
# 100 images, 128x128 RGB
num_samples = 100
img_height = 128
img_width = 128
num_classes = 4

X_dummy = np.random.rand(num_samples, img_height, img_width, 3).astype('float32')
y_dummy = np.random.randint(0, num_classes, num_samples)

# Simple CNN model
print("Building CNN model...")
model = models.Sequential([
    layers.Input(shape=(img_height, img_width, 3)),
    layers.Conv2D(16, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

print("Training dummy model (1 epoch)...")
model.fit(X_dummy, y_dummy, epochs=1)

print("Saving model to disease_model.keras...")
model.save('disease_model.keras')
print("Model saved.")
