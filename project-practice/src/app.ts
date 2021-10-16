/// <reference path="./dd-interfaces.ts"/>
/// <reference path="./project-model.ts" />

namespace App {
  //Validation
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  type Listener<T> = (projects: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  //Project State

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    constructor() {
      super();
    }

    addProject(title: string, description: string, people: number) {
      this.projects.push(
        new Project(Math.random().toString(), title, description, people, ProjectStatus.Active)
      );
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
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

    static getInstance(): ProjectState {
      if (this.instance) return this.instance;
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  const projectState = ProjectState.getInstance();

  function validate(validatableInput: Validatable): boolean {
    let isValid: boolean = true;
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
  function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const methodWantBind = descriptor.value;

    return {
      configurable: true,
      enumerable: false,
      get() {
        return methodWantBind.bind(this);
      },
    };
  }

  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElm: HTMLTemplateElement;
    hostElm: T;
    elm: U;

    constructor(templateId: string, hostId: string, insertAt: boolean, newElmId?: string) {
      this.templateElm = document.getElementById(templateId)! as HTMLTemplateElement;
      this.hostElm = document.getElementById(hostId)! as T;

      const importedNode = document.importNode(this.templateElm.content, true);
      this.elm = importedNode.firstElementChild as U;
      if (newElmId) this.elm.id = newElmId;

      this.attach(insertAt);
    }

    private attach(insertAt: boolean) {
      this.hostElm.insertAdjacentElement(insertAt ? "afterbegin" : "beforeend", this.elm);
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }

  class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
      if (this.project.people === 1) {
        return "1 person assigned";
      } else {
        return `${this.project.people} persons assigned`;
      }
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(e: DragEvent) {
      e.dataTransfer!.setData("text/plain", this.project.id);
      e.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(e: DragEvent) {}
    configure() {
      this.elm.addEventListener("dragstart", this.dragStartHandler);
      this.elm.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
      this.elm.querySelector("h2")!.textContent = this.project.title;
      this.elm.querySelector("h3")!.textContent = this.persons;
      this.elm.querySelector("p")!.textContent = this.project.description;
    }
  }

  class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    private type: "active" | "finished";
    assignedProjects: Project[] = [];

    constructor(type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.type = type;

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.elm.querySelector("ul")!.id, prjItem);
      }
    }

    @Autobind
    dragLeaveHandler(e: DragEvent) {
      this.elm.querySelector("ul")!.classList.remove("droppable");
    }

    @Autobind
    dragOverHandler(e: DragEvent) {
      if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault(); // Thêm vào dragover để có thể trigger ondrop event
        this.elm.querySelector("ul")!.classList.add("droppable");
      }
    }

    @Autobind
    dropHandler(e: DragEvent) {
      const prjId = e.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    configure() {
      this.elm.addEventListener("dragleave", this.dragLeaveHandler);
      this.elm.addEventListener("dragover", this.dragOverHandler);
      this.elm.addEventListener("drop", this.dropHandler);
      projectState.addListener((projects: Project[]) => {
        let relevantProject: Project[] = [];
        if (this.type === "finished") {
          relevantProject = projects.filter((prj) => prj.status === ProjectStatus.Finished);
        } else {
          relevantProject = projects.filter((prj) => prj.status === ProjectStatus.Active);
        }

        this.assignedProjects = relevantProject;

        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.elm.querySelector("ul")!.id = listId;
      this.elm.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
  }

  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElm: HTMLInputElement;
    desInputElm: HTMLInputElement;
    peopleInputElm: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElm = this.elm.querySelector("#title")! as HTMLInputElement;
      this.desInputElm = this.elm.querySelector("#description")! as HTMLInputElement;
      this.peopleInputElm = this.elm.querySelector("#people")! as HTMLInputElement;

      this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
      const title = this.titleInputElm.value;
      const descrition = this.desInputElm.value;
      const people = this.peopleInputElm.value;

      const titleValidatable: Validatable = {
        value: title,
        required: true,
      };

      const descriptionValidatable: Validatable = {
        value: descrition,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validatable = {
        value: Number(people),
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid input");
        return;
      } else {
        return [title, descrition, Number(people)];
      }
    }

    private clearInput() {
      this.titleInputElm.value = "";
      this.desInputElm.value = "";
      this.peopleInputElm.value = "";
    }

    @Autobind
    private submitHandler(e: Event) {
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

    renderContent() {}
  }

  const prj = new ProjectInput();
  const activePrjList = new ProjectList("active");
  const finishedPrjList = new ProjectList("finished");
}
