"use strict";
// function add(num1: number, num2: number, showResult: boolean, notify: string) {
//   if (showResult) {
//     console.log(`${notify} ${num1 + num2}`);
//   }
// }
// add(5, 6, true, "Result is: ");
//Object
//Khi khai báo lúc đầu TS đã mặc định gán kiểu dữ liệu cho nó và sẽ check khi gán lại sai kiểu sẽ báo lỗi
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "duc",
//   age: 20,
// };
//Array
// const hobbies: string[] = ["game", "sport"];
// const numberArr: number[] = [1, 3, 6];
// const mixedArr: any[] = [1, "game"];
// const objArr = [
//   {
//     name: "Duong",
//   },
//   {
//     name: "Hai",
//   },
// ];
//Tuple: Check type của các phần tử nằm trong mảng, khi mảng được gán lại sẽ check thêm length
// const person: {
//   name: string;
//   age: number;
//   role: [number, string]; // tuple type
// } = {
//   name: "duc",
//   age: 20,
//   role: [3, "admin"],
// };
// person.role = [5, "user", 6];
//Enum: Tạo ra kiểu dữ liệu gần giống obj, có thể khởi tạo giá trị ban đầu hoặc không
// enum Roles {
//   ADMIN = "ADMIN",
//   READ_ONLY = "READ_ONLY",
//   AUTHOR = "AUTHOR",
// }
// const person = {
//   name: "Duc",
//   age: 20,
//   role: Roles.ADMIN,
// };
// if (person.role === Roles.ADMIN) {
//   console.log("ok");
// } else {
//   console.log("wrong");
// }
// Union types & Literal types && Type Alias(Tạo ra type của riêng mình có thể bao gồm các type khác)
// type NotifyType = string | number;
// function combine(input1: NotifyType, input2: string | number, notify: "congrat" | "sorry") {
//   let result: any = null;
//   if (typeof input1 === "number" && typeof input2 === "number") {
//     result = input1 + input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }
//   if (notify === "congrat") {
//     console.log("Congratulation");
//   } else {
//     console.log("We are sorry");
//   }
//   return result;
// }
// const combineNumber = combine(20, 30, "congrat");
// console.log(combineNumber);
// const combineString = combine("Hello", "World", "sorry");
// console.log(combineString);
