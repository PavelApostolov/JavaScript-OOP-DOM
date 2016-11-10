class Mammal{
    constructor(age){
        this._age = age;
    }

    walk(){
        console.log('Calling mammal.wakk()');
    }
}

class Person extends Mammal{
    constructor (name, age) {
        super(age);
        this._name = name;
    }

    say(text){
        console.log(`${this._name}:${text}`);
    }

    walk(){
        console.log('Calling Person.walk()');
    }
}

let p = new Person('Pesho',26);
p.say('Hello');
p.walk();