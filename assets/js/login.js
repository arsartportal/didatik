/* ==========================================
DIDATIK
LOGIN.JS

Funções:
✓ Login com Firebase
✓ Validação de formulário
✓ Loading
✓ Login com Google (estrutura pronta)
✓ Redirecionamento para Dashboard
========================================== */

import { auth } from "../../firebase/firebase-config.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

/* ==========================================
INICIALIZAÇÃO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  iniciarLogin();

});

/* ==========================================
ELEMENTOS
========================================== */

const formLogin =
document.getElementById("loginForm");

const emailInput =
document.getElementById("email");

const senhaInput =
document.getElementById("senha");

const googleBtn =
document.getElementById("googleLogin");

const btnLogin =
document.querySelector(".btn-login");

const mensagem =
document.getElementById("mensagem");

/* ==========================================
INICIAR
========================================== */

function iniciarLogin() {

  configurarFormulario();

  configurarGoogle();

}

/* ==========================================
FORMULÁRIO
========================================== */

function configurarFormulario() {

  if (!formLogin) return;

  formLogin.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const email =
        emailInput.value.trim();

      const senha =
        senhaInput.value;

      if (!validarFormulario(email, senha)) {
        return;
      }

      await realizarLogin(
        email,
        senha
      );

    }
  );

}

/* ==========================================
VALIDAÇÃO
========================================== */

function validarFormulario(email, senha) {

  if (!email) {

    mostrarMensagem(
      "Informe seu e-mail.",
      "erro"
    );

    emailInput.focus();

    return false;
  }

  if (!senha) {

    mostrarMensagem(
      "Informe sua senha.",
      "erro"
    );

    senhaInput.focus();

    return false;
  }

  return true;

}

/* ==========================================
LOGIN FIREBASE
========================================== */

async function realizarLogin(
  email,
  senha
) {

  try {

    ativarLoading();

    await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    mostrarMensagem(
      "Login realizado com sucesso!",
      "sucesso"
    );

    setTimeout(() => {

      redirecionarDashboard();

    }, 1000);

  }

  catch (erro) {

    console.error(erro);

    desativarLoading();

    switch (erro.code) {

      case "auth/user-not-found":

        mostrarMensagem(
          "Usuário não encontrado.",
          "erro"
        );

        break;

      case "auth/wrong-password":

        mostrarMensagem(
          "Senha incorreta.",
          "erro"
        );

        break;

      case "auth/invalid-credential":

        mostrarMensagem(
          "E-mail ou senha inválidos.",
          "erro"
        );

        break;

      case "auth/invalid-email":

        mostrarMensagem(
          "E-mail inválido.",
          "erro"
        );

        break;

      default:

        mostrarMensagem(
          "Erro ao realizar login.",
          "erro"
        );

    }

  }

}

/* ==========================================
LOGIN COM GOOGLE
========================================== */

function configurarGoogle() {

  if (!googleBtn) return;

  googleBtn.addEventListener(
    "click",
    async () => {

      try {

        const provider =
          new GoogleAuthProvider();

        await signInWithPopup(
          auth,
          provider
        );

        redirecionarDashboard();

      }

      catch (erro) {

        console.error(erro);

      }

    }
  );

}

/* ==========================================
LOADING
========================================== */

function ativarLoading() {

  if (!btnLogin) return;

  btnLogin.disabled = true;

  btnLogin.textContent =
    "Entrando...";

}

function desativarLoading() {

  if (!btnLogin) return;

  btnLogin.disabled = false;

  btnLogin.textContent =
    "Entrar";

}

/* ==========================================
MENSAGENS
========================================== */

function mostrarMensagem(
  texto,
  tipo
) {

  if (!mensagem) return;

  mensagem.textContent = texto;

  mensagem.style.color =
    tipo === "erro"
      ? "#ef4444"
      : "#22c55e";

}

/* ==========================================
REDIRECIONAMENTO
========================================== */

function redirecionarDashboard() {

  window.location.href =
    "dashboard.html";

}

/* ==========================================
API GLOBAL
========================================== */

window.DidatikLogin = {

  realizarLogin,

  redirecionarDashboard

};