/* ==========================================================
   MECANICA.JS
========================================================== */

console.log("MECANICA.JS CARREGADO");

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

iniciarBusca();
iniciarModulos();

/* ==========================================================
   BUSCA
========================================================== */

function iniciarBusca(){

    const campoBusca =
    document.querySelector(
        ".mecanica-page .search-box input"
    );

    if(!campoBusca) return;

    campoBusca.addEventListener(
        "input",
        ()=>{

            const texto =
            campoBusca.value
            .toLowerCase()
            .trim();

            const cards =
            document.querySelectorAll(
                ".mecanica-page .area-card"
            );

            cards.forEach(card=>{

                const titulo =
                card.querySelector("h3")
                .textContent
                .toLowerCase();

                if(
                    titulo.includes(texto)
                ){

                    card.style.display =
                    "block";

                }

                else{

                    card.style.display =
                    "none";

                }

            });

        }
    );

}

/* ==========================================================
   MÓDULOS DA MECÂNICA
========================================================== */

function iniciarModulos(){

    const modulos =
    document.querySelectorAll(
        ".mecanica-page .area-card"
    );

    console.log(
        "Módulos encontrados:",
        modulos.length
    );

    modulos.forEach(modulo=>{

        modulo.addEventListener(
            "click",
            ()=>{

                const nome =
                modulo.dataset.modulo;

                abrirModulo(nome);

            }
        );

    });

}

/* ==========================================================
   ABRIR MÓDULO
========================================================== */

function abrirModulo(modulo){

    if(!modulo) return;

    switch(modulo){

        case "cinematica":

    carregarPagina(
        "cinematica"
    );

    break;


        case "newton":

            mostrarMensagem(
                "Leis de Newton em desenvolvimento."
            );

            break;

        case "energia":

            mostrarMensagem(
                "Trabalho e Energia em desenvolvimento."
            );

            break;

        case "impulso":

            mostrarMensagem(
                "Impulso e Quantidade de Movimento em desenvolvimento."
            );

            break;

        case "gravitacao":

            mostrarMensagem(
                "Gravitação Universal em desenvolvimento."
            );

            break;

        case "hidrostatica":

            mostrarMensagem(
                "Hidrostática em desenvolvimento."
            );

            break;

        default:

            mostrarMensagem(
                "Conteúdo não encontrado."
            );

            break;

    }

}

/* ==========================================================
   FEEDBACK
========================================================== */

function mostrarMensagem(texto){

    alert(texto);

}