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

async function bubbleSort() {
  let circles = document.getElementsByClassName("circle");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      circles[j].style.backgroundColor = "#B82132";
      circles[j + 1].style.backgroundColor = "#B82132";
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        circles[j].style.transform = "translateX(70px)";
        circles[j + 1].style.transform = "translateX(-70px)";

        await new Promise((resolve) => setTimeout(resolve, 600));

        createCircles(array);
        circles = document.getElementsByClassName("circle");
      }

      circles[j].style.backgroundColor = "#9ACBD0";
      circles[j + 1].style.backgroundColor = "#9ACBD0";
      circles[j].style.transform = "translateX(0)";
      circles[j + 1].style.transform = "translateX(0)";
    }
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
  bubbleSort();
}
