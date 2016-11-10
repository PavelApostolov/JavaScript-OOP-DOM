/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {
		function Person(firstName, lastName, age) {
			var _firstname, _lastname, _age;

			this.firstname = firstName;
			this.lastname = lastName;
			this.age = +age;

			function validateName(name) {
				if (name.length < 3 || name.length > 20) {
					throw new Error('Invalid name length!');
				}
				if (/[!@#$%^&*(0-9).,]/.test(name)) {
					throw new Error('Name contains invalid symbols!');
				}
			}

			function validateAge(number) {
				if (isNaN(number)) {
					throw new Error('Invalid age type!');
				}
				if (number < 0 || number > 150) {
					throw new Error('Invalid Age value!');
				}
			}
			
			Object.defineProperties(Person.prototype, {
				'firstname': {
					get: function() {
						return this._firstName; 
					},
					set: function(value) {
						validateName(value);
						this._firstName = value;
					},
					configurable: true
				},
				'lastname': {
					get: function() {
						return this._lastName;
					},
					set: function(value) {
						validateName(value);
						this._lastName = value;
					},
					configurable: true
				},
				'age': {
					get: function() {
						return this._age;
					},
					set: function(value) {
						validateAge(value);
						this._age = value;
					},
					configurable: true
				},
				'fullname': {
					get: function() {
						return this.firstname + ' ' + this.lastname;
					},
					set: function(value) {
						var names = value.split(' ');
						this.firstname = names[0];
						this.lastname = names[1];
					},
					configurable: true
				}
			});

			Person.prototype.introduce = function() {
				return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
			};
		}
		
		return Person;
	} ());
	return Person;
}
module.exports = solve;