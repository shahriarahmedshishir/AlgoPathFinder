let array = [];
let isPaused = false;

function updateStatus(message) {
  const statusDiv = document.getElementById("status");
  if (!statusDiv) {
    const status = document.createElement("div");
    status.id = "status";
    status.className = "text-xl font-medium mt-4";
    document.querySelector("main").appendChild(status);
  }
  document.getElementById("status").textContent = message;
}

function createCircles(arr) {
  const container = document.getElementById("barContainer");
  container.innerHTML = "";
  arr.forEach((value) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = value;
    container.appendChild(circle);
  });
}

function togglePause() {
  isPaused = !isPaused;
  document.getElementById("pauseBtn").textContent = isPaused
    ? "Resume"
    : "Pause";
}

async function wait(ms) {
  while (isPaused) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;
  let circles = document.getElementsByClassName("circle");

  while (i < left.length && j < right.length) {
    updateStatus(`Comparing ${left[i]} and ${right[j]}`);
    circles[start + i].style.backgroundColor = "#B82132";
    circles[mid + 1 + j].style.backgroundColor = "#B82132";
    await wait(400);

    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    k++;
    createCircles(array);
    circles = document.getElementsByClassName("circle");
  }

  while (i < left.length) {
    updateStatus(`Taking remaining ${left[i]} from left`);
    array[k] = left[i];
    i++;
    k++;
    createCircles(array);
    circles = document.getElementsByClassName("circle");
    await wait(400);
  }

  while (j < right.length) {
    updateStatus(`Taking remaining ${right[j]} from right`);
    array[k] = right[j];
    j++;
    k++;
    createCircles(array);
    circles = document.getElementsByClassName("circle");
    await wait(400);
  }

  updateStatus(`Merged [${array.slice(start, end + 1).join(", ")}]`);
  await wait(400);

  for (let x = 0; x < circles.length; x++) {
    circles[x].style.backgroundColor = "#16404d";
  }
}

async function mergeSort(start, end) {
  if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers, separated by commas.");
    return;
  }
  isPaused = false;
  document.getElementById("pauseBtn").textContent = "Pause";
  updateStatus("Starting Merge Sort...");
  createCircles(array);
  mergeSort(0, array.length - 1);
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
