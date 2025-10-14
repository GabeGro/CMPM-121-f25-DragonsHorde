import "./style.css";

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

let treasure: number = 0;
const costGrowth: number = 1.05;

interface Resources {
  name: string;
  count: number;
  cost: number;
  rate: number;
  button: HTMLButtonElement;
  countText: HTMLElement;
  costText: HTMLElement;
}

const resourceList: Resources[] = [
  {
    name: "followers",
    count: 0,
    cost: 1,
    rate: 0.2,
    button: document.getElementById("recruit") as HTMLButtonElement,
    countText: document.getElementById("followers")!,
    costText: document.getElementById("followerCost")!,
  },
  {
    name: "towns",
    count: 0,
    cost: 25,
    rate: 2.5,
    button: document.getElementById("conquer") as HTMLButtonElement,
    countText: document.getElementById("towns")!,
    costText: document.getElementById("townCost")!,
  },
  {
    name: "princesses",
    count: 0,
    cost: 50,
    rate: 5,
    button: document.getElementById("kidnap") as HTMLButtonElement,
    countText: document.getElementById("princesses")!,
    costText: document.getElementById("kidnapCost")!,
  },
];

const treasureButton = document.getElementById(
  "increment",
) as HTMLButtonElement;
const treasureCounter = document.getElementById("treasure")!;

//updates treasure counter on button clicked
treasureButton.addEventListener("click", () => {
  treasure++;
});

//buttons to buy upgrades
for (let i = 0; i < resourceList.length; i++) {
  resourceList[i].button.disabled = true;

  resourceList[i].button.addEventListener("click", () => {
    resourceList[i].count++;
    treasure -= resourceList[i].cost;
    resourceList[i].cost *= costGrowth;
  });
}

//get start time
let lastTime: number = performance.now();
function offerings(currentTime: number) {
  //convert time elapsed to sec
  const milliTime = currentTime - lastTime;
  const secTime = milliTime / 1000;

  //increment treasure
  for (let i = 0; i < resourceList.length; i++) {
    treasure += resourceList[i].count * resourceList[i].rate * secTime;
  }

  //update html for resource count
  treasureCounter.textContent = Math.floor(treasure).toString();
  for (let i = 0; i < resourceList.length; i++) {
    resourceList[i].countText.textContent = Math.floor(resourceList[i].count)
      .toString();
  }

  //update html for cost
  for (let i = 0; i < resourceList.length; i++) {
    resourceList[i].costText.textContent = resourceList[i].cost.toFixed(2)
      .toString();
  }

  //status of followers button
  for (let i = 0; i < resourceList.length; i++) {
    if (treasure >= resourceList[i].cost) {
      resourceList[i].button.disabled = false;
    } else {
      resourceList[i].button.disabled = true;
    }
  }

  //loop back
  lastTime = currentTime;
  requestAnimationFrame(offerings);
}
//kickstart loop
requestAnimationFrame(offerings);
