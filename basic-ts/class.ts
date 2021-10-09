// /**
//  * Abstract class: Như 1 bản thiết kế class, các class kế thừa từ class này sẽ phải tạo ra
//  * các property và methods được gắn tag abstract trước nó.
//  *
//  */

// abstract class Person {
//   readonly name: string;
//   private hobbies: string[] = [];
//   protected notify: string = "Person class";
//   static job: string = "teacher";
//   abstract sayHi: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   printName() {
//     console.log(`Your name is ${this.name}`);
//   }

//   addHobby(...hobby: string[]) {
//     this.hobbies.push(...hobby);
//   }

//   get hobbiesInfo() {
//     return this.hobbies;
//   }

//   set hobbiesInfo(value: string[]) {
//     this.hobbies = value;
//   }

//   static showJob() {
//     console.log(this.job);
//   }

//   abstract sayHello(): void;
// }

// class Student extends Person {
//   ability: string;
//   sayHi: string = "hello world";

//   constructor(name: string, ability: string) {
//     super(name);
//     this.ability = ability;
//   }

//   addHobby(...hobby: string[]) {
//     console.log(this.notify);
//     super.addHobby(...hobby);
//   }
//   sayHello() {
//     console.log("hello guys");
//   }
// }

// const studentA = new Student("studentA", "good");

// studentA.addHobby("game", "sport");

// console.log(studentA);

// Person.showJob();
// studentA.sayHello();
