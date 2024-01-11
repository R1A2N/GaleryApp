package ma.fstt.backend.service;


import jakarta.annotation.Resource;
import ma.fstt.backend.entity.Catalogue;
import ma.fstt.backend.repository.Ctaloquerepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogueServc {
    @Resource
    private Ctaloquerepo cataloguerepo;
//ajouter catalogue
    public Catalogue ajouter_catalogue(Catalogue ctlg){
        return cataloguerepo.save(ctlg);

    }
    //get la list des catalogue
    public List<Catalogue> getlist(){
        return  cataloguerepo.findAll();

    }

    //delete catalogue
    public void deletecatal(long id){
        cataloguerepo.deleteById(id);

    }
    public Catalogue getCatalqueById(Long id) {
        return cataloguerepo.findById(id).orElse(null);
    }



}

