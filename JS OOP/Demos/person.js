class Person{
    constructor(firstname, lastname, height){
        firstname = firstname || 'Unknown';
        lastname = lastname || 'Unknown';

        this._firstname = firstname;
        this._lastname = lastname;
        this._age = 0;
        this._height = height;
        this.fullname = firstname + ' ' + lastname;
    }

    nextYear(){
        this._age +=1;
    }

    sayHello(){
        console.log(`${this._firstname} ${this._lastname} I am ${this._age}-years-old.`);
    }

    say(text) {
        console.log(`${this._firstname} says ${text}`);
    }

    get height(){
        return this._height;
    }

    set height(value) {
        if(typeof value !== 'number'){
            throw "New height should be a number!";
        }
        if (value > this._height + 0.01) {
            this._height += 0.01;
        }
    }

    get fullname(){
        return `${this._firstname} ${this._lastname}`;
    }

    set fullname(newName){
        //throw "Cannot change person's fullname";
        this._firstname = newName.split(' ')[0];
        this._lastname = newName.split(' ')[1];
    }
}

console.log(typeof Person);

p1.nextYear();
let p1 = new Person('Pesho', 'Goshov', 1.8);
let p2 = new Person('Mariya', 'Mariya', 1.6);

p1.sayHello();
p1.say("Jump");

console.log(`${p2.fullname} is ${p2.height}m tall`);