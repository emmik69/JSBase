document.addEventListener('DOMContentLoaded', () => {
  const game = document.querySelector('.game');
  const res = document.querySelector('.res');
  const btn = document.querySelector('.new-game');
  const fields = document.querySelectorAll('.field');
  const circle = ` <svg class="circle">
          <circle
            r="45"
            cx="58"
            cy="58"
            stroke="blue"
            stroke-width="10"
            fill="none"
          />
        </svg>`;

  const cross = `<svg class="cross">
          <line
            class="first"
            x1="15"
            y1="15"
            x2="105"
            y2="105"
            stroke="red"
            stroke-width="10"
            stroke-linecap="round"
          />
          <line
            class="second"
            x1="105"
            y1="15"
            x2="15"
            y2="105"
            stroke="red"
            stroke-width="10"
            stroke-linecap="round"
          />
        </svg>`;

  let stepCross = true;
  let count = 0;

  game.addEventListener('click', init);
  btn.addEventListener('click', newGame);

  function doStep(target) {
    target.innerHTML = stepCross ? cross : circle;
    target.classList.add(stepCross ? 'X' : 'O');
  }

  function init(e) {
    res.style.color = 'transparent';
    btn.style.cursor = 'pointer';
    btn.disabled = false;
    btn.style.background = 'green';
    const curField = e.target.closest('.field');
    if (
      !curField.classList.contains('X') &&
      !curField.classList.contains('O')
    ) {
      doStep(e.target);
      stepCross = !stepCross;
      count++;
      win();
    }
  }

  function newGame() {
    res.style.color = 'green';
    res.innerHTML = 'Кликни для начала игры';
    stepCross = true;
    count = 0;
    game.addEventListener('click', init);
    Array.from(fields).forEach((el) => {
      el.innerHTML = '';
      el.classList.remove('X', 'O', 'active');
    });
    btn.style.background = 'rgb(135, 236, 135)';
    btn.disabled = true;
    btn.style.cursor = 'auto';
  }

  function win() {
    const comb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < comb.length; i++) {
      const cur = comb[i];
      const curFields = [fields[cur[0]], fields[cur[1]], fields[cur[2]]];

      if (curFields.every((el) => el.classList.contains('X'))) {
        res.style.color = 'green';
        res.innerHTML = 'Выиграли X';
        curFields.forEach((el) => el.classList.add('active'));
        game.removeEventListener('click', init);
        break;
      }
      if (curFields.every((el) => el.classList.contains('O'))) {
        res.style.color = 'green';
        res.innerHTML = 'Выиграли O';
        curFields.forEach((el) => el.classList.add('active'));
        game.removeEventListener('click', init);
        break;
      }
      if (count === 9) {
        res.style.color = 'green';
        res.innerHTML = 'Ничья';
        game.removeEventListener('click', init);
      }
    }
  }
});
