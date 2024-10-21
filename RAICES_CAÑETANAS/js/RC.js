// Seleccionar los elementos del menú
const menuItems = document.querySelectorAll('.nav-link');

// Añadir una animación suave con JavaScript
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)'; // Agrandar el elemento
        item.style.transition = 'transform 0.3s ease'; // Suavizar la transición
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)'; // Volver al tamaño original
    });
});
