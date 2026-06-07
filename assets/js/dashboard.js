/* ==========================================
   DIDATIK DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarAnimacoes();

    atualizarSaudacao();

    atualizarData();

});

/* ==========================================
   ANIMAÇÕES
========================================== */

function iniciarAnimacoes(){

    const elementos = document.querySelectorAll(`
        .continue-card,
        .disciplina-card,
        .aula-card,
        .novidade
    `);

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.1

    });

    elementos.forEach(el=>{

        el.classList.add("hidden");

        observer.observe(el);

    });

}

/* ==========================================
   SAUDAÇÃO
========================================== */

function atualizarSaudacao(){

    const heroTitulo =
    document.querySelector(".hero h1");

    if(!heroTitulo) return;

    const hora =
    new Date().getHours();

    let saudacao =
    "Bem-vindo à Didatik";

    if(hora >= 5 && hora < 12){

        saudacao =
        "Bom dia, Professor";

    }

    else if(hora >= 12 && hora < 18){

        saudacao =
        "Boa tarde, Professor";

    }

    else{

        saudacao =
        "Boa noite, Professor";

    }

    heroTitulo.textContent =
    saudacao;

}

/* ==========================================
   DATA
========================================== */

function atualizarData(){

    const hero =
    document.querySelector(".hero");

    if(!hero) return;

    const hoje =
    new Date();

    const data =
    hoje.toLocaleDateString(
        "pt-BR",
        {
            weekday:"long",
            day:"2-digit",
            month:"long"
        }
    );

    const p =
    document.createElement("small");

    p.className =
    "dashboard-date";

    p.textContent =
    data;

    hero.appendChild(p);

}

/* ==========================================
   DISCIPLINAS
========================================== */

document
.querySelectorAll(".disciplina-card")
.forEach(card=>{

    card.addEventListener("click",()=>{

        const disciplina =
        card.querySelector("h3")
        ?.innerText;

        console.log(
            "Abrir disciplina:",
            disciplina
        );

        // futura navegação

        // window.location.href =
        // `disciplina.html?id=${disciplina}`;

    });

});

/* ==========================================
   AULAS
========================================== */

document
.querySelectorAll(".aula-card")
.forEach(card=>{

    card.addEventListener("click",()=>{

        const aula =
        card.querySelector("h3")
        ?.innerText;

        console.log(
            "Abrir aula:",
            aula
        );

        // futura navegação

    });

});

/* ==========================================
   BOTÃO CONTINUAR
========================================== */

const btnContinuar =
document.querySelector(
".continue-card button"
);

if(btnContinuar){

    btnContinuar.addEventListener(
    "click",
    ()=>{

        console.log(
            "Continuar aula"
        );

        // futura navegação

    });

}

/* ==========================================
   EFEITO PARALLAX LEVE
========================================== */

const hero =
document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

    if(!hero) return;

    const x =
    (window.innerWidth / 2 - e.clientX)
    / 100;

    const y =
    (window.innerHeight / 2 - e.clientY)
    / 100;

    hero.style.transform =
    `
    translate(
        ${x}px,
        ${y}px
    )
    `;

});

/* ==========================================
   MENU ATIVO
========================================== */

const menuLinks =
document.querySelectorAll(
".sidebar nav a"
);

menuLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        menuLinks.forEach(item=>{

            item.classList.remove(
                "active"
            );

        });

        link.classList.add(
            "active"
        );

    });

});

/* ==========================================
   NOVIDADES
========================================== */

document
.querySelectorAll(".novidade")
.forEach(item=>{

    item.addEventListener(
    "mouseenter",
    ()=>{

        item.style.transform =
        "translateX(6px)";

    });

    item.addEventListener(
    "mouseleave",
    ()=>{

        item.style.transform =
        "";

    });

});

/* ==========================================
   FUTURO SISTEMA DE BUSCA
========================================== */

window.didatik = {

    buscar(termo){

        console.log(
            "Buscar:",
            termo
        );

    },

    abrirAula(id){

        console.log(
            "Abrir aula:",
            id
        );

    },

    abrirDisciplina(id){

        console.log(
            "Abrir disciplina:",
            id
        );

    }

};