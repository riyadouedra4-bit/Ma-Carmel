/* =========================================================
   CARMEL ❤️ — TU ME MANQUES
   Script principal
========================================================= */


/* =========================================================
   1. ÉTOILES
========================================================= */

const starsContainer = document.getElementById("stars");

if (starsContainer) {

  for (let i = 0; i < 100; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    const size = Math.random() * 2 + 1;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.animationDelay =
      `${Math.random() * 3}s`;

    star.style.animationDuration =
      `${2 + Math.random() * 3}s`;

    starsContainer.appendChild(star);
  }

}


/* =========================================================
   2. NAVIGATION ENTRE LES ÉCRANS
========================================================= */

function nextScreen(number) {

  const screens =
    document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target =
    document.getElementById(`screen${number}`);

  if (target) {

    target.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

}


/* =========================================================
   3. OUVERTURE DE L'ENVELOPPE
========================================================= */

let envelopeOpened = false;

function openEnvelope() {

  if (envelopeOpened) {
    return;
  }

  envelopeOpened = true;

  const envelope =
    document.getElementById("envelope");

  if (envelope) {
    envelope.classList.add("open");
  }

  /*
    On laisse le temps à l'animation
    de l'enveloppe de se terminer.
  */

  setTimeout(() => {

    nextScreen(3);

    startMessageSequence();

  }, 1700);

}


/* =========================================================
   4. MESSAGE D'INTRODUCTION ANIMÉ
========================================================= */

function startMessageSequence() {

  const messages =
    document.querySelectorAll(".fade-message");

  if (!messages.length) {
    return;
  }

  /*
    On cache tous les messages
    avant de commencer.
  */

  messages.forEach(message => {
    message.classList.add("hidden");
  });

  let index = 0;


  function showNextMessage() {

    if (index >= messages.length) {

      /*
        Une fois tous les messages affichés,
        on passe au compteur.
      */

      setTimeout(() => {

        nextScreen(4);

      }, 1200);

      return;
    }


    const currentMessage =
      messages[index];

    currentMessage.classList.remove("hidden");

    /*
      On recommence l'animation
      si elle a déjà été jouée.
    */

    currentMessage.style.animation = "none";

    void currentMessage.offsetWidth;

    currentMessage.style.animation =
      "messageIn 1.2s ease forwards";

    index++;

    /*
      Temps entre chaque phrase.
    */

    setTimeout(
      showNextMessage,
      2300
    );

  }


  showNextMessage();

}


/* =========================================================
   5. COMPTEUR DEPUIS LA DERNIÈRE RENCONTRE
=========================================================

   Dernière fois où Riyad et Carmel se sont vus :

   📅 18 août 2026
   🕓 16h00

========================================================= */

const startDate =
  new Date("2026-08-18T16:00:00");


function updateCounter() {

  const now =
    new Date();

  let difference =
    now.getTime() -
    startDate.getTime();


  /*
    Protection au cas où la date
    serait dans le futur.
  */

  if (difference < 0) {
    difference = 0;
  }


  /*
    Conversion en différentes unités.
  */

  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const totalMinutes =
    Math.floor(
      totalSeconds / 60
    );


  const totalHours =
    Math.floor(
      totalMinutes / 60
    );


  const days =
    Math.floor(
      totalHours / 24
    );


  /*
    Mise à jour des éléments
    présents dans index.html.
  */

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");


  if (daysElement) {

    daysElement.textContent =
      days.toLocaleString("fr-FR");

  }


  if (hoursElement) {

    hoursElement.textContent =
      totalHours.toLocaleString("fr-FR");

  }


  if (minutesElement) {

    minutesElement.textContent =
      totalMinutes.toLocaleString("fr-FR");

  }

}


/*
  Première mise à jour immédiate.
*/

updateCounter();


/*
  Le compteur se met à jour
  chaque seconde.
*/

setInterval(
  updateCounter,
  1000
);


/* =========================================================
   6. QUESTION :
      "QU'EST-CE QUI TE MANQUE LE PLUS ?"
========================================================= */

function answer(button) {

  const message =
    document.getElementById(
      "answer-message"
    );


  const buttons =
    document.querySelectorAll(
      ".choices button"
    );


  /*
    On désactive visuellement
    les autres réponses.
  */

  buttons.forEach(btn => {

    btn.style.opacity = "0.35";

    btn.style.pointerEvents =
      "none";

  });


  if (button) {

    button.style.opacity = "1";

    button.style.transform =
      "scale(1.03)";

  }


  if (!message) {
    return;
  }


  message.style.opacity = "0";


  setTimeout(() => {

    message.innerHTML = `
      Mauvaise réponse. 😌
      <br><br>
      C'est toi qui me manques.
      Pas seulement ton sourire,
      pas seulement ta voix...
      <strong>toi, entièrement. ❤️</strong>
    `;


    message.style.transition =
      "opacity 0.8s ease";


    message.style.opacity = "1";


    /*
      Après quelques secondes,
      on continue l'histoire.
    */

    setTimeout(() => {

      nextScreen(6);

    }, 4300);

  }, 500);

}


/* =========================================================
   7. QUESTION FINALE
========================================================= */

function showFinalQuestion() {

  nextScreen(9);

}


/* =========================================================
   8. RÉPONSE FINALE
========================================================= */

function finalAnswer() {

  nextScreen(10);

  createHearts();

}


/* =========================================================
   9. CŒURS FLOTTANTS ❤️
========================================================= */

function createHearts() {

  const container =
    document.querySelector(
      ".floating-hearts"
    );


  if (!container) {
    return;
  }


  /*
    Nombre de cœurs.
  */

  const numberOfHearts = 30;


  for (
    let i = 0;
    i < numberOfHearts;
    i++
  ) {

    const heart =
      document.createElement("span");


    /*
      Plusieurs symboles possibles
      pour éviter que tout soit identique.
    */

    const symbols = [
      "❤️",
      "♡",
      "💕",
      "♥"
    ];


    heart.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    heart.style.position =
      "fixed";


    heart.style.left =
      `${Math.random() * 100}vw`;


    heart.style.bottom =
      "-40px";


    heart.style.fontSize =
      `${12 + Math.random() * 18}px`;


    heart.style.opacity =
      `${0.4 + Math.random() * 0.6}`;


    heart.style.pointerEvents =
      "none";


    heart.style.zIndex =
      "999";


    /*
      Durée aléatoire.
    */

    const duration =
      4 + Math.random() * 5;


    heart.style.animation =
      `floatHeart ${duration}s linear forwards`;


    /*
      Départ légèrement décalé
      pour rendre l'animation naturelle.
    */

    heart.style.animationDelay =
      `${Math.random() * 2}s`;


    container.appendChild(heart);


    /*
      Suppression du cœur après
      la fin de son animation.
    */

    setTimeout(() => {

      heart.remove();

    }, (duration + 2) * 1000);

  }

}


/* =========================================================
   10. ANIMATION DES CŒURS
========================================================= */

const heartAnimationStyle =
  document.createElement("style");


heartAnimationStyle.innerHTML = `

@keyframes floatHeart {

  0% {

    transform:
      translateY(0)
      rotate(0deg)
      scale(0.8);

    opacity: 0;

  }


  10% {

    opacity: 1;

  }


  50% {

    transform:
      translateY(-55vh)
      rotate(180deg)
      scale(1);

  }


  100% {

    transform:
      translateY(-115vh)
      rotate(360deg)
      scale(1.2);

    opacity: 0;

  }

}

`;


document.head.appendChild(
  heartAnimationStyle
);


/* =========================================================
   11. MUSIQUE
========================================================= */

const music =
  document.getElementById("music");


/*
  La musique ne peut généralement pas
  démarrer automatiquement sur téléphone.

  On essaie donc de la lancer après
  la première interaction de Carmel.
*/

let musicStarted = false;


function startMusic() {

  if (
    !music ||
    musicStarted
  ) {
    return;
  }


  /*
    Vérifie qu'une source musicale
    existe réellement.
  */

  if (
    !music.src &&
    !music.querySelector("source")
  ) {
    return;
  }


  music.volume = 0.35;


  const playPromise =
    music.play();


  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        musicStarted = true;

      })
      .catch(() => {

        /*
          Le navigateur peut bloquer
          la lecture automatique.
          Rien de grave.
        */

      });

  }

}


/*
  Premier clic / toucher.
*/

document.addEventListener(
  "click",
  startMusic,
  { once: true }
);


/* =========================================================
   12. TOUCHER SUR MOBILE
========================================================= */

document.addEventListener(
  "touchstart",
  startMusic,
  {
    once: true,
    passive: true
  }
);


/* =========================================================
   13. EMPÊCHER CERTAINS COMPORTEMENTS
      SUR MOBILE
========================================================= */

document.addEventListener(
  "gesturestart",
  function (event) {

    event.preventDefault();

  }
);


/* =========================================================
   14. INITIALISATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
      On s'assure que le premier écran
      est bien affiché.
    */

    const firstScreen =
      document.getElementById(
        "screen1"
      );


    if (firstScreen) {

      document
        .querySelectorAll(".screen")
        .forEach(screen => {

          screen.classList.remove(
            "active"
          );

        });


      firstScreen.classList.add(
        "active"
      );

    }


    /*
      Initialise le compteur
      immédiatement.
    */

    updateCounter();

  }
);
