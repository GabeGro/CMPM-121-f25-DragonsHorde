import "./style.css";

let treasure: number = 0;
let followers: number = 0;
let towns: number = 0;
let princesses: number = 0;

//step 1: added clickable button to gain treasure
document.body.innerHTML = `
  <h1>Dragon's Horde</h1>
  <p>Gather as much treasure as you can for your horde!</p>

  <h3>Treasure: <span id = "treasure">0</span></h3>
  <button id="increment" title="Obtain a piece of treasure!">Take Treasure</button>

  <h3>Followers: <span id = "followers">0</span></h3>
  <button id = "recruit">Recruit Follower (10 treasure)</button>

  <h3>Towns: <span id = "towns">0</span></h3>
  <button id = "conquer">Conquer Town (25 followers)</button>

  <h3>Princesses: <span id = "princesses">0</span></h3>
  <button id = "kidnap">Kidnap Princess (50 followers)</button>
`;

const treasureButton = document.getElementById("increment")!;
const treasureCounter = document.getElementById("treasure")!;

const followersButton = document.getElementById("recruit") as HTMLButtonElement;
const followersCounter = document.getElementById("followers")!;
followersButton.disabled = true;

const conquerButton = document.getElementById("conquer") as HTMLButtonElement;
const townsCounter = document.getElementById("towns")!;
conquerButton.disabled = true;

const kidnapButton = document.getElementById("kidnap") as HTMLButtonElement;
const princessCounter = document.getElementById("princesses")!;
kidnapButton.disabled = true;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasure++;
});

//gain follower for 10 treasure
followersButton.addEventListener("click", () => {
  followers++;
  treasure -= 10;
});

//conquer town for 10 followers
conquerButton.addEventListener("click", () => {
  towns++;
  followers -= 10;
});

//kidnap princess for 25 followers
kidnapButton.addEventListener("click", () => {
  princesses++;
  followers -= 25;
});

//get start time
let lastTime: number = performance.now();
function offerings(currentTime: number) {
  //convert time elapsed to sec
  const milliTime = currentTime - lastTime;
  const secTime = milliTime / 1000;

  //increment treasure
  treasure += followers / 2 * secTime;
  treasure += towns * 3 * secTime;
  treasure += princesses * 5 * secTime;

  treasureCounter.textContent = Math.floor(treasure).toString();
  followersCounter.textContent = Math.floor(followers).toString();
  townsCounter.textContent = Math.floor(towns).toString();
  princessCounter.textContent = Math.floor(princesses).toString();

  //status of followers button
  if (treasure >= 10) {
    followersButton.disabled = false;
  } else {
    followersButton.disabled = true;
  }

  //enable conquer button
  if (followers >= 25) {
    conquerButton.disabled = false;
  } else {
    conquerButton.disabled = true;
  }

  //enable kidnap button
  if (followers >= 50) {
    kidnapButton.disabled = false;
  } else {
    kidnapButton.disabled = true;
  }

  //loop back
  lastTime = currentTime;
  requestAnimationFrame(offerings);
}
//kickstart loop
requestAnimationFrame(offerings);
