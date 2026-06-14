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

    configurarSidebar();

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
CARREGAR PÁGINAS
========================================== */

async function carregarPagina(nomePagina){

    try{

        const resposta =
        await fetch(
            `../pages/${nomePagina}.html`
        );

        if(!resposta.ok){

            throw new Error(
                `Página não encontrada: ${nomePagina}`
            );

        }

        const html =
        await resposta.text();

        const container =
        document.getElementById(
            "page-content"
        );

        if(!container){

            console.error(
                "Container page-content não encontrado."
            );

            return;

        }

        container.innerHTML =
        html;

        carregarAssetsPagina(nomePagina);

        

    }

    catch(erro){

        console.error(
            "Erro ao carregar página:",
            erro
        );

    }

}

function carregarAssetsPagina(nomePagina){

    // CSS
    const cssExistente =
    document.getElementById("pagina-css");

    if(cssExistente){
        cssExistente.remove();
    }

    const link =
    document.createElement("link");

    link.id = "pagina-css";
    link.rel = "stylesheet";
    link.href =
    `../assets/css/${nomePagina}.css`;

    document.head.appendChild(link);

    // JS
    const jsExistente =
    document.getElementById("pagina-js");

    if(jsExistente){
        jsExistente.remove();
    }

    const script =
    document.createElement("script");

    script.id = "pagina-js";
    script.type = "module";
    script.src =
    `../assets/js/${nomePagina}.js`;

    document.body.appendChild(script);

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

    if(
        document.querySelector(
            ".dashboard-date"
        )
    ){
        return;
    }

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
    document.createElement(
        "small"
    );

    elemento.className =
    "dashboard-date";

    elemento.textContent =
    data;

    hero.appendChild(
        elemento
    );

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
            async (e)=>{

                e.preventDefault();

                links.forEach(item=>{

                    item.classList.remove(
                        "active"
                    );

                });

                link.classList.add(
                    "active"
                );

                const pagina =
                link.dataset.page;

                if(
                    pagina &&
                    pagina !== "dashboard"
                ){

                    await carregarPagina(
                        pagina
                    );

                }

                else{

                    window.location.reload();

                }

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
            async ()=>{

                const pagina =
                card.dataset.page;

                if(!pagina) return;

                if(
                    pagina === "fisica" ||
                    pagina === "matematica"
                ){

                    await carregarPagina(
                        pagina
                    );

                }else{

                    alert(
                        "Disciplina disponível em breve."
                    );

                }

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

                if(
                    window.didatik
                ){

                    window.didatik.buscar(
                        termo
                    );

                }

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
SIDEBAR RETRÁTIL
========================================== */

function configurarSidebar(){

    const sidebar =
    document.getElementById(
        "sidebar"
    );

    const toggle =
    document.getElementById(
        "toggleSidebar"
    );

    if(
        !sidebar ||
        !toggle
    ) return;

    const estado =
    localStorage.getItem(
        "sidebar"
    );

    if(
        estado ===
        "collapsed"
    ){

        sidebar.classList.add(
            "collapsed"
        );

        document.body.classList.add(
            "sidebar-collapsed"
        );

    }

    toggle.addEventListener(
        "click",
        ()=>{

            sidebar.classList.toggle(
                "collapsed"
            );

            document.body.classList.toggle(
                "sidebar-collapsed"
            );

            localStorage.setItem(

                "sidebar",

                sidebar.classList.contains(
                    "collapsed"
                )

                ? "collapsed"

                : "expanded"

            );

        }
    );

}

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

window.carregarPagina = carregarPagina;

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