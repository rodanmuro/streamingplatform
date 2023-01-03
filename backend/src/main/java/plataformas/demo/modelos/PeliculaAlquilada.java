package plataformas.demo.modelos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import ch.qos.logback.core.subst.Token.Type;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PeliculaAlquilada {

        @Id
        @GeneratedValue
        private long idAlquilada;

        @ManyToOne
        @OnDelete(action = OnDeleteAction.CASCADE)
        private PeliculaCatalogo peliculaCatalogo;

        @ManyToOne
        @OnDelete(action = OnDeleteAction.CASCADE)
        private Usuario usuario;  


        public PeliculaAlquilada(PeliculaCatalogo peliculaCatalogo, Usuario usuario){
                this.peliculaCatalogo = peliculaCatalogo;
                this.usuario = usuario;
        }

        
}