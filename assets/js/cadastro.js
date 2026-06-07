/* ==========================================
DIDATIK
CADASTRO.JS

Funções:
✓ Criar usuário no Firebase Authentication
✓ Atualizar nome de exibição
✓ Criar documento em usuarios
✓ Criar documento em assinaturas
✓ Redirecionar para login
========================================== */

import { auth, db } from "../../firebase/firebase-config.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/* ==========================================
ELEMENTOS DA PÁGINA
========================================== */

const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");
const botao = document.querySelector(".btn-cadastrar");

/* ==========================================
CADASTRO
========================================== */

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  /* ==========================================
  CAPTURA DOS DADOS
  ========================================== */

  const nome = document
    .getElementById("nome")
    .value
    .trim();

  const email = document
    .getElementById("email")
    .value
    .trim()
    .toLowerCase();

  const senha = document
    .getElementById("senha")
    .value;

  const confirmarSenha = document
    .getElementById("confirmarSenha")
    .value;

  /* ==========================================
  VALIDAÇÃO DE SENHAS
  ========================================== */

  if (senha !== confirmarSenha) {

    mensagem.style.color = "#ef4444";
    mensagem.textContent = "As senhas não coincidem.";

    return;
  }

  try {

    /* ==========================================
    ESTADO DE CARREGAMENTO
    ========================================== */

    botao.disabled = true;
    botao.textContent = "Criando conta...";

    mensagem.style.color = "#64748b";
    mensagem.textContent = "Aguarde...";

    /* ==========================================
    CRIA USUÁRIO NO AUTHENTICATION
    ========================================== */

    const credencial =
      await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

    const usuario = credencial.user;
    const uid = usuario.uid;

    /* ==========================================
    ATUALIZA NOME DO PERFIL
    ========================================== */

    await updateProfile(
      usuario,
      {
        displayName: nome
      }
    );

    /* ==========================================
    COLEÇÃO: usuarios
    ========================================== */

    await setDoc(
      doc(db, "usuarios", uid),
      {

        uid,

        nome,

        email,

        plano: "free",

        status: "ativo",

        criadoEm: serverTimestamp(),

        ultimoLogin: serverTimestamp()

      }
    );

    /* ==========================================
    COLEÇÃO: assinaturas
    ========================================== */

    await setDoc(
      doc(db, "assinaturas", uid),
      {

        uid,

        ativa: false,

        tipo: "free",

        inicio: null,

        fim: null,

        valor: 0,

        renovacaoAutomatica: false

      }
    );

    /* ==========================================
    SUCESSO
    ========================================== */

    mensagem.style.color = "#22c55e";
    mensagem.textContent = "Conta criada com sucesso!";

    botao.textContent = "Conta criada ✓";

    /* ==========================================
    REDIRECIONAMENTO
    ========================================== */

    setTimeout(() => {

      window.location.href = "login.html";

    }, 2000);

  }
  catch (error) {

    console.error(error);

    /* ==========================================
    RESTAURA BOTÃO
    ========================================== */

    botao.disabled = false;
    botao.textContent = "Criar Conta";

    mensagem.style.color = "#ef4444";

    /* ==========================================
    TRATAMENTO DE ERROS FIREBASE
    ========================================== */

    switch (error.code) {

      case "auth/email-already-in-use":

        mensagem.textContent =
          "Este e-mail já está cadastrado.";

        break;

      case "auth/invalid-email":

        mensagem.textContent =
          "E-mail inválido.";

        break;

      case "auth/weak-password":

        mensagem.textContent =
          "A senha deve possuir pelo menos 6 caracteres.";

        break;

      case "auth/network-request-failed":

        mensagem.textContent =
          "Sem conexão com a internet.";

        break;

      default:

        mensagem.textContent =
          "Erro ao criar conta. Tente novamente.";

    }

  }

});