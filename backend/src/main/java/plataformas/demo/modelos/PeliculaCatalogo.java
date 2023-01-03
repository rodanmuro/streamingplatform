package plataformas.demo.modelos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PeliculaCatalogo {

    @Id
    private long idPelicula;

    @Column
    private String poster_path;

    @Column
    private String title;

    @Column
    private String release_date;

    @Column
    private String original_language;

    @Column
    private String vote_average;

    @Column(columnDefinition = "TEXT")
    private String overview;

    public PeliculaCatalogo(String poster_path, String title, String release_date, String original_language,
            String vote_average, String overview) {
        this.poster_path = poster_path;
        this.title = title;
        this.release_date = release_date;
        this.original_language = original_language;
        this.vote_average = vote_average;
        this.overview = overview;
    }

}
