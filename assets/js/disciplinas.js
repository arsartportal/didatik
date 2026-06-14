    /* ==========================================================
DISCIPLINAS.JS
========================================================== */

console.log("DISCIPLINAS.JS CARREGADO");

iniciarBusca();
iniciarCards();

  

    /* ==========================================================
    BUSCA DE DISCIPLINAS
    ========================================================== */

    function iniciarBusca(){

        const campoBusca =
            document.getElementById("buscarDisciplina");

        if(!campoBusca) return;

        campoBusca.addEventListener("input", () => {

            const texto =
                campoBusca.value.toLowerCase();

            const cards =
                document.querySelectorAll(".disciplina-card");

            cards.forEach(card => {

                const nome =
                    card.querySelector("h3")
                    .textContent
                    .toLowerCase();

                if(nome.includes(texto)){

                    card.style.display = "block";

                }else{

                    card.style.display = "none";

                }

            });

        });

    }

    /* ==========================================================
    EVENTOS DOS CARDS
    ========================================================== */

    function iniciarCards(){

    const cards =
        document.querySelectorAll(".disciplina-card");

    console.log("Cards encontrados:", cards.length);

    cards.forEach(card => {

        card.addEventListener("click", () => {

            console.log("CARD CLICADO");

            const pagina =
                card.dataset.page;

            console.log("Página:", pagina);

            abrirDisciplina(pagina);

        });

    });

}



    /* ==========================================================
   ABRIR DISCIPLINA
========================================================== */

function abrirDisciplina(pagina){

    if(!pagina) return;

    switch(pagina){

        case "fisica":

            console.log("CLICOU EM FÍSICA");

            window.carregarPagina("fisica");

            break;

        case "matematica":

            console.log("CLICOU EM MATEMÁTICA");

            window.carregarPagina("matematica");

            break;

        
    }

}


    /* ==========================================================
    FEEDBACK TEMPORÁRIO
    ========================================================== */

    function mostrarMensagem(texto){

        alert(texto);

    }