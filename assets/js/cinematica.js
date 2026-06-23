/* ==========================================================
   CINEMATICA.JS
========================================================== */

console.log(
    "CINEMATICA.JS CARREGADO"
);

/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

/* ==========================================================
   VARIÁVEIS GLOBAIS
========================================================== */

let intervalo = null;

let posicaoAtual = 0;

let tempoAtual = 0;

let velocidadeAtual = 10;

let grafico = null;

let dadosTempo = [];

let dadosPosicao = [];

let dadosVelocidade = [];

let tipoGrafico = "st";

iniciarCinematica();

function iniciarCinematica(){

    iniciarSimulador();

    iniciarCalculadora();

    iniciarQuiz();

}

/* ==========================================================
   SIMULADOR
========================================================== */

function iniciarSimulador(){

    const carro =
    document.getElementById(
        "carro"
    );

    const canvas =
    document.getElementById(
        "graficoMovimento"
    );

    const btnPlay =
    document.getElementById(
        "btnPlay"
    );

    const btnPause =
    document.getElementById(
        "btnPause"
    );

    const btnStop =
    document.getElementById(
        "btnStop"
    );

    const btnReset =
    document.getElementById(
        "btnReset"
    );

    const controleVelocidade =
    document.getElementById(
        "controleVelocidade"
    );

    const valorControle =
    document.getElementById(
        "valorControleVelocidade"
    );

    const tipoMovimento =
    document.getElementById(
        "tipoMovimento"
    );

    if(
        !carro ||
        !canvas
    ){
        return;
    }

    /* ==========================================
       GRÁFICO
    ========================================== */

    criarGrafico();

    atualizarSimulador();

    iniciarAbasGrafico();

    /* ==========================================
       BOTÕES
    ========================================== */

    btnPlay?.addEventListener(
        "click",
        iniciarMovimento
    );

    btnPause?.addEventListener(
        "click",
        pausarMovimento
    );

    btnStop?.addEventListener(
        "click",
        pararMovimento
    );

    btnReset?.addEventListener(
        "click",
        resetarMovimento
    );

    /* ==========================================
       CONTROLE DE VELOCIDADE
    ========================================== */

    controleVelocidade?.addEventListener(
        "input",
        ()=>{

            velocidadeAtual =
            Number(
                controleVelocidade.value
            );

            valorControle.textContent =
            velocidadeAtual;

            const velocidade =
            document.getElementById(
                "valorVelocidade"
            );

            if(velocidade){

                velocidade.textContent =
                `${velocidadeAtual} m/s`;

            }

        }
    );

    /* ==========================================
       TIPO DE MOVIMENTO
    ========================================== */

    tipoMovimento?.addEventListener(
        "change",
        ()=>{

            alterarMovimento(
                tipoMovimento.value
            );

        }
    );

}
/* ==========================================================
   CHART.JS
========================================================== */

function criarGrafico(){

    const canvas =
    document.getElementById(
        "graficoMovimento"
    );

    if(!canvas) return;

    if(grafico){

        grafico.destroy();

    }

    grafico =
    new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels:dadosTempo,

                datasets:[

                    {

                        label:"Posição (m)",

                        data:dadosPosicao,

                        borderColor:"#2563eb",

                        backgroundColor:
                        "rgba(37,99,235,.15)",

                        borderWidth:4,

                        fill:true,

                        tension:.4,

                        pointRadius:0,

pointHoverRadius:8,

cubicInterpolationMode:
"monotone",

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{

                    duration:300

                },

                plugins:{

                    legend:{

                        display:true

                    }

                },

                scales:{

                    x:{

                        title:{

                            display:true,

                            text:"Tempo (s)"

                        }

                    },

                    y:{

                        beginAtZero:true

                    }

                }

            }

        }

    );

}

/* ==========================================================
   PLAY
========================================================== */

function iniciarMovimento(){

    if(intervalo) return;

    intervalo = setInterval(()=>{

        posicaoAtual +=
        velocidadeAtual * 0.1;

        tempoAtual += 0.1;

        if(
            posicaoAtual >= 100
        ){

            posicaoAtual = 100;

            pararMovimento();

        }

        atualizarSimulador();

    },100);

}

/* ==========================================================
   PAUSE
========================================================== */

function pausarMovimento(){

    clearInterval(
        intervalo
    );

    intervalo = null;

}

/* ==========================================================
   STOP
========================================================== */

function pararMovimento(){

    clearInterval(
        intervalo
    );

    intervalo = null;

}

/* ==========================================================
   RESET
========================================================== */

function resetarMovimento(){

    pararMovimento();

    posicaoAtual = 0;

    tempoAtual = 0;

    dadosTempo = ["0"];

dadosPosicao = [0];

dadosVelocidade = [velocidadeAtual];

    atualizarSimulador();

    atualizarGrafico();

}

/* ==========================================================
   ATUALIZAÇÃO VISUAL
========================================================== */

function atualizarSimulador(){

    const carro =
    document.getElementById(
        "carro"
    );

    const posicao =
    document.getElementById(
        "valorPosicao"
    );

    const tempo =
    document.getElementById(
        "valorTempo"
    );

    const velocidade =
    document.getElementById(
        "valorVelocidade"
    );

    if(carro){

        carro.style.left =
        `${posicaoAtual * 0.85}%`;

    }

    if(posicao){

        posicao.textContent =
        `${posicaoAtual.toFixed(1)} m`;

    }

    if(tempo){

        tempo.textContent =
        `${tempoAtual.toFixed(1)} s`;

    }

    if(velocidade){

        velocidade.textContent =
        `${velocidadeAtual} m/s`;

    }

    const ultimoTempo =
dadosTempo[
    dadosTempo.length - 1
];

if(
    ultimoTempo !==
    tempoAtual.toFixed(1)
){

    dadosTempo.push(
        tempoAtual.toFixed(1)
    );

    dadosPosicao.push(
        posicaoAtual.toFixed(1)
    );

    dadosVelocidade.push(
        velocidadeAtual
    );

}

if(dadosTempo.length > 60){

    dadosTempo.shift();

    dadosPosicao.shift();

    dadosVelocidade.shift();

}

atualizarGrafico();

}

/* ==========================================================
   ATUALIZAR GRÁFICO
========================================================== */

function atualizarGrafico(){

    if(!grafico) return;

    grafico.data.labels =
    dadosTempo;

    if(tipoGrafico === "st"){

        grafico.data.datasets[0].label =
        "Posição (m)";

        grafico.data.datasets[0].data =
        dadosPosicao;

    }

    if(tipoGrafico === "vt"){

        grafico.data.datasets[0].label =
        "Velocidade (m/s)";

        grafico.data.datasets[0].data =
        dadosVelocidade;

    }

    if(tipoGrafico === "at"){

        grafico.data.datasets[0].label =
        "Aceleração (m/s²)";

        grafico.data.datasets[0].data =
        dadosVelocidade.map(
            ()=>0
        );

    }

    grafico.update();

}

/* ==========================================================
   ABAS DO GRÁFICO
========================================================== */

function iniciarAbasGrafico(){

    const abas =
    document.querySelectorAll(
        ".grafico-tab"
    );

    abas.forEach(aba=>{

        aba.addEventListener(
            "click",
            ()=>{

                abas.forEach(item=>{

                    item.classList.remove(
                        "active"
                    );

                });

                aba.classList.add(
                    "active"
                );

                tipoGrafico =
                aba.dataset.grafico;

                atualizarGrafico();

            }
        );

    });

}

/* ==========================================================
   TIPOS DE MOVIMENTO
========================================================== */

function alterarMovimento(
    tipo
){

    resetarMovimento();

    switch(tipo){

        case "mru":

            velocidadeAtual = 10;

            document.getElementById(
                "carro"
            ).textContent =
            "🚗";

            break;

        case "mruv":

            velocidadeAtual = 5;

            document.getElementById(
                "carro"
            ).textContent =
            "🚗";

            break;

        case "queda":

            velocidadeAtual = 0;

            document.getElementById(
                "carro"
            ).textContent =
            "🍎";

            break;

        case "lancamento":

            velocidadeAtual = 15;

            document.getElementById(
                "carro"
            ).textContent =
            "🏀";

            break;

    }

    document.getElementById(
        "valorControleVelocidade"
    ).textContent =
    velocidadeAtual;

    document.getElementById(
        "valorVelocidade"
    ).textContent =
    `${velocidadeAtual} m/s`;

}



/* ==========================================================
   CALCULADORA MRU
========================================================== */

function iniciarCalculadora(){

    const botao =
    document.getElementById(
        "btnCalcularMRU"
    );

    if(!botao) return;

    botao.addEventListener(
        "click",
        calcularMRU
    );

}

function calcularMRU(){

    const distancia =
    Number(
        document.getElementById(
            "distanciaMRU"
        ).value
    );

    const tempo =
    Number(
        document.getElementById(
            "tempoMRU"
        ).value
    );

    const resultado =
    document.getElementById(
        "resultadoMRU"
    );

    if(
        !distancia ||
        !tempo
    ){

        resultado.innerHTML =
        "Preencha todos os campos.";

        return;

    }

    const velocidade =
    (
        distancia /
        tempo
    ).toFixed(2);

    resultado.innerHTML =

    `
    <strong>Resolução:</strong>

    <br><br>

    v = Δs / Δt

    <br>

    v = ${distancia} / ${tempo}

    <br><br>

    <strong>
        v = ${velocidade} m/s
    </strong>
    `;

}

/* ==========================================================
   QUIZ
========================================================== */

function iniciarQuiz(){

    const alternativas =
    document.querySelectorAll(
        ".alternativa"
    );

    alternativas.forEach(botao=>{

        botao.addEventListener(
            "click",
            ()=>{

                corrigirResposta(
                    botao
                );

            }
        );

    });

}

function corrigirResposta(
    botao
){

    const resultado =
    document.getElementById(
        "resultadoQuiz"
    );

    const correta =
    botao.dataset.correta ===
    "true";

    if(correta){

        resultado.innerHTML =

        `
        ✅ Resposta correta!

        <br><br>

        v = Δs / Δt

        <br>

        v = 120 / 15

        <br>

        v = 8 m/s
        `;

        resultado.style.color =
"#16a34a";

botao.classList.add(
    "correta"
);

    }

    else{

        resultado.innerHTML =

        `
        ❌ Resposta incorreta.

        <br><br>

        Tente novamente.
        `;

        resultado.style.color =
"#dc2626";

botao.classList.add(
    "errada"
);

    }

}