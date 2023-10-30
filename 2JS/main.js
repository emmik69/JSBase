function comparison(a, b) {
  console.log(a > b, a < b, a >= b, a <= b, a === b, a != b);
}

function taskFirst(x1, y1, x2, y2) {
  let width = Math.abs(x1 - x2);
  let height = Math.abs(y1 - y2);
  console.log(width * height);
}

function taskSecond(a, b, n) {
  let precision = Math.pow(10, n);
  let fractPartFirst = Math.floor(precision * (a % 1));
  let fractPartSecond = Math.floor(precision * (b % 1));
  console.log('Дробные части:', fractPartFirst, fractPartSecond);
  comparison(fractPartFirst, fractPartSecond);
}

function taskThird(n, m) {
  let len = Math.abs(n - m);
  let randomNumberFirst = Math.round(Math.random() * len) + Math.min(n, m);
  let randomNumberSecond = Math.round(Math.random() * len) + Math.min(n, m);
  console.log(randomNumberFirst, randomNumberSecond);
  comparison(randomNumberFirst, randomNumberSecond);
}

taskFirst(2, 3, 10, 5);
taskFirst(10, 5, 2, 3);
taskFirst(-5, 8, 10, 5);
taskFirst(5, 8, 5, 5);
taskFirst(8, 1, 5, 1);
taskSecond(13.123456789, 2.123, 5);
taskSecond(13.890123, 2.891564, 2);
taskSecond(13.890123, 2.891564, 3);
taskThird(0, 100);
taskThird(2, 5);
taskThird(100, -5);
taskThird(-10, -3);
