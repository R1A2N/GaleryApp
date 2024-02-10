from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.cluster import KMeans
import numpy as np
import cv2
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}}, methods=["OPTIONS", "POST"])

def create_combined_data():
    return {
        "dominant_colors": {},
        "color_moments": {},
        "combined_histogram": {}
    }

# Load existing data from the file if it exists
if os.path.exists('combined_data.json'):
    with open('combined_data.json', 'r') as json_file:
        image_data_dict = json.load(json_file)
else:
    image_data_dict = {}

@app.route('/api/process_image_data', methods=['POST', 'OPTIONS'])
def process_image_data():
    if request.method == 'OPTIONS':
        # Répondre aux requêtes OPTIONS pour gérer CORS
        return jsonify({'status': 'OK'})

    data = request.get_json()
    nom_image = data.get('nom_image')

    if nom_image and os.path.exists(f'imagess/{nom_image}'):
        # Vérifier si les données existent déjà dans le dictionnaire
        if nom_image in image_data_dict and "data" in image_data_dict[nom_image]:
            return jsonify({'message': 'Les données pour cette image ont déjà été calculées.', 'data': image_data_dict[nom_image]["data"]})

        image = cv2.imread(f'imagess/{nom_image}')

        if image is not None:
            image_lab = cv2.cvtColor(image, cv2.COLOR_BGR2Lab)
            pixels = image_lab.reshape(-1, 3)

            kmeans = KMeans(n_clusters=5, n_init=10)
            kmeans.fit(pixels)
            couleurs_dominantes = kmeans.cluster_centers_.astype(int)

            combined_data = create_combined_data()

            combined_data["dominant_colors"] = {
                f"couleur{i}": couleur.tolist() for i, couleur in enumerate(couleurs_dominantes)
            }

            moments_couleur = []
            for canal in range(3):
                image_canal = image_lab[:, :, canal]
                moments = cv2.moments(image_canal)
                moments_couleur.append(moments)

            combined_data["color_moments"] = moments_couleur

            # Ajoutez l'histogramme combiné pour les canaux L, A et B
            combined_histogram = {"combined": []}
            for canal in range(3):
                image_canal = image_lab[:, :, canal]

                valeurs_hist, bacs = np.histogram(image_canal.flatten(), bins=256, range=[0, 256])

                # Convertir les valeurs int64 en int
                valeurs_hist = valeurs_hist.astype(int)
                bacs = bacs.astype(int)

                hist_data = [{"x": int(x), "y": int(y)} for x, y in zip(bacs[:-1], valeurs_hist)]
                combined_histogram["combined"].extend(hist_data)

            combined_data["combined_histogram"] = combined_histogram

            # Stockez les données dans le dictionnaire avec la clé du nom de l'image
            image_data_dict[nom_image] = {"data": combined_data}

            with open('combined_data.json', 'w') as json_file:
                # Utiliser separators pour compresser le fichier JSON
                json.dump(image_data_dict, json_file, separators=(',', ':'), default=lambda x: int(x) if isinstance(x, np.int64) else None)

            return jsonify({'message': 'Image calculée avec succès', 'data': combined_data})
        else:
            return jsonify({'message': 'Erreur lors du chargement de l\'image'})

    return jsonify({'message': 'Aucun nom d\'image spécifié ou l\'image n\'existe pas'})


@app.route('/api/get_combined_data', methods=['GET'])
def get_combined_data():
    with open('combined_data.json', 'r') as json_file:
        data = json.load(json_file)
    return jsonify(data)

@app.route('/api/get_image_details/<string:nom_image>', methods=['GET'])
def get_image_details(nom_image):
    if nom_image in image_data_dict and "data" in image_data_dict[nom_image]:
        image_details = image_data_dict[nom_image]["data"]
    else:
        image_details = create_combined_data()
        image_details["nom_image"] = nom_image
        image_details["message"] = "Aucune donnée disponible pour cet nom d'image."

    return jsonify(image_details)

if __name__ == '__main__':
    app.run(debug=True)
