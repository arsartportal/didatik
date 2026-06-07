/* ==========================================
   DIDATIK
   PLANOS.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarPlanos();

});

/* ==========================================
   INICIAR
========================================== */

function iniciarPlanos() {

    configurarScrollSuave();

    configurarBotoesPlanos();

}

/* ==========================================
   SCROLL SUAVE
========================================== */

function configurarScrollSuave() {

    const links =
        document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", (event) => {

            const destino =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!destino) return;

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

/* ==========================================
   BOTÕES DOS PLANOS
========================================== */

function configurarBotoesPlanos() {

    const botoes =
        document.querySelectorAll(".plan-card button");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const plano =
                obterNomePlano(botao);

            selecionarPlano(plano);

        });

    });

}

/* ==========================================
   OBTER PLANO
========================================== */

function obterNomePlano(botao) {

    const card =
        botao.closest(".plan-card");

    if (!card) return "Plano";

    const titulo =
        card.querySelector("h3");

    return titulo
        ? titulo.textContent.trim()
        : "Plano";

}

/* ==========================================
   SELECIONAR PLANO
========================================== */

function selecionarPlano(plano) {

    console.log(
        `Plano selecionado: ${plano}`
    );

    /*
    =======================================
    FUTURO CHECKOUT
    =======================================

    Mercado Pago

    Stripe

    Asaas

    Hotmart

    =======================================
    */

    switch (plano) {

        case "Professor":

            iniciarCheckout(
                "Professor"
            );

            break;

        case "Profissional":

            iniciarCheckout(
                "Profissional"
            );

            break;

        case "Escola":

            abrirComercial();

            break;

        default:

            console.log(
                "Plano não identificado."
            );

    }

}

/* ==========================================
   CHECKOUT
========================================== */

function iniciarCheckout(plano) {

    console.log(
        `Abrindo checkout do plano ${plano}`
    );

    /*
    FUTURO:

    window.location.href =
        "/checkout.html?plano=" + plano;
    */

    alert(
        `Checkout do plano ${plano} será implementado em breve.`
    );

}

/* ==========================================
   COMERCIAL
========================================== */

function abrirComercial() {

    window.open(
        "https://wa.me/5585000000000",
        "_blank"
    );

}

/* ==========================================
   API GLOBAL
========================================== */

window.DidatikPlanos = {

    selecionarPlano,
    iniciarCheckout

};