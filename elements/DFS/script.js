let tree = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                { value: 4, children: [] },
                { value: 5, children: [] }
            ]
        },
        {
            value: 3,
            children: [
                { value: 6, children: [] },
                { value: 7, children: [] }
            ]
        }
    ]
};

// Function to create the tree structure in the DOM
function createTree(node, container) {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.textContent = node.value;
    container.appendChild(nodeElement);

    if (node.children.length > 0) {
        const childrenContainer = document.createElement("div");
        childrenContainer.classList.add("children");
        node.children.forEach(child => createTree(child, childrenContainer));
        container.appendChild(childrenContainer);
    }
}

// DFS Traversal Function
async function dfsTraversal(node) {
    const nodeElement = document.querySelector(`.node:contains('${node.value}')`);
    
    // Mark the current node as visited (red)
    nodeElement.style.backgroundColor = "red";
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause for 1 second

    // Recursively visit all children
    for (const child of node.children) {
        await dfsTraversal(child);
    }

    // Mark the current node as processed (green)
    nodeElement.style.backgroundColor = "green";
    await new Promise((resolve) => setTimeout(resolve, 500)); // Pause for 0.5 second
}

// Function to start DFS
function startDFS() {
    const container = document.getElementById("treeContainer");
    container.innerHTML = ""; // Clear the container
    createTree(tree, container); // Render the tree
    dfsTraversal(tree); // Start DFS traversal
}