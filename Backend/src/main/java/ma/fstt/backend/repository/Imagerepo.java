package ma.fstt.backend.repository;

import ma.fstt.backend.entity.Catalogue;
import ma.fstt.backend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Imagerepo extends JpaRepository<Image,Long> {
    List<Image> findByCatalogueId(Long catalogueId);

    Image findByImageName(String imageName);
}
