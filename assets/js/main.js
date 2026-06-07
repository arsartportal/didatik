/* =========================================
   DIDATIK
   MAIN.JS
========================================= */

/* =========================================
   NAVBAR SCROLL
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 30){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/* =========================================
   ANIMAÇÕES AO ROLAR
========================================= */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
`
.card,
.feature,
.step,
.stat,
.dashboard-window
`
).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

/* =========================================
   CONTADORES
========================================= */

const counters =
document.querySelectorAll(
".stat h3"
);

const animateCounter = (counter)=>{

    const text =
    counter.innerText;

    const final =
    parseInt(text.replace(/\D/g,""));

    if(!final) return;

    let current = 0;

    const increment =
    final / 60;

    const update = ()=>{

        current += increment;

        if(current < final){

            counter.innerText =
            Math.floor(current) +
            text.replace(/[0-9]/g,'');

            requestAnimationFrame(update);

        }else{

            counter.innerText = text;

        }

    }

    update();

};

const counterObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(
                entry.target
            );

            counterObserver.unobserve(
                entry.target
            );

        }

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/* =========================================
   PARALLAX HERO
========================================= */

const dashboard =
document.querySelector(
".dashboard-window"
);

window.addEventListener("mousemove",(e)=>{

    if(!dashboard) return;

    const x =
    (window.innerWidth / 2 - e.clientX)
    / 60;

    const y =
    (window.innerHeight / 2 - e.clientY)
    / 60;

    dashboard.style.transform =
    `
    perspective(2000px)
    rotateX(${y}deg)
    rotateY(${-x}deg)
    `;
});

/* =========================================
   BOTÕES
========================================= */

document
.querySelectorAll(
".btn-primary"
)
.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform =
        "translateY(-3px) scale(1.02)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform =
        "";

    });

});

/* =========================================
   SCROLL LINKS
========================================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener(
    "click",
    function(e){

        const target =
        document.querySelector(
        this.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    });

});