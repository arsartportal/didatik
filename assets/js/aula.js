document.addEventListener("DOMContentLoaded", () => {
    iniciarAula();
});

const tituloAula =
    document.getElementById("tituloAula");

const subtituloAula =
    document.getElementById("subtituloAula");

const nomeConteudo =
    document.getElementById("nomeConteudo");

const descricaoConteudo =
    document.getElementById("descricaoConteudo");

const progressoBar =
    document.querySelector(".progress-fill");

const progressoTexto =
    document.querySelector(".progress-info strong");

const btnIniciar =
    document.getElementById("btnIniciar");

function iniciarAula() {

    const parametros =
        new URLSearchParams(window.location.search);

    const id =
        parametros.get("id") || "forca";

    carregarAula(id);

    configurarQuiz();
}

function carregarAula(id) {

    // futuramente virá do Firebase
    const aula = {
        titulo: "Força e Movimento",
        descricao: "Entenda como as forças atuam nos corpos.",
        disciplina: "Física",
        progresso: 35
    };

    tituloAula.textContent =
        aula.disciplina;

    subtituloAula.textContent =
        "Material Didático";

    nomeConteudo.textContent =
        aula.titulo;

    descricaoConteudo.textContent =
        aula.descricao;

    atualizarProgresso(aula.progresso);
}

function atualizarProgresso(valor) {

    progressoBar.style.width =
        `${valor}%`;

    progressoTexto.textContent =
        `${valor}%`;
}

btnIniciar?.addEventListener(
    "click",
    () => {

        document
            .querySelector(".content-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

function configurarQuiz() {

    const respostas =
        document.querySelectorAll(".answer-btn");

    respostas.forEach((botao, indice) => {

        botao.addEventListener(
            "click",
            () => verificarResposta(botao, indice)
        );

    });
}

function verificarResposta(botao, indice) {

    const correta = 1;

    const respostas =
        document.querySelectorAll(".answer-btn");

    respostas.forEach(btn => {
        btn.disabled = true;
    });

    if (indice === correta) {

        botao.classList.add("correta");

    } else {

        botao.classList.add("errada");

        respostas[correta]
            .classList.add("correta");
    }
}

function concluirAula() {

    console.log("Aula concluída");

    /*
      Firebase:

      salvar progresso
      marcar aula concluída
      liberar próxima aula
    */
}

window.DidatikAula = {
    concluirAula,
    atualizarProgresso
};