let array = [];
let isPaused = false;

function updateStatus(message) {
  const statusDiv = document.getElementById("status");
  statusDiv.textContent = message;
}

function createCircles(arr, bucketSelector = null) {
  const container = bucketSelector
    ? document.querySelector(bucketSelector)
    : document.getElementById("barContainer");
  container.innerHTML = "";
  arr.forEach((value) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = value;
    container.appendChild(circle);
  });
}

async function sendToBucket() {
  const container = document.getElementById("barContainer");

  while (array.length > 0) {
    while (isPaused) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    let value = array[0];

    const circle = document.createElement("div");
    circle.classList.add("smallCircle");
    circle.textContent = value;
    circle.style.backgroundColor = "red";

    let bucketSelector;
    if (value >= 1 && value <= 20) {
      bucketSelector = ".bucket-1";
      updateStatus(`${value} is going to bucket 1`);
    } else if (value >= 21 && value <= 40) {
      bucketSelector = ".bucket-2";
      updateStatus(`${value} is going to bucket 2`);
    } else if (value >= 41 && value <= 60) {
      bucketSelector = ".bucket-3";
      updateStatus(`${value} is going to bucket 3`);
    } else if (value >= 61 && value <= 80) {
      bucketSelector = ".bucket-4";
      updateStatus(`${value} is going to bucket 4`);
    } else if (value >= 81 && value <= 100) {
      bucketSelector = ".bucket-5";
      updateStatus(`${value} is going to bucket 5`);
    }

    document.querySelector(bucketSelector).appendChild(circle);

    array.shift();
    container.removeChild(container.firstChild);

    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  updateStatus("Sorting buckets...");
  await bubbleSortBucket(".bucket-1");
  await bubbleSortBucket(".bucket-2");
  await bubbleSortBucket(".bucket-3");
  await bubbleSortBucket(".bucket-4");
  await bubbleSortBucket(".bucket-5");

  updateStatus("Returning elements to main array");
  for (let i = 1; i <= 5; i++) {
    const bucket = document.querySelector(`.bucket-${i}`);
    let circles = Array.from(bucket.getElementsByClassName("smallCircle"));

    for (let circle of circles) {
      while (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const bigCircle = document.createElement("div");
      bigCircle.classList.add("circle");
      bigCircle.textContent = circle.textContent;
      container.appendChild(bigCircle);
      circle.remove();

      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }

  updateStatus("Sorting complete!");
}

async function bubbleSortBucket(bucketSelector) {
  const bucket = document.querySelector(bucketSelector);
  let circles = Array.from(bucket.getElementsByClassName("smallCircle"));
  let arr = circles.map((circle) => parseInt(circle.textContent));

  if (arr.length === 0) return;

  updateStatus(`Bubble sorting ${bucketSelector}`);

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      while (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      updateStatus(
        `Comparing ${arr[j]} and ${arr[j + 1]} in ${bucketSelector}`
      );
      circles[j].style.backgroundColor = "red";
      circles[j + 1].style.backgroundColor = "red";

      await new Promise((resolve) => setTimeout(resolve, 600));

      if (arr[j] > arr[j + 1]) {
        updateStatus(
          `Swapping ${arr[j]} and ${arr[j + 1]} in ${bucketSelector}`
        );
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        bucket.insertBefore(circles[j + 1], circles[j]);

        await new Promise((resolve) => setTimeout(resolve, 300));

        circles = Array.from(bucket.getElementsByClassName("smallCircle"));
      } else {
        updateStatus(
          `No swap needed for ${arr[j]} and ${arr[j + 1]} in ${bucketSelector}`
        );
      }

      circles[j].style.backgroundColor = "#C890A7";
      circles[j + 1].style.backgroundColor = "#C890A7";
    }
  }
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers, separated by commas.");
    return;
  }

  let buckets = document.querySelectorAll(".bucket");
  buckets.forEach((bucket) => (bucket.innerHTML = ""));

  createCircles(array);
  updateStatus("Starting bucket sort...");
  sendToBucket();
}

function togglePausePlay() {
  isPaused = !isPaused;
  const button = document.getElementById("pausePlayButton");
  button.textContent = isPaused ? "Play" : "Pause";
}
function toggleSlidingPanel() {
  const panel = document.getElementById("slidingPanel");
  panel.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("togglePanelButton")
    .addEventListener("click", toggleSlidingPanel);
});
