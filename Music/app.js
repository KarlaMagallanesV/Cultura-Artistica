// Lista de canciones con título y autor
const songs = [
    {
        title: "Snow Flower",
        author: "Peakboy",
        url: "/audio/Snow Flower (feat. Peakboy).mp3"
    },
    {
        title: "I Was Made For Lovin' You",
        author: "Kiss",
        url: "/audio/Kiss - I Was Made For Lovin' You.mp3"
    },
    {
        title: "Music 3",
        author: "Unknown Artist",
        url: "https://www.chosic.com/wp-content/uploads/2023/06/Music3.mp3"
    }
];

// Selección de elementos en el HTML
const audioPlayer = document.getElementById("background-music");
const playButton = document.getElementById("play-pause-button");
const playIcon = document.getElementById("play-music");
const pauseIcon = document.getElementById("pause-music");
const prevButton = document.querySelector('.prev-next[name="play-back-outline"]');
const nextButton = document.querySelector('.prev-next[name="play-forward-outline"]');
const songTitle = document.getElementById("song-title");
const songAuthor = document.getElementById("song-author");
const songImageContainer = document.getElementById("song-image-container");
const songImages = document.querySelectorAll(".song-image");

// Canvas para las ondas
const canvas = document.getElementById("waves");
const ctx = canvas.getContext("2d");

let currentSongIndex = 0;

// Crear el contexto de audio y el analizador
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // Definir la resolución de las ondas
const bufferLength = analyser.frequencyBinCount; // Obtiene el número de datos de frecuencia
const dataArray = new Uint8Array(bufferLength); // Array para almacenar los datos de la frecuencia

// Crear el nodo de fuente de audio
const audioSource = audioContext.createMediaElementSource(audioPlayer);
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

// Función para cargar la canción y la imagen asociada
function loadSong(index) {
    // Cambiar la fuente de la música
    audioPlayer.src = songs[index].url;
    audioPlayer.load();

    // Cambiar el título y el autor de la canción
    songTitle.textContent = songs[index].title;
    songAuthor.textContent = songs[index].author;

    // Cambiar la imagen asociada a la canción
    showNextImage(index);
}

// Función para mostrar la imagen de la canción
function showNextImage(index) {
    songImages.forEach(image => image.classList.add("hidden"));
    songImages[index].classList.remove("hidden");
}

// Función para reproducir/pausar la música
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        audioContext.resume(); // Asegúrate de que el contexto de audio se reanude en dispositivos móviles
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    } else {
        audioPlayer.pause();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }
}

// Función para avanzar a la siguiente canción sin reproducir automáticamente
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

// Función para retroceder a la canción anterior sin reproducir automáticamente
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Eventos para los botones de play, siguiente y anterior
playButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPrevSong);

// Carga la primera canción al iniciar, pero no la reproduce
loadSong(currentSongIndex);

// Función para mostrar la imagen cuando la música comienza a reproducirse
audioPlayer.addEventListener('play', () => {
    songImageContainer.style.display = 'block'; // Muestra la imagen cuando la música se reproduce
});

// Función para ocultar la imagen cuando la música se detiene
audioPlayer.addEventListener('pause', () => {
    songImageContainer.style.display = 'none'; // Oculta la imagen cuando la música se detiene
});

// También puedes ocultar la imagen cuando la música termina
audioPlayer.addEventListener('ended', () => {
    songImageContainer.style.display = 'none'; // Oculta la imagen cuando la música termina
});

// Función para dibujar las ondas en el canvas
function drawWaves() {
    analyser.getByteFrequencyData(dataArray); // Obtener los datos de frecuencia

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Establecer el color de las ondas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    
    // Ajustamos el tamaño de las ondas en función del nuevo tamaño del canvas
    const barWidth = canvas.width / bufferLength; // Ajustar la barra según el tamaño del canvas
    let x = 0;

    // Dibujar las ondas
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2; // Hacemos las ondas más pequeñas dividiendo el valor
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

// Actualiza las ondas cada 30ms
function animateWaves() {
    drawWaves();
    requestAnimationFrame(animateWaves);
}

// Iniciar la animación de las ondas cuando la música comienza
audioPlayer.addEventListener('play', () => {
    animateWaves();
});
