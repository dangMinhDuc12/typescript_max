"use strict";
class Person {
    constructor(name) {
        this.hobbies = [];
        this.notify = "Person class";
        this.name = name;
    }
    printName() {
        console.log(`Your name is ${this.name}`);
    }
    addHobby(...hobby) {
        this.hobbies.push(...hobby);
    }
    get hobbiesInfo() {
        return this.hobbies;
    }
    set hobbiesInfo(value) {
        this.hobbies = value;
    }
}
class Student extends Person {
    constructor(name, ability) {
        super(name);
        this.ability = ability;
    }
    addHobby(...hobby) {
        console.log(this.notify);
        super.addHobby(...hobby);
    }
}
const maxUser = new Person("Maximillian");
maxUser.printName();
maxUser.addHobby("game", "sport");
maxUser.hobbiesInfo = ["code"];
console.log(maxUser.hobbiesInfo);
const studentA = new Student("studentA", "good");
studentA.addHobby("game", "sport");
console.log(studentA);
