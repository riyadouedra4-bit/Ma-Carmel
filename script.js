/* =========================
   ÉTOILES
========================= */

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");

  star.classList.add("star");

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.animationDelay = Math.random() * 3 + "s";

  const size = Math.random() * 2 + 1;

  star.style.width = size + "px";
  star.style.height = size + "px";

  starsContainer.appendChild(star);
}


/* =========================
   NAVIGATION
========================= */

function nextScreen(number) {

  const current = document.querySelector(".screen.active");

  if (current) {
    current.classList.remove("active");
  }

  const next = document.getElementById("screen" + number);

  if (next) {
    setTimeout(() => {
      next.classList.add("active");

      if (number === 3) {
        startMessages();
      }
    }, 300);
  }

}


/* =========================
   MUSIQUE
========================= */

const music = document.getElementById("music");

music.volume = 0.35;

let musicStarted = false;

function startMusic() {

  if (musicStarted) {
    return;
  }

  if (!music) {
    return;
  }

  music
    .play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      console.log("La lecture automatique a été bloquée par le navigateur.");
    });

}


/*
   Sur iPhone/Safari, la musique ne peut généralement
   pas démarrer toute seule.

   On profite donc du premier clic de Carmel.
*/

document.addEventListener(
  "click",
  () => {
    startMusic();
  },
  { once: true }
);

document.addEventListener(
  "touchstart",
  () => {
    startMusic();
  },
  { once: true }
);


/* =========================
   ENVELOPPE
========================= */

function openEnvelope() {

  const envelope = document.querySelector(".envelope-container");

  envelope.classList.add("open");

  startMusic();

  setTimeout(() => {
    nextScreen(3);
  }, 1200);

}


/* =========================
   MESSAGES
========================= */

function startMessages() {

  const messages = document.querySelectorAll(".fade-message");

  messages.forEach((message, index) => {

    setTimeout(() => {

      message.classList.add("show");

    }, index * 1800);

  });


  /*
    Après l'affichage des 4 messages,
    passage automatique à l'écran du compteur.
  */

  setTimeout(() => {

    nextScreen(4);

  }, messages.length * 1800 + 1800);

}


/* =========================
   COMPTEUR
========================= */

/*
   Dernière fois que Riyad et Carmel
   se sont vus :

   18 août 2026 à 16h00
*/

const startDate = new Date("2026-08-18T16:00:00");


function updateCounter() {

  const now = new Date();

  let difference = now - startDate;

  if (difference < 0) {
    difference = 0;
  }


  const totalMinutes = Math.floor(
    difference / (1000 * 60)
  );


  const totalHours = Math.floor(
    difference / (1000 * 60 * 60)
  );


  const totalDays = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );


  const remainingHours = Math.floor(
    (difference % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );


  const remainingMinutes = Math.floor(
    (difference % (1000 * 60 * 60))
    / (1000 * 60)
  );


  document.getElementById("days").textContent =
    totalDays;


  document.getElementById("hours").textContent =
    remainingHours;


  document.getElementById("minutes").textContent =
    remainingMinutes;

}


updateCounter();

setInterval(updateCounter, 1000);


/* =========================
   RÉPONSES
========================= */

function answer(button) {

  const answerText = document.getElementById("answerText");

  answerText.textContent =
    "Mauvaise réponse... 😌❤️ C’est toi qui me manques.";


  const buttons = document.querySelectorAll(".choices button");

  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });


  button.style.opacity = "1";


  setTimeout(() => {

    nextScreen(6);

  }, 2200);

}


/* =========================
   QUESTION FINALE
========================= */

function finalAnswer() {

  nextScreen(10);

  createFloatingHearts();

}


/* =========================
   CŒURS FLOTTANTS
========================= */

function createFloatingHearts() {

  const hearts = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💘",
    "💓"
  ];


  for (let i = 0; i < 20; i++) {

    const heart = document.createElement("div");

    heart.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];


    heart.style.position = "fixed";

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.bottom = "-50px";

    heart.style.fontSize =
      Math.random() * 20 + 15 + "px";

    heart.style.zIndex = "10";

    heart.style.pointerEvents = "none";


    const duration =
      Math.random() * 4 + 4;


    heart.style.transition =
      `transform ${duration}s linear, opacity ${duration}s linear`;


    document.body.appendChild(heart);


    setTimeout(() => {

      heart.style.transform =
        `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;


      heart.style.opacity = "0";

    }, 100);


    setTimeout(() => {

      heart.remove();

    }, duration * 1000 + 500);

  }

}


/* =========================
   INITIALISATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  updateCounter();

});
