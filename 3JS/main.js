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

function taskSecond(userSurname, userName) {
  let normalUserName =
    userName[0].toUpperCase() + userName.slice(1).toLowerCase();
  let normalUserSurname =
    userSurname[0].toUpperCase() + userSurname.slice(1).toLowerCase();
  if (normalUserName === userName) {
    console.log('Имя осталось без изменений:', userName);
  } else {
    console.log('Имя было преобразованно:', userName, '-->', normalUserName);
  }
  if (normalUserSurname === userSurname) {
    console.log('Фамилия осталось без изменений:', userSurname);
  } else {
    console.log(
      'Фамилия была преобразованна:',
      userSurname,
      '-->',
      normalUserSurname
    );
  }
}

function taskThird(number) {
  if (number % 2 === 0) {
    console.log('Число чётное', number);
  } else {
    console.log('Число нечётное', number);
  }
}

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
taskSecond('Литвиненко', 'Эммануил');
taskSecond('ЛиТВиненко', 'Эммануил');
taskSecond('Литвиненко', 'ЭммАНУил');
taskSecond('литвиненко', 'эммануил');

// проверка задания 3
taskThird(2);
taskThird(5);
taskThird(8);
taskThird(-1);
taskThird(0);
taskThird(-10);
