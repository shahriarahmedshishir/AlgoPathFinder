let array = [];
let isPaused = false;

function updateStatus(message) {
  document.getElementById("status").textContent = message;
}

function createCircles(arr, highlight = {}) {
  const container = document.getElementById("barContainer");
  container.innerHTML = "";

  arr.forEach((value, index) => {
    const div = document.createElement("div");
    div.className = "circle";

    if (highlight.sorted?.includes(index)) div.classList.add("sorted");
    else if (highlight.min === index) div.classList.add("min");
    else if (highlight.active === index) div.classList.add("active");

    div.textContent = value;
    container.appendChild(div);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;

    for (let j = i + 1; j < array.length; j++) {
      await handlePause();
      updateStatus(`Comparing ${array[j]} with ${array[minIdx]}`);
      createCircles(array, { active: j, min: minIdx, sorted: getSortedIndices(i) });
      await sleep(400);

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      await swapAndVisualize(i, minIdx);
    }
  }

  finalizeSorting();
}

async function handlePause() {
  while (isPaused) {
    await sleep(100);
  }
}

function getSortedIndices(currentIndex) {
  return [...Array(currentIndex).keys()];
}

async function swapAndVisualize(i, minIdx) {
  updateStatus(`Swapping ${array[i]} with ${array[minIdx]}`);
  [array[i], array[minIdx]] = [array[minIdx], array[i]];
  createCircles(array, { sorted: getSortedIndices(i + 1) });
  await sleep(400);
}

function finalizeSorting() {
  updateStatus("Selection Sort Complete!");
  createCircles(array, { sorted: [...Array(array.length).keys()] });
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = parseInput(input);

  if (!isValidArray(array)) {
    alert("Please enter exactly 20 valid numbers.");
    return;
  }

  createCircles(array);
  selectionSort();
}

function parseInput(input) {
  return input.split(",").map(Number);
}

function isValidArray(arr) {
  return arr.length === 20 && arr.every((num) => !isNaN(num));
}

function togglePausePlay() {
  isPaused = !isPaused;
  document.getElementById("pausePlayButton").textContent = isPaused ? "Play" : "Pause";
}

function toggleSlidingPanel() {
  const panel = document.getElementById("slidingPanel");
  panel.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("togglePanelButton").addEventListener("click", toggleSlidingPanel);
});