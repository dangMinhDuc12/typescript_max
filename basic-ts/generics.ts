//Generics Type: khai báo type lồng trong type giúp ta xác định rõ dữ liệu sẽ có trong các loại dữ liệu như Array hay Promise

const names: Array<string> = ["Duc", "Thang"];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello");
  }, 2000);
});

promise.then((data) => console.log(data.split("")));

// Function merge ở dưới sẽ dùng được dùng generics type là <T, U> cho phép các argument và giá trị nó return được dùng kiểu dữ liệu này, giúp linh hoạt kiểu dữ liệu mà ta
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge<{ name: string }, { age: number }>({ name: "Duc" }, { age: 24 });

console.log(mergedObj);
