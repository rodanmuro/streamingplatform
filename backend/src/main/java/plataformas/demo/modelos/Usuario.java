package plataformas.demo.modelos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Usuario {


    @Column
    private String nombre;

    @Id
    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String role;

    public Usuario(String nombre, String email, String password, String role){
        this.nombre = nombre; 
        this.email = email; 
        this.password = password; 
        this.nombre = role; 
    }
    
}
