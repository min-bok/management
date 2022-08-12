let _ = require("lodash");

let c = "태영";
const object = {
  name: "태영",
  phone: "01056218198",
  test: {
    a: 3,
    b: 5,
    add: function (a, b) {
      return a + b;
    },
  },
};

const a = _.cloneDeep(object);
// const a = JSON.parse(JSON.stringify(object));
object.test.a = 99999;

console.log(a);
