/* ==========================================
DIDATIK
CONFIGURACOES.JS
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
    updatePassword
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc,
    setDoc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/* ==========================================
INICIALIZAÇÃO
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    iniciarConfiguracoes
);

function iniciarConfiguracoes(){

    carregarUsuario();

    configurarSalvarPerfil();

    configurarAlterarSenha();

    configurarPreferencias();

}

/* ==========================================
CARREGAR USUÁRIO
========================================== */

async function carregarUsuario(){

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

                preencherFormulario(
                    dados
                );

                carregarConfiguracoes(
                    usuario.uid
                );

            }

            catch(erro){

                console.error(
                    erro
                );

            }

        }
    );

}

/* ==========================================
PREENCHER FORMULÁRIO
========================================== */

function preencherFormulario(
    dados
){

    const nome =
    document.getElementById(
        "nome"
    );

    const email =
    document.getElementById(
        "email"
    );

    const escola =
    document.getElementById(
        "escola"
    );

    const disciplina =
    document.getElementById(
        "disciplina"
    );

    if(nome){

        nome.value =
        dados.nome || "";

    }

    if(email){

        email.value =
        dados.email || "";

    }

    if(escola){

        escola.value =
        dados.escola || "";

    }

    if(disciplina){

        disciplina.value =
        dados.disciplina || "";

    }

}

/* ==========================================
SALVAR PERFIL
========================================== */

function configurarSalvarPerfil(){

    const btn =
    document.getElementById(
        "salvarPerfil"
    );

    if(!btn) return;

    btn.addEventListener(
        "click",
        salvarPerfil
    );

}

async function salvarPerfil(){

    const usuario =
    auth.currentUser;

    if(!usuario) return;

    try{

        const nome =
        document.getElementById(
            "nome"
        ).value;

        const escola =
        document.getElementById(
            "escola"
        ).value;

        const disciplina =
        document.getElementById(
            "disciplina"
        ).value;

        await updateDoc(

            doc(
                db,
                "usuarios",
                usuario.uid
            ),

            {

                nome,
                escola,
                disciplina

            }

        );

        alert(
            "Perfil atualizado com sucesso!"
        );

    }

    catch(erro){

        console.error(
            erro
        );

        alert(
            "Erro ao salvar perfil."
        );

    }

}

/* ==========================================
ALTERAR SENHA
========================================== */

function configurarAlterarSenha(){

    const btn =
    document.getElementById(
        "alterarSenha"
    );

    if(!btn) return;

    btn.addEventListener(
        "click",
        alterarSenha
    );

}

async function alterarSenha(){

    const usuario =
    auth.currentUser;

    if(!usuario) return;

    const novaSenha =
    document.getElementById(
        "novaSenha"
    ).value;

    const confirmarSenha =
    document.getElementById(
        "confirmarSenha"
    ).value;

    if(
        novaSenha !==
        confirmarSenha
    ){

        alert(
            "As senhas não coincidem."
        );

        return;

    }

    if(
        novaSenha.length < 6
    ){

        alert(
            "A senha deve ter pelo menos 6 caracteres."
        );

        return;

    }

    try{

        await updatePassword(
            usuario,
            novaSenha
        );

        alert(
            "Senha alterada com sucesso!"
        );

    }

    catch(erro){

        console.error(
            erro
        );

        alert(
            "Faça login novamente para alterar sua senha."
        );

    }

}

/* ==========================================
CONFIGURAÇÕES
========================================== */

function configurarPreferencias(){

    const temaEscuro =
    document.getElementById(
        "temaEscuro"
    );

    const sidebarRecolhida =
    document.getElementById(
        "sidebarRecolhida"
    );

    temaEscuro?.addEventListener(
        "change",
        salvarConfiguracoes
    );

    sidebarRecolhida?.addEventListener(
        "change",
        salvarConfiguracoes
    );

}

async function salvarConfiguracoes(){

    const usuario =
    auth.currentUser;

    if(!usuario) return;

    try{

        await setDoc(

            doc(
                db,
                "configuracoes",
                usuario.uid
            ),

            {

                temaEscuro:
                document.getElementById(
                    "temaEscuro"
                )?.checked || false,

                sidebarRecolhida:
                document.getElementById(
                    "sidebarRecolhida"
                )?.checked || false

            },

            {
                merge:true
            }

        );

    }

    catch(erro){

        console.error(
            erro
        );

    }

}

/* ==========================================
CARREGAR CONFIGURAÇÕES
========================================== */

async function carregarConfiguracoes(
    uid
){

    try{

        const configRef =
        doc(
            db,
            "configuracoes",
            uid
        );

        const configSnap =
        await getDoc(
            configRef
        );

        if(
            !configSnap.exists()
        ) return;

        const config =
        configSnap.data();

        const temaEscuro =
        document.getElementById(
            "temaEscuro"
        );

        const sidebarRecolhida =
        document.getElementById(
            "sidebarRecolhida"
        );

        if(temaEscuro){

            temaEscuro.checked =
            config.temaEscuro ||
            false;

        }

        if(sidebarRecolhida){

            sidebarRecolhida.checked =
            config.sidebarRecolhida ||
            false;

        }

    }

    catch(erro){

        console.error(
            erro
        );

    }

}