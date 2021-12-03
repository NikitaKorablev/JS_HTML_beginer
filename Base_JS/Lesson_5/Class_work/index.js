let i;
// --------------Функции-------------- \\

function helloWorld() {
    console.log("Hello World");
}

helloWorld();

// 1 task
function salute(userName) {
    userName = userName || 0;
    userName ? console.log("Приветствую тебя,", userName + "!!!") : console.log("Приветствую тебя, гость!!!");;
}

let name = "Никита"
salute(name);

// 2 task
function power(x, n) {
    n = n || 1;
    x = Math.pow(x, n);
    return x;
}

let a = power(2, 5);
console.log("power a is: ", a);

// 3 task
a = [2, 5, 6, 10, 3, 0, 4];
let sum = 0;
for (i = 0; i < a.length; i ++) {
    sum += a[i];
}
console.log("Среднее арифметическое:", sum / a.length, "\n");

// --------------Стрелочные функции-------------- \\

// 1 task
const print = (a, n) => {
    let i;
    for (i = 0; i < n; i++) {
        console.log(a);
    }
}

print("55", 3);

// 2 task
const letter = (a) => {
    let i, result = false;
    vowels_ru = 'аеёиоуэюя';
    vowels_en = "aeyuio";
    for (i = 0; i < vowels.length; i++) {
        if (vowels_ru[i] == a || vowels_en[i] == a) {
            result = true;
            break;
        }
    }
    console.log(result);
}

letter("б");

// 3 task
const isPalindrome = (a) => {
    let i, pal = "";
    for (i = 0; i < a.length; i++) {
        pal += a[a.length - 1 - i];
    }
    a === pal ? console.log(true) : console.log(false);
}

isPalindrome("анна");


