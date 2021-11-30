document.body.style.margin = 0;

// console.log(window.navigator.userAgent);
// console.log(window.navigator.platform);

// console.log(window.history);
// console.log(location);

// console.log(window.screen.availWidth);
// console.log(window.innerWidth)

// console.log(window.screen.availHeight);
// console.log(window.innerHeight);

// let myDivs = document.querySelectorAll(".my_div");
// console.log(myDivs);

// let element = document.getElementById("my_div");
// console.log(element);
// element.style.background = "red";



let header = document.createElement('header');
header.className = "header";
header.innerHTML = "header";

header.style.height = "100px";
header.style.widrh = "auto";
header.style.background = "yellow";

document.body.prepend(header);


let TODO = document.createElement('ol');
header.after(TODO);
for (let i = 1; i <= 5; i++) {
    let li = document.createElement('li');
    li.className = "content";
    li.innerHTML = `content ${i}`;
    TODO.appendChild(li);
}


let input = document.createElement('input');
input.className = "input";
TODO.after(input);


function addElem(content) {
    console.log("!" + content + "!");
    let newTODO = document.createElement('li');
    newTODO.className = "content";
    newTODO.innerHTML = `${content}`;
    TODO.appendChild(newTODO);
}

let button = document.createElement('button');
button.className = "btn";
button.innerHTML = "Добавить TODO";
button.onclick = () => console.log("Вы нажали на кнопку");

button.onclick = () => {
    const content =  input.value;
    content ? addElem(content) : alert("Введите текст!!!");
};
// button.addEventListener('click', addElem(input.value));

input.after(button);


let test = document.getElementsByClassName("ol");
console.log(test);
test.id = 'test_id';
console.log(test);
