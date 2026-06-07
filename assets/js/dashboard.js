/* ==========================================
DIDATIK
DASHBOARD.JS
========================================== */

/* ==========================================
FIREBASE
========================================== */

import {
    auth,
    db
}
from "../../firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener(
"DOMContentLoaded",
iniciarDashboard
);

/* ==========================================
INICIALIZAÇÃO
========================================== */

function iniciarDashboard(){

    atualizarSaudacao();

    atualizarData();

    iniciarAnimacoes();

    configurarMenu();

    configurarDisciplinas();

    configurarAulas();

    configurarBotaoContinuar();

    configurarNovidades();

    configurarBusca();

    carregarEstatisticas();

    carregarUsuario();

    configurarLogout();

}

/* ==========================================
SAUDAÇÃO
========================================== */

function atualizarSaudacao(){


const titulo =
document.querySelector(".hero h1");

if(!titulo) return;

const hora =
new Date().getHours();

let texto =
"Bem-vindo à Didatik";

if(hora >= 5 && hora < 12){

    texto =
    "Bom dia, Professor";

}

else if(hora >= 12 && hora < 18){

    texto =
    "Boa tarde, Professor";

}

else{

    texto =
    "Boa noite, Professor";

}

titulo.textContent =
texto;


}

/* ==========================================
DATA
========================================== */

function atualizarData(){


const hero =
document.querySelector(".hero");

if(!hero) return;

const data =
new Date().toLocaleDateString(
    "pt-BR",
    {
        weekday:"long",
        day:"2-digit",
        month:"long",
        year:"numeric"
    }
);

const elemento =
document.createElement("small");

elemento.className =
"dashboard-date";

elemento.textContent =
data;

hero.appendChild(elemento);


}

/* ==========================================
ANIMAÇÕES
========================================== */

function iniciarAnimacoes(){


const elementos =
document.querySelectorAll(`
    .stat-card,
    .continue-card,
    .disciplina-card,
    .aula-card,
    .novidade,
    .plano-card
`);

const observer =
new IntersectionObserver(

    (entries)=>{

        entries.forEach(entry=>{

            if(
                entry.isIntersecting
            ){

                entry.target.classList.add(
                    "show"
                );

            }

        });

    },

    {
        threshold:0.1
    }

);

elementos.forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


}

/* ==========================================
MENU
========================================== */

function configurarMenu(){


const links =
document.querySelectorAll(
    ".menu a"
);

links.forEach(link=>{

    link.addEventListener(
        "click",
        ()=>{

            links.forEach(item=>{

                item.classList.remove(
                    "active"
                );

            });

            link.classList.add(
                "active"
            );

        }
    );

});


}

/* ==========================================
DISCIPLINAS
========================================== */

function configurarDisciplinas(){


const cards =
document.querySelectorAll(
    ".disciplina-card"
);

cards.forEach(card=>{

    card.addEventListener(
        "click",
        ()=>{

            const disciplina =
            card.querySelector("h3")
            ?.textContent;

            console.log(
                "Abrir disciplina:",
                disciplina
            );

        }
    );

});


}

/* ==========================================
AULAS
========================================== */

function configurarAulas(){


const aulas =
document.querySelectorAll(
    ".aula-card"
);

aulas.forEach(card=>{

    card.addEventListener(
        "click",
        ()=>{

            const aula =
            card.querySelector("h3")
            ?.textContent;

            console.log(
                "Abrir aula:",
                aula
            );

        }
    );

});


}

/* ==========================================
CONTINUAR
========================================== */

function configurarBotaoContinuar(){


const btn =
document.querySelector(
    ".continue-card button"
);

if(!btn) return;

btn.addEventListener(
    "click",
    ()=>{

        console.log(
            "Continuar aula"
        );

    }
);

}

/* ==========================================
NOVIDADES
========================================== */

function configurarNovidades(){


const novidades =
document.querySelectorAll(
    ".novidade"
);

novidades.forEach(item=>{

    item.addEventListener(
        "mouseenter",
        ()=>{

            item.style.transform =
            "translateX(6px)";

        }
    );

    item.addEventListener(
        "mouseleave",
        ()=>{

            item.style.transform =
            "";

        }
    );

});


}

/* ==========================================
BUSCA
========================================== */

function configurarBusca(){


const campo =
document.querySelector(
    ".search-box input"
);

if(!campo) return;

campo.addEventListener(
    "keyup",
    (e)=>{

        const termo =
        e.target.value.trim();

        if(
            termo.length >= 3
        ){

            didatik.buscar(
                termo
            );

        }

    }
);


}

/* ==========================================
ESTATÍSTICAS
========================================== */

function carregarEstatisticas(){


const disciplinas =
document.getElementById(
    "totalDisciplinas"
);

const aulas =
document.getElementById(
    "totalAulas"
);

const favoritos =
document.getElementById(
    "totalFavoritos"
);

const acessos =
document.getElementById(
    "totalAcessos"
);

if(disciplinas){

    disciplinas.textContent =
    "2";

}

if(aulas){

    aulas.textContent =
    "145";

}

if(favoritos){

    favoritos.textContent =
    "18";

}

if(acessos){

    acessos.textContent =
    "12.4k";

}


}

/* ==========================================
PARALLAX HERO
========================================== */

const hero =
document.querySelector(".hero");

window.addEventListener(
"mousemove",
(e)=>{


    if(!hero) return;

    const x =
    (window.innerWidth / 2
    - e.clientX) / 120;

    const y =
    (window.innerHeight / 2
    - e.clientY) / 120;

    hero.style.transform =
    `translate(${x}px, ${y}px)`;

}


);

/* ==========================================
API GLOBAL
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

/* ==========================================
FIREBASE
(IMPLEMENTAR NA PRÓXIMA ETAPA)
========================================== */

// importar auth
// importar firestore
// carregar nome do usuário
// carregar plano
// carregar disciplinas
// carregar favoritos
// carregar histórico

/* ==========================================
CARREGAR USUÁRIO
========================================== */

function carregarUsuario(){

    onAuthStateChanged(
        auth,
        async(usuario)=>{

            if(!usuario){

                window.location.href =
                "../index.html";

                return;

            }

            try{

                const usuarioRef =
                doc(
                    db,
                    "usuarios",
                    usuario.uid
                );

                const usuarioSnap =
                await getDoc(
                    usuarioRef
                );

                if(!usuarioSnap.exists()){

                    return;

                }

                const dados =
                usuarioSnap.data();

                preencherUsuario(
                    dados
                );

            }

            catch(erro){

                console.error(
                    "Erro ao carregar usuário:",
                    erro
                );

            }

        }
    );

}

/* ==========================================
PREENCHER DADOS
========================================== */

function preencherUsuario(
    dados
){

    const nomeUsuario =
    document.getElementById(
        "nomeUsuario"
    );

    if(nomeUsuario){

        nomeUsuario.textContent =
        dados.nome ||
        "Professor";

    }

}

/* ==========================================
LOGOUT
========================================== */

function configurarLogout(){

    const btn =
    document.getElementById(
        "logoutBtn"
    );

    if(!btn) return;

    btn.addEventListener(
        "click",
        async()=>{

            try{

                await signOut(auth);

                window.location.href =
                "../index.html";

            }

            catch(erro){

                console.error(
                    "Erro ao sair:",
                    erro
                );

            }

        }
    );

}