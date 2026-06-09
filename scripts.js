Codigo_Reserva() {}

function validarTipoVuelo() {
  let vuelo = document.getElementById("tipo-vuelo").value;
  let error = document.getElementById("error-ida-vuelta");

  if (vuelo === "") {
    error.innerHTML = "Este campo es obligatorio";
    return false;
  }
  error.innerHTML = "";
  return true;
}

function validarOrigen() {
    const valor = document.getElementById("origen").value;
    const errorEl = document.getElementById("error-provincia-destino");

    if (valor === "") {
        errorEl.innerHTML = "Seleccioná una provincia de origen";
        return false;
    }

    errorEl.innerHTML = "";
    return true;
}

function validarDestino() {
  const valor = document.getElementById("destino").value;
  const errorEl = document.getElementById("error-provincia-destino");

  if (valor === "") {
      errorEl.innerHTML = "Seleccioná una provincia de destino.";
      return false;
  }

  errorEl.innerHTML = "";
  return true;
}


function validarFechaPartida() {
  let fecha = document.getElementById("partida").value;
  let error = document.getElementById("errorFecha");

  if (fecha === "") {
    error.innerHTML = "Este campo es obligatorio";
    return false;
  }
  error.innerHTML = "";
  return true;
}

function validarFechaRegreso() {
  let fecha = document.getElementById("regreso").value;
  let error = document.getElementById("errorFecha");

  if (fecha === "") {
    error.innerHTML = "Este campo es obligatorio";
    return false;
  }
  error.innerHTML = "";
  return true;
}

function validarClase() { }
function validarListaPasajeros() { }

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  let resultado = document.getElementById("resultado");

  let vueloOk = validarTipoVuelo();
  let origenOk = validarOrigen();
  let destinoOk = validarDestino();
  let partidaOk = validarFechaPartida();
  let regresoOk = validarFechaPartida();
  let claseOk = validarClase();
  let listaOk = validarListaPasajeros()


  if ( vueloOk && origenOk && destinoOk && partidaOk && regresoOk && claseOk && listaOk) {
    resultado.innerHTML = "Reserva Exitosa!";
    resultado.style.display = "block";
    let contenedor = document.getElementById("codigo-reserva");
    contenedor.innerHTML = "<h3>Numero de reserva:</h3>";
      p.textContent = Codigo_Reserva();
      contenedor.appendChild(p);

  } else {
    resultado.innerHTML = "";
    resultado.style.display = "none";
  }
});
