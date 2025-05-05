let array = [];

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

function showStep(message) {
  const stepInfo = document.getElementById("stepInfo");
  stepInfo.textContent = message;
}

// Modified swap animation: Y first, X swap second
async function animateSwap(i, j) {
  let circles = document.getElementsByClassName("circle");

  circles[i].style.backgroundColor = "red";
  circles[j].style.backgroundColor = "red";

  // Step 1: Move up/down first
  circles[i].style.transform = "translateY(-70px)";
  circles[j].style.transform = "translateY(70px)";
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Step 2: Move horizontally (swap)
  let distance = (j - i) * 45; // 40px width + 5px gap
  circles[i].style.transform = `translate(${distance}px, -70px)`;
  circles[j].style.transform = `translate(${-distance}px, 70px)`;
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Swap array values
  [array[i], array[j]] = [array[j], array[i]];

  // Redraw
  createCircles(array);
  circles = document.getElementsByClassName("circle");

  // Step 3: Drop down to normal
  circles[i].style.transform = "translateY(0)";
  circles[j].style.transform = "translateY(0)";
  await new Promise((resolve) => setTimeout(resolve, 300));
}

async function selectionSort() {
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    let circles = document.getElementsByClassName("circle");

    circles[i].style.backgroundColor = "blue"; // Current index
    showStep(`Step ${i + 1}: Searching minimum from index ${i}`);

    for (let j = i + 1; j < n; j++) {
      circles[j].style.backgroundColor = "#ff8b1a"; // Comparing
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (array[j] < array[minIdx]) {
        if (minIdx !== i) circles[minIdx].style.backgroundColor = "#7899cc"; // Reset old min
        minIdx = j;
        circles[minIdx].style.backgroundColor = "red"; // New minimum
      } else {
        circles[j].style.backgroundColor = "#7899cc"; // Reset color after comparing
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    if (minIdx !== i) {
      showStep(`Swapping index ${i} and ${minIdx}`);
      await animateSwap(i, minIdx);
    }

    circles = document.getElementsByClassName("circle");
    for (let k = 0; k <= i; k++) {
      circles[k].style.backgroundColor = "green"; // Sorted till index i
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    showStep(`Step ${i + 1} completed: Placed ${array[i]} at position ${i}`);
  }

  let circles = document.getElementsByClassName("circle");
  for (let i = 0; i < n; i++) {
    circles[i].style.backgroundColor = "green";
  }
  showStep("Sorting Completed!");
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);

  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers separated by commas.");
    return;
  }

  createCircles(array);
  selectionSort();
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