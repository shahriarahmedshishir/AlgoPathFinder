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

async function insertionSort() {
  let circles = document.getElementsByClassName("circle");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    circles[i].style.backgroundColor = "blue"; 
    await new Promise((resolve) => setTimeout(resolve, 1000));

    while (j >= 0 && array[j] > key) {
      circles[j].style.backgroundColor = "red"; 
      await new Promise((resolve) => setTimeout(resolve, 500));

      array[j + 1] = array[j]; 
      createCircles(array);
      circles = document.getElementsByClassName("circle");

      circles[j].style.backgroundColor = "#C890A7"; 
      j--;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    array[j + 1] = key; 
    createCircles(array);
    circles = document.getElementsByClassName("circle");
    circles[i].style.backgroundColor = "#16404d"; 
    await new Promise((resolve) => setTimeout(resolve, 500));
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
  insertionSort();
}