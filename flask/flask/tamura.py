import cv2
import numpy as np
import matplotlib.pyplot as plt

# Fonction pour calculer les caractéristiques de Tamura
def calculate_texture_features(texture_region):
    # Utilisez ici les descripteurs de texture que vous avez extraits dans votre devoir individuel
    # Par exemple, vous pouvez utiliser la moyenne, la variance, etc.

    # Exemple d'utilisation de la moyenne
    mean_value = np.mean(texture_region)

    return mean_value

# Fonction de gestionnaire de clic de souris
def mouse_callback(event):
    if event.xdata is not None and event.ydata is not None:
        x, y = int(round(event.xdata)), int(round(event.ydata))
        # Récupérer la région de texture à partir de l'image originale
        texture_region = img[y:y+patch_size, x:x+patch_size]

        # Calculer les caractéristiques de texture
        texture_features = calculate_texture_features(texture_region)

        # Afficher les résultats
        print("Texture Features:", texture_features)

# Charger l'image
img = cv2.imread("6_3403.jpg")  # Remplacez par le chemin de votre image
patch_size = 50  # Taille de la région de texture à extraire

# Afficher l'image
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.connect('button_press_event', mouse_callback)  # Connecter la fonction de rappel
plt.show()
