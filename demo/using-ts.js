var button = document.querySelector("button");
var input1 = document.getElementById("num1");
//Dấu !: Giúp cho TS biết không trả về null, as HTMLInputElement: Đây phải là 1 input element
var input2 = document.getElementById("num2");
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(Number(input1.value), Number(input2.value)));
});
