package ma.fstt.backend.controler;


import jakarta.annotation.Resource;
import ma.fstt.backend.service.CatalogueServc;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.fstt.backend.entity.Catalogue;

import java.util.List;

@RestController
@RequestMapping("/catalogue")
public class Cataloguecontroller {
    @Resource
    private CatalogueServc catsrv;


    @PostMapping("/add")
    public ResponseEntity<Catalogue> addCatalogue(@RequestBody Catalogue c){

        return new ResponseEntity<>(catsrv.ajouter_catalogue(c), HttpStatus.OK);
    }

    @GetMapping("/all")

    public  ResponseEntity<List<Catalogue>> findall(){
        return new ResponseEntity<>(catsrv.getlist(), HttpStatus.OK);

    }
    @GetMapping("/{id}")
    public ResponseEntity<Catalogue> getImageById(@PathVariable Long id) {
        Catalogue imageEntity = catsrv.getCatalqueById(id);

        if (imageEntity != null) {
            return ResponseEntity.ok(imageEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public  void delete(@PathVariable long id){
         catsrv.deletecatal(id);

    }



}
