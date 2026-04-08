let timer;


let music = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
music.loop = true;


// Get elements properly
let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let nameInput = document.getElementById("name");
let countdown = document.getElementById("countdown");
let party = document.getElementById("party");
let photo = document.getElementById("photo");


/* Fix Inputs */
dayInput.addEventListener("input", () => {
  if (dayInput.value < 1) dayInput.value = 1;
  if (dayInput.value > 31) dayInput.value = 31;
});


monthInput.addEventListener("input", () => {
  if (monthInput.value < 1) monthInput.value = 1;
  if (monthInput.value > 12) monthInput.value = 12;
});


/* Start Button */
function start() {


  let d = parseInt(dayInput.value);
  let m = parseInt(monthInput.value);
  let userName = nameInput.value.trim(); // ✅ FIX


  if (!d || !m || userName === "") {
    alert("Fill all details 😅");
    return;
  }


  // Start party immediately
  makeBalloons();
  makeFireworks();
  showParty();


  clearInterval(timer);


  timer = setInterval(() => {


    let now = new Date();
    let y = now.getFullYear();
    let b = new Date(y, m - 1, d);


    if (b < now) b.setFullYear(y + 1);


    let diff = b - now;


    if (diff <= 0) {
      celebrate();
      clearInterval(timer);
      return;
    }


    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let h = Math.floor(diff / (1000 * 60 * 60) % 24);
    let min = Math.floor(diff / (1000 * 60) % 60);
    let s = Math.floor(diff / 1000 % 60);


    countdown.innerHTML =
      `🎂 ${userName}'s Birthday<br>${days}d ${h}h ${min}m ${s}s`;


  }, 1000);
}


/* Image */
function loadPhoto(e) {
  photo.src = URL.createObjectURL(e.target.files[0]);
  photo.style.display = "block";
}


/* Music */
function playMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}


/* Balloons */
function makeBalloons() {
  for (let i = 0; i < 15; i++) {
    let b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random() * 100 + "%";
    b.style.background = `hsl(${Math.random() * 360},80%,60%)`;
    document.body.appendChild(b);
  }
}


/* Fireworks */
function makeFireworks() {
  setInterval(() => {
    let f = document.createElement("div");
    f.className = "firework";
    f.style.left = Math.random() * 100 + "%";
    f.style.top = Math.random() * 100 + "%";
    f.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    document.body.appendChild(f);


    setTimeout(() => f.remove(), 1000);
  }, 300);
}


/* Popup */
function showParty() {
  party.style.display = "block";


  setTimeout(() => {
    party.style.display = "none";
  }, 3000);
}


/* Dark Mode */
function toggleMode() {
  document.body.classList.toggle("dark");
}