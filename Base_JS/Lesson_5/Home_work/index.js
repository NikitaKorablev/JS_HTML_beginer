let a, b, num;

//task 1
console.log("---------task 1----------");
let square = (digit) => {
  return digit * digit;
};
console.log("square of the digit =", square(6));

//task 2
console.log("---------task 2----------");
let sum = (digit_1, digit_2) => {
  return digit_1 + digit_2;
};
let firstDigit = 6,
  secondDigit = 5;
console.log(firstDigit, "+", secondDigit, "=", sum(firstDigit, secondDigit));

//task 3
console.log("---------task 3----------");
let minusDivision = (digit_1, digit_2, digit_3) => {
  return (digit_1 - digit_2) / digit_3;
};
(firstDigit = 12), (secondDigit = 6);
let thirdDigit = 3;
console.log(
  "(" +
    firstDigit +
    " - " +
    secondDigit +
    ")/" +
    thirdDigit +
    " = " +
    minusDivision(firstDigit, secondDigit, thirdDigit)
);

//task 4
console.log("---------task 4----------");
let dayOfWeek = (number) => {
  switch (number) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "---";
  }
};
let numberOfDay = 0;
console.log(numberOfDay, "day of the week:", dayOfWeek(numberOfDay));

//task 5
console.log("---------task 5----------");
let equal = (digit_1, digit_2) => {
  return digit_1 == digit_2;
};
(firstDigit = 4), (secondDigit = 4);
console.log(firstDigit, "==", secondDigit, ":", equal(firstDigit, secondDigit));

//task 6
console.log("---------task 6----------");
let moreThen = (digit_1, digit_2) => {
  return digit_1 + digit_2 > 10;
};
(firstDigit = 3), (secondDigit = 5);
console.log(
  firstDigit,
  "+",
  secondDigit,
  "> 10 :",
  moreThen(firstDigit, secondDigit)
);

//task 7
console.log("---------task 7----------");
let isNegative = (digit) => {
  return digit < 0;
};
let digit = -3;
console.log(digit, "< 0:", isNegative(digit));

//task 8
console.log("---------task 8----------");

let isNumberINRange = (num) => {
  if (num > 0 && num < 10) {
    return true;
  } else {
    return false;
  }
};

digit = 9;
console.log("0 <", digit, "< 10:", isNumberINRange(digit));

// task 9
console.log("---------task 9----------");
(a = [1, 10, 9, 0, -4, 60]), (b = []);
for (let i = 0; i < a.length; i++) {
  if (isNumberINRange(a[i])) {
    b.push(a[i]);
  }
}

console.log("old array:", a);
console.log("elements of array whith > 0 and < 10:", b);

// let c = a.concat(b);
// console.log();
// for (let i = 0; i < c.length; i++) {
//     console.log(c[i]);
// }

// task 10
console.log("---------task 10---------");
let getDigitsSum = (digit) => {
  digit = digit.toString();
  digitsSum = 0;
  for (let i = 0; i < digit.length; i++) {
    digitsSum += Number(digit[i]);
  }
  return digitsSum;
};

num = 524;
console.log("digits sum of", num, "=", getDigitsSum(num));

//task 11
console.log("---------task 11---------");

a = [];
for (let i = 0; i < 2020; i++) {
  if (getDigitsSum(i + 1) == 13) {
    a.push(i + 1);
  }
}

console.log("Elements whitch digits = 13:");
console.log(a);

//task 12
console.log("---------task 12---------");
let isEven = (even) => {
  if (even % 2 == 0) {
    return true;
  } else {
    return false;
  }
};

num = 56;
console.log(isEven(num));

//task 13
console.log("---------task 13---------");

a = [5, 0, 4, 40, 5, 63, 15];
b = [];

for (let i = 0; i < a.length; i++) {
  if (isEven(a[i])) {
    b.push(a[i]);
  }
}

console.log(a);
console.log(b);

//task 14
console.log("---------task 14---------");

function getDivisors(digit) {
  a = [1];
  for (i = 2; i <= Math.ceil(digit / 2) + 1; i++) {
    if (digit % i == 0) {
      a.push(i);
    }
  }
  a.push(digit);
  return a;
}

digit = 9;
console.log("divisors for", digit, ":", getDivisors(digit));

// task 15
console.log("---------task 15---------");
a = [6, 5, 1, 15, 7];
console.log(a);
let magicNumber = 0;

function arrSort(a) {
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1]) {
      magicNumber = a[i];
      a[i] = a[i + 1];
      a[i + 1] = magicNumber;
      arrSort(a);
    }
  }
  return a;
}

console.log(arrSort(a));

// task 16
console.log("---------task 16---------");
function sumOfDigits(digit) {
  digit = String(digit);
  let sum = 0;
  for (let i = 0; i < digit.length; i++) {
    sum += Number(digit[i]);
  }
  if (sum < 10) {
    return sum;
  } else {
    return sumOfDigits(sum);
  }
}

digit = 39;
console.log("sum of digits:", sumOfDigits(digit));
