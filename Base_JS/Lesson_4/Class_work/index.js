// if (true) {
//     console.log("TRUE");
// }

// if (0){
//     console.log("FALSE");
// }

// -----------------------Условные операторы--------------------------
// -------------------------------------------------------------------

// const a = 50;
// const b = 10;
// const c = 3;

// if (a > b){
//     if (a > c){
//         console.log(a);
//     } else {
//         console.log(c);
//     }
// } else{
//     if (b > c){
//         console.log(b);
//     } else{
//         console.log(c);
//     }
// }

// -------------------------------------------------------------------

// const a = 5;
// const b = 10;
// const c = 30;

// if (a > b){
//     a > c ? console.log(a) : console.log(c);
// } else{
//     b > c ? console.log(b) : console.log(c);
// }

// -------------------------------------------------------------------

// const a = 5;
// const b = 10;
// const c = 30;

// a > b ? (a > c ? console.log(a) : console.log(c)) : (b > c ? console.log(b) : console.log(c));

// -------------------------------------------------------------------

// const t = 10;

// if (t < -30){
//     console.log("Оставайтесь дома!!!");
// } else if (-30 < t && t <= -10){
//     console.log("Сегоднф холодно");
// } else if (-10 < t && t <= 5){
//     console.log("Не холодно")
// } else if (5 < t && t <= 15){
//     console.log("Тепло");
// } else if (15 < t && t <= 25){
//     console.log("Очень тепло");
// } else if (25 < t && t < 35){
//     console.log("Жарко");
// } else {
//     console.log("Пекло!!!");
// }

// -------------------------------------------------------------------

// let command = "birthday";

// switch (command){
//     case "name":
//         console.log('Nikita');
//         return;
//     case "id":
//         console.log('25666474');
//         return;
//     case "birthday":
//         console.log('06.10.гг');
//         return;
//     default:
//         console.log("undefined command");
// }

// ----------------------Логические операторы-------------------------
// -------------------------------------------------------------------

console.log(null || 0 || "" || undefined); // undefined
console.log("яблоко" && true && null && 1); // null
console.log(true && "false");
console.log(0 || (true && "false") || null); // false
