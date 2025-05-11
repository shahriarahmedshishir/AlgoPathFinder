let graph = {}, positions = {}, nodes = new Set(), edges = [];

function createGraph(edgeList) {
  graph = {};
  nodes.clear();
  edges = [];
  const seen = new Set();

  edgeList.forEach(([u, v, w]) => {
    if (seen.has(`${u},${v}`) || seen.has(`${v},${u}`)) return;
    seen.add(`${u},${v}`);
    edges.push([u, v, w]);

    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];
    graph[u].push({ node: v, weight: w });
    graph[v].push({ node: u, weight: w });
    nodes.add(u);
    nodes.add(v);
  });
}

function drawGraph() {
  const container = document.getElementById("graphContainer");
  container.innerHTML = "";
  positions = {};
  const radius = 200;
  const centerX = 300, centerY = 300;
  let angle = 0;
  [...nodes].forEach((node, index) => {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    positions[node] = { x, y };
    angle += (2 * Math.PI) / nodes.size;

    const div = document.createElement("div");
    div.className = "node";
    div.style.left = `${x - 20}px`;
    div.style.top = `${y - 20}px`;
    div.id = `node-${node}`;
    div.textContent = node;
    container.appendChild(div);
  });

  edges.forEach(([u, v, w]) => {
    const x1 = positions[u].x, y1 = positions[u].y;
    const x2 = positions[v].x, y2 = positions[v].y;
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1);

    const edge = document.createElement("div");
    edge.className = "edge";
    edge.dataset.u = u;
    edge.dataset.v = v;
    edge.style.left = `${x1}px`;
    edge.style.top = `${y1}px`;
    edge.style.width = `${length}px`;
    edge.style.transform = `rotate(${angle}rad)`;
    container.appendChild(edge);

    const label = document.createElement("div");
    label.className = "distance";
    label.style.left = `${(x1 + x2) / 2}px`;
    label.style.top = `${(y1 + y2) / 2}px`;
    label.textContent = w;
    label.dataset.u = u;
    label.dataset.v = v;
    container.appendChild(label);
  });
}

function logAction(action) {
  const log = document.getElementById("log");
  const entry = document.createElement("div");
  entry.textContent = action;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

async function dijkstra(start) {
  if (!nodes.has(start)) {
    alert("Source node does not exist in the graph.");
    return;
  }

  const dist = {};
  const visited = new Set();
  const pq = [];

  nodes.forEach(n => dist[n] = Infinity);
  dist[start] = 0;
  pq.push([0, start]);
  logAction(`Push: (${start}, distance: 0)`);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    logAction(`Pop: (${node}, distance: ${d})`);
    if (visited.has(node)) continue;

    visited.add(node);
    const el = document.getElementById(`node-${node}`);
    el.classList.add("visited");
    el.title = `Distance: ${d}`;
    await new Promise(resolve => setTimeout(resolve, 800));

    graph[node].forEach(({ node: neighbor, weight }) => {
      if (dist[neighbor] > dist[node] + weight) {
        dist[neighbor] = dist[node] + weight;
        pq.push([dist[neighbor], neighbor]);
        logAction(`Push: (${neighbor}, distance: ${dist[neighbor]})`);

        const edgeElems = document.querySelectorAll('.edge');
        edgeElems.forEach(edge => {
          const u = Number(edge.dataset.u);
          const v = Number(edge.dataset.v);
          if ((u === node && v === neighbor) || (u === neighbor && v === node)) {
            edge.classList.add("visited-edge");
            setTimeout(() => edge.classList.remove("visited-edge"), 800);
          }
        });

        const labels = document.querySelectorAll('.distance');
        labels.forEach(label => {
          const u = Number(label.dataset.u);
          const v = Number(label.dataset.v);
          if ((u === node && v === neighbor) || (u === neighbor && v === node)) {
            label.classList.add("highlighted-label");
            setTimeout(() => label.classList.remove("highlighted-label"), 800);
          }
        });
      }
    });
  }

  let total = 0;
  const output = Object.entries(dist)
    .map(([node, d]) => {
      total += d;
      return `Node ${node}: ${d}`;
    })
    .join("<br>");

  document.getElementById("finalOutput").innerHTML = `<h3>Final Shortest Distances:</h3>${output}<br><strong>Total Distance:</strong> ${total}`;
}

function startDijkstra() {
  const edgeInput = document.getElementById("edgesInput").value;
  const edgeList = edgeInput.split(";").map(e => e.split(",").map(Number));
  const startNodeInput = document.getElementById("startNode").value.trim();

  if (!startNodeInput || isNaN(startNodeInput)) {
    alert("Please enter a valid numeric source node.");
    return;
  }

  const start = Number(startNodeInput);
  document.getElementById("log").innerHTML = "";
  document.getElementById("finalOutput").innerHTML = "";
  createGraph(edgeList);
  drawGraph();
  dijkstra(start);
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