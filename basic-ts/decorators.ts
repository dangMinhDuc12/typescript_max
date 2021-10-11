//Decorator function sẽ chạy từ dưới lên trên

function Logger(logString: string) {
  return function (constructor: Function) {
    //constructor ở đây chính là class Person
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookElm = document.getElementById(hookId);
    const classPerson = new constructor();

    if (hookElm) {
      hookElm.innerHTML = template;
      hookElm.querySelector("h1")!.textContent = classPerson.name;
    }
  };
}

@Logger("LOGGING-PERSON")
@WithTemplate("<h1>Hello</h1>", "app")
class Person {
  name = "Duc";

  constructor() {
    console.log("Creating person object");
  }
}

const pers1 = new Person();

console.log(pers1);
