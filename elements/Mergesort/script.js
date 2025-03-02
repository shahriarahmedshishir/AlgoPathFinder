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

async function mergeSort(start, end) {
  if (start >= end) return;

  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;
  let circles = document.getElementsByClassName("circle");

  while (i < left.length && j < right.length) {
    circles[start + i].style.backgroundColor = "#B82132";
    circles[mid + 1 + j].style.backgroundColor = "#B82132";
    await new Promise((resolve) => setTimeout(resolve, 600));

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
    array[k] = left[i];
    i++;
    k++;
    createCircles(array);
    circles = document.getElementsByClassName("circle");
  }

  while (j < right.length) {
    array[k] = right[j];
    j++;
    k++;
    createCircles(array);
    circles = document.getElementsByClassName("circle");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = "#9ACBD0";
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
  mergeSort(0, array.length - 1);
}
