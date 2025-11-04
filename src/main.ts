import tapestry from "./DragonTapestry.png";
import "./style.css";

//step 1: added clickable button to gain treasure
document.body.innerHTML = `
  <h1>Dragon's Horde</h1>
  <p>A dragon's only as good as their horde of gold. Gather as much treasure as you can for your pile!</p>

  <img src="${tapestry}" class="icon" id="icon" />

  <h3>Treasure: <span id = "treasure">0</span></h3>
  <p>Take treasure manually.</p>
  <button id="increment" title="What a pain.">Take Treasure</button>

  <h3>Followers: <span id = "followers">0</span></h3>
  <p>Recruit followers to retrieve treasure for you. (0.5t/sec) </p>
  <p>Cost: <span id = "followerCost">1</span> treasures</p>
  <button id="recruit" title="Insolent fools. Make yourselves useful.">Recruit Follower</button>

  <h3>Towns: <span id = "towns">0</span></h3>
  <p>Plunder a town and subjugate the inhabitants. (2.5t/sec) </p>
  <p>Cost: <span id="townCost">1</span> treasure</p>
  <button id="plunder" title="They will shower me with offerings, or pay the price.">Plunder Town</button>

  <h3>Princesses: <span id = "princesses">0</span></h3>
  <p>Kidnap a princess and hold her hostage for ransom. (5t/sec) </p>
  <p>Cost: <span id="kidnapCost">1</span> treasures</p>
  <button id="kidnap" title="Mortals. So easily manipulated.">Kidnap Princess</button>

  <h3>Alchemists: <span id = "alchemists">0</span></h3>
  <p>Hire an alchemist to create gold for you. (10t/sec) </p>
  <p>Cost: <span id="hireCost">1</span> treasures</p>
  <button id="hire" title="Everyone has a price.">Hire Alchemist</button>

  <h3>Wars Waged: <span id = "wars">0</span></h3>
  <p>Wage war against an enemy kingdom. (50t/sec) </p>
  <p>Cost: <span id="warCost">1</span> treasures</p>
  <button id="wage" title="Shame.">Wage War</button>
`;

let treasureCount: number = 0;
const costGrowth: number = 1.05;

interface Resources {
  name: string;
  count: number;
  cost: number;
  rate: number;
  button: HTMLButtonElement;
  countDisplay: HTMLElement;
  costDisplay: HTMLElement;
}

const resourceList: Resources[] = [
  {
    name: "followers",
    count: 0,
    cost: 1,
    rate: 0.5,
    button: document.getElementById("recruit") as HTMLButtonElement,
    countDisplay: document.getElementById("followers")!,
    costDisplay: document.getElementById("followerCost")!,
  },
  {
    name: "towns",
    count: 0,
    cost: 100,
    rate: 2.5,
    button: document.getElementById("plunder") as HTMLButtonElement,
    countDisplay: document.getElementById("towns")!,
    costDisplay: document.getElementById("townCost")!,
  },
  {
    name: "princesses",
    count: 0,
    cost: 250,
    rate: 5,
    button: document.getElementById("kidnap") as HTMLButtonElement,
    countDisplay: document.getElementById("princesses")!,
    costDisplay: document.getElementById("kidnapCost")!,
  },
  {
    name: "alchemists",
    count: 0,
    cost: 500,
    rate: 10,
    button: document.getElementById("hire") as HTMLButtonElement,
    countDisplay: document.getElementById("alchemists")!,
    costDisplay: document.getElementById("hireCost")!,
  },
  {
    name: "war",
    count: 0,
    cost: 1000,
    rate: 50,
    button: document.getElementById("wage") as HTMLButtonElement,
    countDisplay: document.getElementById("wars")!,
    costDisplay: document.getElementById("warCost")!,
  },
];

const treasureButton = document.getElementById(
  "increment",
) as HTMLButtonElement;
const treasureCounter = document.getElementById("treasure")!;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasureCount++;
});

//add event listeners for all buttons
for (let i = 0; i < resourceList.length; i++) {
  resourceList[i].button.disabled = true;

  resourceList[i].button.addEventListener("click", () => {
    resourceList[i].count++;
    treasureCount -= resourceList[i].cost;
    resourceList[i].cost *= costGrowth;
  });
}

//get start time
let lastTime: number = performance.now();

//Parameters: the time, in millseconds, since the program has started
//Purpose: the functions updates a couple different things every second by subtracting the time when the function was called last by the time since the program has started.
//It calculates the amount of treasure based on the number of upgrades and their respective rate. It then updates the HTML display for the upgrade count and the treasure count.
//It also updates the HTML for the cost of upgrades, as well as updating the "clickable" status of the upgrades' buttons.
//After all this is updated, it calls itself to restart the loop.
function update(currentTime: number) {
  //convert time elapsed to sec
  const milliTime = currentTime - lastTime;
  const secTime = milliTime / 1000;

  //update treasure HTML
  treasureCounter.textContent = Math.floor(treasureCount).toString();

  //update all HTML displays and track status of buttons
  for (let i = 0; i < resourceList.length; i++) {
    //increment treasure counter
    treasureCount += resourceList[i].count * resourceList[i].rate * secTime;

    //update html for resource count
    resourceList[i].countDisplay.textContent = Math.floor(resourceList[i].count)
      .toString();

    //update html for cost
    resourceList[i].costDisplay.textContent = resourceList[i].cost.toFixed(2)
      .toString();

    //status of followers button
    if (treasureCount >= resourceList[i].cost) {
      resourceList[i].button.disabled = false;
    } else {
      resourceList[i].button.disabled = true;
    }
  }
  //loop back
  lastTime = currentTime;
  requestAnimationFrame(update);
}
//kickstart loop
requestAnimationFrame(update);
