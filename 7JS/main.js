document.addEventListener('DOMContentLoaded', function () {
  function createStudentCard(name, age) {
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.textContent = name;
    let span = document.createElement('span');
    span.textContent = `Возраст: ${age} лет`;
    div.append(h1, span);
    document.body.append(div);
  }

  function createStudentCardVol2(student) {
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.textContent = student.name;
    let span = document.createElement('span');
    span.textContent = `Возраст: ${student.age} лет`;
    div.append(h1, span);
    document.body.append(div);
  }

  function createStudentsList(listArr) {
    let ul = document.createElement('ul');
    for (let el of listArr) {
      let li = document.createElement('li');
      let h1 = document.createElement('h1');
      h1.textContent = el.name;
      let span = document.createElement('span');
      span.textContent = `Возраст: ${el.age} лет`;
      li.append(h1, span);
      ul.append(li);
    }
    document.body.append(ul);
  }

  // задание 1
  createStudentCard('Игорь', 17);

  // задание 2
  let studentObj = {
    name: 'Игорь',
    age: 17,
  };
  createStudentCardVol2(studentObj);

  // задание 3
  let allStudents = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 },
  ];
  createStudentsList(allStudents);

  // задание 4
  let button = document.createElement('button');
  button.textContent = 'Показать список';
  document.body.append(button);
  button.addEventListener('click', function () {
    createStudentsList(allStudents);
  });
});
