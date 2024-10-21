// Funcionalidad para el carrusel de imágenes

// Esta variable almacena el índice de la diapositiva actual (comienza en la primera diapositiva - 0)
let currentSlide = 0;
const carouselWrapper = document.querySelector('.carousel-wrapper');
const totalSlides = document.querySelectorAll('.carousel-item').length;

// Intervalo para el auto avance
let interval;

// Esta función avanza a la siguiente diapositiva
function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Esta función retrocede a la diapositiva anterior
function showPrevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Esta función actualiza el carrusel moviéndolo a la diapositiva correspondiente
function updateCarousel() {
    const offset = currentSlide * -100;
    carouselWrapper.style.transform = `translateX(${offset}%)`;
}

// Auto avance del carrusel cada 2 segundos
function startCarousel() {
    interval = setInterval(showNextSlide, 2000);
}

// Detener el carrusel
function stopCarousel() {
    clearInterval(interval);
}

// Iniciar el carrusel
startCarousel();

// Agregar eventos para pausar el carrusel al pasar el mouse
carouselWrapper.addEventListener('mouseover', stopCarousel);
carouselWrapper.addEventListener('mouseout', startCarousel);
