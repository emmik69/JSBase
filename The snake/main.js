document.addEventListener('DOMContentLoaded', () => {
  const FIELD_SIZE = 10;
  let direction = 'right';
  let hasStep = true;
  let score = 0;

  const directionDict = {
    ArrowUp: {
      value: 'top',
      type: 'vertical',
      update: (x, y) => [x, y === 1 ? FIELD_SIZE : y - 1],
    },
    ArrowDown: {
      value: 'down',
      type: 'vertical',
      update: (x, y) => [x, y === FIELD_SIZE ? 1 : y + 1],
    },
    ArrowLeft: {
      value: 'left',
      type: 'horizontal',
      update: (x, y) => [x === 1 ? FIELD_SIZE : x - 1, y],
    },
    ArrowRight: {
      value: 'right',
      type: 'horizontal',
      update: (x, y) => [x === FIELD_SIZE ? 1 : x + 1, y],
    },
  };

  const getRandomCoordinates = (mouse = false) => {
    const cof = mouse ? 1 : 3;
    const x = Math.round(Math.random() * (FIELD_SIZE - cof) + cof);
    const y = Math.round(Math.random() * (FIELD_SIZE - 1) + 1);
    return [x, y];
  };

  const generateSnake = () => {
    const [x, y] = getRandomCoordinates();
    return [
      [x, y],
      [x - 1, y],
      [x - 2, y],
    ];
  };

  const getElementByCoordinates = (x, y) => {
    return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  };

  const createMouse = () => {
    const generateMouse = () => {
      const [x, y] = getRandomCoordinates(true);
      mouse = getElementByCoordinates(x, y);
    };

    while (!mouse || mouse.className.includes('snake')) {
      generateMouse();
    }
    mouse.classList.add('mouse');
  };

  const move = () => {
    const [x, y] = [+snake[0].dataset.x, +snake[0].dataset.y];
    snake[0].classList.replace('snake-head', 'snake-body');
    snake.at(-1).classList.remove('snake-body');
    snake.pop();

    const obj = Object.values(directionDict).find(
      (el) => el.value === direction
    );
    const coordinates = obj.update(x, y);
    const newHead = getElementByCoordinates(...coordinates);
    newHead.classList.add('snake-head');
    snake.unshift(newHead);

    if (newHead.classList.contains('snake-body')) {
      clearInterval(t);
      setTimeout(() => {
        alert('Игра окончена!');
      }, 200);
    }
    if (newHead.classList.contains('mouse')) {
      const coordinates = [+snake.at(-1).dataset.x, +snake.at(-1).dataset.y];
      newHead.classList.remove('mouse');
      snake.push(getElementByCoordinates(...coordinates));
      input.value = `Ваши очки: ${++score}`;
      createMouse();
    }
    snake.at(-1).classList.add('snake-body');
    hasStep = true;
  };

  const input = document.createElement('input');
  input.disabled = true;
  input.value = `Ваши очки: ${score}`;
  document.body.appendChild(input);

  const field = document.createElement('div');
  field.classList.add('field');
  document.body.appendChild(field);

  for (let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
    const excel = document.createElement('div');
    excel.classList.add('excel');
    excel.dataset.x = (i % 10) + 1;
    excel.dataset.y = Math.floor(i / 10) + 1;
    field.appendChild(excel);
  }

  const snake = [];
  const coordinates = generateSnake();
  coordinates.forEach((el, index) => {
    const element = getElementByCoordinates(...el);
    element.classList.add(index ? 'snake-body' : 'snake-head');
    snake.push(element);
  });

  let mouse;
  createMouse();

  const t = setInterval(move, 300);
  document.addEventListener('keydown', (e) => {
    const newDirection = directionDict[e.key];
    if (!newDirection) return;

    const currentType = Object.values(directionDict).find(
      (el) => el.value === direction
    ).type;
    if (currentType !== newDirection.type && hasStep) {
      direction = newDirection.value;
      hasStep = false;
    }
  });
});
