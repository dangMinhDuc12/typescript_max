"use strict";
let e1 = {
    name: "Duc",
    privileges: ["create-server"],
    startDate: new Date(),
};
function printEmployee(e) {
    console.log(e.name);
    if ("privileges" in e)
        console.log(e.privileges);
    if ("startDate" in e)
        console.log(e.startDate);
}
printEmployee({ name: "Duc", startDate: new Date() });
