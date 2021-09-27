// 1 переменные
// const firstName = 'Nikita'
// const lastName = 'Korablev'
// const age = 17
// const programmer = true
// console.log(programmer)

// 2
// const lastName = prompt('Введите фамилию: ')
// console.log(lastName)

// 3 Операторы
// let currentYear = 2021
// const birthYear = 2003
//
// const age = currentYear - birthYear
// console.log(age)
//
// const a = 5
// const b = 45
//
// console.log(a * b/10)
// console.log(++currentYear)
// console.log(--currentYear)

// 4 Типы данных
// const a = true
// const firstName = 'Nikita'
// const age = 17
// let x
// console.log(typeof a)
// console.log(typeof firstName)
// console.log(typeof age)
// console.log(typeof x)
// console.log(typeof null) // должен написать null

// 5 Приоритет операторов
// const fullAge = 17
// const currentYear = 2021
// const birthYear = 2003
// const isFullAge = currentYear - birthYear >= fullAge
// console.log(isFullAge)

// 6 Условные операторы
// const courseStatus = 'fail' // ready, fail, pending
// if (courseStatus === 'ready') {
//     console.log('Курс уже готов')
// } else if (courseStatus === 'pending') {
//     console.log('Разрабатывается')
// } else {
//     console.log('Курс не получился')
// }

// const isReady = true
// if (isReady) {
//     console.log('Всё готово!')
// } else {
//     console.log('Всё нне готово')
// }
//
// isReady ? console.log('Всё готово!') : console.log('Всё не готово!')

// 7 Булевая логика
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators

// 8 Функции
// function calculateAge(year) {
//     return 2021 - year
// }
//
// const myAge = calculateAge(2003)
// console.log(myAge)

// 9 Массивы
//
// const cars = ['Мерседес', 'Хёндаи', 'BMV']
// console.log('HI')
// // const cars = new Array('Мерседес', 'Хёндаи', 'BMV')
// console.log(cars)
// console.log(cars.length)
// console.log(cars[1])
// cars[0] = 'Porsche'
// cars[cars.length] = 'Mazda'
// console.log(cars)

// 10 Циклы
// const cars = ['Мерседес', 'Хёндаи', 'BMV']
// for (let i = 0; i < cars.length; i++) {
//     const car = cars[i]
//     console.log(car)
// }
//
// for (let car of cars) {
//     console.log(car)
// }

// 11 Объекты
const person = {
    firstName: 'Nikita',
    lastName: 'Korablev',
    age: 17,
    languages: ['RU', 'EN'],
    studyingInSchool: false,
    greet: function () {
        console.log('greet')
    }
}

const key = 'age'
console.log(person[key])
person.greet()


