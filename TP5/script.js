// Buscamos el formulario en la página usando su id.
const form = document.getElementById('formulario');
// Buscamos el elemento donde mostramos mensajes generales de error o éxito.
const formResult = document.getElementById('formResult');
// Lista de los campos que vamos a validar.
const fields = [
    { id: 'nombre', label: 'Nombre' },
{ id: 'apellido', label: 'Apellido' },
{ id: 'email', label: 'Email' },
{ id: 'fechaNacimiento', label: 'Fecha de Nacimiento' },
{ id: 'password', label: 'Contraseña' },
{ id: 'confirmPassword', label: 'Confirmar contraseña' }
];

// Expresión regular: solo letras incluyendo acentos y ñ.
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

// validar correo institucional @ucasal.edu.ar
const regexEmail = /^[^\s@]+@ucasal\.edu\.ar$/;

// Muestra un error visual en el input indicado con su mensaje correspondiente.
function setError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = message;
}

// Limpia el error de un input y lo marca como correcto visualmente.
function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = '';
}

// Valida un campo individual según su id.
// Devuelve true si es válido, false si tiene error.
function validateField(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    let valid = true;
    let message = '';

    // Primero verificamos que el campo no esté vacío.
    if (value === '') {
        valid = false;
        message = 'Este campo es obligatorio.';
    } else {
        switch (id) {
            case 'nombre':
            case 'apellido':
                // Mínimo 3 caracteres y solo letras.
                if (value.length < 3) {
                    valid = false;
                    message = 'Debe tener al menos 3 caracteres.';
                } else if (!regexTexto.test(value)) {
                    valid = false;
                    message = 'Solo se permiten letras.';
                }
                break;

            case 'email':
                // Solo se aceptan correos @ucasal.edu.ar
                if (!regexEmail.test(value)) {
                    valid = false;
                    message = 'Ingrese un correo institucional válido (ejemplo: usuario@ucasal.edu.ar).';
                }
                break;

            case 'fechaNacimiento': {
                // Calculamos la edad a partir de la fecha ingresada.
                const hoy = new Date();
                const nacimiento = new Date(value);

                // Calculamos años cumplidos exactos.
                let edad = hoy.getFullYear() - nacimiento.getFullYear();
                const mesActual = hoy.getMonth();
                const diaActual = hoy.getDate();
                const mesNac = nacimiento.getMonth();
                const diaNac = nacimiento.getDate();

                // Restamos 1 si todavía no llegó el cumpleaños este año.
                if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
                    edad--;
                }

                if (edad < 18) {
                    valid = false;
                    message = 'Debes tener al menos 18 años.';
                } else if (edad >= 40) {
                    valid = false;
                    message = 'Debes tener menos de 40 años.';
                }
                break;
            }

            case 'password':
                // Mínimo 6 caracteres.
                if (value.length < 6) {
                    valid = false;
                    message = 'La contraseña debe tener al menos 6 caracteres.';
                }
                break;

            case 'confirmPassword': {
                // Comparamos con el valor del campo password.
                const password = document.getElementById('password').value;
                if (value !== password) {
                    valid = false;
                    message = 'Las contraseñas no coinciden.';
                }
                break;
            }

            default:
                break;
        }
    }

    // Aplicamos el estilo visual según el resultado.
    if (valid) {
        clearError(input);
    } else {
        setError(input, message);
    }

    return valid;
}

// Validación en tiempo real: cada campo se valida mientras el usuario escribe.
fields.forEach(field => {
    const input = document.getElementById(field.id);
    if (input) {
        input.addEventListener('input', () => validateField(field.id));
    }
});

// Evento submit: valida todos los campos al presionar "Enviar".
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Limpiamos el mensaje general anterior.
    formResult.className = 'alert d-none';
                      formResult.textContent = '';

                      // Validamos todos los campos. allValid será false si alguno falla.
                      const allValid = fields.every(field => validateField(field.id));

    if (!allValid) {
        formResult.className = 'alert alert-danger';
                      formResult.textContent = 'Corrige los errores en el formulario antes de enviar.';
                      return;
    }

    // Si todo es válido, mostramos el mensaje de éxito.
    formResult.className = 'alert alert-success';
                      formResult.textContent = 'Formulario enviado correctamente.';

                      // Reiniciamos el formulario y quitamos los estilos de validación.
                      form.reset();
                      fields.forEach(field => {
                          const input = document.getElementById(field.id);
                          if (input) input.classList.remove('is-valid');
                      });
});
