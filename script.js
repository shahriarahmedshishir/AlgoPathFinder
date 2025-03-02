const sortingDiv = document.querySelector(".sortingDiv");
const sortingBlocks = document.getElementsByClassName("sorting-block");
const sortingIcon = document.querySelector(".arrow-icon-sorting");
let sortingBlockBool = false;

sortingDiv.addEventListener("click", () => {
  if (sortingBlockBool === false) {
    Array.from(sortingBlocks).forEach((block) => {
      block.style.display = "block";
    });
    sortingIcon.style.transform = "none";
    sortingBlockBool = true;
  } else {
    Array.from(sortingBlocks).forEach((block) => {
      block.style.display = "none";
    });
    sortingIcon.style.transform = "rotate(270deg)";
    sortingBlockBool = false;
  }
});
const algoDiv = document.querySelector(".algoDiv");
const algoBlocks = document.getElementsByClassName("algo-block");
const algoIcon = document.querySelector(".arrow-icon-algo");
let algoBlockBool = false;

algoDiv.addEventListener("click", () => {
  if (algoBlockBool === false) {
    Array.from(algoBlocks).forEach((block) => {
      block.style.display = "block";
    });
    algoIcon.style.transform = "none";
    algoBlockBool = true;
  } else {
    Array.from(algoBlocks).forEach((block) => {
      block.style.display = "none";
    });
    algoIcon.style.transform = "rotate(270deg)";
    algoBlockBool = false;
  }
});
const searchBlocks = document.getElementsByClassName("search-block");
const searchIcon = document.querySelector(".arrow-icon-search");
let searchBlockBool = false;

algoBlocks[0].addEventListener("click", () => {
  if (searchBlockBool === false) {
    Array.from(searchBlocks).forEach((block) => {
      block.style.display = "block";
    });
    searchIcon.style.transform = "none";
    searchBlockBool = true;
  } else {
    Array.from(searchBlocks).forEach((block) => {
      block.style.display = "none";
    });
    searchIcon.style.transform = "rotate(270deg)";
    searchBlockBool = false;
  }
});
const graphBlocks = document.getElementsByClassName("graph-block");
const graphIcon = document.querySelector(".arrow-icon-graph");
let graphBlockBool = false;

algoBlocks[1].addEventListener("click", () => {
  if (graphBlockBool === false) {
    Array.from(graphBlocks).forEach((block) => {
      block.style.display = "block";
    });
    graphIcon.style.transform = "none";
    graphBlockBool = true;
  } else {
    Array.from(graphBlocks).forEach((block) => {
      block.style.display = "none";
    });
    graphIcon.style.transform = "rotate(270deg)";
    graphBlockBool = false;
  }
});
const dynamicBlocks = document.getElementsByClassName("dynamic-block");
const dynamicIcon = document.querySelector(".arrow-icon-dynamic");
let dynamicBlockBool = false;

algoBlocks[2].addEventListener("click", () => {
  if (dynamicBlockBool === false) {
    Array.from(dynamicBlocks).forEach((block) => {
      block.style.display = "block";
    });
    dynamicIcon.style.transform = "none";
    dynamicBlockBool = true;
  } else {
    Array.from(dynamicBlocks).forEach((block) => {
      block.style.display = "none";
    });
    dynamicIcon.style.transform = "rotate(270deg)";
    dynamicBlockBool = false;
  }
});

const greedyBlocks = document.getElementsByClassName("greedy-block");
const greedyIcon = document.querySelector(".arrow-icon-greedy");
let greedyBlockBool = false;

algoBlocks[3].addEventListener("click", () => {
  if (greedyBlockBool === false) {
    Array.from(greedyBlocks).forEach((block) => {
      block.style.display = "block";
    });
    greedyIcon.style.transform = "none";
    greedyBlockBool = true;
  } else {
    Array.from(greedyBlocks).forEach((block) => {
      block.style.display = "none";
    });
    greedyIcon.style.transform = "rotate(270deg)";
    greedyBlockBool = false;
  }
});
