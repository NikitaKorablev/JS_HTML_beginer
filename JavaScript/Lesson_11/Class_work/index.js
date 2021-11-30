try {
  console.log("start");
  console.log(value);
  console.log("end");
} catch (err) {
  console.log("Произошла ошибка!!!");
}

// console.log("\nstart");
// setTimeout(() => {
//   try {
//     console.log(value);
//   } catch (err) {
//     console.log("Error");
//   }
//   console.log("Я выполнился за 3 сек");
// }, 3000);
// console.log("end");

console.log("\n");
const a = 10;

try {
  // console.log(value);
  if (a == 10) {
    throw new Error("My castom error");
  }
} catch (err) {
  console.log(err.name + ": " + err.message);
}

console.log("\n");
const baseUrl = "https://reqres.in/api";
const getResponseData = (data) => {
    console.log(data, "Done");
}
const getRequest = (page, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${baseUrl}/users?page=${page}`);

  xhr.send();

  xhr.onload = function () {
    callback(JSON.parse(xhr.response).data);
  };
};

getRequest(1, getResponseData);

console.log("\n");
const postRequest = (body, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${baseUrl}/users`);

    xhr.send(body);

    xhr.responseType = "json";

    xhr.onload = function() {
        callback(xhr.response);
    }
}

postRequest({name: "Neo", job: "Men"}, getResponseData);


