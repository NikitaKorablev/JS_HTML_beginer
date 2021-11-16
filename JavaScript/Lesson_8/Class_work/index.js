function sayFullName(firstName, lastName) {
  return `${this.phrase} ${firstName} ${lastName}`;
}

console.log(sayFullName("Alex", "Shirokov")); // Undefined Alex Shirokov

console.log(sayFullName.call({ phrase: "Hello!!" }, "Ivan", "Smirnov")); // Hello!! Ivan Smirnov

console.log(sayFullName.call({ phrase: "Hello!!" })); // Hello!! Undefined Undefined

console.log("\n-----------------------------");
let user1 = { name: "Вася" };
let user2 = { name: "Петя" };

function say(phrase) {
  console.log(`${this.name} : ${phrase}`);
}

say.call(user1, "Привет"); // Вася : Привет

say.call(user2, "И тебе привет"); // Петя : И тебе привет

console.log("\n-----------------------------");
let boundFullName = sayFullName
  .bind({ phrase: "Bye!" }, "Max", "Petrov")
  .bind({ phrase: "Hello" }, "Kate", "Petrova");

let bound2 = sayFullName.bind({ phrase: "Hello!" }, "Kate", "Petrova");

console.log(boundFullName);
console.log(boundFullName());

console.log(bound2);
console.log(bound2());

let bound3 = sayFullName.bind({ phrase: "Hello!" });

console.log(bound3("Kate", "Petrova"));

console.log("\n-----------------------------");

const town1 = {
  townName: "London",
  population: "13 ml",
  getTownName: function () {
    return this.townName;
  },
  getPopulation: function () {
    return this.population;
  },
  setSomeValue: function (key, value) {
    this[key] = value;
  },
};

const town2 = {
  townName: "Moskow",
  population: "15 ml",
};

// console.log(town1.getTownName());
console.log(town1.getTownName.call(town2));
console.log(town1.getPopulation.call(town2))
console.log(town1.getTownName())

console.log("\n-----------------------------");

const bound = town1.setSomeValue.bind(town2, "townName", "Paris");

console.log(town2);

console.log("\n-----------------------------");

const getVol = (heght) => (whidth, length) => heght * whidth * length;

const getAll = getVol(10); // height

console.log(getAll(4, 5)); // whidth, length


