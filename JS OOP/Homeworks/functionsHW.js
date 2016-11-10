/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	
*/


function sum(arr) {
	if (!arr) {
		throw new Error('Array is not defined');
	}

	if (!Array.isArray(arr)) {
		throw new Error('Argument is not an array');
	}

	if (!arr.length) {
		return null;
	}

	if (!arr.every(function (num) {
		return num == Number(num);
	})) {
		throw new Error('Every array element must be or convortable to a number');
	}

	return arr.reduce(function (a, b) {
		b = +b;
		return a + b;
	}, 0);
}

module.exports = sum;

function sum(arr) {
	if(!arr){
		throw Error();
	}

	if(arr.length === 0){
		return null;
	}

	let sum = 0;
	let len = arr.length;

	for(let i = 0; i < arr.length; i += 1) {
		let n = +arr[i];

		if(isNaN(n)){
			throw Error();
		}

		sum += n;
	}

	return sum;
}

module.exports = sum;

function sum(numbers) {

    if(Array.isArray(numbers) && numbers.length === 0) {
        return null;
    } else if(!numbers) {
        throw new Error('Missing parameter!');
    }

	numbers.map(function(num) {
        if(isNaN(+num)) {
            throw new Error('Parameter is not convertible to Number!');
        }
    });

    var result = 0;
    numbers.map(function (n) {
        result += (+n);
      });

    return result;
}

module.exports = sum;

/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(a, b) {
	a = +a;
	b = +b;

	if (isNaN(a) || isNaN(b)) {
		throw Error();
	}

	let primeNumbers = [];

	for (let i = a; i <= b; i += 1) {
		if (i >= 2 && isPrime(i)) {
			primeNumbers.push(i);
		}
	}

	return primeNumbers;

	function isPrime(number) {
		for (let i = 2; i <= Math.sqrt(number); i++) {
			if (number % i === 0)
				return false;
		}
		return true;
	}
}

module.exports = findPrimes;

function findPrimes(startNumber, endNumber) {
	if (typeof startNumber === 'undefined' || typeof endNumber === 'undefined') {
        throw new Error('Missing parameter!');
    } else if (isNaN(+startNumber) || isNaN(+endNumber)) {
        throw new Error('Invalid parameters!');
    }

    startNumber = +startNumber;
    endNumber = +endNumber;

    var primeNumbers = [];
    for (var i = startNumber; i <= endNumber; i += 1){
        if (primeCheck(i)) {
            primeNumbers.push(i);
        }
    }
    

    function primeCheck(number) {
        var sqrt = Math.sqrt(number);

        if (number < 2) {
            return false;
        }

        for (var i = 2; i <= sqrt; i += 1){
            if (number % i === 0) {
                return false;
            }
        }

        return true;
    }
    
    return primeNumbers;
}

module.exports = findPrimes;

function findPrimes(...values) {
	let [startRange, endRange] = values.map(Number);
	let areConvertibleToNumber = isFinite(startRange) && isFinite(endRange);

	if (arguments.length < 2 || !areConvertibleToNumber) {
		throw new Error('Cannot parse numbers correctly!');
	}

	let primeNumbers = [];

	for (let i = startRange; i <= endRange; i += 1) {
		if (isPrime(i)) {
			primeNumbers.push(i);
		}
	}

	function isPrime(number) {
		if (number < 2) {
			return false;
		}
		for (var i = 2; i < number; i++) {
			if (number % i === 0) {
				return false;
			}
		}
		return true;
	}

	return primeNumbers;
}


module.exports = findPrimes;

function findPrimes(start, end) {
	var primes = [];
	if(start === undefined || end === undefined){
		throw new Error('Missing params');
	}

	if(isNumber(start) && isNumber(end)){
		start = +start;
		if (start < 2){
			start = 2;
		}
		end = +end;

		for (var i = start; i <= end; i += 1) {
			if(isPrime(i)){
				primes.push(i);
			}
		}
	}

	return primes;

	function isPrime(num){
		var end = Math.sqrt(num);
		for (var i = 2; i <= end; i += 1) {
			if(num % i === 0){
				return false;
			}
		}
		return true;
	}

	function isNumber(num){
		if(num == Number(num)){
			return true;
		}
		else{
			throw new Error('Range params must be or convertible to Number');			
		}
	}
}

module.exports = findPrimes;