"use strict";
// //Generics Type: khai báo type lồng trong type giúp ta xác định rõ dữ liệu sẽ có trong các loại dữ liệu như Array hay Promise
// // const names: Array<string> = ["Duc", "Thang"];
// // const promise: Promise<string> = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("Hello");
// //   }, 2000);
// // });
// // promise.then((data) => console.log(data.split("")));
// // Function merge ở dưới sẽ dùng được dùng generics type là <T, U> cho phép các argument và giá trị nó return được dùng kiểu dữ liệu này, giúp linh hoạt kiểu dữ liệu mà ta truyền vào
// // Từ khoá extends giúp ta xác định rõ kiểu dữ liệu dưới nên là kiểu dữ liệu gì
// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }
// const mergedObj = merge({ name: "Duc" }, { age: 30 });
// console.log(mergedObj);
// //Generics Type có thể kế thừa từ 1 type khác hoặc 1 interface khác
// interface Lengthy {
//   length: number;
// }
// function countAndDescribe<T extends Lengthy>(elm: T): [T, string] {
//   let descriptionText = "Got no value";
//   if (elm.length) {
//     descriptionText = `Got ${elm.length} element`;
//   }
//   return [elm, descriptionText];
// }
// console.log(countAndDescribe(["Hello", "World"]));
// // dùng extends keyof để chỉ ra key này có tồn tại trong object này hay ko
// function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
//   return obj[key];
// }
// console.log(extractAndConvert({ name: "Duc" }, "name"));
// //Class generics
// class DataStorage<T> {
//   private data: T[] = [];
//   addItem(item: T) {
//     this.data.push(item);
//   }
//   removeItem(item: T) {
//     if (this.data.indexOf(item) === -1) {
//       return;
//     }
//     this.data.splice(this.data.indexOf(item), 1);
//   }
//   getItems() {
//     return [...this.data];
//   }
// }
// const textStorage = new DataStorage<string>();
// textStorage.addItem("Duc");
// textStorage.addItem("Hai");
// textStorage.removeItem("Hai");
// console.log(textStorage.getItems());
// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: "Duc" });
// const objectWantRm = { name: "Hai" };
// objectStorage.addItem(objectWantRm);
// objectStorage.removeItem(objectWantRm);
// console.log(objectStorage.getItems());
// //Utility types
// interface CourseGoal {
//   title: string;
//   description: string;
//   completeUntil: Date;
// }
// function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
//   let courseGoal: Partial<CourseGoal> = {}; // Partial biến các type có trong <> thành optional
//   courseGoal.title = title;
//   courseGoal.description = description;
//   courseGoal.completeUntil = date;
//   return courseGoal as CourseGoal;
// }
// const names: Readonly<string[]> = ["Duc", "Hai"]; // Readonly giúp biến này chỉ có thể đọc chứ không thao tác đc
