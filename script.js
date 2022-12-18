const root = document.querySelector(":root")
const mainbody = document.querySelector("body")
const themeMusic = new Audio('./home.mp3')
const beep = new Audio('./beep.mp3')
const launchBtn = document.querySelector('.launch-btn')
const spaceCraft = document.querySelector(".space-craft")
const fire = document.querySelector(".fire-container")
const sun = document.querySelector(".sun")

let lauchTimer = 11
let isPaused = true

launchBtn.addEventListener("click", openFullscreen)

function openFullscreen() {

  themeMusic.play()

  // if (mainbody.requestFullscreen) {
  //   mainbody.requestFullscreen();
  // } else if (mainbody.webkitRequestFullscreen) { /* Safari */
  //   mainbody.webkitRequestFullscreen();
  // } else if (mainbody.msRequestFullscreen) { /* IE11 */
  //   mainbody.msRequestFullscreen();
  // }
  launchBtn.removeEventListener("click", openFullscreen)
  sun.style.top = "120vh";
  spaceCraft.style.top = "calc(70vh - 150px)"
  launchBtn.style.top = "calc(90vh - 110px)";
  launchBtn.innerHTML = "ready to launch";
  
  launchBtn.addEventListener("click", lauchHandler)
}
let timer

function lauchHandler () {
  isPaused = false
  timer = setInterval(ignitionHandler,1000) 
  launchBtn.removeEventListener("click", lauchHandler)
  launchBtn.addEventListener("click", abortHandler)
}

function abortHandler () {
  clearInterval(timer)
  isPaused = true
  launchBtn.addEventListener("click", lauchHandler)
}

function ignitionHandler () {
  if (lauchTimer > 0 && !isPaused) {
    lauchTimer --
    launchBtn.innerHTML = `${lauchTimer} <span class="abort">abort</span>`
  } else {
    root.style.setProperty("--rocket-speed", "600s")
    isPaused = true
    fire.style.opacity = "1"
    launchBtn.innerHTML = "restart mission"
    launchBtn.removeEventListener("click", abortHandler)
    launchBtn.addEventListener("click", restartHandler)
  }
}

function restartHandler () {
  root.style.setProperty("--rocket-speed", "3000s")
  lauchTimer = 11
  clearInterval(timer)
  sun.style.top = "65vh";
  spaceCraft.style.top = "calc(0vh - 500px)"
  launchBtn.style.top = "calc(50vh - 70px)";
  launchBtn.innerHTML = "start mission";
  launchBtn.addEventListener("click", openFullscreen)
  setTimeout(() => {
    fire.style.opacity = "0"
  },2500)
}