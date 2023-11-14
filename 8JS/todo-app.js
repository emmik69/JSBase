(function () {
  function createAppTitle(title) {
    let appTitile = document.createElement('h2');
    appTitile.innerHTML = title;
    return appTitile;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('dev');
    let button = document.createElement('button');

    button.disabled = true;
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавь дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function setData(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getMaximumId(nameArray) {
    let array = getData(nameArray);
    let maxId = array?.length ? array[array.length - 1].id + 1 : 0;

    return maxId;
  }

  function createTodoItem(object) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let id = object.id;

    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    item.textContent = object.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
      id,
    };
  }

  function addToListItem(object, nameArray) {
    let array = getData(nameArray) ? getData(nameArray) : [];
    array.push(object);
    setData(array, nameArray);
    return createTodoItem(object);
  }

  function addEverntToBtn(todoItem, listName) {
    todoItem.doneButton.addEventListener('click', function () {
      todoCompleted(todoItem, listName);
    });
    todoItem.deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверенны?')) {
        remooveElement(todoItem, listName);
      }
    });
  }

  function todoCompleted(todoItem, nameArray) {
    let array = getData(nameArray);
    array = array.map((el) =>
      el.id === todoItem.id ? { ...el, done: !el.done } : el
    );

    setData(array, nameArray);
    todoItem.item.classList.toggle('list-group-item-success');
  }

  function remooveElement(todoItem, nameArray) {
    let array = getData(nameArray);
    let newArray = [];
    for (let el of array) {
      if (el.id !== todoItem.id) {
        newArray.push(el);
      }
    }
    setData(newArray, nameArray);
    todoItem.item.remove();
  }

  function createTodoApp(container, title = 'Список дел', listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let locStrgArray = getData(listName) ? getData(listName) : [];

    for (let el of locStrgArray) {
      let todoItem = createTodoItem(el);
      if (el.done) {
        todoItem.item.classList.toggle('list-group-item-success');
      }
      addEverntToBtn(todoItem, listName);
      todoList.append(todoItem.item);
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.input.addEventListener('input', function () {
      todoItemForm.button.disabled = !todoItemForm.input.value.trim();
    });

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      let todoItem = addToListItem(
        {
          id: getMaximumId(listName),
          name: todoItemForm.input.value,
          done: false,
        },
        listName
      );

      addEverntToBtn(todoItem, listName);

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });
  }

  window.createTodoApp = createTodoApp;
})();
