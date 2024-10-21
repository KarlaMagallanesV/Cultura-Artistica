(function () {
  "use strict";

  // Función para mostrar el contenido de la descripción
  function showContent(index) {
      const descriptions = document.querySelectorAll(".descr");
      
      // Ocultar todas las descripciones
      descriptions.forEach((descr) => {
          descr.classList.remove("show");
          descr.style.opacity = 0; // Resetear opacidad
      });

      // Mostrar la descripción seleccionada
      const selectedDescr = document.getElementById(`descr-${index}`);
      selectedDescr.classList.add("show");
      selectedDescr.style.opacity = 1; // Hacer visible
  }

  // Asignar la función a la ventana global
  window.showContent = showContent;

  // Código existente para los elementos en la vista
  var items = document.querySelectorAll(".timeline li");

  // Función para verificar si un elemento está en la vista
  function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
          if (isElementInViewport(items[i])) {
              items[i].classList.add("in-view");
          }
      }
  }

  // Escuchar eventos
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();
