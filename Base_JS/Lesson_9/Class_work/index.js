// const people = {
//     getName: function() {
//         return this.name;
//     },
// };

// const user = {
//     name: "Alex",
//     __proto__: people,
// };

// const admin = {
//     // name: "Vasya",
//     __proto__: user,
// };

// console.log(user.getName());
// console.log(people.getName());
// console.log(admin.getName());

// console.log("\n---------------------")
// function createUser(name, age) {
//     this.userName = name;
//     this.userAge = age;
//     this.sayHi = function() {
//         return `Hello! My name is ${this.userName}`;
//     };
// };

// const userOne = new createUser("Alex", 25);
// const userTwo = new createUser("Max", 30);

// console.log(userOne);
// console.log(userTwo);

// console.log(userTwo.sayHi())

// console.log("\n---------------------")
// function postcard(from, to) {
//     this.from = from;
//     this.to = to;
//     this.show = function() {
//         console.log("Postcard from " + this.from + " to " + this.to);
//     };
// }
// const card1 = new postcard("Alex", "Mihail");
// card1.show();

// postcard.prototype.newFrom = function(from) {
//     this.from = from;
// }
// card1.newFrom("Max");
// card1.show();

// console.log("\n---------------------");
// class Parent {
//   constructor(name) {
//     this.name = name;
//   }

//   sayName() {
//     return `Привет, моё имя ${this.name}`;
//   }
// }

// const firstParent = new Parent("Max");
// console.log(firstParent);
// console.log(firstParent.sayName());

// class Child extends Parent {
//   constructor(name, lastName) {
//     super(name);
//     this.lastName = lastName;
//   }

//   sayName() {
//       console.log("Это внутренний метод");
//   }

//   sayLastName() {
//     return `Моя фамилия ${this.lastName}`;
//   }

//   sayFullName() {
//     return `Моё полное имя ${this.lastName} ${this.name}`;
//   }
// }

// const firstChild = new Child("Ivan", "Petrov");

// console.log(firstChild);
// console.log(firstChild.sayFullName());
// console.log(firstChild.sayName());
// console.log(firstChild.sayLastName());


class People {
    constructor (name, surname) {
        this.name = name;
        this.surname = surname;
    }

    getFullName() {
        return `My name is ${this.name} ${this.surname}`
    }
}

const firstPerson = new People("Alex", "Ivanov");

console.log(firstPerson);
console.log(firstPerson.getFullName());

class Worker extends People {
    constructor (name, surname, rate, day) {
        super(name, surname);
        this.rate = rate;
        this.day = day;
    }

    getSalary() {
        return `Your sallary is ${this.rate * this.day}`
    }
}

const firstWorker = new Worker("Ivan", "Korablev", 12000, 5);

console.log(firstWorker);
console.log(firstWorker.getSalary());



