let i;
let a = [],
  b = [];

/* ----------------Работа с if-else---------------- */

console.log("----------------Работа с if-else----------------");

a = [1, 0, -3];
for (i = 0; i < 3; i++) {
  console.log("a = ", a[i], ": ");
  console.log("\ta = 0:  ", a[i] == 0 ? "Верно" : "Неверно");
  console.log("\ta > 0:  ", a[i] > 0 ? "Верно" : "Неверно");
  console.log("\ta < 0:  ", a[i] < 0 ? "Верно" : "Неверно");
  console.log("\ta >= 0: ", a[i] >= 0 ? "Верно" : "Неверно");
  console.log("\ta <= 0: ", a[i] <= 0 ? "Верно" : "Неверно");
  console.log("\ta != 0: ", a[i] != 0 ? "Верно" : "Неверно", "\n");
}

a = ["test", "тест", 3];
for (i = 0; i < 3; i++) {
  if (a[i] == "test") {
    console.log(a[i], " == 'test': ", "Верно");
  } else {
    console.log(a[i], " == 'test': ", "Неверно");
  }
}
console.log();

a = ["1", 1, 3];
for (i = 0; i < 3; i++) {
  if (a[i] === "1") {
    console.log(a[i], " === '1': ", "Верно");
  } else {
    console.log(a[i], " === '1': ", "Неверно");
  }
}
console.log();

/* -------------Работа с логическими переменными------------- */

console.log("-----------Работа с логическими переменными-----------");

let test;
for (test = 0; test < 2; test++) {
  console.log(test ? "Верно" : "Неверно");
}
console.log();

test = true;
if (test) {
  console.log("Верно");
} else {
  console.log("Неверно");
}
console.log("\n");

for (test = 0; test < 2; test++) {
  console.log(test != true ? "Верно" : "Неверно");
}
console.log();

test = true;
if (test != true) {
  console.log("Верно");
} else {
  console.log("Неверно");
}
console.log();

/* -------------Работа с && (и) и || (или)------------- */

console.log("-----------Работа с && (и) и || (или)-----------");

a = [5, 0, -3, 2];

for (i = 0; i < 4; i++) {
  console.log("a = ", a[i], ":");
  console.log("0 < a < 5: ", a[i] > 0 && a[i] < 5 ? "Верно" : "Неверно");
  console.log(a[i] == 0 || a[i] == 2 ? a[i] + 7 : a[i] / 10);
  console.log();
}

a = [1, 0, 3];
b = [3, 6, 5];

let s;
for (i = 0; i < 3; i++) {
  s = a[i] + ", " + b[i] + ": ";
  a[i] <= 1 && b[i] >= 3
    ? console.log(s, a[i] + b[i])
    : console.log(s, Math.abs(a[i] - b[i]));
}

a = 5;
b = 10;
(a > 2 && a < 11) || (b >= 6 && b < 14)
  ? console.log("Верно")
  : console.log("Неверно");
console.log();

/* -------------На switch-case------------- */

console.log("-----------На switch-case-----------");

let result,
  num = 1;
switch (num) {
  case 1:
    result = "Зима";
    break;
  case 2:
    result = "Весна";
    break;
  case 3:
    result = "Лето";
    break;
  case 4:
    result = "Осень";
    break;
  default:
    result = "Num is not defined";
    break;
}

console.log("result = ", result, "\n");

/* -------------Общие задачи------------- */

console.log("-----------Общие задачи-----------");
// 1 task
function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

let day = getRandom(1, 31);
1 <= day && day <= 10
  ? console.log(day, ": Первая декада")
  : 10 < day && day <= 20
  ? console.log(day, ": Вторая декада")
  : console.log(day, ": Третья декада");

// 2 task
let month = getRandom(1, 12);
3 <= month && month <= 5
  ? console.log(month, ": Весна")
  : 6 <= month && month <= 8
  ? console.log(month, ": Лето")
  : 9 <= month && month <= 11
  ? console.log(month, ": Осень")
  : console.log(month, ": Зима");
console.log();

// 3 task
a = "afghj";
a[0] === "a" ? console.log("Да") : console.log("Нет");

// 4 task
a = "523456";
a[0] === "1" || a[0] === "2" || a[0] === "3"
  ? console.log("Да")
  : console.log("Нет");

// 5 task
a = "541";
console.log(
  "sum_1 a =",
  Math.floor(a[0]) + Math.floor(a[1]) + Math.floor(a[2])
);
// ____________or____________
let sum = 0;
for (i = 0; i < 3; i++) {
  sum += a[i] - 0;
}
console.log("sum_2 a =", sum);

// 6 task
a = "753951";
let firstSum = 0,
  secondSum = 0;
for (i = 0; i < 3; i++) {
  firstSum += a[i] - 0;
  secondSum += a[i + 3] - 0;
}
console.log("firstSum == secondSum:", firstSum == secondSum ? "Да" : "Нет");

/* -------------Циклы while и for------------- */

console.log("-----------Циклы while и for-----------");

// 1 task
// i = 0;
// while (i < 100) {
//   console.log(i+1);
//   i += 1;
// }

// for (i = 0; i < 100; i++) {
//   console.log(i + 1);
// }

// 2 task
// i = 10;
// while (i < 33) {
//   console.log(i + 1);
//   i += 1
// }

// for (i = 10; i < 33; i++){
//   console.log(i+1);
// }

// 3 task
// i = 0;
// while (i <= 100) {
//   i % 2 == 0 ? console.log(i) : 0;
//   i += 1;
// }

// for (i = 0; i <= 100; i++) {
//   i % 2 == 0 ? console.log(i) : 0;
// }

// 4 task
i = 1;
sum = 0;
while (i <= 100) {
  sum += i;
  i += 1;
}
console.log(sum);

sum = 0;
for (i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);

/* -------------Работа с for для массивов------------- */

console.log("-----------Работа с for для массивов-----------");

// 1 task
a = [1, 2, 3, 4, 5];
for (i = 0; i < a.length; i++) {
  console.log(a[i]);
}
console.log();

// 2 task
a = [1, 2, 3, 4, 5];
result = 0;
for (i = 0; i < a.length; i++) {
  result += a[i];
}
console.log("sum = ", result, "\n");

/* -------------Задачи общие------------- */

console.log("-----------Задачи общие-----------");

// 1 task
a = [2, 5, 9, 15, 0, 4];
for (i = 0; i < a.length; i++) {
  if (a[i] > 3 && a[i] < 10) {
    console.log(a[i]);
  }
}
console.log();

// 2 task
a = [1, 15, -1, 2, 8];
sum = 0;
for (i = 0; i < a.length; i++) {
  a[i] > 0 ? (sum += a[i]) : 0;
}
console.log("sum = ", sum, "\n");

// 3 task
a = [1, 2, 5, 9, 4, 13, 4, 10];
for (i = 0; i < a.length; i++) {
  a[i] == 4 ? console.log("Есть!") : 0;
}

// 4 task
a = [10, 20, 30, 50, 235, 3000];
for (i = 0; i < a.length; i++) {
  s = (a[i] + "")[0];
  s == "1" || s == "2" || s == "5" ? console.log(a[i]) : 0;
}

// 5 task
a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
s = "-";
for (i = 0; i < a.length; i++) {
  s += i + "-";
}
console.log(s);

/* Если честно, я не придумадл как напечатать текст жирным шрифтом и курсивом */
// 6 task
a = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота".bold(),
  "Воскресенье".bold(),
];

for (i = 0; i < a.length; i++) {
  console.log(a[i]);
}
console.log();

// 7 task
a = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];
day = "Пятница";
for (i = 0; i < a.length; i++) {
  a[i] == day ? console.log(a[i].italics()) : console.log(a[i]);
}

// 8 task
num = 0;
n = 1000;
while (n >= 50) {
  n /= 2;
  num += 1;
}
console.log(n, num);
