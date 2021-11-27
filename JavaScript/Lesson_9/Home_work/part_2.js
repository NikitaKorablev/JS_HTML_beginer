class Worker {
  constructor(name, surname, rate, days) {
    this._name = name;
    this._surname = surname;
    this._rate = rate;
    this._days = days;
  }

  getName() {
    return `${this._name}`;
  }

  getSurname() {
    return `${this._surname}`;
  }

  getRate() {
    return `${this._rate}`;
  }

  getDays() {
    return `${this._days}`;
  }

  getSalary() {
    return `Зарплата работника: ${this._rate * this._days}`;
  }

  getFullName() {
    return `${this._name} ${this._surname}`;
  }

  setRate(rate) {
    return (this._rate = rate);
  }

  setDays(days) {
    return (this._days = days);
  }
}

const worker = new Worker("Alexandr", "Petrov", 10, 31);

console.log(worker.getName()); //выведет 'Иван'
console.log(worker.getSurname()); //выведет 'Иванов'
console.log(worker.getRate()); //выведет 10
console.log(worker.getDays()); //выведет 31
console.log(worker.getSalary()); //выведет 310 - то есть 10*31
console.log(worker.getFullName(), "\n");

worker.setRate(20);
worker.setDays(10);
console.log(worker.getSalary());

console.log("\n----------------------------------\n");
class Boss extends Worker {
  constructor(_name, _surname, _rate, _days, workers) {
    super(_name, _surname, _rate, _days);
    this._workers = workers;
  }

  getWorkers() {
    return `${this._workers}`;
  }

  getSalary() {
    return `Зарплата Босса: ${this._workers * this._rate * this._days}`;
  }
}

const boss = new Boss("Иван", "Иванов", 10, 31, 10);
console.log(boss.getName()); //выведет 'Иван'
console.log(boss.getSurname()); //выведет 'Иванов'
console.log(boss.getFullName()); //выведет 'Иванов Иван'
console.log(boss.getRate()); //выведет 10
console.log(boss.getDays()); //выведет 31
console.log(boss.getWorkers()); //выведет 10
console.log(boss.getSalary()); //выведет 3100 - то есть 10*31*10

console.log("\n----------------------------------\n");

class MyString {
  reverse(string) {
    return string.split("").reverse().join("");
  }

  ucFirst(string) {
    return string.trim()[0].toUpperCase() + string.trim().slice(1);
  }

  ucWord(string) {
    string = string.trim().split(" ");
    for (let i = 0; i < string.length; i++) {
      string[i] = this.ucFirst(string[i]);
    }
    return string.join(" ");
  }
}

const str = new MyString();

let letter = "hello world!";

console.log(str.reverse("abcde")); //выведет 'edcba'
console.log(str.ucFirst("abcde")); //выведет 'Abcde'
console.log(str.ucWord("abcde abcde abcde")); //выведет 'Abcde Abcde Abcde'

console.log("\n----------------------------------\n");

class Validator {
  isEmail(email) {
    return email.trim().endsWith("@mail.ru");
  }
  isDomain(domain) {
    return domain.trim().endsWith(".net");
  }
  isDate(date) {
    date = date.trim().split(".");
    if (
      date[0].length != 2 ||
      !Number(date[0]) ||
      date[1].length != 2 ||
      !Number(date[1]) ||
      date[2].length != 4 ||
      !Number(date[2])
    )
      return false;

    return true;
  }
  isPhone(phone) {
    phone = phone.trim().split(" ");
    if (
      phone.length != 3 ||
      phone[0] != "+7" ||
      phone[2].split("-").join("").length != 7 ||
      !Number(phone[2].split("-").join(""))
    )
      return false;
    return true;
  }
}

let validator = new Validator();

console.log(validator.isEmail("phphtml@mail.ru"));
console.log(validator.isDomain("phphtml.net"));
console.log(validator.isDate("12.05.2020"));
console.log(validator.isPhone("+7 (909) 817-68-92"));

console.log("\n----------------------------------\n");

class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  getFullName() {
    return this.surname + " " + this.name;
  }
}

class student extends User {
  constructor(name, surname, yearAdmition) {
    super(name, surname);
    this.yearAdmition = yearAdmition;
  }

  getCourse() {
    return 2021 - this.yearAdmition + 1;
  }
}

const first_student = new student("Alex", "Petrov", 2020);

console.log(first_student.getFullName());
console.log(first_student.getCourse());




