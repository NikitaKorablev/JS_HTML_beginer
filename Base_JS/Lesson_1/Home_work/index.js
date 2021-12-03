console.log('Hello world');

const num = 5;
console.log('number:', num, "\t\tThe type of num:", typeof(num));
// num = 0;
console.log(num);


let str = 'some string';
console.log(str, "\t\tThe type of str:", typeof(str));

let isBool = true;
console.log("isBool:", isBool, "\t\tThe type of isBool: ", typeof(isBool));

let userName = null; // значение пока не известно
console.log("user nsme:", userName, "\tThe type of userName:", typeof(userName));

userName = undefined;
console.log("user name:", userName, "\tThe type of userName:", typeof(userName));

const user_const = {
    first: {
        name: "Alex",
        age: 30
    },
    second: {
        name: "Mark",
        age: 15
    }
}

let user_let = {
    first: {
        name: "Alex",
        age: 30
    },
    second: {
        name: "Mark",
        age: 15
    }
}

var user_var = {
    first: {
        name: "Alex",
        age: 30
    },
    second: {
        name: "Mark",
        age: 15
    }
}

console.log("\nuser name:", user_const.first.name);
console.log("his age:", user_const.first.age, "\n");

console.log("user name:", user_const.second.name);
console.log("his age:", user_const.second.age, "\n");

console.log("type of user:", typeof(user_const));

user_const.second.age = 16;
console.log("age of the second person:", user_const.second.age);

user_let.first.age = 31;
console.log("age of the first person:", user_let.first.age);

user_var.first.name = "Anna";
console.log("name of the first person:",user_var.first.name)
