document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('.btn-add');

  const array = [
    {
      sname: 'Сидоров',
      fname: 'Иван',
      lname: 'Михайлович',
      bdate: '23.12.1990',
      startlearn: '2005',
      fac: 'Физики',
    },
    {
      sname: 'Сидорова',
      fname: 'Ивана',
      lname: 'Михайловна',
      bdate: '01.01.1994',
      startlearn: '2006',
      fac: 'Астрономии',
    },
    {
      sname: 'Сорокина',
      fname: 'Мария',
      lname: 'Алексеевна',
      bdate: '01.01.1992',
      startlearn: '2008',
      fac: 'Математики',
    },
    {
      sname: 'Андропов',
      fname: 'Александр',
      lname: 'Петрович',
      bdate: '3.10.1992',
      startlearn: '2003',
      fac: 'Информатики',
    },
    {
      sname: 'Никифоров',
      fname: 'Олег',
      lname: 'Олегович',
      bdate: '24.12.1995',
      startlearn: '2004',
      fac: 'Химии',
    },
  ];

  const buildTable = (data) => {
    let table = document.querySelector('.table__body');
    table.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      let fioObj = data[i].sname + '\n' + data[i].fname + '\n' + data[i].lname;
      let old = age(data[i].bdate);
      let row = `<section class="row-wrapper">
            <article class="row nfl">
              <ul>
                <li>${fioObj}</li>
                <li>${data[i].fac}</li>
                <li>${data[i].bdate} (${old})</li>
                <li>${data[i].startlearn}-${
        parseInt(data[i].startlearn) + 4
      } (${course(parseInt(data[i].startlearn))})</li>
              </ul>
            </article>
          </section>`;
      table.innerHTML += row;
    }
  };

  const onAddStudent = () => {
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
      array.push(input);
      buildTable(array);
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

  const tableSearchFio = (value, data) => {
    let filterData = [];
    for (let i = 0; i < data.length; i++) {
      value = value.toLowerCase();
      let name = `${data[i].sname.toLowerCase()} ${data[
        i
      ].fname.toLowerCase()} ${data[i].lname.toLowerCase()}`;
      if (name.includes(value)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  const tableSearchFac = (value, data) => {
    let filterData = [];
    for (let i = 0; i < data.length; i++) {
      value = value.toLowerCase();
      let name = data[i].fac.toLowerCase();
      if (name.includes(value)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  const tableSearchStLearn = (value, data) => {
    let filterData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].startlearn == value) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  const tableSearchEnLearn = (value, data) => {
    let filterData = [];
    for (let i = 0; i < data.length; i++) {
      if (parseInt(data[i].startlearn) + 4 == value) {
        filterData.push(data[i]);
      }
    }
    return filterData;
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

  document.getElementById('inputFac').addEventListener('keyup', () => {
    let value = document.getElementById('inputFac').value;
    let data = tableSearchFac(value, array);
    if (value !== '') {
      buildTable(data);
    } else buildTable(array);
  });

  document.getElementById('inputFio').addEventListener('keyup', () => {
    let value = document.getElementById('inputFio').value;
    let data = tableSearchFio(value, array);
    if (value !== '') {
      buildTable(data);
    } else buildTable(array);
  });

  document.getElementById('inputDateStart').addEventListener('keyup', () => {
    let value = document.getElementById('inputDateStart').value;
    let data = tableSearchStLearn(value, array);
    if (value !== '') {
      buildTable(data);
    } else buildTable(array);
  });

  document.getElementById('inputDateEnd').addEventListener('keyup', () => {
    let value = document.getElementById('inputDateEnd').value;
    let data = tableSearchEnLearn(value, array);
    if (value !== '') {
      buildTable(data);
    } else buildTable(array);
  });

  buildTable(array);
  addBtn.addEventListener('click', onAddStudent);
});
