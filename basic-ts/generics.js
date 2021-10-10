"use strict";
//Generics Type: khai báo type lồng trong type giúp ta xác định rõ dữ liệu sẽ có trong các loại dữ liệu như Array hay Promise
const names = ["Duc", "Thang"];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello");
    }, 2000);
});
promise.then((data) => console.log(data.split("")));
// Function merge ở dưới sẽ dùng được dùng generics type là <T, U> cho phép các argument và giá trị nó return được dùng kiểu dữ liệu này, giúp linh hoạt kiểu dữ liệu mà ta
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Duc" }, { age: 24 });
console.log(mergedObj);
