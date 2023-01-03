import React from "react";
function Footer() {
  return (
    <>
      <footer class="text-center text-lg-start bg-dark text-muted">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div class="me-5 d-none d-lg-block">
            <span>
              {" "}
              Nos puedes contactar por medio de nuestras redes sociales:
            </span>
          </div>

          <div>
            <a href="http://localhost:3000/plataformasstreaming" class="me-4 link-secondary">
              Facebook
            </a>
            <a href="http://localhost:3000/plataformasstreaming" class="me-4 link-secondary">
              Twitter{" "}
            </a>
            <a href="http://localhost:3000/plataformasstreaming" class="me-4 link-secondary">
              Google
            </a>
            <a href="http://localhost:3000/plataformasstreaming" class="me-4 link-secondary">
              Instagram
            </a>
          </div>
        </section>

        <section class="">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-gem me-3 text-secondary"></i>UNIR
                </h6>
                <p>
                  UNIR Colombia, la universidad virtual donde estudiar Maestrías
                  y Pregrados Oficiales Europeas convalidables. ¡Acuerdos con
                  ICETEX y OEA!
                </p>
              </div>

              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Productos</h6>
                <p>
                  <a href="https://angular.io/" class="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="https://es.reactjs.org/" class="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="https://vuejs.org/" class="text-reset">
                    Vue
                  </a>
                </p>
              </div>

              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Contactos</h6>
                <p>carlosjesus.barrera713@comunidadunir.net</p>
                <p>ivanfernando.vargas065@comunidadunir.net</p>
                <p>rodolfoanotonio.muriel512@comunidadunir.net </p>
              </div>
            </div>
          </div>
        </section>

        <div class="text-center p-4">
          © 2022 Copyright:Platforma Streaming UNIR. Todos los derechos
          reservados.
          <a class="text-reset fw-bold" href="https://colombia.unir.net/">
            UNIR
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
