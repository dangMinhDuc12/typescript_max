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
    if (!title || !descrition || !people) {
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
      console.log(title, descrition, people);
      this.clearInput();
    }
  }

  private configure() {
    this.elm.addEventListener("submit", this.submitHandler);
  }
}

const prj = new ProjectInput();
