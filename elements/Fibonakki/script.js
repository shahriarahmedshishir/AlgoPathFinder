let speed = 700;
let currentStep = 0;

function updateStep(message) {
  currentStep++;
  document.getElementById(
    "stepInfo"
  ).textContent = `Step ${currentStep}: ${message}`;
}

function createFibCircles(seq, highlight = -1) {
  const container = document.getElementById("fibContainer");
  container.innerHTML = "";
  seq.forEach((num, i) => {
    const div = document.createElement("div");
    div.className = "fib-circle" + (i === highlight ? " active" : "");
    div.textContent = num;
    container.appendChild(div);
  });
}

async function fibonacciVisual(n) {
  let seq = [0, 1];
  createFibCircles(seq, 1);
  updateStep("Starting sequence with 0, 1");
  await new Promise((res) => setTimeout(res, speed));

  for (let i = 2; i < n; i++) {
    let next = seq[i - 1] + seq[i - 2];
    seq.push(next);
    createFibCircles(seq, i);
    updateStep(`Calculated F(${i}) = ${seq[i - 1]} + ${seq[i - 2]} = ${next}`);
    await new Promise((res) => setTimeout(res, speed));
  }
  createFibCircles(seq);
  document.getElementById("result").textContent = `Fibonacci(${n}) = ${
    seq[n - 1]
  }`;
}

document.getElementById("startBtn").onclick = async () => {
  const n = parseInt(document.getElementById("fibInput").value);
  currentStep = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("stepInfo").textContent = "";
  if (isNaN(n) || n < 1 || n > 20) {
    document.getElementById("result").textContent =
      "Please enter a valid n (1-20)";
    document.getElementById("fibContainer").innerHTML = "";
    return;
  }
  await fibonacciVisual(n);
};
function toggleSlidingPanel() {
  const panel = document.getElementById("slidingPanel");
  panel.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("togglePanelButton")
    .addEventListener("click", toggleSlidingPanel);
});
