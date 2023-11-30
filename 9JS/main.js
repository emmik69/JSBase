document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.start-btn');
  const endBtn = document.querySelector('.end-game-btn');
  const newGmeBtn = document.querySelector('.new-game-btn');
  const forma = document.querySelector('.form');
  const mainContainer = document.querySelector('.main-container');
  const gameWindow = document.querySelector('.game');
  const winGameWindow = document.querySelector('.win-game');
  const timer = document.querySelector('.time');
  const endText = document.querySelector('.end-text');

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showCard(e) {
    const firstCard = e.target.closest('.game__block');
    if (count >= 2) {
      return;
    }

    count += 1;
    if (firstCard.classList.contains('showCard')) {
      firstCard.classList.remove('showCard');
      count = 0;
      secondCard = null;
    } else {
      firstCard.classList.add('showCard');
    }

    if (count === 2) {
      if (secondCard.textContent === firstCard.textContent) {
        countPair += 1;
        firstCard.removeEventListener('click', showCard);
        secondCard.removeEventListener('click', showCard);
      } else {
        await delay(700);
        firstCard.classList.remove('showCard');
        secondCard.classList.remove('showCard');
      }
      count = 0;
    } else if (count === 1) {
      secondCard = firstCard;
    }
    if (countPair === sum / 2) {
      seconds = 0;
      winGameWindow.style.display = 'flex';
      newGmeBtn.addEventListener('click', newGame);
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
    countPair = 0;
    seconds = complexity * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    forma.style.display = 'none';
    mainContainer.style.display = 'flex';
    let shuffList = pairsNumbers();
    shuffList.map((el) => createCard(el));
    const cards = document.querySelectorAll('.game__block');
    cards.forEach((el) => el.addEventListener('click', showCard));
  }

  function endGame() {
    seconds = -1;
    mainContainer.style.display = 'none';
    gameWindow.innerHTML = '';
    forma.style.display = 'flex';
  }

  function newGame() {
    countPair = 0;
    seconds = complexity * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    endText.innerHTML = 'Вы собрали все пары.<br />Молодец!';
    winGameWindow.style.backgroundColor = 'rgba(98, 255, 50, 0.1)';
    gameWindow.innerHTML = '';
    winGameWindow.style.display = 'none';
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
      varRoot.style.setProperty('--wCard', '220px');
      varRoot.style.setProperty('--hCard', '200px');
      complexity = 1;
      if (cHCard === 2) {
        complexity = 0.3;
      }
      if (cWCard >= 8) {
        varRoot.style.setProperty('--wCard', '150px');
        complexity = 1.5;
      }
      if (cHCard >= 8) {
        varRoot.style.setProperty('--hCard', '170px');
        complexity = 1.5;
      }
      if (cWCard * cHCard >= 36) {
        varRoot.style.setProperty('--wCard', '140px');
        varRoot.style.setProperty('--hCard', '125px');
        complexity = 2;
      }
      if (cWCard * cHCard >= 64) {
        varRoot.style.setProperty('--wCard', '100px');
        varRoot.style.setProperty('--hCard', '90px');
        complexity = 3;
      }
      if (cWCard * cHCard === 100) {
        varRoot.style.setProperty('--wCard', '100px');
        varRoot.style.setProperty('--hCard', '68px');
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
      if (countPair !== sum / 2) {
        endText.innerHTML = 'Время вышло!<br>Попробуй ещё)';
        winGameWindow.style.backgroundColor = 'rgba(255, 50, 50, 0.195)';
        const cards = document.querySelectorAll('.game__block');
        cards.forEach((el) => el.removeEventListener('click', showCard));
        winGameWindow.style.display = 'flex';
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
  let count = 0;
  let secondCard = 0;
  let countPair = 0;

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
