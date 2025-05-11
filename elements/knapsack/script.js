function createCircle(text, index) {
  const circle = document.createElement("div");
  circle.className = "circle";
  circle.id = `circle-${index}`;
  circle.innerText = text;
  return circle;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSearch() {
  const input = document.getElementById("arrayInput").value.trim();
  const target = parseInt(document.getElementById("searchNumber").value.trim());
  const demo = document.getElementById("demo");
  const container = document.getElementById("barContainer");
  const tableContainer = document.getElementById("dpTableContainer");

  container.innerHTML = "";
  tableContainer.innerHTML = "";
  demo.innerText = "";

  if (!input || isNaN(target)) {
    demo.innerText = "Please provide valid input.";
    return;
  }

  const items = input.split(" ").map(pair => {
    const [w, v] = pair.split(",").map(Number);
    return { weight: w, value: v };
  });

  for (let i = 0; i < items.length; i++) {
    const text = `W:${items[i].weight}\nV:${items[i].value}`;
    const circle = createCircle(text, i);
    container.appendChild(circle);
    await sleep(600);
  }

  const n = items.length;
  const W = target;
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  // Create summary table
  const summary = document.createElement("div");
  summary.innerHTML = `
    <table class="dp-table mb-4">
      <tr><th>Weights</th>${items.map(i => `<td>${i.weight}</td>`).join("")}</tr>
      <tr><th>Values</th>${items.map(i => `<td>${i.value}</td>`).join("")}</tr>
    </table>
  `;
  tableContainer.appendChild(summary);

  // Create DP table
  const table = document.createElement("table");
  table.className = "dp-table";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Num Items</th>${Array.from({ length: W + 1 }, (_, w) => `<th>${w}</th>`).join("")}`;
  table.appendChild(headerRow);

  for (let i = 0; i <= n; i++) {
    const row = document.createElement("tr");
    const rowLabel = `<th>${i}</th>`;
    row.innerHTML = rowLabel + Array.from({ length: W + 1 }, (_, w) => `<td id="cell-${i}-${w}">0</td>`).join("");
    table.appendChild(row);
  }

  tableContainer.appendChild(table);

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      const item = items[i - 1];
      const cell = document.getElementById(`cell-${i}-${w}`);
      const circle = document.getElementById(`circle-${i - 1}`);

      circle.style.backgroundColor = "#f59e0b"; // current item
      cell.style.backgroundColor = "#fef08a";   // processing (yellow)
      await sleep(500);

      if (item.weight <= w) {
        const includedValue = item.value + dp[i - 1][w - item.weight];
        const excludedValue = dp[i - 1][w];
        const isSummed = includedValue > excludedValue;

        dp[i][w] = Math.max(includedValue, excludedValue);

        if (isSummed) {
          cell.style.backgroundColor = "#8581f9"; // Summed: purple
        } else {
          cell.style.backgroundColor = "#6ee7b7"; // Previous Best: green
        }

        if (dp[i][w] > Math.max(...dp[i - 1])) {
          cell.style.backgroundColor = "#60a5fa"; // New Max: blue
        }

      } else {
        dp[i][w] = dp[i - 1][w];
        cell.style.backgroundColor = "#6ee7b7"; // Previous Best
      }

      cell.innerText = dp[i][w];
      circle.style.backgroundColor = "#16404d";
    }
  }

  demo.innerText = `Maximum value for capacity ${W} is ${dp[n][W]}`;
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