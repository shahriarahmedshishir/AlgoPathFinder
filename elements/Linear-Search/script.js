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

async function linearSearch(target) {
  let circles = document.getElementsByClassName("circle");

  for (let i = 0; i < array.length; i++) {
    circles[i].style.backgroundColor = "red";
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (array[i] === target) {
      circles[i].style.backgroundColor = "green";
      document.getElementById("demo").innerHTML =(`Number ${target} found at index ${i}!`); 

      return;
    }

    circles[i].style.backgroundColor = "#16404d"; 
  }

  alert(`Number ${target} not found.`);
}

function startSearch() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  const target = Number(document.getElementById("searchNumber").value);

  if (array.some(isNaN) || isNaN(target)) {
    alert("Please enter valid numbers.");
    return;
  }

  createCircles(array);
  linearSearch(target);
}
