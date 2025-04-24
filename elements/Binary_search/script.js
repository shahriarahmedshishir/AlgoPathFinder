function startSearch() {
  const arrayInput = document.getElementById("arrayInput").value;
  const searchNumber = document.getElementById("searchNumber").value;

  let array = arrayInput
    .split(",")
    .map((num) => parseInt(num.trim()))
    .filter((num) => !isNaN(num));
  const target = parseInt(searchNumber);

  if (array.length === 0 || isNaN(target)) {
    document.getElementById("demo").textContent =
      "Please enter a valid array and target number!";
    return;
  }

  const barContainer = document.getElementById("barContainer");
  barContainer.innerHTML = "";

  array.forEach((num) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = num;
    barContainer.appendChild(circle);
  });

  visualizeSort(array, target);
}

function visualizeSort(array, target) {
  const barContainer = document.getElementById("barContainer");
  let i = 0;
  let j = 0;
  let sorted = [...array];

  const interval = setInterval(() => {
    if (i < sorted.length) {
      if (j < sorted.length - i - 1) {
        const circles = document.querySelectorAll(".circle");
        circles.forEach((circle) => {
          circle.style.backgroundColor = "#16404d";
        });

        circles[j].style.backgroundColor = "#e76f51";
        circles[j + 1].style.backgroundColor = "#e76f51";

        if (sorted[j] > sorted[j + 1]) {
          [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        }

        setTimeout(() => {
          barContainer.innerHTML = "";
          sorted.forEach((num) => {
            const circle = document.createElement("div");
            circle.classList.add("circle");
            circle.textContent = num;
            barContainer.appendChild(circle);
          });
        }, 300);

        j++;
      } else {
        i++;
        j = 0;
      }
    } else {
      clearInterval(interval);
      setTimeout(() => {
        binarySearchVisualization(sorted, target);
      }, 1000);
    }
  }, 500);
}

function binarySearchVisualization(sortedArray, target) {
  const barContainer = document.getElementById("barContainer");
  let left = 0;
  let right = sortedArray.length - 1;
  let found = false;

  const resultDiv = document.getElementById("demo");
  resultDiv.textContent = `Searching for ${target}...`;

  const interval = setInterval(() => {
    if (left <= right && !found) {
      const mid = Math.floor((left + right) / 2);

      const circles = document.querySelectorAll(".circle");
      circles.forEach((circle) => (circle.style.backgroundColor = "#16404d"));

      circles[mid].style.backgroundColor = "#f4a261";

      if (sortedArray[mid] === target) {
        found = true;
        resultDiv.textContent = `Found ${target} at index ${mid}`;
        circles[mid].style.backgroundColor = "#2d6a4f";
      } else if (sortedArray[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (!found) {
        resultDiv.textContent = `Target ${target} not found.`;
      }
      clearInterval(interval);
    }
  }, 1000);
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
