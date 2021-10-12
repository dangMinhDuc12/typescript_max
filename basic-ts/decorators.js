"use strict";
//Decorator function sẽ chạy từ dưới lên trên
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    return function (constructor) {
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
function WithTemplate(template, hookId) {
    return function (personConstructor) {
        //Class này sẽ đc thực thi khi 1 instance mới được tạo ra
        return class extends personConstructor {
            constructor(...args) {
                super();
                const hookElm = document.getElementById(hookId);
                if (hookElm) {
                    hookElm.innerHTML = template;
                    hookElm.querySelector("h1").textContent = this.name;
                }
            }
        };
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
function PropDecorator(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
}
function AcessorDecorator(target, name, descriptor) {
    console.log("AcessorDecorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function MethodsDecorator(target, name, descriptor) {
    console.log("MethodDecorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function ParamDecorator(target, name, position) {
    console.log("ParamDecorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    set setPrice(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error("Invalid price - should be positive");
        }
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    PropDecorator
], Product.prototype, "title", void 0);
__decorate([
    AcessorDecorator
], Product.prototype, "setPrice", null);
__decorate([
    MethodsDecorator,
    __param(0, ParamDecorator)
], Product.prototype, "getPriceWithTax", null);
function Autobind(target, name, descriptor) {
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
    constructor() {
        this.message = "Hello world";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
button.onclick = p.showMessage;
const registeredValidators = {};
function Require(target, propertyName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] });
}
function Positive(target, propertyName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propertyName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propertyName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
}
function validate(obj) {
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
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Require
], Course.prototype, "title", void 0);
__decorate([
    Positive
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.querySelector("#title");
    const priceEl = document.querySelector("#price");
    const title = titleEl.value;
    const price = Number(priceEl.value);
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Invalid input");
        return;
    }
    console.log(createdCourse);
});
