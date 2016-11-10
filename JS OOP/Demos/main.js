let name = 'Evlogi';
console.log(`Hello ${name}`);

var func = (a, b) => a + b;

//babel scripts --presets es2015 -d build

function max(arr){
    var maxNum = arr[0];
    arr.forEach((n) => maxNum = Math.max(n, maxNum));

    return maxNum;
};

console.log(max([2, 5, 132, 3]));

var generator = (function(){
    var lastId = 0;

    function getCurrentId(){
        return lastId;
    }

    function getNextId(){
        return lastId +=1;
    }
    
    return {
        currentId: getCurrentId,
        getId: getNextId
    }
}());

console.log(generator.getId());
console.log(generator.currentId());