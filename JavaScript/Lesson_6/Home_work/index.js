//task 1
console.log("----------task 1----------");

// Я не знал, что в JS работает split(), поэтому я написал свою програмку,
// которая может разбить строчку на массив слов. При чём в строчке может быть
// любое количество пробелов.
var str = "Каждый охотник желает знать где сидит фазан";

function stringToarray(str) {
  let a = [],
    funStr = str;
  while (funStr != " ") {
    let ind = funStr.indexOf(" ", 0);
    if (funStr.includes(" ") && ind != -1) {
      let point = "";
      for (let i = 0; i < ind; i++) {
        point += funStr[i];
      }
      if (point != " " && !point.includes(" ") && point != "") {
        a.push(point);
      }
      point = "";
      let new_str = "";
      for (let i = ind + 1; i < funStr.length; i++) {
        new_str += funStr[i];
      }
      funStr = new_str;
    } else if (!funStr.includes(" ")) {
      funStr != "" ? a.push(funStr) : 0;
      funStr = " ";
    }
  }
  return a;
}

var arr = stringToarray(str);
console.log(str);
console.log(arr);

// Таже 1 задача, только через split()

function stringToarray_v2(str) {
  return str.split(" ");
}

console.log(stringToarray_v2(str));

//task 2
console.log("----------task 2----------");
var str = "Каждый охотник желает знать";
function delete_characters(str, length) {
  return str.slice(0, length);
}

console.log(delete_characters(str, 6));

//task 3
console.log("----------task 3----------");
var str = "HTML JavaScript PHP";

function insert_dash(str) {
  str = str.trim().toUpperCase();
  while (str.includes(" ")) {
    str = str.replace(" ", "-");
  }
  return str;
}

console.log(insert_dash(str));

//task 4
console.log("----------task 4----------");

var str = "string not starting with capital";
function cursive_letter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

console.log(cursive_letter(str));

//task 5
console.log("----------task 5----------");
var str = "каждый охотник желает знать";

function capitalize(str) {
  str.trim();
  let a = str.split(" ");
  str = "";
  for (let i = 0; i < a.length; i++) {
    str += a[i][0].toUpperCase() + a[i].slice(1) + " ";
  }
  return str.trim();
}

console.log(capitalize(str));

//task 6
console.log("----------task 6----------");
var str = "КаЖдЫй ОхОтНиК жЕлАеТ зНаТь";

function change_register(str) {
  let new_str = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      new_str += str[i].toLowerCase();
    } else {
      new_str += str[i].toUpperCase();
    }
  }
  return new_str;
}

console.log(change_register(str));

//task 7
console.log("----------task 7----------");
var str = "every., -/ hunter #! wishes ;: {} to $ % ^ & * know";

function remove_char(str) {
  new_str = "";
  for (let i = 0; i < str.length; i++) {
    let cdPoint = str[i].codePointAt(0);
    if (str[i] == " ") {
      new_str += str[i];
    } else if (
      (48 <= cdPoint && cdPoint <= 57) ||
      (68 <= cdPoint && cdPoint <= 90) ||
      (97 <= cdPoint && cdPoint <= 122)
    ) {
      new_str += str[i];
    }
  }
  str = "";
  let count = 0;
  for (let i = 0; i < new_str.length; i++) {
    new_str[i] == " " ? count++ : (count = 0);
    count > 1 ? 0 : (str += new_str[i]);
  }
  return str;
}

console.log(remove_char(str));

//task 8
console.log("----------task 8----------");
function zeros(num, len, sign) {
  num = String(num);
  let zeros_count = len - num.length,
    new_str = "";
  if (zeros_count > 0) {
    !sign || sign === "+" ? (new_str += "+") : (new_str += "-");

    for (let i = 0; i < zeros_count; i++) {
      new_str += 0;
    }
    return new_str + num;
  } else {
    return "The number of digits in the number\n must must be greater than the length!";
  }
}

console.log(zeros(15, 4, "-"));
console.log(zeros(15, 4, "+"));
console.log(zeros(15, 4));
console.log(zeros(15, 1));

//task 9
console.log("----------task 9----------");

function comparison(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase();
}

console.log(comparison("ApPle", "apple"));

//task 10
console.log("----------task 10---------");

function insensitive_search(str1, str2) {
  return str1.toLowerCase().includes(str2.toLowerCase());
}

console.log(insensitive_search("Hello World!", "world"));

//task 11
console.log("----------task 11---------");

str = "hEllo woRld";
function initCap(str) {
  let a = str.toLowerCase().split(" ");
  if (a.length > 1) {
    str = a[0];
    for (let i = 1; i < a.length; i++) {
      str += a[i][0].toUpperCase() + a[i].slice(1);
    }
    return str;
  } else {
    return a[0];
  }
}

console.log(initCap(str));

//task 12
console.log("----------task 12---------");

str = "HelloWorld";

function initSnake(str) {
  let new_str = "";
  for (let i = 0; i < str.length; i++) {
    str[i] === str[i].toUpperCase() && i != 0
      ? (new_str += "_" + str[i].toLowerCase())
      : (new_str += str[i].toLowerCase());
  }
  return new_str;
}

console.log(initSnake(str));

//task 13
console.log("----------task 13---------");

function repeatStr(str, n) {
  n = n ? n : 1;
  let new_str = "";
  while (n > 0) {
    new_str += str;
    n--;
  }
  return new_str;
}

console.log(repeatStr("Hello!"));
console.log(repeatStr("Hello!", 3));

//task 14
console.log("----------task 14---------");

var pathname = "/home/user/dir/file.txt";

function path(pathname) {
  let len = pathname.length;
  while (pathname[len] != "/") {
    len--;
  }
  let new_str = "";
  for (let i = len + 1; i < pathname.length; i++) {
    new_str += pathname[i];
  }
  return new_str;
}

console.log(path(pathname));

//task 15
console.log("----------task 15---------");

var str = "Каждый охотник желает знать";
var str1 = "скрипт";
var str2 = "знать";

String.prototype.endsWith = function (substring) {
  return this.slice(this.length - substring.length) == substring;
};

console.log(str.endsWith(str1));
console.log(str.endsWith(str2));

//task 16
console.log("----------task 16---------");
var str = "Астрономия — Наука о небесных телах";

function getSubstr(str, char, pos) {
  if (pos == "after") {
    return str.slice(str.indexOf(char) + char.length);
  } else if (pos == "befor") {
    return str.slice(0, str.indexOf(char));
  }
}

console.log(getSubstr(str, "ук", "befor"));
console.log(getSubstr(str, "ук", "after"));

//task 17
console.log("----------task 17---------");
var str = "Астрономия — Наука о небесных телах";

function insert(str, substr, pos) {
  return pos ? str.slice(0, pos) + substr + str.slice(pos) : substr + str;
}

console.log(insert(str, "! Hello !", 6));
console.log(insert(str, "! Hello !"));

//task 18
console.log("----------task 18---------");

function limitStr(str, n, symb) {
  if (str.length <= n) {
    return str;
  } else {
    return str.slice(0, n) + (symb ? symb : "...");
  }
}

str = "Hello World!";
console.log(limitStr(str, 7, "---"));
console.log(limitStr(str, 5));

//task 19
console.log("----------task 19---------");

var symb = "о",
  str = "Астрономия это наука о небесных объектах";
function count(str, symb) {
  let new_str = str,
    k = 0;
  while (new_str.includes(symb)) {
    new_str = new_str.replace(symb, "");
    k++;
  }
  return k;
}

console.log(count(str, symb));

//task 20
console.log("----------task 20---------");

var str = "    Max is a good       boy     ";
// console.log(str.trim().split(" "));

function strip(str) {
  return str
    .trim()
    .split(" ")
    .filter((element) => element !== "")
    .reduce((e_1, e_2) => e_1 + " " + e_2);
}

console.log(strip(str));

//task 21
console.log("----------task 21---------");

var str = "Сила тяжести приложена к центру масс тела";

function cutString(str, n) {
  str = str.trim().split(" ");
  new_str = "";
  if (str.length < n) {
    return str.reduce((el1, el2) => el1 + " " + el2).trim();
  }
  for (let i = 0; i < str.length; i++) {
    if (i < n) {
      new_str += str[i] + " ";
    } else {
      return new_str.trim();
    }
  }
}

console.log(cutString(str, 10));
console.log(cutString(str, 5));
console.log(cutString(str, 1));

//task 22
console.log("----------task 22---------");
var str = "abc def ghi jkl mno pqr stu";

function findWord(word, str) {
  return str.trim().split(" ").includes(word);
}

console.log(findWord("def", str));