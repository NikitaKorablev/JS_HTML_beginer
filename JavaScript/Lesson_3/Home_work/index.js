console.log("кот" > "код"); // бинарная запись "т" > "д" => "кот" > "код"
console.log("2" + 2 * "2"); // "2" + 4 = "24"
console.log(undefined == null); // true особенность языка
console.log(undefined != null); // false особенность
console.log(null == 0); // false
console.log(2 > "3"); // false 2 > 3
console.log(null - false + true); // пусто - 0 + 1 = 0 + 1
console.log(1 / "l"); // нельзя делить на строчку
console.log("2" * "3"); // 2 * 3 = 6
console.log(4 + 5 + "O"); // 9 + "0" = "9" + "0"  = "90"
console.log("l" + 4 + 5); // "l" + "4" + 5 = "l4" + "5" = "l45"
console.log("4" - 2); // 4 - 2 = 2
console.log("4" - "4x"); // нельзя преобразовать "4x" в число -> NaN
console.log("23" == 23); // 23 == 23 true
console.log(null == false); // false
console.log(" -4 "/ 0 + 1); // (-4 / 0) + 1 = -беск, на 0 делить нельзя
console.log(null + 1); // ничего + 1 = 1
console.log(undefined + null); // при не явном преобразовании underfind преобразовывается в NaN, null в 0 -> NaN + 0 = NaN
console.log(1 === "1"); // значения равны, а тмпы разные -> false
console.log("2" > 10); //неявное преобразование "2" в 2 -> 2 > 10 = false
console.log(NaN == undefined); // undefined можно сравнить только с null
