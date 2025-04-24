let array = [];
let isPaused = false;

function updateStatus(msg) {
  document.getElementById("status").textContent = msg;
}

function createCircles(arr) {
  const container = document.getElementById("barContainer");
  container.innerHTML = "";
  arr.forEach((value) => {
    const div = document.createElement("div");
    div.className = "circle";
    div.textContent = value;
    container.appendChild(div);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function quickSort(start, end) {
  if (start >= end) return;

  const pivotIndex = await partition(start, end);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
  const pivot = array[end];
  let i = start - 1;
  updateStatus(`Pivot: ${pivot}`);

  for (let j = start; j < end; j++) {
    while (isPaused) await sleep(100);
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      createCircles(array);
      await sleep(300);
    }
  }

  [array[i + 1], array[end]] = [array[end], array[i + 1]];
  createCircles(array);
  await sleep(300);
  return i + 1;
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers.");
    return;
  }
  createCircles(array);
  quickSort(0, array.length - 1).then(() =>
    updateStatus("Quick Sort Complete!")
  );
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
