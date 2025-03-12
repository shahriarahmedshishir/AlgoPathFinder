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

function displayIterationComplete(iteration) {
  const iterationText = document.getElementById("iterationText");
  iterationText.textContent = `Iteration ${iteration} complete!`;
  setTimeout(() => {
    iterationText.textContent = "";
  }, 1000);
}

async function swap(i, j) {
  let circles = document.getElementsByClassName("circle");

  circles[i].style.backgroundColor = "red";
  circles[j].style.backgroundColor = "red";

  // Swap animation
  circles[i].style.transform = "translateY(20px)";
  circles[j].style.transform = "translateY(-20px)";
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Swap values in the array
  [array[i], array[j]] = [array[j], array[i]];

  createCircles(array);
  circles = document.getElementsByClassName("circle");

  circles[i].style.backgroundColor = "#C890A7";
  circles[j].style.backgroundColor = "#C890A7";
  circles[i].style.transform = "translateY(0)";
  circles[j].style.transform = "translateY(0)";
  
  await new Promise((resolve) => setTimeout(resolve, 500));
}

async function heapify(n, i, iteration) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let circles = document.getElementsByClassName("circle");

  if (left < n && array[left] > array[largest]) largest = left;
  if (right < n && array[right] > array[largest]) largest = right;

  if (largest !== i) {
    await swap(i, largest);
    await heapify(n, largest, iteration);
  }

  displayIterationComplete(iteration);
}

async function heapSort() {
  let n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i, n - i); // Pass iteration number as parameter
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    await swap(0, i);
    await heapify(i, 0, n - i); // Pass iteration number as parameter
    let circles = document.getElementsByClassName("circle");
    circles[i].style.backgroundColor = "blue"; // Mark sorted elements
  }

  let circles = document.getElementsByClassName("circle");
  circles[0].style.backgroundColor = "blue"; // Mark last sorted element

  // After sorting, turn all circles green
  for (let i = 0; i < n; i++) {
    circles[i].style.backgroundColor = "green";
  }
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers, separated by commas.");
    return;
  }
  createCircles(array);
  heapSort();
}
