"use strict";
function add(n1, n2) {
    return n1 + n2;
}
//function không return gì thì sẽ để type là void
function printResult(num) {
    console.log(`Result is ${num}`);
}
printResult(add(5, 6));
//Function type
//function thường
const printResultClone = printResult;
printResultClone(6);
//function return vs type nhất định
const addClone = add;
console.log(addClone(7, 8));
//callback
function addAndHandle(n1, n2, cb) {
    cb(n1 + n2);
}
addAndHandle(4, 3, (result) => {
    console.log(result);
});
//unknow type gần giống any nhưng sẽ check các type so sánh vs type này nếu các biến khác đã đc định nghĩa type
//thì sẽ báo lỗi còn any sẽ ko báo lỗi
let userInput;
let userName;
if (typeof userInput === "string") {
    userName = userInput;
}
//type never dùng cho function, báo vs ts function này sẽ không bao giờ return ra bất cứ thứ gì
