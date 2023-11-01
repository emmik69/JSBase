function getAge(birthDate) {
  // toDaysYear = 2022;
  toDaysYear = parseInt(new Date().getFullYear());
  return toDaysYear - birthDate;
}

function filter(whiteList, blackList) {
  return whiteList.filter((email) => !blackList.includes(email));
}

function arrSort(array) {
  return array.sort((a, b) => a - b);
}

// проверка задания 1
console.log(getAge(1998));
console.log(getAge(1991));
console.log(getAge(2007));

// проверка задания 2
let whiteList = [
  'my-email@gmail.ru',
  'jsfunc@mail.ru',
  'annavkmail@vk.ru',
  'fullname@skill.ru',
  'goodday@day.ru',
];
let blackList = ['jsfunc@mail.ru', 'goodday@day.ru'];
let result = filter(whiteList, blackList);
console.log(result);

// проверка задания 3
console.log(arrSort([2, 5, 1, 3, 4]));
console.log(arrSort([12, 33, 3, 44, 100]));
console.log(arrSort([0, 1]));
