//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

enum ProjectStatus {
  Active,
  Finished,
}

type Listener = (projects: Project[]) => void;

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

//Project State

class ProjectState {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private listeners: Listener[] = [];
  addProject(title: string, description: string, people: number) {
    this.projects.push(
      new Project(Math.random().toString(), title, description, people, ProjectStatus.Active)
    );
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
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

class ProjectList {
  templateElm: HTMLTemplateElement;
  hostElm: HTMLDivElement;
  elm: HTMLElement;
  private type: "active" | "finished";
  assignedProjects: Project[] = [];

  constructor(type: "active" | "finished") {
    this.type = type;
    this.templateElm = document.getElementById("project-list")! as HTMLTemplateElement;
    this.hostElm = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElm.content, true);
    this.elm = importedNode.firstElementChild as HTMLElement;
    this.elm.id = `${this.type}-projects`;

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

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.elm.querySelector("ul")!.id = listId;
    this.elm.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private attach() {
    this.hostElm.insertAdjacentElement("beforeend", this.elm);
  }
}

class ProjectInput {
  templateElm: HTMLTemplateElement;
  hostElm: HTMLDivElement;
  elm: HTMLFormElement;
  titleInputElm: HTMLInputElement;
  desInputElm: HTMLInputElement;
  peopleInputElm: HTMLInputElement;

  constructor() {
    this.templateElm = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElm = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElm.content, true);
    this.elm = importedNode.firstElementChild as HTMLFormElement;
    this.elm.id = "user-input";

    this.titleInputElm = this.elm.querySelector("#title")! as HTMLInputElement;
    this.desInputElm = this.elm.querySelector("#description")! as HTMLInputElement;
    this.peopleInputElm = this.elm.querySelector("#people")! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElm.insertAdjacentElement("afterbegin", this.elm);
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

  private configure() {
    this.elm.addEventListener("submit", this.submitHandler);
  }
}

const prj = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
