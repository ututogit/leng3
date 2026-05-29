function validarNombre() {
    let nombre = document.getElementById("nombre").value.trim();
    let soloLetras = /^[a-zA-Z]+$/;

    if (nombre.length < 3) {
        spanError.innerHTML = "El nombre debe tener al menos 3 caracteres";
        return false;
    }

    if (soloLetras.test(nombre)) {
        spanError.innerHTML = "Solo se permiten letras"
        return false;
    }

    spanError = "";
    return true;
}

function validarApellido() {
    let apellido = document.getElementById("nombre").value.trim();
    let soloLetras = /^[a-zA-Z]+$/;

    if (apellido.length < 3) {
        spanError.innerHTML = "El apellido debe tener al menos 3 caracteres";
        return false;
    }

    if (soloLetras.test(apellido)) {
        spanError.innerHTML = "Solo se permiten letras"
        return false;
    }

    spanError = "";
    return true;
}

function validarDNI() {
    let dni = document.getElementById("dni").value.trim();
    let soloNum = /^\d{8}$/;

    if (isNaN(dni)) {
        spanError.innerHTML = "El DNI debe contener solo números y tener 8 digitos";
        return false;
    }

    if (!soloNum.test(dni)) {
        spanError.innerHTML = "El DNI debe contener solo números y tener 8 digitos";

    }
    spanError = "";
    return true;
}

function validarFechaNacimiento() {
    let nac = document.getElementById("fechaNac").value;

    let ano = parseInt(fecha.split("-")[0]);
    if (ano < 2007) {
        spanError.innerHTML = "La fecha de El usuario debe ser mayor de 18 años"
        return false;
    }
    spanError = "";
    return true;
}

function validarDatos () {

    let nomOk = validarNombre();
    let apeOk = validarApellido();
    let nacOk = validarFechaNacimiento();

    if (nomOk && apeOk && nacOk) {

        var seccion = document.getElementById("seccion-formulario");

        seccion.innerHTML = "<div class='mensaje-exito'>" +
            "<p class='exito-icono'>E</p>" +
            "<h3>Registro exitoso!</h3>" +
            "</div>";
        
        document.getElementById("seccion-preparacion").style.display = "block";

        document.getElementById("seccion-preparacion").scrollIntoView({ behavior: "smooth" });

    }

}

function hacerPreguntas() {

    let nacionalidad = prompt("¿Cuál es tu nacionalidad?");
    let conocimiento = prompt("¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)");
    let carrera = prompt("¿Por qué elegiste esta carrera?");

    if (nacionalidad == null) nacionalidad = "No respondió esta pregunta";
    if (conocimiento == null) nacionalidad = "No respondió esta pregunta";
    if (carrera == null) nacionalidad = "No respondió esta pregunta";

    let divRespuestas = document.getElementById("respuestas");

    divRespuestas.innerHTML =
    "<p><strong>Nacionalidad:</strong>" + nacionalidad + "</p>" +
    "<p><strong>Nacionalidad:</strong>" + conocimiento + "</p>" +
    "<p><strong>Nacionalidad:</strong>" + carrera + "</p>";
}