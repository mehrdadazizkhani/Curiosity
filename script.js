const root = document.querySelector(":root")
const mainbody = document.querySelector("body")
const launchBtn = document.querySelector('.launch-btn')
const spaceCraft = document.querySelector(".space-craft")
const fire = document.querySelector(".fire-container")
const sun = document.querySelector(".sun")
const distanceDisplay = document.querySelector(".distance")
const distanceTitle = document.querySelector(".distance-title")
const popup = document.querySelector(".popup")
const yesBtn = document.querySelector(".yes-btn")
const noBtn = document.querySelector(".no-btn")
const statusText = document.querySelector(".status")
const planets = Array.from(document.querySelectorAll("#planet"))

const beep = new Audio('./soundeffects/beep.mp3')
const engine = new Audio('./soundeffects/rocket.mp3')
engine.volume = 0.5
engine.loop = 1

let lauchTimer = 6
let isPaused = true
let finalDistance = 6000000000
let startDistance = 0

let timer
let distance

distanceDisplay.classList.add("hide")
distanceTitle.classList.add("hide")
popup.classList.add("hide")

launchBtn.addEventListener("click", openFullscreen)
yesBtn.addEventListener("click", restartHandler)
noBtn.addEventListener("click", popupHandler)

function openFullscreen() {

  planets.forEach((element) => {
    element.style.display  = "inline"
  })

  launchBtn.removeEventListener("click", openFullscreen)
  sun.style.top = "120vh";
  spaceCraft.style.top = "calc(55vh - 150px)"
  launchBtn.style.top = "calc(90vh - 70px)";
  launchBtn.innerHTML = "launch";
  
  launchBtn.addEventListener("click", lauchHandler)
}

function lauchHandler () {
  distanceTitle.classList.remove("hide")
  launchBtn.removeEventListener("click", lauchHandler)
  isPaused = false
  timer = setInterval(ignitionHandler,1300) 
  launchBtn.addEventListener("click", abortHandler)
}

function abortHandler () {
  popup.classList.remove("hide")
  clearInterval(timer)
  isPaused = true
}

function ignitionHandler () {
  if (lauchTimer > 0 && !isPaused) {
    beep.play()
    lauchTimer --
    launchBtn.innerHTML = `${lauchTimer} <span class="abort">abort</span>`
  } else {
    engine.play()
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

function restartHandler () {
  statusText.textContent = ""
  statusText.style.opacity = "0"
  engine.pause()
  popup.classList.add("hide")
  launchBtn.removeEventListener("click", abortHandler)
  launchBtn.removeEventListener("click", restartHandler)
  distanceDisplay.classList.add("hide")
  root.style.setProperty("--rocket-speed", "3000s")
  lauchTimer = 6
  clearInterval(distance)
  clearInterval(timer)
  startDistance = 0
  sun.style.top = "65vh";
  spaceCraft.style.top = "calc(0vh - 500px)"
  launchBtn.style.top = "calc(50vh - 70px)";
  launchBtn.innerHTML = "start mission";
  planets.forEach((element) => {
    element.style.display = "none"
    element.style.top = "-50vw"
  })
  launchBtn.addEventListener("click", openFullscreen)
  setTimeout(() => {
    fire.style.opacity = "0"
  },2500)
}

function popupHandler () {
  popup.classList.add("hide")
  lauchHandler()
}

function planetPass (index) {
  planets[index].style.display  = "inline"
  planets[index].style.top = "100%"
  setTimeout(() => {
    statusText.style.opacity = "1"
    statusText.textContent = `we are passing the ${planets[index].getAttribute("alt")}`
    setTimeout(() => {
      statusText.style.opacity = "0"
    },2500)
  },3000)
}

function distanceHandler () {
  distanceDisplay.classList.remove("hide")
  distanceTitle.classList.add("hide")
  if(startDistance < finalDistance) {
    distanceDisplay.innerHTML = `${startDistance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km from the sun`
    startDistance += 20000
  } else {
    distanceDisplay.innerHTML = "deep space"
  }
 
  if (startDistance == 58000000) {
    planetPass(0)
  } else if (startDistance == 108000000) {
    planetPass(1)
  } else if (startDistance == 150000000) {
    planetPass(2)
  } else if (startDistance == 228000000) {
    planetPass(3)
  } else if (startDistance == 778000000) {
    planetPass(4)
  } else if (startDistance == 1430000000) {
    planetPass(5)
  } else if (startDistance == 2870000000) {
    planetPass(6)
  } else if (startDistance == 4500000000) {
    planetPass(7)
  } else if (startDistance == 5900000000) {
    planetPass(8)
  }
}
