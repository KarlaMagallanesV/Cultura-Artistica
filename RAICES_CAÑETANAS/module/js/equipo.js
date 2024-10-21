document.addEventListener("DOMContentLoaded", function() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        // No se crea el botón "Ver más"
        
        // Crear animación al pasar el mouse
        member.addEventListener('mouseenter', function() {
            this.classList.add('active'); // Activar clase 'active' al pasar el mouse
        });

        member.addEventListener('mouseleave', function() {
            this.classList.remove('active'); // Desactivar clase 'active' al quitar el mouse
        });

        member.classList.add('fade-in'); // Añadir clase de animación
    });

    // Sección de equipo
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar el elemento una vez visible
            }
        });
    }, {
        threshold: 0.1 // Umbral de visibilidad del 10%
    });

    // Observar cada miembro del equipo
    teamMembers.forEach(member => {
        observer.observe(member);
    });
});
