/* ==========================================================
   MATEMATICA.JS
========================================================== */

console.log("MATEMATICA.JS CARREGADO");

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

iniciarBusca();
iniciarAreas();

/* ==========================================================
   BUSCA
========================================================== */

function iniciarBusca(){

    const campoBusca =
    document.querySelector(
        ".matematica-page .search-box input"
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
                ".matematica-page .area-card"
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

                }else{

                    card.style.display =
                    "none";

                }

            });

        }
    );

}

/* ==========================================================
   ÁREAS DA MATEMÁTICA
========================================================== */

function iniciarAreas(){

    const areas =
    document.querySelectorAll(
        ".matematica-page .area-card"
    );

    console.log(
        "Áreas encontradas:",
        areas.length
    );

    areas.forEach(area=>{

        area.addEventListener(
            "click",
            ()=>{

                const nome =
                area.dataset.area;

                abrirArea(nome);

            }
        );

    });

}

/* ==========================================================
   ABRIR ÁREA
========================================================== */

function abrirArea(area){

    if(!area) return;

    switch(area){

        case "algebra":

            mostrarMensagem(
                "Álgebra em desenvolvimento."
            );
            break;

        case "geometria":

            mostrarMensagem(
                "Geometria em desenvolvimento."
            );
            break;

        case "funcoes":

            mostrarMensagem(
                "Funções em desenvolvimento."
            );
            break;

        case "estatistica":

            mostrarMensagem(
                "Estatística em desenvolvimento."
            );
            break;

        case "probabilidade":

            mostrarMensagem(
                "Probabilidade em desenvolvimento."
            );
            break;

        case "financeira":

            mostrarMensagem(
                "Matemática Financeira em desenvolvimento."
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