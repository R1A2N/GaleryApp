package ma.fstt.backend.repository;

import ma.fstt.backend.entity.Catalogue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Ctaloquerepo extends JpaRepository<Catalogue,Long> {


}
