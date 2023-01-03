package plataformas.demo.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import plataformas.demo.modelos.PeliculaCatalogo;

@Repository
public interface PeliculaCatalogoRepo extends JpaRepository<PeliculaCatalogo, Long>{
    public void deleteById(long idPelicula);
    public PeliculaCatalogo findByIdPelicula(long idPelicula);
}
