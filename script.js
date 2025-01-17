
class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinaryTree {
    constructor() {
      this.root = null;
    }
  
    insert(value) {
      if (!this.root) {
        this.root = new TreeNode(value);
      } else {
        this._insertRec(this.root, value);
      }
    }
  
    _insertRec(node, value) {
      if (value < node.value) {
        if (node.left) {
          this._insertRec(node.left, value);
        } else {
          node.left = new TreeNode(value);
        }
      } else {
        if (node.right) {
          this._insertRec(node.right, value);
        } else {
          node.right = new TreeNode(value);
        }
      }
    }
  }
  
  const tree = new BinaryTree();
  const treeContainer = document.getElementById("treeContainer");
  
  function clearTree() {
    tree.root = null;
    treeContainer.innerHTML = '';
  }
  
  function addNode() {
    const value = parseInt(document.getElementById("nodeValue").value);
    if (isNaN(value)) {
      alert("Please enter a valid number.");
      return;
    }
    tree.insert(value);
    document.getElementById("nodeValue").value = "";
    redrawTree();
  }
  
  function redrawTree() {
    treeContainer.innerHTML = '';
    visualizeTree(tree.root, 0.5, 50, 0.5, 0);
  }
  
  function drawLine(x1, y1, x2, y2) {
    const line = document.createElement("div");
    line.classList.add("line");
    
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.width = `${length}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    treeContainer.appendChild(line);
  }
  
  function visualizeTree(node, x, y, parentX, parentY) {
    if (!node) return;
  
    const nodeX = x * window.innerWidth;
    const parentNodeX = parentX * window.innerWidth;
  
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.style.left = `${nodeX}px`;
    nodeElement.style.top = `${y}px`;
    nodeElement.innerText = node.value;
  
    if (y > 50) {
      drawLine(parentNodeX, parentY, nodeX, y);
    }
  
    treeContainer.appendChild(nodeElement);
  
    const spacing = 0.1;
    const verticalSpacing = 60;
    
    visualizeTree(node.left, x - spacing, y + verticalSpacing, x, y);
    visualizeTree(node.right, x + spacing, y + verticalSpacing, x, y);
  }
  
  window.addEventListener('resize', () => {
    if (tree.root) {
      redrawTree();
    }
  });