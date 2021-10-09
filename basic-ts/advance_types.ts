type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//Intersection types: Các type kết hợp với nhau

type ElevatedEmployee = Admin & Employee;

let e1: ElevatedEmployee = {
  name: "Duc",
  privileges: ["create-server"],
  startDate: new Date(),
};

//type guard trong ts (giúp ta kiểm tra điều kiện khi viết code)

type UnknowEmployee = Admin | Employee;

function printEmployee(e: UnknowEmployee) {
  console.log(e.name);
  if ("privileges" in e) console.log(e.privileges);
  if ("startDate" in e) console.log(e.startDate);
}

printEmployee({ name: "Duc", startDate: new Date() });
