"use strict";
// /**
//  * 1 class có thể implements nhiều interface
//  *
//  */
// interface Named {
//   name: string;
//   job?: string; //dấu ?: cho property hoặc method này là optional các class, hoặc biến tạo ra từ interface
//   //này có thể có property, method này hoặc không
// }
// interface Greetable extends Named {
//   greet(phrase: string): void;
//   showJob?(): void;
// }
// class Person implements Greetable {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
//   greet(phrase: string) {
//     console.log(`${phrase} ${this.name}`);
//   }
// }
// let user1: Greetable = new Person("Duc", 24);
// user1.greet("Hello");
// console.log(user1);
