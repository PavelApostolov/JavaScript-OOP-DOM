/* globals console*/

function sum(...items) {
    if (Array.isArray(items[0])) {
        items = items[0];
    }

    let itemsSum = 0;
    if (typeof items[0] !== "number") {
        itemsSum = "";
    }

    for (let item of items) {
        itemsSum += item;
    }

    return itemsSum;
}

console.log(sum([1, 2, 3, 4, 5, 6]));
console.log(sum(["Peter", " ", "Ivanov"]));

/* globals console */

var print = function(message) {
    let doc = this.document;
    if (doc && doc.body) {
        doc.body.innerHTML +=
            `<div class='message'>${message}</div>`;
    } else {
        console.log(message);
    }
};

print(123);

let f3 = function() {
    print("This is f3");
};

let f2 = function() {
    f3();
    print("This is f2");
};

let f1 = function() {
    f2();
    print("This is f1");
};

f1();

//Recursion
let factorial = function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
};

console.log(factorial(5));

let fact = factorial;
console.log(fact(5));

factorial = function() {
    return "NOT FACTORIAL";
};

console.log(fact(5));

//
/* globals console */

function numberToDigitNames(n) {
    let numberString = n.toString();
    let digitNames = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let numberWithDigitNames = [];

    for (let digit of numberString) {
        numberWithDigitNames.push(digitNames[digit]);
    }

    return numberWithDigitNames.join("-");
}

console.log(`The function ${numberToDigitNames.name}() takes ${numberToDigitNames.length} parameters"`);

let numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890];

let numbersWithDigitNames = numbers.map(numberToDigitNames);

console.log(numbersWithDigitNames.join("\n"));

//
/* globals console */

log("Text for message");

function log(message) {
    var line = "-".repeat(message.length);
    console.log(line);
    //used before defined
    console.log(`[${getFormattedTime()}]: ${message}`);
    console.log(line);
}

function getFormattedTime(date) {
    date = date || new Date();

    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let hoursString = (hours > 9 ? "" : "0") + hours.toString();
    let minutesString = (minutes > 9 ? "" : "0") + minutes.toString();
    let secondsString = (seconds > 9 ? "" : "0") + seconds.toString();
    return `${hoursString}:${minutesString}:${secondsString}`;
}