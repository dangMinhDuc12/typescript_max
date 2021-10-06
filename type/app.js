// function add(num1: number, num2: number, showResult: boolean, notify: string) {
//   if (showResult) {
//     console.log(`${notify} ${num1 + num2}`);
//   }
// }
function combine(input1, input2, notify) {
    var result = null;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    if (notify === "congrat") {
        console.log("Congratulation");
    }
    else {
        console.log("We are sorry");
    }
    return result;
}
var combineNumber = combine(20, 30, "congrat");
console.log(combineNumber);
var combineString = combine("Hello", "World", "sorry");
console.log(combineString);
