import "./style.css";

let treasure: number = 0;

//step 1: added clickable button to gain treasure
document.body.innerHTML = `
  <h1>Dragon's Horde</h1>
  <p>Treasure: <span id = "treasure">0</span></p>
  <button id = "increment">Take Treasure</button>
`;

const treasureButton = document.getElementById("increment")!;
const treasureCounter = document.getElementById("treasure")!;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasure++;
  treasureCounter.textContent = Math.floor(treasure).toString();
});
