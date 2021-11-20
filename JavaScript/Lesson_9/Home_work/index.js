// 1. Реализовать таймер-функцию используя замыкания.
//Функция принимает два  аргумента начальное значение и значение завершения. Таймер движется назад.
// Пример:
// foo(start, end).
// При достижении точки завершения в консоль выводится значение таймера и сообщение о завершении работы таймера.

// function Timer(start, end) {
//   console.log(start, end);

//   let timeNow = start;
//   let timeEnd = end;

//   return function () {
//     if (timeNow != timeEnd) {
//       console.log(`${timeNow - timeEnd} ticks left`);
//       timeNow--;
//       return true;
//     } else {
//       console.log("Time is out!!!", `Timer value: ${timeNow}`);
//       return false;
//     }
//   };
// }

// const testTime = Timer(20, 10);

// while (testTime()) {}

// 2. Что выведет функция?
// console.log("\n---------------------");

// function f() {
//   alert( this ); // Браузер выведет [object Window], а node - Object [global]
// }

// let user = {
//   g: f.bind(null),
// };

// user.g();

// 3. Можем ли мы изменить this дополнительным связыванием?
// function f() {
//   alert(this.name);
// }

// f = f.bind({ name: "Вася" }).bind({ name: "Петя" });

// f();

// bind вернёт нам "экзотический" объект, который нельзя изменить. Поэтому программа выведет нам "Вася"

// 4. В свойство функции записано значение. Изменится ли оно после применения bind? Обоснуйте ответ.
function sayHi(name) {
  alert((this.name = name)); // "Вася"
  // console.log(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "Вася",
});

alert(bound.test); // что выведет? почему?

// 5. Вызов askPassword() в приведённом ниже коде должен проверить пароль и затем вызвать user.loginOk/loginFail в зависимости от ответа.

// Однако, его вызов приводит к ошибке. Почему?

function askPassword(ok, fail) {
  let password = prompt("Password?", "");
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "Вася",

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },
};

askPassword(user.loginOk, user.loginFail);
