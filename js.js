document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = document.querySelectorAll('.fade-in');

    function checkVisibility() {
        elementsToAnimate.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight * 0.75) {
                element.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);

    // Função para iniciar o carousel automaticamente
  // Função para iniciar o carousel automaticamente
  function startCarouselAutoplay() {
    $('#carouselExampleFade').carousel({
        interval: 2000 // Tempo em milissegundos entre os slides
    });
}

// Iniciar o carousel automaticamente
startCarouselAutoplay();
});
