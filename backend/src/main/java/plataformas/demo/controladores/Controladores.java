package plataformas.demo.controladores;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import plataformas.demo.modelos.PeliculaAlquilada;
import plataformas.demo.modelos.PeliculaCatalogo;
import plataformas.demo.modelos.Usuario;
import plataformas.demo.repositorios.PeliculaAlquiladaRepo;
import plataformas.demo.repositorios.PeliculaCatalogoRepo;
import plataformas.demo.repositorios.UsuarioRepo;

import org.json.JSONArray;
import org.json.JSONObject;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class Controladores {

    @Autowired
    UsuarioRepo usuarioRepo;

    @Autowired
    PeliculaCatalogoRepo peliculaCatalogoRepo;

    @Autowired
    PeliculaAlquiladaRepo peliculaAlquiladaRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) throws Exception {
        try {
            Usuario _usuario = usuarioRepo.findByEmail(usuario.getEmail());

            if (_usuario == null) {
                _usuario = usuarioRepo.save(usuario);

                JSONObject response = new JSONObject();
                response.put("email", usuario.getEmail());
                response.put("nombre", usuario.getNombre());
                response.put("role", usuario.getRole());

                return new ResponseEntity<>(response.toString(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("duplicado", HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody String body, final HttpServletRequest request) {

        JSONObject json = new JSONObject(body);
        String email = (String) json.get("email");
        String password = (String) json.get("password");

        Usuario user = usuarioRepo.findByEmail(email);

        if (user == null) {
            return "usuario no existe";
        } else {

            try {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, password);
                Authentication auth = authenticationManager.authenticate(token);
                SecurityContext sc = SecurityContextHolder.getContext();
                sc.setAuthentication(auth);
                HttpSession session = request.getSession(true);
                session.setAttribute("SPRING_SECURITY_CONTEXT", sc);
            } catch (BadCredentialsException e) {
                // TODO: handle exception
                e.printStackTrace();
                return "password incorrecto";
            }

        }
        JSONObject response = new JSONObject();
        response.put("email", user.getEmail());
        response.put("nombre", user.getNombre());
        response.put("role", user.getRole());

        return response.toString();
    }

    @GetMapping("/alquilada")
    public ResponseEntity<List<PeliculaCatalogo>> obtenerAlquiladas(Principal principal) throws Exception {
        try {

            List<PeliculaAlquilada> peliculasAlquiladas = new ArrayList<PeliculaAlquilada>();
            String email = principal.getName();

            peliculasAlquiladas = peliculaAlquiladaRepo.findByUsuarioEmail(email);

            if (peliculasAlquiladas.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            List<PeliculaCatalogo> peliculasCatalogo = new ArrayList<>();
            for (PeliculaAlquilada peliculaAlquilada : peliculasAlquiladas) {
                peliculasCatalogo.add(peliculaAlquilada.getPeliculaCatalogo());
            }
            return new ResponseEntity<>(peliculasCatalogo, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/alquilada")
    public ResponseEntity<?> guardarAlquilada(@RequestBody String body, Principal principal) {
        try {
            JSONObject json = new JSONObject(body);
            Long idPelicula = json.getLong("idPelicula");

            String email = principal.getName();

            PeliculaCatalogo peliculaCatalogo = peliculaCatalogoRepo.findByIdPelicula(idPelicula);
            Usuario usuario = usuarioRepo.findByEmail(email);

            PeliculaAlquilada peliculaAlquilada = new PeliculaAlquilada(peliculaCatalogo, usuario);

            if (peliculaAlquiladaRepo.findByPeliculaCatalogoAndUsuario(peliculaCatalogo, usuario) == null) {
                peliculaAlquiladaRepo.save(peliculaAlquilada);

                JSONObject response = new JSONObject();
                response.put("estado", "guardada");
                response.put("idPelicula", peliculaAlquilada.getPeliculaCatalogo().getIdPelicula());

                return new ResponseEntity<>(
                        response.toString(),
                        HttpStatus.OK);
            } else {

                return new ResponseEntity<>("duplicada", HttpStatus.OK);
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/alquilada")
    public ResponseEntity<String> borrarAlquilada(@RequestParam long idPelicula, Principal principal) {
        try {
            String email = principal.getName();

            PeliculaCatalogo peliculaCatalogo = peliculaCatalogoRepo.findByIdPelicula(idPelicula);
            Usuario usuario = usuarioRepo.findByEmail(email);

            PeliculaAlquilada peliculaAlquilada = peliculaAlquiladaRepo
                    .findByPeliculaCatalogoAndUsuario(peliculaCatalogo, usuario);
            peliculaAlquiladaRepo.delete(peliculaAlquilada);

            JSONObject response = new JSONObject();
            response.put("estado", "borrada");
            response.put("idPelicula", idPelicula);

            return new ResponseEntity<>(response.toString(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/pelicula")
    public ResponseEntity<List<PeliculaCatalogo>> obtenerPeliculasCatalogo() {
        try {
            List<PeliculaCatalogo> peliculas = peliculaCatalogoRepo.findAll();

            if (peliculas.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(peliculas, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/pelicula")
    public ResponseEntity<?> agregarPeliculaCatalogo(@RequestBody PeliculaCatalogo peliculaCatalogo) {
        try {
            if (peliculaCatalogoRepo.findByIdPelicula(peliculaCatalogo.getIdPelicula()) == null) {
                peliculaCatalogoRepo.save(peliculaCatalogo);
                return new ResponseEntity<>(peliculaCatalogo, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("duplicada", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/pelicula")
    public ResponseEntity<String> borrarPeliculaCatalogo(@RequestParam long idPelicula) {
        try {
            System.out.println("////////////////////" + idPelicula);
            JSONObject response = new JSONObject();
            if (peliculaCatalogoRepo.findByIdPelicula(idPelicula) != null) {

                peliculaCatalogoRepo.deleteById(idPelicula);
                
                response.put("estado", "borrada");
                response.put("idPelicula", idPelicula);

            }

            return new ResponseEntity<>(response.toString(), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/role")
    public ResponseEntity<String> role(Principal principal) {
        String role = usuarioRepo.findByEmail(principal.getName()).getRole();
        return new ResponseEntity<>(role, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/logoutSuccess")
    public ResponseEntity<String> logoutSuccess(HttpServletRequest request) {
        return new ResponseEntity<>("logout", HttpStatus.OK);
    }

    @GetMapping("/logged")
    public boolean isLogged(Principal principal) {
        if (principal == null) {
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/datauser")
    public String dataUser(Principal principal) {
        Usuario usuario = usuarioRepo.findByEmail(principal.getName());

        JSONObject response = new JSONObject();
        response.put("email", usuario.getEmail());
        response.put("nombre", usuario.getNombre());
        response.put("role", usuario.getRole());

        return response.toString();
    }
}
