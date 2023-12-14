document.addEventListener('DOMContentLoaded', () => {
  const buildTable = (data) => {
    table.innerHTML = '';
    for (const student of data) {
      addStudentToTable(student);
    }
  };

  const addStudentToTable = (student) => {
    const fioObj = student.sname + '\n' + student.fname + '\n' + student.lname;
    const old = age(student.bdate);
    const row = `<section class="row-wrapper">
            <article class="row nfl">
              <ul>
                <li>${fioObj}</li>
                <li>${student.fac}</li>
                <li>${student.bdate} (${old})</li>
                <li>${student.startLearn}-${
      parseInt(student.startLearn) + 4
    } (${course(parseInt(student.startLearn))})</li>
              </ul>
            </article>
          </section>`;
    table.innerHTML += row;
  };

  const onAddStudent = () => {
    const form = {
      name: document.querySelector('.student__name'),
      surname: document.querySelector('.student__sname'),
      lastname: document.querySelector('.student__lname'),
      studentBDate: document.querySelector('.student__bdate'),
      studentStLearn: document.querySelector('.student__startLearn'),
      studentFac: document.querySelector('.student__faculty'),
    };

    const validators = {
      studentBDate: (value) =>
        new Date(value.value) >= new Date('1900-01-01') &&
        new Date(value.value) <= new Date(),
      studentStLearn: (value) =>
        parseInt(value.value) &&
        parseInt(value.value) >= 2000 &&
        parseInt(value.value) <= new Date().getFullYear(),
    };

    let success = false;
    for (const key in form) {
      if (validators[key]) {
        success = validators[key](form[key]);
      } else {
        success = !!form[key].value;
      }
      if (!success) break;
    }

    if (success) {
      const tempDate = new Date(form.studentBDate.value);
      const studentObj = {
        fname: form.name.value,
        sname: form.surname.value,
        lname: form.lastname.value,
        bdate: `${checkDate(tempDate.getDate())}.${checkDate(
          tempDate.getMonth() + 1
        )}.${tempDate.getFullYear()}`,
        startLearn: form.studentStLearn.value,
        fac: form.studentFac.value,
      };

      for (const key in form) {
        form[key].value = '';
      }

      studentsArray.push(studentObj);
      localStorage.setItem('students', JSON.stringify(studentsArray));
      addStudentToTable(studentObj);
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
        err.classList.remove('flex');
        err.innerHTML = '';
      });
      err.classList.add('flex');
    }
  };

  const age = (str) => {
    let [date, month, year] = str.match(/(\d+)/g);
    --month;
    const now = new Date();
    const nowYear = now.getFullYear(),
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

  const globalFilter = (filters) => {
    const arrayFiltr = studentsArray.filter((obj) => {
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
        (filters.startLearn ? obj.startLearn == filters.startLearn : true) &&
        (filters.endlearn
          ? parseInt(obj.startLearn) + 4 == filters.endlearn
          : true)
      );
    });

    const sortData = arrayFiltr.sort((objA, objB) => {
      let sort = objA[sortColumn] < objB[sortColumn];
      if (sortDir === false) sort = objA[sortColumn] > objB[sortColumn];
      if (sort) return -1;
    });
    table.innerHTML = '';
    for (const student of sortData) {
      addStudentToTable(student);
    }
  };

  const addBtn = document.querySelector('.btn-add');
  const sortFio = document.querySelector('.sort-fio');
  const sortFac = document.querySelector('.sort-fac');
  const sortAge = document.querySelector('.sort-age');
  const sortLearning = document.querySelector('.sort-learning');
  const filterInputAll = document.querySelectorAll('.filter');
  const table = document.querySelector('.table__body');
  const storedData = localStorage.getItem('students');
  let studentsArray = storedData ? JSON.parse(storedData) : [],
    sortDir = true,
    sortColumn = 'sname',
    filters = {
      fio: '',
      fac: '',
      startLearn: '',
      endlearn: '',
    };

  filterInputAll.forEach((element) => {
    element.addEventListener('keyup', () => {
      filters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => {
          if (element.className.includes(key.toLowerCase()))
            return [key, element.value];
          return [key, value];
        })
      );

      globalFilter(filters);
    });
  });

  [
    { value: sortFio, column: 'sname' },
    { value: sortFac, column: 'fac' },
    { value: sortAge, column: 'bdate' },
    { value: sortLearning, column: 'startLearn' },
  ].forEach(({ value, column }) => {
    value.addEventListener('click', () => {
      sortColumn = column;
      sortDir = !sortDir;
      globalFilter(filters);
    });
  });

  addBtn.addEventListener('click', onAddStudent);

  buildTable(studentsArray);
});
