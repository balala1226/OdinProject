class Node {
    constructor(data = null){
        this.data = data;
        this.left = null;
        this.right = null;
    }

    setData(data){
        this.data = data;
    }

    getData(){
        return this.data;
    }

    setChild(left, right){
        this.left = left;
        this.right = right;
    }

    setleftChild(child){
        this.left = child;
    }

    setRightChild(child){
        this.right = child;
    }

    getLeftChild(){
        return this.left
    }

    getRightChild(){
        return this.right
    }
}

class BinarySearchTree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(arr) {   
        var normalizedArray = this.normalizeArray(arr);
        var rightNumber = normalizedArray.length -1;
        return this.sortedArrayToBST(normalizedArray, 0, rightNumber);
    }
    
    sortedArrayToBST(arr, start, end) {
        if (start > end)
        {
            return null;
        }
        
        var mid = parseInt((start + end) / 2);
        var node = new Node(arr[mid]);
        node.setleftChild(this.sortedArrayToBST(arr, start, mid - 1));
        node.setRightChild(this.sortedArrayToBST(arr, mid + 1, end));
        
        return node;
    }

    normalizeArray(array) {
        var sortedArray = array.sort(function(a, b){return a - b});
        var normalizedArray = [];

        sortedArray.forEach(element => {
            if (!normalizedArray.includes(element)){
                normalizedArray.push(element);
            }
        });
    
        return normalizedArray;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value) {
        var currentNode = this.root;
        while (currentNode != null && currentNode.data != value) {
            if (currentNode.data > value) {
                if (currentNode.left == null)
                {
                    var node = new Node(value);
                    currentNode.left = node;
                    return;
                }
                currentNode = currentNode.left;
            } else {
                if (currentNode.right == null)
                {
                    var node = new Node(value);
                    currentNode.right = node;
                    return;
                }
                currentNode = currentNode.right;
            }
        }
    }

    delete(value) {
        var previousNode = null;
        var currentNode = this.root;
        var fromLeft = false;

        while (currentNode != null && currentNode.data != value) {
            previousNode = currentNode;
            if (currentNode.data > value) {
                currentNode = currentNode.left;
                fromLeft = true;
            } else {
                currentNode = currentNode.right;
                fromLeft = false;
            }
        }

        if (currentNode == null) {
            return;
        }

        if (currentNode.left == null && currentNode.right == null){
            if (fromLeft){
                previousNode.left = null;
                return;
            }

            previousNode.right = null;
            return;
        }

        if (currentNode.left == null && currentNode.right != null) {
            if (fromLeft){
                previousNode.left = currentNode.right;
                return;
            }

            previousNode.right = currentNode.right;
            return;
        }

        if (currentNode.left != null && currentNode.right == null) {
            if (fromLeft){
                previousNode.left = currentNode.left;
                return;
            }

            previousNode.right = currentNode.left;
            return;
        }

        var nextNode = currentNode.right;
        var previousNextNode = previousNode;

        while(nextNode.left != null) {
            previousNextNode = nextNode;
            nextNode = nextNode.left;
        }

        if (previousNextNode != null && previousNode == null){
            previousNextNode.left = nextNode.right;
        }

        nextNode.left = currentNode.left;
        if (nextNode.data != currentNode.right.data){
            console.log("not same node ");
            nextNode.right = currentNode.right;
        }

        if (previousNode == null) {
            this.root = nextNode;
            return;
        }

        console.log("netxt node " + nextNode.data);
        console.log("previousNode node " + previousNode.data);

        if (fromLeft){
            previousNode.left = nextNode;
            return;
        }

        previousNode.right = nextNode;
        console.log("previousNode node right " + previousNode.right.data);

    }

    find(value) {
        var currentNode = this.root;
        while (currentNode != null && currentNode.data != value) {
            console.log("finder " + currentNode.data + "  value " + value);
            if (currentNode.data > value) {
                currentNode = currentNode.left;
                console.log("finder left " + currentNode);
                if (currentNode){
                    console.log("finder left " + currentNode.data);
                }
            } else {
                currentNode = currentNode.right;
                console.log("finder right ");
                if (currentNode){
                    console.log("finder right " + currentNode.data);
                }
            }
        }

        return currentNode;
    }

    levelOrder(callback = null)
    {
        const stack = [this.root];
        const result = [];
        
        while (stack.length) {
          const node = stack.shift();
          result.push(node.data);
          
          if (node.left){
            stack.push(node.left);
          }

          if (node.right){
            stack.push(node.right);
          }
        }
        
        if (callback == null){
            return result;
        }

        callback();
    }

    inOrder(callback = null)
    {
        const stack = [];
        const result = [];
        let currentNode = this.root;
          
        while (currentNode || stack.length) {
          while (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
          }
      
          const node = stack.pop();
          result.push(node.data);
          currentNode = node.right;
        }
        
        if (callback == null){
            return result;
        }

        callback();
    }

    preOrder(callback = null)
    {
        const stack = [this.root];
        const result = [];

        while (stack.length) {
            const node = stack.pop();
            result.push(node.data);

            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        
        if (callback == null){
            return result;
        }

        callback();
    }

    postOrder(callback = null)
    {
        const stack = [this.root];
        const resultData = [];
        const resultNodes = [];

        while (stack.length) {
            let node = stack[stack.length - 1];

            if (node.left && !resultNodes.includes(node.left)) {
                stack.push(node.left);
            } else if (node.right && !resultNodes.includes(node.right)) {
                stack.push(node.right);
            } else {
                var resultNode = stack.pop();
                resultData.push(resultNode.data);
                resultNodes.push(resultNode);
            }
        }
        
        if (callback == null){
            return resultData;
        }

        callback();
    }

    height(node) {
        var currentHeight = 1;

        var currentNode = this.root;
        
        while (currentNode != null && currentNode != node) {
            if (currentNode.data > node.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
            currentHeight++;
        }

        if (currentNode == null) {
            return null;
        }

        return currentHeight;
    }

    depth(node) {
        const stack = [this.root];
        var currentFirstNode = this.root;
        
        var currentDepth = 1;
        
        while (stack.length) {
          const currentNode = stack.shift();
          
          if (currentNode.left){
            stack.push(currentNode.left);
          }

          if (currentNode.right){
            stack.push(currentNode.right);
          }

          if (currentFirstNode.data == currentNode.data){
            currentDepth = 1;

            if (currentNode.left){
                currentFirstNode = currentNode.left;
            } else if (currentNode.right){
                currentFirstNode = currentNode.right;
            }
          } else {
            currentDepth++;
          }

          if (currentNode.data == node.data){
            break;
          }
        }

        if (stack.length == 0) {
            return null;
        }

        return currentDepth;
    }

    maxHeight(node) {
    // base condition when binary tree is empty
        if(node == null)
            return 0
        return Math.max(this.maxHeight(node.left), this.maxHeight(node.right)) + 1
    }

    // isBalanced() {
    //     return this.isBalanced(this.root);
    // }

    isBalanced(root = this.root) {
        // Base condition
        if(root == null)
        return true

        // for left and right subtree height
        let lh = this.maxHeight(root.left)
        let rh = this.maxHeight(root.right)

        // allowed values for (lh - rh) are 1, -1, 0
        if (Math.abs(lh - rh) <= 1 && this.isBalanced(root.left)== true && 
            this.isBalanced( root.right) == true) {                
            return true
        }

        // if we reach here means tree is not 
        // height-balanced tree
        return false
    }

    rebalance() {
        var newArray = this.preOrder();
        this.root = this.buildTree(newArray);
    }
}

var bstArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
var bst = new BinarySearchTree(bstArray);
bst.prettyPrint();

console.log("find 11: " +bst.find(11));

bst.delete(67);
bst.prettyPrint();

console.log("Levelorder: " + bst.levelOrder());
console.log("Inorder: " + bst.inOrder());
console.log("Preorder: " + bst.preOrder());
console.log("Postorder: " + bst.postOrder());

var node5 = bst.find(5);
console.log("find 5: " + bst.find(5));
console.log("height 5: " +bst.height(node5));
console.log("depth 5: " +bst.depth(node5));

bst.insert(24);
bst.prettyPrint();

console.log("isBalance  " +bst.isBalanced());
bst.rebalance();
bst.prettyPrint();
console.log("Levelorder: " + bst.levelOrder());
console.log("Inorder: " + bst.inOrder());
console.log("Preorder: " + bst.preOrder());
console.log("Postorder: " + bst.postOrder());


console.log("********************");
console.log("new array");
var newArray = [];

for (var limit=0; limit < 19;limit++){
    newArray.push(Math.floor((Math.random() * 100) + 1));
}

var newBst = new BinarySearchTree(newArray);

console.log("isBalance  " + newBst.isBalanced());
console.log("Levelorder: " + newBst.levelOrder());
console.log("Inorder: " + newBst.inOrder());
console.log("Preorder: " + newBst.preOrder());
console.log("Postorder: " + newBst.postOrder());
for (var limit=0; limit < 19;limit++){
    newBst.insert(Math.floor((Math.random() * 100) + 1));
}
console.log("isBalance  " + newBst.isBalanced());
newBst.rebalance();
newBst.prettyPrint();
console.log("isBalance  " + newBst.isBalanced());
console.log("Levelorder: " + newBst.levelOrder());
console.log("Inorder: " + newBst.inOrder());
console.log("Preorder: " + newBst.preOrder());
console.log("Postorder: " + newBst.postOrder());