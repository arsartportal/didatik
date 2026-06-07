/* ==========================================
   DIDATIK
   DISCIPLINA.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarAnimacoes();

    animarEstatisticas();

    configurarBusca();

    configurarCategorias();

    configurarAulas();

    configurarFavoritos();

});

/* ==========================================
   ANIMAÇÕES
========================================== */

function iniciarAnimacoes(){

    const elementos = document.querySelectorAll(`
        .stat-card,
        .category-card,
        .aula-card,
        .popular-card
    `);

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:0.1
    });

    elementos.forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

}

/* ==========================================
   CONTADORES
========================================== */

function animarEstatisticas(){

    const numeros =
    document.querySelectorAll(".stat-card h3");

    numeros.forEach(numero => {

        const final =
        parseInt(numero.innerText);

        if(isNaN(final)) return;

        let atual = 0;

        const incremento =
        Math.ceil(final / 50);

        const intervalo =
        setInterval(() => {

            atual += incremento;

            if(atual >= final){

                atual = final;

                clearInterval(intervalo);

            }

            numero.innerText = atual;

        },20);

    });

}

/* ==========================================
   BUSCA
========================================== */

function configurarBusca(){

    const input =
    document.querySelector(".search-box input");

    const aulas =
    document.querySelectorAll(".aula-card");

    if(!input) return;

    input.addEventListener("input", () => {

        const termo =
        input.value.toLowerCase();

        aulas.forEach(aula => {

            const titulo =
            aula.innerText.toLowerCase();

            if(titulo.includes(termo)){

                aula.style.display = "block";

            }else{

                aula.style.display = "none";

            }

        });

    });

}

/* ==========================================
   CATEGORIAS
========================================== */

function configurarCategorias(){

    const categorias =
    document.querySelectorAll(".category-card");

    categorias.forEach(card => {

        card.addEventListener("click", () => {

            const categoria =
            card.querySelector("h3").innerText;

            console.log(
                "Abrir categoria:",
                categoria
            );

            categorias.forEach(c => {

                c.classList.remove("selected");

            });

            card.classList.add("selected");

        });

    });

}

/* ==========================================
   AULAS
========================================== */

function configurarAulas(){

    const aulas =
    document.querySelectorAll(".aula-card");

    aulas.forEach(aula => {

        aula.addEventListener("click", () => {

            const titulo =
            aula.querySelector("h3")?.innerText;

            console.log(
                "Abrir aula:",
                titulo
            );

            // futura navegação

            // window.location.href =
            // `aula.html?id=${titulo}`;

        });

    });

}

/* ==========================================
   FAVORITOS
========================================== */

function configurarFavoritos(){

    const aulas =
    document.querySelectorAll(".aula-card");

    aulas.forEach(aula => {

        const estrela =
        document.createElement("button");

        estrela.classList.add("favorite-btn");

        estrela.innerHTML = "☆";

        aula.appendChild(estrela);

        estrela.addEventListener("click", e => {

            e.stopPropagation();

            estrela.classList.toggle("active");

            estrela.innerHTML =
            estrela.classList.contains("active")
            ? "★"
            : "☆";

        });

    });

}

/* ==========================================
   POPULARES
========================================== */

document
.querySelectorAll(".popular-card")
.forEach(card => {

    card.addEventListener("click", () => {

        console.log(
            "Abrir conteúdo popular:",
            card.innerText
        );

    });

});

/* ==========================================
   API DIDATIK
========================================== */

window.didatik = {

    abrirDisciplina(nome){

        console.log(
            "Disciplina:",
            nome
        );

    },

    abrirCategoria(nome){

        console.log(
            "Categoria:",
            nome
        );

    },

    abrirAula(nome){

        console.log(
            "Aula:",
            nome
        );

    },

    buscar(termo){

        console.log(
            "Buscar:",
            termo
        );

    }

};