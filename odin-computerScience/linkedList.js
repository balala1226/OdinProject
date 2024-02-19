class Node {
    constructor(value = null){
        this.value = value;
        this.nextNode = null;
    }

    setValue(value){
        this.value = value;
    }

    getValue(){
        return this.value;
    }

    setNextNode(nextNode){
        this.nextNode = nextNode;
    }

    getNextNode(){
        return this.nextNode;
    }
}

class LinkedList {
    constructor(){
        this.currentHead = null;
        this.currentTail = null;
        this.currentSize = 0;
    }

    append(value) {
        var newNode = new Node(value);
        
        if (this.currentSize == 0){
            this.currentHead = newNode;
        }

        if (this.currentSize > 0) {
            this.currentTail.setNextNode(newNode);
        }

        this.currentTail = newNode;

        this.currentSize++;
    }

    prepend(value) {
        var newNode = new Node(value);
        newNode.setNextNode(this.currentHead);

        this.currentHead = newNode;

        this.currentSize++;
    }

    size(){
        return this.currentSize++;
    }

    head(){
        return this.currentHead;
    }

    tail(){
        return this.currentTail;
    }

    at(index){
        if (index >= this.currentSize)
        {
            return undefined;
        } 

        var count = 0;
        var currentNode = this.currentHead;
        while (count < index)
        {
            count++;
            currentNode = currentNode.getNextNode();
        }

        return currentNode;
    }

    pop(){
        if (this.currentSize == 1){
            this.currentHead = null;
            this.currentTail = null;
        }

        var penultimateNode = this.at(this.currentSize - 2)
        this.currentTail = penultimateNode;
        penultimateNode.setNextNode(null);

        this.currentSize--;
    }

    contains(value){
        var currentNode = this.currentHead;
        for(var index = 0; index < this.currentSize; index++){
            if(currentNode.getValue() == value){
                return true;
            }

            currentNode = currentNode.getNextNode();
        }

        return false;
    }

    find(value){
        var currentNode = this.currentHead;
        for(var index = 0; index < this.currentSize; index++){
            if(currentNode.getValue() == value){
                return index;
            }

            currentNode = currentNode.getNextNode();
        }

        return null;
    }

    toString(){
        var outputString = '';

        var currentNode = this.currentHead;
        for(var index = 0; index < this.currentSize; index++){
            outputString += "( " + currentNode.getValue()+" )" + " -> ";
            currentNode = currentNode.getNextNode();
        }

        outputString += "null";

        return outputString;
    }

    insertAt(value, index){
        if (index >= this.currentSize)
        {
            return undefined;
        } 

        var currentNode = this.currentHead;
        var previousNode = null;
                
        var count = 0;
        while (count < index)
        {
            count++;
            previousNode = currentNode;
            currentNode = currentNode.getNextNode();
        }

        var newNode = new Node(value);
        previousNode.setNextNode(newNode);
        newNode.setNextNode(currentNode);

        this.currentSize++;
    }

    removeAt(index){
        if (index >= this.currentSize)
        {
            return undefined;
        } 

        var currentNode = this.currentHead;
        var previousNode = null;
                
        var count = 0;
        while (count < index)
        {
            count++;
            previousNode = currentNode;
            currentNode = currentNode.getNextNode();
        }

        if (previousNode != null){
            previousNode.setNextNode(currentNode.getNextNode());
        }

        this.currentSize--;
    }
}


//Test

var linkedList = new LinkedList();

linkedList.append(1);
console.log(linkedList);
linkedList.append(3)
console.log(linkedList);
linkedList.insertAt(2,1)
console.log(linkedList);
linkedList.append(4)
console.log(linkedList);
linkedList.prepend(0)
console.log(linkedList);
console.log(linkedList.at(3));
console.log(linkedList.contains(7));
console.log(linkedList.contains(3));
console.log(linkedList.find(7));
console.log(linkedList.find(3));
console.log(linkedList.head());
console.log(linkedList.tail());
console.log(linkedList.size());
linkedList.pop();
console.log(linkedList);
linkedList.removeAt(3);
console.log(linkedList);
console.log(linkedList.toString());