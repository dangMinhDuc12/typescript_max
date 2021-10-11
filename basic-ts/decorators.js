"use strict";
//Decorator function sẽ chạy từ dưới lên trên
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logString) {
    return function (constructor) {
        //constructor ở đây chính là class Person
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (constructor) {
        const hookElm = document.getElementById(hookId);
        const classPerson = new constructor();
        if (hookElm) {
            hookElm.innerHTML = template;
            hookElm.querySelector("h1").textContent = classPerson.name;
        }
    };
}
let Person = class Person {
    constructor() {
        this.name = "Duc";
        console.log("Creating person object");
    }
};
Person = __decorate([
    Logger("LOGGING-PERSON"),
    WithTemplate("<h1>Hello</h1>", "app")
], Person);
const pers1 = new Person();
console.log(pers1);
