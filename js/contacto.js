document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");
    const inputEmail = document.getElementById("inputEmail");
    const inputNombre = document.getElementById("inputNombre");
    const inputApellido = document.getElementById("inputApellido");
    const motivoContacto = document.getElementById("motivoContacto");
    const checkbox = document.getElementById("checkboxContactar");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validar campos
        let mensajeDeError = "";

        switch (true) {
            case !validateEmail(inputEmail.value):
                mensajeDeError = 'Introduzca un correo electrónico válido.';
                break;
            case inputNombre.value.trim() === "":
                mensajeDeError = 'Introduzca su nombre.';
                break;
            case inputApellido.value.trim() === "":
                mensajeDeError = 'Introduzca su apellido.';
                break;
            case motivoContacto.value.trim() === "":
                mensajeDeError = 'Proporcione un motivo de contacto.';
                break;
            case !checkbox.checked:
                mensajeDeError = 'Por favor, marque la casilla de verificación para confirmar que ha entendido y desea que nos pongamos en contacto con usted. Este paso es necesario para continuar.';
                break;
        }

        if (mensajeDeError) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: mensajeDeError
            });
            return;
        }

        // Almacenar datos en localStorage
        const formData = {
            email: inputEmail.value,
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            motivo: motivoContacto.value
        };
        localStorage.setItem('formData', JSON.stringify(formData));

        // Mostrar alerta de éxito
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El formulario se ha enviado correctamente.'
        });

        // Redirigir a otra página después de mostrar la alerta si es necesario
        setTimeout(function () {
            window.location.href = '../index.html';
        }, 2000); // Redirige después de 2 segundos (2000 milisegundos)
    });

    // Función para validar correo electrónico
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});
