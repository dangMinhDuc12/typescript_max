class Person {
  readonly name: string;
  private hobbies: string[] = [];
  protected notify: string = "Person class";

  constructor(name: string) {
    this.name = name;
  }

  printName() {
    console.log(`Your name is ${this.name}`);
  }

  addHobby(...hobby: string[]) {
    this.hobbies.push(...hobby);
  }

  get hobbiesInfo() {
    return this.hobbies;
  }

  set hobbiesInfo(value: string[]) {
    this.hobbies = value;
  }
}

class Student extends Person {
  ability: string;

  constructor(name: string, ability: string) {
    super(name);
    this.ability = ability;
  }

  addHobby(...hobby: string[]) {
    console.log(this.notify);
    super.addHobby(...hobby);
  }
}

const maxUser = new Person("Maximillian");
maxUser.printName();

maxUser.addHobby("game", "sport");

maxUser.hobbiesInfo = ["code"];
console.log(maxUser.hobbiesInfo);

const studentA = new Student("studentA", "good");

studentA.addHobby("game", "sport");

console.log(studentA);
