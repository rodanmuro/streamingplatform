package plataformas.demo.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import plataformas.demo.modelos.Usuario;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Long> {

    //select * from usuario where email="email";
    public Usuario findByEmail(String email);
    
    
}
