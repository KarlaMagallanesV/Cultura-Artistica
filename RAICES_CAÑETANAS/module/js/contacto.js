document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const telefonoInput = document.getElementById('telefono');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');

    const nombreError = document.getElementById('nombre-error');
    const apellidoError = document.getElementById('apellido-error');
    const telefonoError = document.getElementById('telefono-error');
    const correoError = document.getElementById('correo-error');
    const mensajeError = document.getElementById('mensaje-error');

    function validateField(input, errorElement, pattern, errorMessage) {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                errorElement.textContent = 'Este campo es obligatorio.';
                errorElement.style.display = 'block';
            } else if (!pattern.test(input.value)) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    } 

    // Validaciones en tiempo real
    validateField(nombreInput, nombreError, /^[a-zA-Záéíóúñ\s]+$/, 'El nombre debe contener solo letras y tildes.');
    validateField(apellidoInput, apellidoError, /^[a-zA-Záéíóúñ\s]+$/, 'El apellido debe contener solo letras y tildes.');
    validateField(telefonoInput, telefonoError, /^9\d{8}$/, 'El teléfono debe empezar con 9 y tener 9 dígitos.');
    validateField(correoInput, correoError, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo electrónico debe ser del tipo @gmail.com y no puede contener espacios.');

    // Validación mensaje
    mensajeInput.addEventListener('input', () => {
        if (mensajeInput.value.trim() === '') {
            mensajeError.textContent = 'El mensaje no puede estar vacío.';
            mensajeError.style.display = 'block';
        } else {
            mensajeError.textContent = '';
            mensajeError.style.display = 'none';
        }
    });

    // Enviar formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validar todos los campos antes de enviar
        if (
            nombreInput.value.trim() === '' ||
            apellidoInput.value.trim() === '' ||
            telefonoInput.value.trim() === '' ||
            correoInput.value.trim() === '' ||
            mensajeInput.value.trim() === '' ||
            nombreError.textContent ||
            apellidoError.textContent ||
            telefonoError.textContent ||
            correoError.textContent ||
            mensajeError.textContent
        ) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Por favor, corrige los errores en el formulario antes de enviarlo.'
            });
            return;
        }

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Tu mensaje ha sido enviado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    form.reset(); 
                });
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(() => {
            Swal.fire({
                title: '¡Error!',
                text: 'Hubo un problema con el envío.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
    });
});
