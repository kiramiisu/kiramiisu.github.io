// loading screen
const wait = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) =>
  ((typeof elementOrSelector === "string"
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? "flex" : "none");

setVisible(".page", false);
setVisible("#loading", true);

document.addEventListener("DOMContentLoaded", () =>
  wait(4000).then(() => {
    setVisible(".page", true);
    setVisible("#loading", false);
  })
);

// progress bar
const progressBar = document.querySelector(".progress-bar");
let width = 0;
let id = setInterval(frame, 25);
function frame() {
  if (width >= 100) {
    clearInterval(id);
  } else {
    width++;
    progressBar.style.width = width + "%";
  }
}
