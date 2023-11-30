document.addEventListener('DOMContentLoaded', () => {
  //прост чтобы успеть до дедлыйна (´• ω •`)
  const addBtn = document.querySelector('.btn-add');

  const buildTable = async () => {
    const response = await fetch(`http://localhost:3000/todos`);
    const array = await response.json();
    console.log(array);
    let table = document.querySelector('.table__body');
    table.innerHTML = '';
    for (let student of array) {
      let fioObj = student.sname + '\n' + student.fname + '\n' + student.lname;
      let old = age(student.bdate);
      let row = `<section class="row-wrapper">
            <article class="row nfl">
              <ul>
                <li>${fioObj}</li>
                <li>${student.fac}</li>
                <li>${student.bdate} (${old})</li>
                <li>${student.startlearn}-${
        parseInt(student.startlearn) + 4
      } (${course(parseInt(student.startlearn))})</li>
              </ul>
            </article>
          </section>`;
      table.innerHTML += row;
    }
  };

  const addStudentToTable = (student) => {
    let table = document.querySelector('.table__body');
    let fioObj = student.sname + '\n' + student.fname + '\n' + student.lname;
    let old = age(student.bdate);
    let row = `<section class="row-wrapper">
            <article class="row nfl">
              <ul>
                <li>${fioObj}</li>
                <li>${student.fac}</li>
                <li>${student.bdate} (${old})</li>
                <li>${student.startlearn}-${
      parseInt(student.startlearn) + 4
    } (${course(parseInt(student.startlearn))})</li>
              </ul>
            </article>
          </section>`;
    table.innerHTML += row;
  };

  const onAddStudent = async () => {
    const inputStudentName = document.getElementById('student__name').value;
    const inputStudentSName = document.getElementById('student__sname').value;
    const inputStudentLName = document.getElementById('student__lname').value;
    const inputStudentBDate = document.getElementById('student__bdate').value;
    const inputStudentStLearn = document.getElementById(
      'student__startLearn'
    ).value;
    const inputStudentFac = document.getElementById('student__faculty').value;

    if (
      inputStudentName !== '' &&
      inputStudentSName !== '' &&
      inputStudentLName !== '' &&
      new Date(inputStudentBDate) >= new Date('1900-01-01') &&
      new Date(inputStudentBDate) <= new Date() &&
      parseInt(inputStudentStLearn) &&
      parseInt(inputStudentStLearn) >= 2000 &&
      parseInt(inputStudentStLearn) <= new Date().getFullYear() &&
      inputStudentFac !== ''
    ) {
      let tempDate = new Date(inputStudentBDate);
      let input = {
        fname: inputStudentName,
        sname: inputStudentSName,
        lname: inputStudentLName,
        bdate: `${checkDate(tempDate.getDate())}.${checkDate(
          tempDate.getMonth() + 1
        )}.${tempDate.getFullYear()}`,
        startlearn: inputStudentStLearn,
        fac: inputStudentFac,
      };

      document.getElementById('student__name').value = '';
      document.getElementById('student__sname').value = '';
      document.getElementById('student__lname').value = '';
      document.getElementById('student__bdate').value = '';
      document.getElementById('student__startLearn').value = '';
      document.getElementById('student__faculty').value = '';

      const responseId = await fetch(`http://localhost:3000/todos`);
      const idn = await responseId.json();

      const response = await fetch('http://localhost:3000/todos', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(idn[idn.length - 1].id) + 1,
          fname: inputStudentName,
          sname: inputStudentSName,
          lname: inputStudentLName,
          bdate: `${checkDate(tempDate.getDate())}.${checkDate(
            tempDate.getMonth() + 1
          )}.${tempDate.getFullYear()}`,
          startlearn: inputStudentStLearn,
          fac: inputStudentFac,
        }),
      });

      const todoITem = await response.json();
      addStudentToTable(todoITem);
    } else {
      const err = document.querySelector('.block-err');
      err.innerHTML = ` <div class="content-err">
        <div class="exit">
          <svg
            class="cross"
            width="36"
            height="36"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
            ></path>
          </svg>
        </div>
        <h2>Ошибка!</h2>
        <div class="descr-err">
          <ul>
            <li>1. Все поля должны быть заполнены!</li>
            <li>
              2. Дата рождения должна быть в диапозоне от 1900 г. по текущую дату!
            </li>
            <li>3. Год начала обучения не менее 2000 г!</li>
          </ul>
        </div>
      </div>`;

      const cross = document.querySelector('.cross');
      cross.addEventListener('click', () => {
        err.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        err.style.display = 'none';
        err.innerHTML = '';
      });
      err.style.display = 'flex';
      err.style.backgroundColor = 'rgba(255, 141, 141, 0.1)';
    }
  };

  const age = (str) => {
    let [date, month, year] = str.match(/(\d+)/g);
    --month;
    let now = new Date();
    let nowYear = now.getFullYear(),
      nowMonth = now.getMonth(),
      nowDate = now.getDate();
    return nowYear - year - (0 > (nowMonth - month || nowDate - date));
  };

  const course = (x) => {
    if (x + 4 - new Date().getFullYear() > 0) {
      return `${parseInt(new Date().getFullYear()) - x + 1} курс`;
    }
    return `Закончил`;
  };

  const checkDate = (x) => {
    if (x < 10) return `0${x}`;
    return x;
  };

  async function globalFilter(filters) {
    const response = await fetch(`http://localhost:3000/todos`);
    const data = await response.json();
    let array = data.filter((obj) => {
      return (
        (filters.fio
          ? (
              obj.sname.toLowerCase() +
              ' ' +
              obj.fname.toLowerCase() +
              ' ' +
              obj.lname.toLowerCase()
            ).includes(filters.fio.toLowerCase().trim())
          : true) &&
        (filters.fac
          ? obj.fac.toLowerCase().includes(filters.fac.toLowerCase())
          : true) &&
        (filters.startlearn ? obj.startlearn == filters.startlearn : true) &&
        (filters.endlearn
          ? parseInt(obj.startlearn) + 4 == filters.endlearn
          : true)
      );
    });

    let table = document.querySelector('.table__body');
    table.innerHTML = '';
    for (let student of array) {
      let fioObj = student.sname + '\n' + student.fname + '\n' + student.lname;
      let old = age(student.bdate);
      let row = `<section class="row-wrapper">
            <article class="row nfl">
              <ul>
                <li>${fioObj}</li>
                <li>${student.fac}</li>
                <li>${student.bdate} (${old})</li>
                <li>${student.startlearn}-${
        parseInt(student.startlearn) + 4
      } (${course(parseInt(student.startlearn))})</li>
              </ul>
            </article>
          </section>`;
      table.innerHTML += row;
    }
  }

  const filterInputAll = document.querySelectorAll('.filter');
  let filters = {
    fio: '',
    fac: '',
    startlearn: '',
    endlearn: '',
  };
  filterInputAll.forEach((element) => {
    element.addEventListener('keyup', () => {
      if (element.classList.contains('filter-fio')) {
        filters.fio = element.value;
      } else if (element.classList.contains('filter-fac')) {
        filters.fac = element.value;
      } else if (element.classList.contains('filter-startlearn')) {
        filters.startlearn = element.value;
      } else if (element.classList.contains('filter-endlearn')) {
        filters.endlearn = element.value;
      }
      globalFilter(filters);
    });
  });

  buildTable();
  addBtn.addEventListener('click', onAddStudent);
});
