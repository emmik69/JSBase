function getOlderUser(user1, user2) {
  return user1.age > user2.age ? user1.age : user2.age;
}

function getOlderUserArray(arrayUsers) {
  let sortArrayUsers = arrayUsers.sort((a, b) => a.age - b.age)[
    arrayUsers.length - 1
  ].name;
  return sortArrayUsers;
}

function filter(arrayUsers, key, value) {
  return arrayUsers.filter((user) => user[key] === value);
}

// проверка задания 1
let userFirst = {
  name: 'Игорь',
  age: 17,
};
let userSecond = {
  name: 'Оля',
  age: 21,
};

console.log(getOlderUser(userFirst, userSecond));

// проверка задания 2
let allUsers = [
  { name: 'Валя', age: 11 },
  { name: 'Таня', age: 24 },
  { name: 'Рома', age: 21 },
  { name: 'Надя', age: 34 },
  { name: 'Антон', age: 7 },
];

console.log(getOlderUserArray(allUsers));

// проверка задания 3
let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' },
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' },
];

console.log(filter(objects, 'name', 'Иван'));
