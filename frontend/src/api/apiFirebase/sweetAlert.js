import Swal from "sweetalert2";

const sweetAlert = {
  showErrores: (error) => {
    let textError = "Error, Por favor vuelva a intentarlo";

    if (error.code == "auth/user-not-found")
      textError = "El usuario no existe, por favor registrese.";
    else if (error.code == "auth/wrong-password")
      textError = "La contraseña es incorrecta, por favor vuelva a intentarlo.";
    else if (error.code == "auth/email-already-in-use")
      textError =
        "Este correo ya esta en uso, por favor intente registrarse con uno nuevo.";
    else if (error.code == "auth/weak-password")
      textError =
        "La contraseña es muy debil, por favor ingrese una nueva contraseña.";
    else if (error == "usuario no existe")
      textError =
        "Este usuario no existe en nuestro sitio. Asegúrese de haberlo digitado adecuadamente o registrarse";
    else if (error == "password incorrecto") textError = "Password incorrecto";
    else console.log(error.code);

    Swal.fire({
      icon: "error",
      title: textError.split(",")[0],
      text: textError,
    });
  },
  showSignIn: (dataUser) => {
    Swal.fire({
      icon: "success",
      title: `Bienvenido ${dataUser.nombre ? dataUser.nombre : dataUser.email}`,
      showConfirmButton: false,
      timer: 1500,
    });
  },
  showMovieAlquilada: (movie, estado) => {
    Swal.fire({
      position: "top-end",
      icon: estado ? "success" : "error" ,
      title: estado ? "Película alquilada " : "Ya la tiene alquilada" ,
      html: `<b>Nombre:</b> ${movie.title}`,
      showConfirmButton: false,
      timer: 1500,
    });
  },
  showDeleteMovieAlquilada: (movie, estado) => {
    Swal.fire({
      position: "top-end",
      icon: estado ? "success" : "error" ,
      title: estado ? "Película devuelta " : "No se pudo devolver" ,
      html: `<b>Nombre:</b> ${movie.title}`,
      showConfirmButton: false,
      timer: 1500,
    });
  },
  showMovieAddCatalogo: (movie, estado) => {
    Swal.fire({
      position: "top-end",
      icon: estado ? "success" : "error" ,
      title: estado ? "Agregada a Catálogo " : "No se pudo agregar" ,
      html: `<b>Nombre:</b> ${movie.title}`,
      showConfirmButton: false,
      timer: 1500,
    });
  },
  showMovieDeleteOfCatalogo: (movie, estado) => {
    Swal.fire({
      position: "top-end",
      icon: estado ? "success" : "error" ,
      title: estado ? "Eliminada de Catálogo " : "No se pudo eliminar" ,
      html: `<b>Nombre:</b> ${movie.title}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export default sweetAlert;
