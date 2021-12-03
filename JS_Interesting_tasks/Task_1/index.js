
let ul = document.createElement("ul");
document.body.prepend(ul);


function addArr() {return [prompt("Any:", ""), prompt("Any:", ""), prompt("Any:", "")]}

let addToDO = (a) => {
    for (let i = 0; i < a.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `${a[i]}`;
        li.style.height = "20px";
        li.style.width = "auto";
        if (i == 1) {
            li.className = "red";
        }
        ul.append(li);
    }
}

let addColor = () => {
    document.querySelectorAll("ul > li.red").forEach((e) => e.style.background = "red");
}


addToDO(addArr());
addToDO(addArr());

addColor();


