package ma.fstt.backend.controler;


import jakarta.annotation.Resource;
import ma.fstt.backend.entity.Image;
import ma.fstt.backend.exeption.CatalogueNotFoundException;
import ma.fstt.backend.service.ImageService;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/app/image")
public class ImageController {

    @Resource
    private ImageService imageservice;

    @PostMapping("/upload/{catalogueId}")
    public ResponseEntity<String> uploadImageToCatalog(
            @PathVariable Long catalogueId,
            @RequestParam("file") MultipartFile file) throws CatalogueNotFoundException {

        imageservice.uploadImageToCatalog(catalogueId, file);
        return ResponseEntity.ok("Image uploaded successfully.");
    }


    @GetMapping("/images/{catalogueId}")
    public ResponseEntity<List<Image>> getImagesByCatalogueId(@PathVariable Long catalogueId) {
        List<Image> images = imageservice.getImagesByCatalogueId(catalogueId);
        return ResponseEntity.ok(images);
    }


    @DeleteMapping("/delete/{id}")
    public  void delete(@PathVariable long id){
        imageservice.deleteimage(id);

    }
}
