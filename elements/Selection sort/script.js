let array = [];
let isPaused = false;

function updateStatus(msg) {
  document.getElementById("status").textContent = msg;
}

function createCircles(arr, highlight = {}) {
  const container = document.getElementById("barContainer");
  container.innerHTML = "";
  arr.forEach((value, i) => {
    const div = document.createElement("div");
    div.className = "circle";
    if (highlight.sorted && highlight.sorted.includes(i))
      div.classList.add("sorted");
    else if (highlight.min === i) div.classList.add("min");
    else if (highlight.active === i) div.classList.add("active");
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
      while (isPaused) await sleep(100);
      updateStatus(`Comparing ${array[j]} with ${array[minIdx]}`);
      createCircles(array, {
        active: j,
        min: minIdx,
        sorted: [...Array(i).keys()],
      });
      await sleep(400);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      updateStatus(`Swapping ${array[i]} with ${array[minIdx]}`);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      createCircles(array, { sorted: [...Array(i + 1).keys()] });
      await sleep(400);
    }
  }
  updateStatus("Selection Sort Complete!");
  createCircles(array, { sorted: [...Array(array.length).keys()] });
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers.");
    return;
  }
  createCircles(array);
  selectionSort();
}

function togglePausePlay() {
  isPaused = !isPaused;
  document.getElementById("pausePlayButton").textContent = isPaused
    ? "Play"
    : "Pause";
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
