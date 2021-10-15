"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
//Project State
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    addProject(title, description, people) {
        this.projects.push(new Project(Math.random().toString(), title, description, people, ProjectStatus.Active));
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
}
const projectState = ProjectState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && !!validatableInput.value.toString().length;
    }
    if (validatableInput.minLength && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.max && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    if (validatableInput.min && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    return isValid;
}
//Decorator function
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
class ProjectList {
    constructor(type) {
        this.assignedProjects = [];
        this.type = type;
        this.templateElm = document.getElementById("project-list");
        this.hostElm = document.getElementById("app");
        const importedNode = document.importNode(this.templateElm.content, true);
        this.elm = importedNode.firstElementChild;
        this.elm.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            let relevantProject = [];
            if (this.type === "finished") {
                relevantProject = projects.filter((prj) => prj.status === ProjectStatus.Finished);
            }
            else {
                relevantProject = projects.filter((prj) => prj.status === ProjectStatus.Active);
            }
            this.assignedProjects = relevantProject;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.elm.querySelector("ul").id = listId;
        this.elm.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    attach() {
        this.hostElm.insertAdjacentElement("beforeend", this.elm);
    }
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
        const titleValidatable = {
            value: title,
            required: true,
        };
        const descriptionValidatable = {
            value: descrition,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: Number(people),
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
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
            projectState.addProject(title, descrition, people);
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
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
