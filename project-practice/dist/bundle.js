"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="./dd-interfaces.ts"/>
/// <reference path="./project-model.ts" />
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    //Project State
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        addProject(title, description, people) {
            this.projects.push(new App.Project(Math.random().toString(), title, description, people, App.ProjectStatus.Active));
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((p) => p.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
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
    class Component {
        constructor(templateId, hostId, insertAt, newElmId) {
            this.templateElm = document.getElementById(templateId);
            this.hostElm = document.getElementById(hostId);
            const importedNode = document.importNode(this.templateElm.content, true);
            this.elm = importedNode.firstElementChild;
            if (newElmId)
                this.elm.id = newElmId;
            this.attach(insertAt);
        }
        attach(insertAt) {
            this.hostElm.insertAdjacentElement(insertAt ? "afterbegin" : "beforeend", this.elm);
        }
    }
    class ProjectItem extends Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person assigned";
            }
            else {
                return `${this.project.people} persons assigned`;
            }
        }
        dragStartHandler(e) {
            e.dataTransfer.setData("text/plain", this.project.id);
            e.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(e) { }
        configure() {
            this.elm.addEventListener("dragstart", this.dragStartHandler);
            this.elm.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.elm.querySelector("h2").textContent = this.project.title;
            this.elm.querySelector("h3").textContent = this.persons;
            this.elm.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    class ProjectList extends Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.assignedProjects = [];
            this.type = type;
            this.configure();
            this.renderContent();
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.elm.querySelector("ul").id, prjItem);
            }
        }
        dragLeaveHandler(e) {
            this.elm.querySelector("ul").classList.remove("droppable");
        }
        dragOverHandler(e) {
            if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
                e.preventDefault(); // Thêm vào dragover để có thể trigger ondrop event
                this.elm.querySelector("ul").classList.add("droppable");
            }
        }
        dropHandler(e) {
            const prjId = e.dataTransfer.getData("text/plain");
            projectState.moveProject(prjId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        configure() {
            this.elm.addEventListener("dragleave", this.dragLeaveHandler);
            this.elm.addEventListener("dragover", this.dragOverHandler);
            this.elm.addEventListener("drop", this.dropHandler);
            projectState.addListener((projects) => {
                let relevantProject = [];
                if (this.type === "finished") {
                    relevantProject = projects.filter((prj) => prj.status === App.ProjectStatus.Finished);
                }
                else {
                    relevantProject = projects.filter((prj) => prj.status === App.ProjectStatus.Active);
                }
                this.assignedProjects = relevantProject;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.elm.querySelector("ul").id = listId;
            this.elm.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
        }
    }
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dropHandler", null);
    class ProjectInput extends Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElm = this.elm.querySelector("#title");
            this.desInputElm = this.elm.querySelector("#description");
            this.peopleInputElm = this.elm.querySelector("#people");
            this.configure();
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
        renderContent() { }
    }
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    const prj = new ProjectInput();
    const activePrjList = new ProjectList("active");
    const finishedPrjList = new ProjectList("finished");
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map