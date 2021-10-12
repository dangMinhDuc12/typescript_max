//Decorator function sẽ chạy từ dưới lên trên

function Logger(logString: string) {
  return function (constructor: Function) {
    //constructor ở đây chính là class Person
    console.log(logString);
    console.log(constructor);
  };
}

// function WithTemplate(template: string, hookId: string) {
//   return function (constructor: any) {
//     const hookElm = document.getElementById(hookId);
//     const classPerson = new constructor();

//     if (hookElm) {
//       hookElm.innerHTML = template;
//       hookElm.querySelector("h1")!.textContent = classPerson.name;
//     }
//   };
// }

//Class decorator
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(personConstructor: T) {
    //Class này sẽ đc thực thi khi 1 instance mới được tạo ra
    return class extends personConstructor {
      constructor(...args: any[]) {
        super();
        const hookElm = document.getElementById(hookId);
        if (hookElm) {
          hookElm.innerHTML = template;
          hookElm.querySelector("h1")!.textContent = this.name;
        }
      }
    };
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

function PropDecorator(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function AcessorDecorator(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log("AcessorDecorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function MethodsDecorator(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log("MethodDecorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function ParamDecorator(target: any, name: string | Symbol, position: number) {
  console.log("ParamDecorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @PropDecorator
  title: string;
  private price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  @AcessorDecorator
  set setPrice(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error("Invalid price - should be positive");
    }
  }

  @MethodsDecorator
  getPriceWithTax(@ParamDecorator tax: number) {
    return this.price * (1 + tax);
  }
}

function Autobind(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const bindMethod = originalMethod.bind(this);
      return bindMethod;
    },
  };
  return adjDescriptor;
}

class Printer {
  message: String = "Hello world";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector("button")!;

button.onclick = p.showMessage;

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //[required, positive]
  };
}

const registeredValidators: ValidatorConfig = {};

function Require(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "required",
    ],
  };
}

function Positive(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any): Boolean {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const rule of objValidatorConfig[prop]) {
      switch (rule) {
        case "required": {
          isValid = isValid && !!obj[prop];
          break;
        }
        case "positive": {
          isValid = isValid && obj[prop] > 0;
          break;
        }
      }
    }
  }
  return isValid;
}

class Course {
  @Require
  title: string;
  @Positive
  price: number;
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = document.querySelector("#title")! as HTMLInputElement;
  const priceEl = document.querySelector("#price")! as HTMLInputElement;

  const title = titleEl.value;
  const price = Number(priceEl.value);

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input");
    return;
  }
  console.log(createdCourse);
});
