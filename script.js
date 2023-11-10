document.addEventListener("DOMContentLoaded", function() {
    const passwordBox = document.getElementById("password-box");
    const submitButton = document.getElementById("submit");
    const passwordInput = document.getElementById("password");
    const divs = document.querySelectorAll(".background-overlay");
    const header = document.getElementById("header");
    const menuItems = document.querySelectorAll("#overlay-menu ul li a");
    var videoElement = document.getElementById("videoElement");
    const audio = document.getElementById("background-audio");

    let currentIndex = 0; // Índice da div atual

    function fadeInDiv(index) {
        
        // Garante que o índice esteja dentro dos limites das divs
        if (index < 0) {
            index = 0;
        } else if (index >= divs.length) {
            index = divs.length - 1;
        }

        // Define o índice atual para o índice especificado
        currentIndex = index;

        // Define a opacidade de todas as divs para 0
        divs.forEach((div, i) => {
            div.style.opacity = 0;
        });

        // Define a opacidade da div correspondente ao índice para 1
        divs[index].style.opacity = 1;
    }

    // Defina o `passwordBox` com opacidade 0 e um efeito de transição
    passwordBox.style.opacity = 0;
    passwordBox.style.transition = "opacity 2s";

    // Defina o `header` com opacidade 0
    header.style.opacity = 0;

    // Aguarda 2 segundos e exibe o `passwordBox` com opacidade 1
    setTimeout(function() {
        passwordBox.style.opacity = 1;
    }, 2000);

    // Garanta que o `passwordBox` esteja visível inicialmente
    passwordBox.style.display = "block";

    // Adicione um evento de clique para cada item de menu
    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", function(event) {
            event.preventDefault(); // Impede a ação padrão do link
            const targetIndex = index; // Obtém o índice do item de menu clicado
            if (targetIndex === 9){
                atribTec(targetIndex);
            }else{
                desatribTec(targetIndex);
            }
            fadeInDiv(targetIndex); // Chama a função para fazer a transição para a div correspondente
        });
    });

    function keydownHandler(event) {
        videoElement.volume = 0.5;
        if (event.key === " ") {
          event.preventDefault();
          
          if (audio.paused) {
            setTimeout(function() {
                audio.play();
            }, 500);
          } else {
            audio.pause();
          }
          if (videoElement.paused) {
            setTimeout(function() {
                videoElement.play();
            }, 1000);
            
          } else {
            videoElement.pause();
          }
        }
      }

    function atribTec(index) {
          // Adiciona o event listener à div específica com ID "minhaDiv"
          document.body.addEventListener("keydown", keydownHandler);
    }
    function desatribTec(index) {
          // Se index não for igual a 9, remova o event listener da div
          videoElement.pause();
          document.body.removeEventListener("keydown", keydownHandler); 
    }

    submitButton.addEventListener("click", function() {
        const password = passwordInput.value;
        if (password === "suasenha") {
            // Esconde o `passwordBox` com um efeito de transição
            passwordBox.style.opacity = 0;

            const divIdsToHide = [
                "#per2",
                "#per1",
                "#per7",
                "#per8",
                "#per4",
                "#per5",
                "#per6",
                "#per3",
                "#per9",
                "#per10",
                "#per11",
                "#per12",
                "#per13"
              ];
              
            hideDivsByIds(divIdsToHide);
            // Inicia a reprodução da música após a senha estar correta
            setTimeout(function() {
                audio.volume = 0.1; // altera o volume da musica sendo 1 maximo e 0 minimo
                audio.play();
                // Quando a música começa a tocar, mostre o cabeçalho
                header.style.opacity = 1;
            }, 1000); // Aguarda 1 segundo após a senha estar correta

            // Inicia a transição da primeira div (índice 0)
            fadeInDiv(0);

            // Define um temporizador para exibir as próximas divs a cada 30 segundos
            setInterval(function() {
                const nextIndex = currentIndex + 1;
                fadeInDiv(nextIndex); // Faz a transição para a próxima div
            }, 30000);
        } else {
            alert("Senha incorreta. Você será redirecionado.");
            window.location.href = "index.html";
        }
    });
    
});

function hideDivsByIds(ids) {
        ids.forEach((id) => {
            const div = document.querySelector(id);
            if (div) {
                div.style.display = "none";
            }
        });
    }

document.addEventListener("DOMContentLoaded", function () {
    const balloonSequence = [
        { id: "#per2", time: 4000 },
        { id: "#per1", time: 4000 },
        { id: "#per7", time: 4000 },
        { id: "#per8", time: 4000 },
        { id: "#per4, #per5, #per6", time: 3000 },
        { id: "pause", time: 4000 },
        { id: "#per3", time: 4000 },
        { id: "#per4, #per5, #per6", time: 3000 },
        { id: "#per9, #per10", time: 4000 },
        { id: "pause", time: 4000 },
        { id: "#per11", time: 4000 },
        { id: "#per12", time: 4000 },
        { id: "#per13", time: 4000 },
    ];

 let currentIndex = 0;
    let currentTimeout;
    let currentVisibleBalloon;
    let isPaused = false; // Variável para controlar se o botão de pausa foi clicado

    function hideAllBalloons() {
        const allBalloons = document.querySelectorAll(".balloon");
        allBalloons.forEach((balloon) => {
            balloon.style.display = "none";
        });
    }

    function showBalloons(index) {
        if (index < balloonSequence.length) {
            if (isPaused) {
                // Verifique se o botão de pausa foi clicado
                currentTimeout = setTimeout(() => {
                    showBalloons(index);
                }, 1000); // Aguarde 1 segundo e verifique novamente
                return;
            }

            const { id, time } = balloonSequence[index];
            const balloonIds = id.split(", ");

            if (balloonIds[0] === "pause") {
                currentTimeout = setTimeout(() => {
                    showBalloons(index + 1);
                }, time);
                return;
            }

            if (currentVisibleBalloon) {
                currentVisibleBalloon.style.display = "none";
            }

            balloonIds.forEach((id) => {
                const balloonElement = document.querySelector(id);
                if (balloonElement) {
                    balloonElement.style.display = "block";
                    currentVisibleBalloon = balloonElement;
                }
            });

            currentTimeout = setTimeout(() => {
                balloonIds.forEach((id) => {
                    const balloonElement = document.querySelector(id);
                    if (balloonElement) {
                        balloonElement.style.display = "none";
                    }
                });
                showBalloons(index + 1);
            }, time);
        } else {
            // Quando a sequência é concluída, aguarde 40 segundos antes de reiniciar
            currentTimeout = setTimeout(() => {
                hideAllBalloons();
                currentIndex = 0;
                currentVisibleBalloon = null;
                startSequence();
            }, 40000); // 40 segundos
        }
    }

    function startSequence() {
        currentTimeout = setTimeout(() => {
            showBalloons(currentIndex);
        }, 20000); // 20 segundos
    }

    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", function () {
        hideAllBalloons();
        clearTimeout(currentTimeout);
        isPaused = true; // Defina a variável de pausa como verdadeira
    });

    // Inicie a primeira vez
    startSequence();
});
