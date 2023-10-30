function taskFirst(password) {
  if (
    password.length >= 4 &&
    (password.includes('-') || password.includes('_'))
  ) {
    console.log('Пароль надёжный');
  } else {
    console.log('Пароль не надёжный');
  }
}

function taskSecond(userName, userSurname) {
  let normalUserName =
    userName[0].toUpperCase() + userName.slice(1).toLowerCase();
  let normalUserSurname =
    userSurname[0].toUpperCase() + userSurname.slice(1).toLowerCase();
  if (normalUserName === userName) {
    console.log('Имя осталось без изменений:', normalUserName);
  } else {
    console.log('Имя было преобразованно:', normalUserName);
  }
  if (normalUserSurname === userSurname) {
    console.log('Фамилия осталось без изменений:');
  } else {
    console.log('фамилия была преобразованна:', normalUserSurname);
  }
}

function taskThird() {}

// проверка задания 1
taskFirst('1234-');
taskFirst('4321_');
taskFirst('qaz-xsw');
taskFirst('_zxd');
taskFirst('_-a');
taskFirst('qaz');
taskFirst('_-3');
taskFirst('123456789');

// проверка задания 2
taskSecond('оололооООом', 'fJKLrevmmvdvfdLL');

// проверка задания 3
// taskThird();
