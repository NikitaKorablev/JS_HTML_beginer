const people = {
    getName: function() {
        return this.name;
    },
};

const user = {
    name: "Alex",
    __proto__: people,
};

const admin = {
    // name: "Vasya",
    __proto__: user,
};

console.log(user.getName());
console.log(people.getName());
console.log(admin.getName());


console.log("\n---------------------")
function createUser(name, age) {
    this.userName = name;
    this.userAge = age;
    this.sayHi = function() {
        return `Hello! My name is ${this.userName}`;
    };
};

const userOne = new createUser("Alex", 25);
const userTwo = new createUser("Max", 30);

console.log(userOne);
console.log(userTwo);

console.log(userTwo.sayHi())

console.log("\n---------------------")
function postcard(from, to) {
    this.from = from;
    this.to = to;
    this.show = function() {
        console.log("Postcard from " + this.from + " to " + this.to);
    };
}
const card1 = new postcard("Alex", "Mihail");
card1.show();

postcard.prototype.newFrom = function(from) {
    this.from = from;
}
card1.newFrom("Max");
card1.show();







