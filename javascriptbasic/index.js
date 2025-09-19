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

// function outer() {
//   let count = 0;

//   function inner() {
//     count++;
//     return count;
//   }

//   return inner;
// }

// const counter = outer(); 

// console.log(counter()); // 1
// console.log(counter()); // 2
// console.log(counter()); // 3

//calculator
class Calculator {
  add = (a, b) => {
    return a + b;
  };
  subtract=(a,b)=>{
    return a-b;
  }
  multiply=(a,b)=>{
    return a*b;
  }
  divide=(a,b)=>{
    if(b===0){
      return "Error: Division by zero";
    }
    return a / b;
  }
}
const calc = new Calculator();
console.log(calc.add(5, 3));
console.log(calc.subtract(5, 3));
console.log(calc.multiply(5, 3));
console.log(calc.divide(5, 0));
console.log(calc.divide(5, 2));

//findlargestnumber

let largest=()=>{
  let arr=[3, 5, 7, 2, 8];  

    let max=arr[0];
    if(arr.length===0){
        return null;
    }
  for(let i=0;i<arr.length;i++){
    if(max<arr[i]){
        max=arr[i];
    }
  }
   console.log("Max value"+max);

}
largest();

let table=(num)=>{
  for(let i=1;i<=10;i++){
    console.log(`${num} x ${i} = ${num*i}`);
  }
}
table(4);
let evenodd=(num)=>{
  if(num%2===0){
    console.log("Even number");
  }
  else{
    console.log("Odd number");
  }
}
evenodd(5);
evenodd(4);
let factorial=(num)=>{
  let fact=1;
  for(let i=1;i<=num;i++){
    fact*=i;
  }
  return fact;
}
console.log(factorial(5));


let function1=(val)=>{
  console.log(val);
}
let function2=(callback)=>{
  let num=10;
  callback(num);
}
function2(function1);



