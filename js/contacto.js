/* Swal.fire({
    icon: "success",
    title: "Enviaste el formulario con éxito!",
    text: "En breve serás informado sobre la situación",

});
 */

/* script del formulario */

const inputEmail = document.querySelector('#inputEmail');
const inputNombre = document.querySelector('#inputNombre') ;
const inputApellido = document.querySelector('#inputApellido');
const botonEnviar = document.querySelector('#btnEnviar');
const motivoDeContacto = document.querySelector('#motivoContacto')


botonEnviar.addEventListener('click', function() {
    // Verificar si los campos de entrada están vacíos
    event.preventDefault();
    
    if (inputApellido.value === "" || inputNombre.value === "" || inputEmail.value === "") {
        // Mostrar una alerta con SweetAlert2 para campos vacíos
        Swal.fire({
            icon: "error",
            title: "Error al enviar el formulario :(",
            text: "Por favor, completá todos los campos",
            background: "#70127c",
            color: "white",
        });
    } else if (motivoDeContacto === ""){

        Swal.fire({
            icon: "error",
            title: "Error al enviar el formulario, no completaste el motivo de contacto",
            text: "Por favor completá la información",
        });
    }  else {
        // Si todos los campos están completos, mostrar un mensaje de éxito
        Swal.fire({
            icon: "success",
            title: "Enviaste el formulario con éxito!",
            text: "En breve serás informado sobre la situación :)",
        });
    }
});