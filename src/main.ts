import "./style.css";

let treasure: number = 0;
const costGrowth: number = 1.05;

let followers: number = 0;
let followerCost: number = followers * costGrowth + 1;

let towns: number = 0;
let townCost: number = towns * costGrowth + 20;

let princesses: number = 0;
let kidnapCost: number = princesses * costGrowth + 50;

//step 1: added clickable button to gain treasure
document.body.innerHTML = `
  <h1>Dragon's Horde</h1>
  <p>A dragon's only as good as their horde of gold. Gather as much treasure as you can for your pile!</p>

  <h3>Treasure: <span id = "treasure">0</span></h3>
  <p>Take treasure manually.</p>
  <button id="increment" title="What a pain.">Take Treasure</button>

  <h3>Followers: <span id = "followers">0</span></h3>
  <p>Recruit followers to retrieve treasure for you. </p>
  <p>Cost: <span id = "followerCost">1</span> treasures</p>
  <button id="recruit" title="Insolent fools. Make yourselves useful.">Recruit Follower</button>

  <h3>Towns: <span id = "towns">0</span></h3>
  <p>Conquer a town and subjugate the inhabitants. They will donate their treasure, or pay the price.</p>
  <p>Cost: <span id="townCost">1</span> followers</p>
  <button id="conquer" title="More land to make my own.">Conquer Town</button>

  <h3>Princesses: <span id = "princesses">0</span></h3>
  <p>Kidnap a princess and hold her hostage for ransom.</p>
  <p>Cost: <span id="kidnapCost">1</span> followers</p>
  <button id="kidnap" title="Mortals. So easily manipulated.">Kidnap Princess</button>
`;

const treasureButton = document.getElementById("increment")!;
const treasureCounter = document.getElementById("treasure")!;

const followersButton = document.getElementById("recruit") as HTMLButtonElement;
const followersCounter = document.getElementById("followers")!;
const followerCostCounter = document.getElementById("followerCost")!;
followersButton.disabled = true;

const conquerButton = document.getElementById("conquer") as HTMLButtonElement;
const townsCounter = document.getElementById("towns")!;
const townCostCounter = document.getElementById("townCost")!;
conquerButton.disabled = true;

const kidnapButton = document.getElementById("kidnap") as HTMLButtonElement;
const princessCounter = document.getElementById("princesses")!;
const kidnapCostCounter = document.getElementById("kidnapCost")!;
kidnapButton.disabled = true;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasure++;
});

//gain follower for 10 treasure
followersButton.addEventListener("click", () => {
  followers++;
  treasure -= followerCost;
  followerCost *= costGrowth;
});

//conquer town for 10 followers
conquerButton.addEventListener("click", () => {
  towns++;
  followers -= townCost;
  townCost *= costGrowth;
});

//kidnap princess for 25 followers
kidnapButton.addEventListener("click", () => {
  princesses++;
  followers -= kidnapCost;
  kidnapCost *= costGrowth;
});

//get start time
let lastTime: number = performance.now();
function offerings(currentTime: number) {
  //convert time elapsed to sec
  const milliTime = currentTime - lastTime;
  const secTime = milliTime / 1000;

  //increment treasure
  treasure += followers / 5 * secTime;
  treasure += towns * 3 * secTime;
  treasure += princesses * 5 * secTime;

  //update html
  treasureCounter.textContent = Math.floor(treasure).toString();
  followersCounter.textContent = Math.floor(followers).toString();
  townsCounter.textContent = Math.floor(towns).toString();
  princessCounter.textContent = Math.floor(princesses).toString();
  followerCostCounter.textContent = followerCost.toFixed(2).toString();
  townCostCounter.textContent = townCost.toFixed(2).toString();
  kidnapCostCounter.textContent = kidnapCost.toFixed(2).toString();

  //status of followers button
  if (treasure >= followerCost) {
    followersButton.disabled = false;
  } else {
    followersButton.disabled = true;
  }

  //enable conquer button
  if (followers >= townCost) {
    conquerButton.disabled = false;
  } else {
    conquerButton.disabled = true;
  }

  //enable kidnap button
  if (followers >= kidnapCost) {
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
