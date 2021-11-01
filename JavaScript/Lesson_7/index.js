let a, b;

// task 1
console.log("--------task 1--------");
a = [5, -3, 2, 9, 4, 6, -2];
let sumEvenDigits = (array) => {
  let sum = 0;
  return array
    .filter((e) => e > 0 && e % 2 === 0, 0)
    .reduce((accume, current) => accume + current, 0);
};

console.log(sumEvenDigits(a));

// task 2
console.log("--------task 2--------");
let array = [5, 5, 3, -6, 10, 7, 3];

let repeatNumbers = (array) => {
  let copyArray = [];
  array.forEach((element) => {
    if (!copyArray.find((e) => e === element)) {
      copyArray.push(element);
    }
  });
  return copyArray;
};

console.log(repeatNumbers(array));

// task 3
console.log("--------task 3--------");

function isEqualArray(arr1, arr2) {
  return (
    arr1.reduce((e1, e2) => e1.toString() + e2) ===
    arr2.reduce((e1, e2) => e1.toString() + e2)
  );
}

console.log(isEqualArray([0, 1, 2, 3], [0, 1, 2, 3]));
console.log(isEqualArray([0, 1, 3], [0, 1, 2, 3]));

console.log("--------")
function isEqualArray(arr1, arr2) {
  return arr1.toString() === arr2.toString();
}

console.log(isEqualArray([0, 1, 2, 3], [0, 1, 2, 3]));
console.log(isEqualArray([0, 1, 3], [0, 1, 2, 3]));