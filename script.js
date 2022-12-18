const root = document.querySelector(":root")
const mainbody = document.querySelector("body")
const beep = new Audio('./soundeffects/beep.mp3')
const launchBtn = document.querySelector('.launch-btn')
const spaceCraft = document.querySelector(".space-craft")
const fire = document.querySelector(".fire-container")
const sun = document.querySelector(".sun")
const distanceDisplay = document.querySelector(".distance")
const distanceTitle = document.querySelector(".distance-title")

let lauchTimer = 11
let isPaused = true
let finalDistance = 600000
let startDistance = 0

let timer
let distance

distanceDisplay.classList.add("hide")
distanceTitle.classList.add("hide")

launchBtn.addEventListener("click", openFullscreen)

function openFullscreen() {

  launchBtn.removeEventListener("click", openFullscreen)
  sun.style.top = "120vh";
  spaceCraft.style.top = "calc(55vh - 150px)"
  launchBtn.style.top = "calc(90vh - 110px)";
  launchBtn.innerHTML = "launch";
  
  launchBtn.addEventListener("click", lauchHandler)
}


function lauchHandler () {
  distanceTitle.classList.remove("hide")
  launchBtn.removeEventListener("click", lauchHandler)
  isPaused = false
  timer = setInterval(ignitionHandler,1000) 
  launchBtn.addEventListener("click", abortHandler)
}

function abortHandler () {
  clearInterval(timer)
  isPaused = true
  launchBtn.addEventListener("click", lauchHandler)
}

function ignitionHandler () {
  if (lauchTimer > 0 && !isPaused) {
    beep.play()
    lauchTimer --
    launchBtn.innerHTML = `${lauchTimer} <span class="abort">abort</span>`
  } else {
    root.style.setProperty("--rocket-speed", "1000s")
    isPaused = true
    fire.style.opacity = "1"
    launchBtn.innerHTML = "restart mission"
    clearInterval(distance)
    distance = setInterval(distanceHandler,1)
    launchBtn.removeEventListener("click", abortHandler)
    launchBtn.addEventListener("click", restartHandler)
  }
}

function distanceHandler () {
  distanceDisplay.classList.remove("hide")
  distanceTitle.classList.add("hide")
  if(startDistance < finalDistance) {
    distanceDisplay.innerHTML = `${startDistance} km from sun`
    startDistance += 100
  } else {
    distanceDisplay.innerHTML = "deep space"
  }
}

function restartHandler () {
  launchBtn.removeEventListener("click", restartHandler)
  distanceDisplay.classList.add("hide")
  root.style.setProperty("--rocket-speed", "3000s")
  lauchTimer = 11
  clearInterval(distance)
  clearInterval(timer)
  startDistance = 0
  sun.style.top = "65vh";
  spaceCraft.style.top = "calc(0vh - 500px)"
  launchBtn.style.top = "calc(50vh - 70px)";
  launchBtn.innerHTML = "start mission";
  launchBtn.addEventListener("click", openFullscreen)
  setTimeout(() => {
    fire.style.opacity = "0"
  },2500)
}