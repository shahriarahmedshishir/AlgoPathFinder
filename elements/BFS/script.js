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

async function bfsTraversal(root) {
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        const nodeElement = document.querySelector(`.node:contains('${currentNode.value}')`);
        nodeElement.style.backgroundColor = "red";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        currentNode.children.forEach(child => {
            queue.push(child);
            const childElement = document.querySelector(`.node:contains('${child.value}')`);
            childElement.style.backgroundColor = "yellow";
        });

        nodeElement.style.backgroundColor = "green";
    }
}

function startBFS() {
    const container = document.getElementById("treeContainer");
    container.innerHTML = "";
    createTree(tree, container);
    bfsTraversal(tree);
}