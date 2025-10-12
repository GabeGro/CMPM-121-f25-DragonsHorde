import "./style.css";

let treasure: number = 0;
const followers: number = 1;

//step 1: added clickable button to gain treasure
document.body.innerHTML = `
  <h1>Dragon's Horde</h1>
  <p>Treasure: <span id = "treasure">0</span></p>
  <p>Treasure: <span id = "treasure">1</span></p>
  <button id = "increment">Take Treasure</button>
`;

const treasureButton = document.getElementById("increment")!;
const treasureCounter = document.getElementById("treasure")!;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasure++;
  treasureCounter.textContent = Math.floor(treasure).toString();
});

//get start time
let lastTime: number = performance.now();
function offerings(currentTime: number) {
  //convert time elapsed to sec
  const milliTime = currentTime - lastTime;
  const secTime = milliTime / 1000;

  //increment treasure by # of followers every second
  treasure += followers * secTime;
  treasureCounter.textContent = Math.floor(treasure).toString();
  lastTime = currentTime;

  //loop back
  requestAnimationFrame(offerings);
}
//kickstart loop
requestAnimationFrame(offerings);
