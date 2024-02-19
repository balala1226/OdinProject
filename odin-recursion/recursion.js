function fibs(number){
    var fibsArray = [];

    if (number >= 1)
    {
        fibsArray.push(0);
    }

    if (number >= 2)
    {
        fibsArray.push(1);
    }

    if (number > 2)
    {
        for(var index = 2; index < number; index++)
        {
            var newNumber = fibsArray[index-1] + fibsArray[index-2];
            fibsArray.push(newNumber);
        }
    }


    return fibsArray
}

function fibsRec(number){
    var fibsArray = [];

    for(var index = 0; index < number; index++)
    {
        fibsArray.push(fibsNum(index));
    }

    return fibsArray
}

function fibsNum(index){
    
    if (index == 0) return 0;
    if (index == 1) return 1;

    return fibsNum(index-1) + fibsNum(index-2);
}

function merge(left, right) {
    let arr = []
    
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    return [ ...arr, ...left, ...right ]
}

function mergeSort(array) {
    const half = array.length / 2
    
    if(array.length < 2){
      return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
}
  
console.log("Fibs for loop: " + fibs(8));
console.log("Fibs rec: " + fibsRec(8));

var array1 = [3, 2, 1, 13, 8, 5, 0, 1];
console.log("Unsorted sort : " + array1);
console.log("Merge sort : " + mergeSort(array1));

var array2 = [105, 79, 100, 110];
console.log("Unsorted sort : " + array2);
console.log("Merge sort : " + mergeSort(array2));