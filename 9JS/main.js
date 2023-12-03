document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.start-btn');
  const endBtn = document.querySelector('.end-game-btn');
  const newGmeBtn = document.querySelector('.new-game-btn');
  const forma = document.querySelector('.form');
  const mainContainer = document.querySelector('.main-container');
  const gameWindow = document.querySelector('.gameGrid');
  const winGameWindow = document.querySelector('.win-game');
  const timer = document.querySelector('.time');
  const endText = document.querySelector('.end-text');

  function showCard(e) {
    const firstCard = e.target.closest('.game__block');
    if (firstCard.classList.contains('showCard')) {
      firstCard.classList.remove('showCard');
      return;
    }
    if (document.querySelectorAll('.showCard').length < 2) {
      firstCard.classList.add('showCard');
      const cordList = document.querySelectorAll('.showCard');
      if (cordList.length > 1) {
        if (cordList[0].textContent == cordList[1].textContent) {
          cordList[0].classList.add('matchСard');
          cordList[1].classList.add('matchСard');

          cordList[1].classList.remove('showCard');
          cordList[0].classList.remove('showCard');

          cordList[0].removeEventListener('click', showCard);
          cordList[1].removeEventListener('click', showCard);
          if (document.querySelectorAll('.matchСard').length == sum) {
            clearInterval(timerInterval);
            winGameWindow.classList.add('flex');
            winGameWindow.classList.remove('win-game_red-bg');
            winGameWindow.classList.add('win-game_green-bg');
            endText.innerHTML = 'Вы собрали все пары.<br />Молодец!';
            newGmeBtn.addEventListener('click', newGame);
          }
        } else {
          setTimeout(() => {
            cordList[1].classList.remove('showCard');
            cordList[0].classList.remove('showCard');
          }, 700);
        }
      }
    }
  }

  function createCard(number) {
    let block = document.createElement('div');
    let blockContent = document.createElement('div');
    block.className = 'game__block';
    blockContent.className = 'content';
    let text = document.createTextNode(number);
    blockContent.appendChild(text);
    block.appendChild(blockContent);
    gameWindow.appendChild(block);
  }

  function shuffleList(list) {
    list.sort(() => Math.random() - 0.5);
    return list;
  }

  function pairsNumbers() {
    let listNumbers = [];
    while (listNumbers.length < sum) {
      let number = Math.round((Math.random() * sum) / 2) + 1;
      if (!listNumbers.includes(number)) {
        listNumbers.push(number, number);
      }
    }
    return shuffleList(listNumbers);
  }

  function showGame() {
    seconds = complexity * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    forma.classList.remove('flex');
    mainContainer.classList.add('flex');
    let shuffList = pairsNumbers();
    shuffList.map((el) => createCard(el));
    const cards = document.querySelectorAll('.game__block');
    cards.forEach((el) => el.addEventListener('click', showCard));
  }

  function endGame() {
    clearInterval(timerInterval);
    mainContainer.classList.remove('flex');
    gameWindow.innerHTML = '';
    forma.classList.add('flex');
  }

  function newGame() {
    seconds = complexity * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    gameWindow.innerHTML = '';
    winGameWindow.classList.remove('flex');
    let shuffList = pairsNumbers();
    shuffList.map((el) => createCard(el));
    const cards = document.querySelectorAll('.game__block');
    cards.forEach((el) => el.addEventListener('click', showCard));
  }

  function isEvenNumber(number) {
    return number % 2 === 0 && 1 < number && number < 11;
  }

  function checkInput() {
    const inputs = document.querySelectorAll('.form__input');
    const varRoot = document.documentElement;
    if ([...inputs].every((el) => isEvenNumber(parseInt(el.value, 10)))) {
      sum = parseInt(inputs[0].value, 10) * parseInt(inputs[1].value, 10);
      let cWCard = parseInt(inputs[1].value, 10);
      let cHCard = parseInt(inputs[0].value, 10);
      varRoot.style.setProperty('--count', Math.max(cWCard, cHCard));

      varRoot.style.setProperty('--nHorizontal', cWCard);
      varRoot.style.setProperty('--nVertical', cHCard);
      complexity = 1;
      if (cHCard === 2) {
        complexity = 0.5;
      }
      if (cWCard >= 8 || cHCard >= 8) {
        complexity = 1.5;
      }
      if (cWCard * cHCard >= 36) {
        complexity = 2;
      }
      if (cWCard * cHCard >= 64) {
        complexity = 3;
      }
      if (cWCard * cHCard === 100) {
        complexity = 4.5;
      }
      showGame();
    } else {
      inputs.forEach((el) =>
        parseInt(el.value, 10) % 2 !== 0 ? (el.value = 4) : (el = el)
      );
    }
  }

  function updateTimer() {
    if (seconds === 0) {
      clearInterval(timerInterval);
      if (document.querySelectorAll('.matchСard').length !== sum) {
        endText.innerHTML = 'Время вышло!<br>Попробуй ещё)';
        winGameWindow.classList.remove('win-game_green-bg');
        winGameWindow.classList.add('win-game_red-bg');
        const cards = document.querySelectorAll('.game__block');
        cards.forEach((el) => el.removeEventListener('click', showCard));
        winGameWindow.classList.add('flex');
        newGmeBtn.addEventListener('click', newGame);
      }
      return;
    }
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${padNumber(minutes)}:${padNumber(
      remainingSeconds
    )}`;
    timer.textContent = formattedTime;
    seconds--;
  }

  function padNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
  }

  startBtn.addEventListener('click', checkInput);
  endBtn.addEventListener('click', endGame);
  let complexity = 0;
  let timerInterval = 0;
  let sum = 0;
  let seconds = 0;

  CSS.registerProperty({
    name: '--gradientColor1',
    syntax: '<color>',
    inherits: true,
    initialValue: '#09ec3a',
  });

  CSS.registerProperty({
    name: '--gradientColor2',
    syntax: '<color>',
    inherits: true,
    initialValue: '#040c27',
  });

  CSS.registerProperty({
    name: '--gradientColor3',
    syntax: '<color>',
    inherits: true,
    initialValue: '#37a5ee',
  });
});
