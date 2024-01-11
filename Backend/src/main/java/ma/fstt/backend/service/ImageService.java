package ma.fstt.backend.service;


import jakarta.annotation.Resource;
import ma.fstt.backend.entity.Catalogue;
import ma.fstt.backend.entity.Image;
import ma.fstt.backend.exeption.CatalogueNotFoundException;
import ma.fstt.backend.repository.Ctaloquerepo;
import ma.fstt.backend.repository.Imagerepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ImageService {

    private final Imagerepo imgrepo;
    private final Ctaloquerepo cataloguerepo;

    @Autowired
    public ImageService(Imagerepo imgrepo, Ctaloquerepo cataloguerepo) {
        this.imgrepo = imgrepo;
        this.cataloguerepo = cataloguerepo;
    }

    public String uploadImageToCatalog(long catalogId, MultipartFile file) throws CatalogueNotFoundException {
        Catalogue catalogue = cataloguerepo.findById(catalogId)
                .orElseThrow(() -> new CatalogueNotFoundException("Catalogue not found with ID: " + catalogId));

        try {
            byte[] imageData = file.getBytes();

            // Récupère le nom original du fichier
            String imageName = file.getOriginalFilename();

            // Sauvegarde l'image dans la base de données en associant l'ID du catalogue
            Image image = new Image();
            image.setImageName(imageName);
            image.setCatalogue(catalogue);
            imgrepo.save(image);

            // Choisissez le répertoire où vous souhaitez enregistrer les images dans votre projet
            String uploadDirectory = ".\\..\\Code-source\\src\\imagess"; // Mettez le chemin correct ici

            // Générez le chemin complet du fichier
            Path imagePath = Paths.get(uploadDirectory, imageName);

            // Copiez les données de l'image dans le fichier sur le système de fichiers
            Files.write(imagePath, imageData);

            // Vous pouvez retourner le chemin complet de l'image ou simplement le nom
            return imagePath.toString();
        } catch (IOException e) {
            // Gérez l'exception de manière appropriée (par exemple, en la journalisant ou en lançant une exception personnalisée)
            throw new RuntimeException("Failed to upload image", e);
        }
    }


        private final String imageFolderPath = ".\\..\\Code-source\\src\\imagess";





    public List<Image> getImagesByCatalogueId(Long catalogueId) {

        return imgrepo.findByCatalogueId(catalogueId);
    }



    public void deleteimage(long id) {
        imgrepo.deleteById(id);

    }


    }


