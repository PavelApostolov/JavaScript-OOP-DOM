function outer(x){
    function inner(y){
        return x + " " + y;
    }
    return inner();
}

let f = outer(5);
f = outer(3);
let result = f(7);

function counter(){
    let count = 0;

    function next(){
        count +=1;
        return count;
    }

    return next;
}

let callCounter = counter();
console.log(callCounter());

let callCounter2 = (function counter(){
    let count = 0;

    function next(){
        count +=1;
        return count;
    }

    return next;
}());

let callCounter3 = (function counter(){
    let count = 0;

    function increment(){
        count +=1;
        return count;
    }

    function decrement(){
        count -=1;
        return count;
    }

    return {
        increment: increment,
        decrement: decrement
    };
}());

console.log(callCounter.increment());
console.log(callCounter.decrement());

//callCointer.count = 17; - not possible

