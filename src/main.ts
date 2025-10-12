import "./style.css";

let treasure: number = 0;
let followers: number = 1;

//step 1: added clickable button to gain treasure
document.body.innerHTML = `
  <h1>Dragon's Horde</h1>
  <p>Treasure: <span id = "treasure">0</span></p>
  <p>Followers: <span id = "followers">1</span></p>
  <button id = "increment">Take Treasure</button>
  <button id = "recruit">Recruit Followers (-10 treasure)</button>
`;

const treasureButton = document.getElementById("increment")!;
const treasureCounter = document.getElementById("treasure")!;
const followersButton = document.getElementById("recruit") as HTMLButtonElement;
const followersCounter = document.getElementById("followers")!;

followersButton.disabled = true;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasure++;
  treasureCounter.textContent = Math.floor(treasure).toString();
});

//gain follower for 10 treasure
followersButton.addEventListener("click", () => {
  followers++;
  treasure -= 10;
  followersCounter.textContent = Math.floor(followers).toString();
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

  //disable followers button
  if (treasure >= 10) {
    followersButton.disabled = false;
  } else {
    followersButton.disabled = true;
  }

  //loop back
  requestAnimationFrame(offerings);
}
//kickstart loop
requestAnimationFrame(offerings);
