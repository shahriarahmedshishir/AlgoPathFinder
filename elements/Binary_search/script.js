let speed = 700;
let currentStep = 0;

function updateStep(message) {
  currentStep++;
  document.getElementById("stepInfo").textContent = `Step ${currentStep}: ${message}`;
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

function createCircles(array, highlight = {}) {
  const container = document.getElementById('barContainer');
  container.innerHTML = '';
  array.forEach((num, i) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = num;

    circle.style.backgroundColor = highlight[i] || "#16404d";

    container.appendChild(circle);
  });
}

async function animateSwap(array, i, j) {
  const circles = document.querySelectorAll('.circle');

  circles[i].style.backgroundColor = 'red';
  circles[j].style.backgroundColor = 'red';

  circles[i].style.transform = 'translateY(-20px)';
  circles[j].style.transform = 'translateY(20px)';
  await new Promise(resolve => setTimeout(resolve, speed / 2));

  const dist = (j - i) * 45;
  circles[i].style.transform = `translate(${dist}px, -20px)`;
  circles[j].style.transform = `translate(${-dist}px, 20px)`;
  await new Promise(resolve => setTimeout(resolve, speed));

  [array[i], array[j]] = [array[j], array[i]];

  createCircles(array);
  const newCircles = document.querySelectorAll('.circle');
  newCircles[i].style.transform = 'translateY(0)';
  newCircles[j].style.transform = 'translateY(0)';

  await new Promise(resolve => setTimeout(resolve, speed / 2));
}

async function bubbleSortVisual(array) {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      updateStep(`Comparing index ${j} and ${j + 1}`);
      createCircles(array, { [j]: "orange", [j + 1]: "orange" });
      await new Promise(resolve => setTimeout(resolve, speed));

      if (array[j] > array[j + 1]) {
        updateStep(`Swapping index ${j} and ${j + 1}`);
        await animateSwap(array, j, j + 1);
      }
    }
  }

  createCircles(array);
  await new Promise(resolve => setTimeout(resolve, speed));
  return array;
}

async function binarySearchVisual(array, target) {
  let left = 0;
  let right = array.length - 1;
  const resultDiv = document.getElementById('demo');

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    updateStep(`Checking middle index ${mid}`);

    const highlight = {};
    for (let i = 0; i < array.length; i++) {
      if (i === mid) highlight[i] = '#f4a261';
      else if (i < left || i > right) highlight[i] = '#888888';
    }

    createCircles(array, highlight);
    resultDiv.textContent = `Searching... Left: ${left}, Right: ${right}, Mid: ${mid}`;
    await new Promise(resolve => setTimeout(resolve, speed * 2));

    if (array[mid] === target) {
      updateStep(`Found ${target} at index ${mid}`);
      const successHighlight = {};
      array.forEach((_, i) => successHighlight[i] = '#2d6a4f');
      createCircles(array, successHighlight);
      resultDiv.textContent = `Found ${target} at index ${mid}`;
      return;
    } else if (array[mid] < target) {
      updateStep(`${target} > ${array[mid]} — searching right`);
      left = mid + 1;
    } else {
      updateStep(`${target} < ${array[mid]} — searching left`);
      right = mid - 1;
    }
  }

  resultDiv.textContent = `Target ${target} not found.`;
  updateStep(`Search complete — Target not found`);
}

async function startSearch() {
  const arrayInput = document.getElementById('arrayInput').value;
  const searchNumber = document.getElementById('searchNumber').value;

  let array = arrayInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  const target = parseInt(searchNumber);
  currentStep = 0;

  if (array.length === 0 || isNaN(target)) {
    document.getElementById('demo').textContent = "Please enter a valid array and target number!";
    return;
  }

  createCircles(array);
  await new Promise(resolve => setTimeout(resolve, speed));

  if (isSorted(array)) {
    document.getElementById('demo').textContent = "Array is already sorted. Starting binary search...";
    updateStep("Array already sorted — skipping sorting");
    await new Promise(resolve => setTimeout(resolve, speed));
    await binarySearchVisual(array, target);
  } else {
    document.getElementById('demo').textContent = "Sorting array before binary search...";
    updateStep("Starting Bubble Sort...");
    const sorted = await bubbleSortVisual(array);
    document.getElementById('demo').textContent = "Array sorted. Starting binary search...";
    await new Promise(resolve => setTimeout(resolve, speed));
    await binarySearchVisual(sorted, target);
  }
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
