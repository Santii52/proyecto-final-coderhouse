document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formContacto");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const entradaEmail = document.getElementById("inputEmail");
        const entradaNombre = document.getElementById("inputNombre");
        const entradaApellido = document.getElementById("inputApellido");
        const motivoContacto = document.getElementById("motivoContacto");
        const casillaVerificacion = document.getElementById("exampleCheck1");

        const datosFormulario = {
            email: entradaEmail.value.trim(),
            nombre: entradaNombre.value.trim(),
            apellido: entradaApellido.value.trim(),
            motivo: motivoContacto.value.trim()
        };

        const validaciones = [
            { campo: datosFormulario.email, mensajeError: 'Por favor, introduzca un correo electrónico válido!', condicion: esCorreoValido },
            { campo: datosFormulario.nombre, mensajeError: 'Por favor, completá tu nombre.', condicion: esCadenaNoVacia },
            { campo: datosFormulario.apellido, mensajeError: 'Por favor, completá tu apellido.', condicion: esCadenaNoVacia },
            { campo: datosFormulario.motivo, mensajeError: 'Por favor, proporciona un motivo de contacto.', condicion: esCadenaNoVacia },
            { campo: casillaVerificacion.checked, mensajeError: 'Por favor, confirma que entendiste y deseas contactar.', condicion: estaMarcado }
        ];

        for (const { campo, mensajeError, condicion } of validaciones) {
            if (!condicion(campo)) {
                mostrarError(mensajeError);
                return;
            }
        }

        console.log("Datos del formulario:", datosFormulario);
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
        mostrarMensajeExito('El formulario se ha enviado correctamente.');

        setTimeout(function () {
            window.location.href = '../index.html';
        }, 2000);
    });

    function esCorreoValido(correo) {
        const re = /\S+@\S+\.\S+/;
        return re.test(correo);
    }

    function esCadenaNoVacia(valor) {
        return valor !== "";
    }

    function estaMarcado(marcado) {
        return marcado;
    }

    function mostrarError(mensajeError) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensajeError
        });
    }

    function mostrarMensajeExito(mensaje) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje
        });
    }
});
