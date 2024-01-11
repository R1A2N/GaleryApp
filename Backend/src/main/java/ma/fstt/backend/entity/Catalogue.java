package ma.fstt.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "catalogue")


public class Catalogue {

    @Id
    @GeneratedValue
    private long id;
    private String catalogueName ;
    private int nmbr_img;
    private String catalogueUrl;
    private String catalogueimg;

    @OneToMany (mappedBy = "catalogue", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Image> images;


}
