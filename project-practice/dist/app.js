"use strict";
//Decorator function
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Autobind(target, methodName, descriptor) {
    const methodWantBind = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            return methodWantBind.bind(this);
        },
    };
}
class ProjectInput {
    constructor() {
        this.templateElm = document.getElementById("project-input");
        this.hostElm = document.getElementById("app");
        const importedNode = document.importNode(this.templateElm.content, true);
        this.elm = importedNode.firstElementChild;
        this.elm.id = "user-input";
        this.titleInputElm = this.elm.querySelector("#title");
        this.desInputElm = this.elm.querySelector("#description");
        this.peopleInputElm = this.elm.querySelector("#people");
        this.configure();
        this.attach();
    }
    attach() {
        this.hostElm.insertAdjacentElement("afterbegin", this.elm);
    }
    gatherUserInput() {
        const title = this.titleInputElm.value;
        const descrition = this.desInputElm.value;
        const people = this.peopleInputElm.value;
        if (!title || !descrition || !people) {
            alert("Invalid input");
            return;
        }
        else {
            return [title, descrition, Number(people)];
        }
    }
    clearInput() {
        this.titleInputElm.value = "";
        this.desInputElm.value = "";
        this.peopleInputElm.value = "";
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, descrition, people] = userInput;
            console.log(title, descrition, people);
            this.clearInput();
        }
    }
    configure() {
        this.elm.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prj = new ProjectInput();
