// type Admin = {
//   name: string;
//   privileges: string[];
// };

// type Employee = {
//   name: string;
//   startDate: Date;
// };

// //Intersection types: Các type kết hợp với nhau

// type ElevatedEmployee = Admin & Employee;

// let e1: ElevatedEmployee = {
//   name: "Duc",
//   privileges: ["create-server"],
//   startDate: new Date(),
// };

// //type guard trong ts (giúp ta kiểm tra điều kiện khi viết code)

// type UnknowEmployee = Admin | Employee;

// function printEmployee(e: UnknowEmployee) {
//   console.log(e.name);
//   if ("privileges" in e) console.log(e.privileges);
//   if ("startDate" in e) console.log(e.startDate);
// }

// printEmployee({ name: "Duc", startDate: new Date() });

// //Phân biệt union types, ta có thể thêm keyword vs 1 giá trị nào đó mà cả 2 loại type hoặc interface đều có
// // để khi làm ta có thể phân biệt chúng qua keyword đó
// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed: number;
//   switch (animal.type) {
//     case "bird": {
//       speed = animal.flyingSpeed;
//       break;
//     }
//     case "horse": {
//       speed = animal.runningSpeed;
//       break;
//     }
//   }
//   console.log(`This animal move with ${speed} km/h`);
// }

// moveAnimal({ type: "horse", runningSpeed: 20 });

// //Type casting(2 cách viết)
// // const userInput = document.querySelector("#user-input")! as HTMLInputElement;
// const userInput = <HTMLInputElement>document.querySelector("#user-input")!;

// userInput.value = "Hello";

// //Index properties
// interface ErrorContainer {
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: "Must be email",
//   userName: "Must be valid username",
// };

// //Function overloads

// type Combinable = string | number;

// function add(a: string, b: string): string;
// function add(a: number, b: number): number;
// function add(a: number, b: string): string;
// function add(a: string, b: number): string;
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") return a.toString() + b.toString();
//   return a + b;
// }

// const result = add("Duc", "Dang");

// result.split("");

// //Nullish coalescing(??) Gần giống toán tử || nhưng chỉ xét với null hoặc undefined

// const nCoalescing = null ?? "Default Value";

// console.log(nCoalescing);
