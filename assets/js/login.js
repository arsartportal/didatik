/* ==========================================
DIDATIK
LOGIN.JS
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

/* ==========================================
INICIAR
========================================== */

function iniciarLogin() {

```
configurarFormulario();

configurarGoogle();
```

}

/* ==========================================
FORMULÁRIO
========================================== */

function configurarFormulario() {

```
if (!formLogin) return;

formLogin.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        const senha =
            senhaInput.value.trim();

        if (!validarFormulario(email, senha)) {
            return;
        }

        await realizarLogin(
            email,
            senha
        );

    }
);
```

}

/* ==========================================
VALIDAÇÃO
========================================== */

function validarFormulario(email, senha) {

```
if (!email) {

    emailInput.focus();

    return false;
}

if (!senha) {

    senhaInput.focus();

    return false;
}

return true;
```

}

/* ==========================================
LOGIN
========================================== */

async function realizarLogin(email, senha) {

```
try {

    ativarLoading();

    console.log("Tentativa de login");

    console.log({
        email
    });

    /*
    =======================================
    FIREBASE AUTH
    =======================================

    import {
        signInWithEmailAndPassword
    } from "firebase-auth";

    await signInWithEmailAndPassword(
        auth,
        email,
        senha
    );

    =======================================
    */

    await simularLogin();

    redirecionarDashboard();

}

catch (erro) {

    console.error(
        "Erro ao autenticar:",
        erro
    );

    desativarLoading();

}
```

}

/* ==========================================
LOGIN GOOGLE
========================================== */

function configurarGoogle() {

```
if (!googleBtn) return;

googleBtn.addEventListener(
    "click",
    async () => {

        try {

            console.log(
                "Login Google"
            );

            /*
            FUTURO:

            const provider =
                new GoogleAuthProvider();

            await signInWithPopup(
                auth,
                provider
            );
            */

        }

        catch (erro) {

            console.error(erro);

        }

    }
);
```

}

/* ==========================================
LOADING
========================================== */

function ativarLoading() {

```
if (!btnLogin) return;

btnLogin.disabled = true;

btnLogin.textContent =
    "Entrando...";
```

}

function desativarLoading() {

```
if (!btnLogin) return;

btnLogin.disabled = false;

btnLogin.textContent =
    "Entrar";
```

}

/* ==========================================
SIMULAÇÃO TEMPORÁRIA
========================================== */

function simularLogin() {

```
return new Promise((resolve) => {

    setTimeout(() => {

        resolve();

    }, 1200);

});
```

}

/* ==========================================
REDIRECIONAMENTO
========================================== */

function redirecionarDashboard() {


window.location.href =
    "dashboard.html";


}

/* ==========================================
API PÚBLICA
========================================== */

window.DidatikLogin = {


realizarLogin,
redirecionarDashboard


};
