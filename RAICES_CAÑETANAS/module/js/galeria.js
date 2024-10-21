function ampliarImagen(url) {
    const modal = document.getElementById("imageModal");
    const imgAmpliada = document.getElementById("imgAmpliada");
    
    imgAmpliada.src = url;
    modal.style.display = "block";
}

function cerrarImagen() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        cerrarImagen();
    }
}
function compartir(url) {
    const shareData = {
        title: 'Imagen/Video sobre ODS 3',
        text: 'Mira este contenido sobre Salud y Bienestar - ODS 3.',
        url: url
    };

    try {
        navigator.share(shareData);
    } catch (err) {
        alert('No se pudo compartir este contenido');
    }
}


// ------------------------------------------------------------------------------

// Mapa interactivo

// Inicializar el mapa
var map = L.map('map').setView([-12.04318, -77.02824], 13); // Coordenadas 

// Añadir capa de mapa desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir marcadores 
var marker = L.marker([-12.04318, -77.02824]).addTo(map);
marker.bindPopup("<b>Ubicación de ejemplo</b><br>Lima, Perú").openPopup();

// Añadir otro marcador
var marker2 = L.marker([-12.04535, -77.03129]).addTo(map);
marker2.bindPopup("<b>Ubicación adicional</b><br>Ejemplo en el mapa.");
