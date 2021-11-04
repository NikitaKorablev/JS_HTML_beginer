console.log("-----------task 1-----------");
//Используя метод map() напишите код, который получает из массива строк новый массив,
//содержащий их длины.

var vegetables = ["Капуста", "Репа", "Редиска", "Морковка"];

vegetableLength = vegetables.map((element) => element.length);
console.log(vegetableLength); // 7,4,7,8

console.log("-----------task 2-----------");
//Имеется массив простых чисел: numbers = [2, 3, 5, 7, 11, 13, 17, 19].
//Используя метод reduce() напишите функцию currentSums(numbers),
//которая возвращает новый массив из такого же числа элементов, в котором
//на каждой позиции будет находиться сумма элементов массива numbers
//до этой позиции включительно.

numbers = [2, 3, 5, 7, 11, 13, 17];

function currentSums(array) {
  for (let i = 1; i < array.length; i++) {
    array[i] = [array[i - 1], array[i]].reduce((el1, el2) => el1 + el2);
  }
  return array;
}

console.log(currentSums(numbers));

console.log("-----------task 3-----------");
//Напишите код, который получает из массива чисел новый массив, содержащий пары чисел,
//которые в сумме должны быть равны семи: (0:7), (1:6) и т.д.

var arr = [0, 1, 2, 3, 4, 5, 6, 7];
function sumSeven(numbers) {
  let a = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 7) {
        a.push([numbers[i], numbers[j]]);
      }
    }
  }
  return a;
}

console.log(sumSeven(arr));

console.log("-----------task 4-----------");
//Перед вами переменная, содержащая строку. Напишите код, создащий массив,
//который будет состоять из первых букв слов строки str.

var str = "Каждый охотник желает знать, где сидит фазан.";
array = str
  .trim()
  .split(" ")
  .map((e) => e[0]);

console.log(array);

console.log("-----------task 5-----------");
//Перед вами переменная, содержащая строку. Напишите код, создащий массив,
//который будет состоять из строк, состоящих из предыдущего, текущего и следующего символа строки str.

var str = "JavaScript",
  a = [];

for (let i = 0; i < str.length; i++) {
  a.push("");
  for (let j = -1; j < 2; j++) {
    if (str[i + j] != undefined) {
      a[i] += str[i + j];
    }
  }
}

console.log(a);

console.log("-----------task 6-----------");
//Напишите код, преобразующий массив цифр, которые располагаются неупорядоченно,
//в массив цифр расположенных по убыванию их значений.

var numerics = [5, 7, 2, 9, 3, 1, 8],
  length_num = numerics.length,
  a = [];

while (a.length != length_num) {
  a.push(Math.max.apply(null, numerics));
  let index = numerics.indexOf(Math.max.apply(null, numerics));
  if (index != -1) {
    numerics.splice(index, 1);
  }
}
console.log(a);

// Сортировка пузырьком
let i = 0;
numerics = [5, 7, 2, 9, 3, 1, 8];
while (i !== numerics.length) {
  let member = numerics[i];
  if (member < numerics[i + 1]) {
    numerics[i] = numerics[i + 1];
    numerics[i + 1] = member;
    i = 0;
  } else {
    i++;
  }
}
console.log(numerics);

console.log("-----------task 7-----------");
//Напишите код, объединяющий три массива цифр, и располагающий цифры,
//в полученном массиве, в порядке убывания их значений через пробел.

var a = [1, 2, 3];
var b = [4, 5, 6];
var c = [7, 8, 9];

function getArr(a, b, c) {
  a = a.concat(b, c);
  return a.reverse().reduce((el1, el2) => el1 + " " + el2);
}
console.log(getArr(a, b, c));

console.log("-----------task 8-----------");
//Дан двухмерный массив с числами, например [[1, 2, 3], [4, 5], [6]].
//Найдите сумму элементов этого массива. Массив, конечно же, может быть произвольным.

function arrSum(arr) {
  return arr
    .map((e) => {
      if (typeof e === "object") {
        return e.reduce((el1, el2) => el1 + el2);
      } else {
        return e;
      }
    })
    .reduce((el1, el2) => el1 + el2);
}
array = [[1, 2, 3], [4, 5], [6]];
console.log("sum of array:", array, "=", arrSum(array));

array = [[1, 2, 3], [4, 5], [6], 3];
console.log("sum of array:", array, "=", arrSum(array));

console.log("-----------task 9-----------");
//Дан трехмерный массив с числами, например [[[1, 2], [3, 4]], [[5, 6], [7, 8]]].
//Найдите сумму элементов этого массива. Массив, конечно же, может быть произвольным.

function mergeOfArray(arr) {
  if (arr.find((e) => typeof e === "object") !== undefined) {
    return mergeOfArray(arr.reduce((a, b) => a.concat(b)));
  }
  return arr.reduce((a, b) => a + b);
}

array = [
  [
    [1, 2],
    [3, 4],
  ],
  [
    [5, 6],
    [7, 8],
  ],
];
console.log(mergeOfArray(array));

console.log("-----------task 10----------");
//Дан массив с числами. Не используя метода reverse переверните его элементы в обратном порядке.

array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
arr = [];
for (let i = array.length - 1; i > -1; i--) {
  arr.push(array[i]);
}
console.log(arr);

console.log("-----------task 11----------");
// Дан массив с числами. Узнайте сколько элементов с начала массива надо сложить,
//чтобы в сумме получилось больше 10-ти.

array = [0, 5, 3, 8, 10, 4, 6, 2];
function countOfElements(array, digit) {
  for (let i = 1; i < array.length; i++) {
    array[i] = array[i] + array[i - 1];
  }
  return array.indexOf(array.find((e) => e > digit)) + 1;
}

console.log(countOfElements(array, 10));

console.log("-----------task 12----------");
//Сделайте функцию arrayFill, которая будет заполнять массив заданными значениями.
//Первым параметром функция принимает значение, которым заполнять массив,
//а вторым - сколько элементов должно быть в массиве.
//Пример: arrayFill('x', 5) сделает массив ['x', 'x', 'x', 'x', 'x'].

function arrayFill(filler, count) {
  let array = [];
  while (array.length < count) {
    array.push(filler);
  }
  return array;
}

console.log(arrayFill("x", 5));
