// callback, promise, async/await

const { default: axios } = require("axios");

// function one() {
//   console.log("나는 1");
// }

// function two() {
//   console.log("나는 2");
// }

// function three() {
//   console.log("나는 3");
// }

// setTimeout

// 나는 1
// 나는 2
// 나는 3

// function one() {
//   console.log("나는 1");
// }

// function two() {
//   setTimeout(() => {
//     console.log("나는 2");
//   }, 2000);
// }

// function three() {
//   console.log("나는 3");
// }

// 나는 1
// 나는 3
// 나는 2

// callback

// function one(next) {
//   console.log("나는 1");
//   if (next) {
//     next();
//   }
// }

// function two(next) {
//   setTimeout(() => {
//     console.log("나는 2");
//     if (next) {
//       next();
//     }
//   }, 2000);
// }

// function three(next) {
//   console.log("나는 3");
//   if (next) {
//     next();
//   }
// }

// one(() => {
//   two(() => {
//     three();
//   });
// });

// 나는 1
// 나는 2
// 나는 3

// promise

// function one() {
//   return new Promise((resolve, reject) => {
//     resolve(console.log("나는 1"));
//   });
// }

// function two() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(console.log("나는 2"));
//     }, 2000);
//   });
// }

// function three() {
//   return new Promise((resolve, reject) => {
//     resolve(console.log("나는 3"));
//   });
// }

// then, catch, finally
// one().then(() => {
//   two().then(() => {
//     three();
//   });
// });

// 나는 1
// 나는 2
// 나는 3

// async/await

function one() {
  console.log("나는 1");
}

two();
async function two() {
  const test = await axios.post("/test");
  return test;
}

async function two2() {
  await two();
}

const three = () => {
  console.log("나는 3");
};
three();

console.log(a);
let a = 3;
two.then(() => {
  ewrww;
});

async function all() {
  one();
  console.log(two());
  await two();
  three();
}

function aaa() {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);

  console.log(3);
}

aaa();

// all();
