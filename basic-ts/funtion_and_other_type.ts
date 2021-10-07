function add(n1: number, n2: number): number {
  return n1 + n2;
}

//function không return gì thì sẽ để type là void
function printResult(num: number): void {
  console.log(`Result is ${num}`);
}

printResult(add(5, 6));

//Function type
//function thường
const printResultClone: Function = printResult;

printResultClone(6);
//function return vs type nhất định
const addClone: (n1: number, n2: number) => number = add;

console.log(addClone(7, 8));

//callback

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  cb(n1 + n2);
}

addAndHandle(4, 3, (result) => {
  console.log(result);
});

//unknow type gần giống any nhưng sẽ check các type so sánh vs type này nếu các biến khác đã đc định nghĩa type
//thì sẽ báo lỗi còn any sẽ ko báo lỗi

let userInput: unknown;
let userName: string;
if (typeof userInput === "string") {
  userName = userInput;
}

//type never dùng cho function, báo vs ts function này sẽ không bao giờ return ra bất cứ thứ gì
