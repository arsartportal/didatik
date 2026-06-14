/* ==========================================================
   FISICA.JS
========================================================== */

console.log("FISICA.JS CARREGADO");

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
        ".fisica-page .search-box input"
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
                ".fisica-page .area-card"
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
   ÁREAS DA FÍSICA
========================================================== */

function iniciarAreas(){

    const areas =
    document.querySelectorAll(
        ".fisica-page .area-card"
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

        case "mecanica":

            mostrarMensagem(
                "Mecânica em desenvolvimento."
            );
            break;

        case "termologia":

            mostrarMensagem(
                "Termologia em desenvolvimento."
            );
            break;

        case "optica":

            mostrarMensagem(
                "Óptica em desenvolvimento."
            );
            break;

        case "eletricidade":

            mostrarMensagem(
                "Eletricidade em desenvolvimento."
            );
            break;

        case "ondulatoria":

            mostrarMensagem(
                "Ondulatória em desenvolvimento."
            );
            break;

        case "moderna":

            mostrarMensagem(
                "Física Moderna em desenvolvimento."
            );
            break;

        case "astronomia":

            mostrarMensagem(
                "Astronomia em desenvolvimento."
            );
            break;

        case "laboratorio":

            mostrarMensagem(
                "Laboratório Virtual em desenvolvimento."
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