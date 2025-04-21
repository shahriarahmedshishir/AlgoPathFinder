let array = [];

function createCircles(arr, bucketSelector = null) {
  const container = bucketSelector
    ? document.querySelector(bucketSelector)
    : document.getElementById("barContainer");
  container.innerHTML = "";
  arr.forEach((value) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = value;
    container.appendChild(circle);
  });
}

async function sendToBucket() {
  const container = document.getElementById("barContainer");

  while (array.length > 0) {
    let value = array[0];

    const circle = document.createElement("div");
    circle.classList.add("smallCircle");
    circle.textContent = value;
    circle.style.backgroundColor = "red";

    if (value >= 1 && value <= 20) {
      document.querySelector(".bucket-1").appendChild(circle);
    } else if (value >= 21 && value <= 40) {
      document.querySelector(".bucket-2").appendChild(circle);
    } else if (value >= 41 && value <= 60) {
      document.querySelector(".bucket-3").appendChild(circle);
    } else if (value >= 61 && value <= 80) {
      document.querySelector(".bucket-4").appendChild(circle);
    } else if (value >= 81 && value <= 100) {
      document.querySelector(".bucket-5").appendChild(circle);
    }

    array.shift();
    container.removeChild(container.firstChild);

    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  await bubbleSortBucket(".bucket-1");
  await bubbleSortBucket(".bucket-2");
  await bubbleSortBucket(".bucket-3");
  await bubbleSortBucket(".bucket-4");
  await bubbleSortBucket(".bucket-5");

  for (let i = 1; i <= 5; i++) {
    const bucket = document.querySelector(`.bucket-${i}`);
    let circles = Array.from(bucket.getElementsByClassName("smallCircle"));

    for (let circle of circles) {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const bigCircle = document.createElement("div");
      bigCircle.classList.add("circle");
      bigCircle.textContent = circle.textContent;
      container.appendChild(bigCircle);
      circle.remove();
    }
  }
}

async function bubbleSortBucket(bucketSelector) {
  const bucket = document.querySelector(bucketSelector);
  let circles = Array.from(bucket.getElementsByClassName("smallCircle"));
  let arr = circles.map((circle) => parseInt(circle.textContent));

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      circles[j].style.backgroundColor = "red";
      circles[j + 1].style.backgroundColor = "red";

      await new Promise((resolve) => setTimeout(resolve, 600));

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        bucket.insertBefore(circles[j + 1], circles[j]);

        await new Promise((resolve) => setTimeout(resolve, 300));

        circles = Array.from(bucket.getElementsByClassName("smallCircle"));
      }

      circles[j].style.backgroundColor = "#C890A7";
      circles[j + 1].style.backgroundColor = "#C890A7";
    }
  }
}

function startSorting() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  if (array.length !== 20 || array.some(isNaN)) {
    alert("Please enter exactly 20 valid numbers, separated by commas.");
    return;
  }

  let buckets = document.querySelectorAll(".bucket");
  buckets.forEach((bucket) => (bucket.innerHTML = ""));

  createCircles(array);
  sendToBucket();
}
