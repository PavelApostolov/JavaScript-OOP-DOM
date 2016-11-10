let numbers = [1,2,3,4,5];

for(let number of numbers){
    console.log(`The number is ${number}`);
}

for(let index in numbers){
    console.log(`Index's number is ${index}`);
}

//Arrow functions
let add = function (a, b){
    return a + b;
};

console.log(add(3 ,7));

let add2 = (a, b) => a + b;

console.log(add(3, 7));

let numbers2 = [1,2,3,6,7,].map(x => x*11);
//map(function(x){return x*11})

for(let x of numbers){
    console.log(x);
}
//.forEach(x => console.log(x));

//Swap
[a, b] = [b, a];

let current = 1,
    next = 1;

    function printNumber(){
        console.log(current);
        [current, next] = [next, current + next];

        //let sum = current + next;
        //current = next;
        //next = sum;
    }

    for(let i=0; i<10; i+=1)
    printNumber();

//Destructure

let person = {
    name: 'Doncho Minkov',
    address:{
        city= 'Sofia',
        street= 'Al Mal'
    }
};

let {name, address: {city}} = person;
console.log(name);
consle.log(city);

//Destructure
class Person{
    constructor(name1){
        this.name1 = name1;
        this.grades= [];
        for(let i=0; i<5; i+=1){
            this.grades.push(i);
        }
    }
}

let personList = [
    new Person('Cuki'),
    new Person('Doncho'),
    new Person('Koce'),
    new Person('Geri')
];

let[{name1, grades:[firstGrade, ...restGrades]}, ...rest] = personList;

console.log(name); //Samo imeto
console.log(firstGrade);//0
console.log(restGrades);//Aray of grades
console.log(rest); //Array of objects

//Undefined
function min(a, b, c){
    if(c === undefined){
        return Math.min(a, b);
    }

    return Math.min(a, b, c);
}

console.log(min(3, 8, 5));
console.log(min(8, 5));

//Spread
function min(...rest){
    return Math.min(...rest);
}
console.log(min(8, 5));
console.log(min(3, 8, 5, 1, 9));


function minB(first, ...rest){
    if(rest.length === 0)
    return first;

    let minOfRest = minB(...rest);
    if(first < minOfRest)
    return first;
    return minOfRest;
}

console.log(minB(9));
console.log(min(9, 3, 8, 4));

// extended parameter values
function f1 (x, y = 7, z = 42) {
    return x + y + z
}
console.log(f1(1)); // 50

// rest parameter
function f2 (x, y, ...a) {
    return (x + y) * a.length;
}
console.log(f2(1, 2, "hello", true, 7)); // 9

// spread operator
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]
console.log(f2(1, 2, ...params)); // 9

var str = "foo"
var chars = [ … str ] // [ "f", "o", "o" ]
console.log(chars);