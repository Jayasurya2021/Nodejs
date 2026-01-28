// Write a program to find the sum of all elements in an array.
let arr = [10, 20, 35, 40, 50];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}

console.log(sum);
// const add = arry.reduce((e, i)=>e+i,0)
// Write a program to find the largest element in an array.
let max = arr[0];
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i];
  }
}

console.log("Largest =", max);


// Write a program to find the smallest element in an array.

let min = arr[0];
for (let i = 1; i < arr.length; i++) {
  if (arr[i] < min) {
    min = arr[i];
  }
}

console.log("minumum =", min);


// Write a program to count even and odd numbers in an array.
let even = 0
let odd = 0
for (let i = 0; i < arr.length; i++) {
  if (arr[i]%2===0){
    even++;
  }else{
    odd++;
  }
}
console.log("even=",even)
  console.log("odd=", odd)