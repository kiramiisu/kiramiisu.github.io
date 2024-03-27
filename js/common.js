let audio = document.querySelector("#audio");

let volume = document.querySelector("#volume-control");
volume.addEventListener("input", function (e) {
  audio.volume = e.currentTarget.value / 100;
});

// set default volume
audio.volume = 0.2;
volume.value = 20;

// on click event to display block on .menu
document.querySelector(".menu").addEventListener("click", () => {
  let menu = document.querySelector(".menu");
  if (menu.style.transform === "translateX(350px)") {
    document.querySelector("nav").style.left = "-366px";
    document.querySelector(".overlay-menu").style.display = "none";
    document.querySelector(".menu-icon").style.left = "10px";
    document.querySelector(".menu-icon").style.transform = "scaleX(1)";
    document.querySelector(".menu").style.transform = "translateX(0px)";
  } else {
    document.querySelector("nav").style.left = "0";
    document.querySelector(".overlay-menu").style.display = "block";
    document.querySelector(".menu-icon").style.left = "290px";
    document.querySelector(".menu-icon").style.transform = "scaleX(-1)";
    document.querySelector(".menu").style.transform = "translateX(350px)";
  }
});

// toggle volume control display on click
document.querySelector("#volume-button").addEventListener("click", () => {
  let volumeControl = document.querySelector("#volume-control");
  let volumeContainer = document.querySelector(".volume-container");

  if (volumeControl.style.display === "block") {
    volumeControl.style.display = "none";
  } else {
    volumeControl.style.display = "block";
  }
});
