// console.log("Hello javascript");
// const user = {
//   name: "Faisal",
//   age: 22,
//   country: "Pakistan"
// };

// // Normal way
// let userName = user.name;
// let userAge = user.age;

// // Destructuring way
// const { name, age, country } = user;

// console.log(name);   // Faisal
// console.log(age);    // 22
// console.log(country); // Pakistan
// let student=["Faisal","Ali","Ahmed"];
// let perspons=["ahmedFaisal","Ali","Ahmed"];
// //console.log(...perspons,...student);
// student.push("Hassan");
// console.log(student.length);

// function mydisplay(some){
//   console.log(some);
// }
// function functioncallback(callback){
//     let name="faisal";
//     callback(name);
// }
// functioncallback(mydisplay);
// function outer(){
//     function inner(){
//         console.log("inner function");
//     }
//     return inner;
// }
// let fn=outer();
// fn();
// //console.log(fn());
// //console.log(outer()());
// //conceptofclosure

function outer() {
  let count = 0;

  function inner() {
    count++;
    return count;
  }

  return inner;
}

const counter = outer(); 

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

