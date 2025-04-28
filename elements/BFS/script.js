class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = null;

function createTree() {
  let values = document.getElementById("arrayInput").value.split(",").map(Number);
  if (values.some(isNaN) || values.length === 0) {
    alert("Please enter valid numbers.");
    return;
  }

  root = buildBST(values);
  displayTree(root, document.getElementById("treeContainer"), 0, window.innerWidth / 2, 50, window.innerWidth / 4);
}

function buildBST(values) {
  if (values.length === 0) return null;
  values.sort((a, b) => a - b); // Sort for balanced BST
  return sortedArrayToBST(values, 0, values.length - 1);
}

function sortedArrayToBST(arr, start, end) {
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);
  let node = new TreeNode(arr[mid]);
  node.left = sortedArrayToBST(arr, start, mid - 1);
  node.right = sortedArrayToBST(arr, mid + 1, end);
  return node;
}

function displayTree(node, parentElement, level, x, y, offset) {
  if (!node) return;

  let nodeElement = document.createElement("div");
  nodeElement.classList.add("treeNode");
  nodeElement.textContent = node.value;
  nodeElement.style.top = `${y}px`;
  nodeElement.style.left = `${x}px`;

  parentElement.appendChild(nodeElement);

  setTimeout(() => {
    if (node.left) {
      displayTree(node.left, parentElement, level + 1, x - offset, y + 70, offset / 2);
    }
    if (node.right) {
      displayTree(node.right, parentElement, level + 1, x + offset, y + 70, offset / 2);
    }
  }, 500);
}

async function bfsTraversal(root) {
  if (!root) return;

  let queue = [root]; // Initialize the queue with the root node

  while (queue.length > 0) {
    let currentNode = queue.shift(); // Dequeue the front node

    // Highlight the current node
    let nodes = document.getElementsByClassName("treeNode");
    for (let n of nodes) {
      if (parseInt(n.textContent) === currentNode.value) {
        n.style.backgroundColor = "red"; // Highlight current node
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        n.style.backgroundColor = "green"; // Mark visited node
        n.style.color = "white"; // Change text color
        break;
      }
    }

    // Enqueue the left and right children
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
}

function startBFS() {
  if (!root) {
    alert("Please generate a tree first.");
    return;
  }
  bfsTraversal(root);
}
function displayTree(node, parentElement, level, x, y, offset) {
  if (!node) return;

  // Create a container for the tree
  let svgContainer = document.getElementById("svgContainer");
  if (!svgContainer) {
    svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttribute("id", "svgContainer");
    svgContainer.style.position = "absolute";
    svgContainer.style.width = "100%";
    svgContainer.style.height = "100%";
    parentElement.appendChild(svgContainer);
  }

  // Create the node element
  let nodeElement = document.createElement("div");
  nodeElement.classList.add("treeNode");
  nodeElement.textContent = node.value;
  nodeElement.style.top = `${y}px`;
  nodeElement.style.left = `${x}px`;

  parentElement.appendChild(nodeElement);

  // Draw lines to child nodes
  if (node.left) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", y + 20); // Adjust for node height
    line.setAttribute("x2", x);
    line.setAttribute("y2", y + 20); // Start at the same point for animation
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");
    svgContainer.appendChild(line);

    // Animate the line
    setTimeout(() => {
      line.setAttribute("x2", x - offset);
      line.setAttribute("y2", y + 70);
    }, 100);

    displayTree(node.left, parentElement, level + 1, x - offset, y + 70, offset / 2);
  }
  if (node.right) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", y + 20); // Adjust for node height
    line.setAttribute("x2", x);
    line.setAttribute("y2", y + 20); // Start at the same point for animation
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");
    svgContainer.appendChild(line);

    // Animate the line
    setTimeout(() => {
      line.setAttribute("x2", x + offset);
      line.setAttribute("y2", y + 70);
    }, 100);

    displayTree(node.right, parentElement, level + 1, x + offset, y + 70, offset / 2);
  }
}